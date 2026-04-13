import { defineStore } from 'pinia';
import { getFacultiesByOrgId } from 'src/api/faculties';
import {
  getOrganizationBriefByCode,
  getOrganizationByCode,
  getOrganizationEvents,
} from 'src/api/organizations';
import { getOrganizationReviewsByOrgId } from 'src/api/reviews';
import { getOrganizationSpecialtiesByFaculty, getOrganizationSpecialtiesByOrgId } from 'src/api/specialties';
import { api } from 'src/boot/axios';
import { getOne, rel, rels } from 'src/lib/api';
import { monLabelsCollege, monLabelsVuz } from 'src/lib/constants';
import {
  formatDate,
  formatTime,
  formatTxtDate,
  getTags, makeCityUrl, makeOrgUrl, notifyAuth, parseAdmissionPhones,
  stripHtml, toPrepositional,
} from 'src/lib/functions';
import { metaStrategy } from 'src/lib/meta';

import { useDefaultStore } from './default';

export const useOrganizationStore = defineStore('organization', {
  state: () => ({
    organization: null,
    faculties: null,
    specialties: null,
    specialty: null,
    faculty: null,
    reviews: null,
    route: null,
    events: null,
  }),

  getters: {

    txtShortName: (state) => (state.organization?.data?.short_name ?? ''),

    txtName: (state) => (state.organization?.data?.name ?? ''),

    txtFullName: (state) => (state.organization?.data?.full_name ?? ''),

    txtCurrentYear: () => (new Date().getFullYear()),

    txtSpecName: (state) => state.getOrganizationSpecialty?.$specialty?.name ?? '',

    txtSpecOkso: (state) => state.getOrganizationSpecialty?.$specialty?.code_okso ?? '',

    txtSpecLevelPp: (state) => (state.getOrganizationSpecialty?.$specialty?.level_code
      ? toPrepositional(state.getOrganizationSpecialty?.$specialty?.level_code) : ''),

    txtFacultyName: (state) => state.faculty?.data?.name ?? '',

    getLogo: (state) => (state.organization?.data?.logo ?? null),

    getAbout: (state) => (state.organization?.data?.about ?? ''),

    getOrgCity: (state) => (state.organization?.data?.calculation_data.city_name ?? ''),

    getUrl: (state) => {
      const c = state.organization?.data?.calculation_data;
      return c ? makeOrgUrl(c.subject_id, c.city_id, state.organization.data.code) : '/';
    },

    getLinks: (state) => {
      const url = state.getUrl;
      return {
        chart: `${url}data/`,
        faculties: `${url}faculties/`,
        specialties: `${url}specs/`,
        reviews: `${url}opinions/`,
      };
    },

    getOrganizationSummary: (state) => state.organization?.data?.calculation_data ?? null,

    getGeoUrl: (state) => (state.organization?.data?.calculation_data
      ? makeCityUrl(
        state.organization.data.calculation_data.subject_id,
        state.organization.data.calculation_data.city_id,
      ) : '/'),

    getBreadcrumbs: (state) => (state.organization?.data?.name ? [
      {
        title: 'Вузы России',
        link: '/',
      },
      {
        title: `Вузы ${state.organization.data.calculation_data.city_name}`,
        link: state.getGeoUrl,
      },
      {
        title: state.organization.data.name,
        link: state.getUrl,
      },
    ] : []),

    getStatus: (state) => {
      const metro = state.getRel('metro', 'metros');
      return {
        metro: metro?.name ?? '',
        esi_letter: state.organization?.data?.esi > 7
          ? 'A' : state.organization?.data?.esi > 3 ? 'B' : 'C',
        status: state.organization?.data?.is_confirmed ? 'Подтвержденный' : '',
      };
    },

    getTags: (state) => (state.organization?.data ? getTags(state.organization?.data, state.getRels('directions')) : []),

    getTabs: (state) => (state.organization?.data ? [
      {
        label: state.organization?.data?.short_name ?? 'ВУЗ',
        name: 'vuz-name',
        routeName: 'orgDefault',
      },
      ...(api.hostnames.isVuz ? [{
        label: 'Факультеты',
        name: 'faculty',
        routeName: 'orgFaculties',
      }] : []),
      {
        label: `Специальности: ${state.organization?.data?.calculation_data?.specialties_count ?? 0}`,
        name: 'specialties',
        routeName: 'orgSpecs',
        anchor: state.organization?.data?.calculation_data?.specialties_count === 0 && {
          routeName: 'orgDefault',
          elementId: '#licensed-specialties',
        },
      },
      {
        label: `Отзывы: ${state.organization?.data?.calculation_data?.reviews_count ?? 0}`,
        name: 'reviews',
        routeName: 'orgReviews',
      },
    ] : []),

    getMeta: (state) => {
      if (state.organization?.data && metaStrategy[state.route.name]) {
        const meta = metaStrategy[state.route.name](state);
        return {
          ...meta,
          breadcrumbs: state.getBreadcrumbs,
          tags: state.getTags,
          tabs: state.getTabs,
          meta: {
            description: {
              name: 'description',
              content: meta.metaDescription,
            },
          },
        };
      }
      return { title: 'ВУЗ' };
    },

    getData: (state) => state.organization?.data ?? {},

    getRel(state) {
      return (r, i) => rel(state.organization?.data, state.organization, r, i);
    },

    getRels(state) {
      return (r, i) => rels(state.organization?.data, state.organization, r, i);
    },

    getAdmission: (state) => {
      const admission = state.getRel('admissionOffices', 'admission-offices');
      if (!admission) return null;
      return {
        address: admission.address,
        commiteeSchedule: admission.end_date === null
          ? 'Приемная комиссия работает круглогодично'
          : `с ${formatDate(admission.start_date)} по ${formatDate(admission.end_date)}`,
        website: admission.site,
        email: admission.email,
        phones: parseAdmissionPhones(admission.phones),
        schedule: admission.schedule.map((el) => `${el.days} ${el.time}${el.comment ? ` ${el.comment}` : ''}`).join('; '),
      };
    },

    getContacts: (state) => {
      const contacts = state.getRel('contacts');
      if (!contacts) return null;
      return {
        address: contacts.address,
        website: contacts.site,
        email: contacts.email,
        // phones: contacts.phones ? contacts.phones.map((e) => ({ phone: e })) : [],
        phones: parseAdmissionPhones(contacts.phones),
      };
    },

    getAffiliations: (state) => state.getRels('affiliations', 'organizations'),

    getColleges: (state) => state.getRels('colleges', 'organizations'),

    getMonitoring: (state) => {
      let headings = [];
      const messages = {};
      const monitorings = state.getRels('monitorings');
      const monLabels = api.hostnames.isCollege ? monLabelsCollege : monLabelsVuz;
      if (!monitorings) return { headings: [], data: [] };

      const monitoring = Object.values(monitorings)
        .filter((item) => {
          if (item.label === 'msg') {
            messages[item.year] = item;
            return false;
          }
          return item;
        })
        .reduce((acc, item) => {
          if (!headings.includes(item.year)) headings.push(item.year);
          if (!acc[item.label]) acc[item.label] = {};
          if (!acc[item.label][item.year]) acc[item.label][item.year] = item;
          return acc;
        }, {});

      const data = Object.keys(monitoring).reduce((acc, item) => {
        headings.forEach((heading) => {
          if (!monitoring[item][heading]) monitoring[item][heading] = { year: heading, value: '' };
        });
        acc.push([
          monLabels[item] ?? item,
          ...Object.values(monitoring[item])
            .sort((a, b) => b.year - a.year)
            .map((el, i, a) => {
              if (i === 0) {
                return {
                  data: el.value,
                  // eslint-disable-next-line no-extra-boolean-cast
                  class: a.length > 1
                    ? Number(a[0].value)
                      ? a[0].value > a[1].value ? 'arrow-up' : 'arrow-down'
                      : 'text-green'
                    : '',
                };
              }
              return Number(el.value) ? el.value : {
                data: el.value,
                class: 'text-green',
              };
            }),
        ]);
        return acc;
      }, []);
      headings = ['Показатель', ...headings.sort((a, b) => b - a)];

      if (api.hostnames.isCollege) {
        const priority = [monLabelsCollege.att, monLabelsCollege.attF, monLabelsCollege.attP];
        data.sort((a, b) => {
          const aPriority = priority.indexOf(a[0]);
          const bPriority = priority.indexOf(b[0]);
          if (aPriority !== -1 && bPriority !== -1) return aPriority - bPriority;
          if (aPriority !== -1) return -1;
          if (bPriority !== -1) return 1;
          return 0;
        });
      }

      return {
        headings,
        data,
        messages,
      };
    },

    getFacultiesItems: (state) => state.faculties?.data ?? [],

    getReviews: (state) => (state.reviews?.data ? state.reviews.data.map((item) => ({
      author: item.calculation_data.profile_name,
      rating: item.score,
      date: formatDate(item.created_at),
      time: formatTime(item.created_at),
      text: stripHtml(item.text),
      answer: {
        date: formatDate(item.answer_date),
        time: formatTime(item.answer_date),
        text: stripHtml(item.answer_text),
      },
    })) : null),

    getEvents: (state) => (state.events?.data ? state.events.data.map((item) => ({
      ...item,
      title: item.title,
      address: item.address,
      url: item.url,
      online: item.is_online,
      date: formatTxtDate(item.start_date),
      time: formatTime(item.start_date),
      faculty: rel(item, state.events, 'faculty', 'faculties'),
    })) : null),

    getFaculty: (state) => state.faculty?.data ?? null,

    getOrganizationSpecialty: (state) => (state.specialty?.data ? {
      ...state.specialty.data,
      $specialty: rel(state.specialty.data, state.specialty, 'specialty', 'specialties'),
      $form: rel(state.specialty.data, state.specialty, 'form', 'forms'),
    } : null),

    getOrganization: (state) => (state.organization?.data ? {
      ...state.organization.data,
      $admission: state.getRel('admissionOffices', 'admission-offices'),
      $affiliations: state.getRels('affiliations', 'organizations'),
      $colleges: state.getRels('colleges', 'organizations'),
      $contacts: state.getRel('contacts'),
      $specialties: state.getRels('specialties'),
      $notImplementedSpecs: state.getRels('notImplementSpecialties', 'specialties'),
      $orgSpecs: state.getRels('organization-specialties'),
      $monitorings: state.getRels('monitorings'),
      $galleries: state.getRels('galleries'),
      $parent: state.getRel('parentOrganization', 'organizations'),
      $parentCollege: state.getRel('parentOrganizationForCollege', 'organizations'),
      $charts: state.getRel('charts'),
      $reviews: state.getReviews,
      $events: state.getEvents,
      $status: {
        metro: state.getRel('metro', 'metros')?.name ?? '',
        esi_letter: state.organization.data.esi > 7
          ? 'A' : state.organization.data.esi > 3 ? 'B' : 'C',
        status: state.organization.data.is_confirmed ? 'Подтвержденный' : '',
      },
      $tags: getTags(state.organization.data, state.getRels('directions')),
      $meta: state.getMeta,
    } : null),
  },

  actions: {

    async setSpecialtyFavorite(id, isFavorite) {
      const $store = useDefaultStore();
      if ($store.isAuthorized && id) {
        await api.post(`/user/${isFavorite ? 'add' : 'delete'}-favorite-organization-specialty`, {
          organization_specialty: id,
        });
        return true;
      }
      notifyAuth(api.hostnames.fullSecure);
      return false;
    },

    async loadOrganization(route, fullLoad) {
      await this.clearState(route);
      const code = `${route.params.u}${route.params.vid}`;
      this.organization = fullLoad
        ? await getOrganizationByCode(code) : await getOrganizationBriefByCode(code);
    },

    async loadOrganizationEvents() {
      this.events = await getOrganizationEvents(this.organization.data.id);
    },

    async clearState(route) {
      this.organization = null;
      this.faculties = null;
      this.specialties = null;
      this.specialty = null;
      this.faculty = null;
      this.reviews = null;
      this.route = {
        name: route.name,
        params: { ...route.params },
        query: { ...route.query },
      };
    },

    async loadOrganizationFaculties() {
      this.faculties = this.organization?.data?.id
        ? await getFacultiesByOrgId(this.organization.data.id) : null;
    },

    async loadOrganizationSpecialties() {
      const { isCollege } = api.hostnames;
      this.specialties = this.organization?.data?.id
        ? await getOrganizationSpecialtiesByOrgId(this.organization.data.id, isCollege) : null;
    },

    async loadOrganizationSpecialty(route) {
      this.specialty = null;
      if (route.params.fid && route.params.spec) {
        this.specialty = await getOne('/organization/organization-specialties', {
          entity: 'organization-specialties',
          include: 'specialty,form,faculty',
          fields: {
            data: `budget_places,budget_score,commercial_places,commercial_score,
                  cost,profile,calculation_data`,
            specialties: 'name,code_okso,description_work,level_code',
            faculties: 'name,code',
            forms: 'name',
          },
          filter: {
            faculty_code: route.params.fid,
            specialty_code: route.params.spec,
          },
          page: { size: 1 },
        });
        const faculty = rel(this.specialty.data, this.specialty, 'faculty', 'faculties') ?? null;
        this.faculty = faculty ? { data: faculty } : null;
        // console.log(this.specialty);
        // console.log(this.faculty);
      }
    },

    async loadOrganizationFaculty() {
      this.faculty = null;
      this.specialties = null;
      if (this.route?.params?.fid) {
        this.faculty = await getOne('/organization/faculties', {
          entity: 'faculties',
          // include: 'organization',
          fields: 'name,calculation_data',
          filter: {
            organization_id: this.organization.data.id,
            code: this.route.params.fid,
          },
        });
        // console.log(this.faculty);
        this.specialties = await getOrganizationSpecialtiesByFaculty(this.route.params.fid);
      }
    },

    async loadOrganizationReviews(pageSize) {
      this.reviews = this.organization?.data?.id
        ? await getOrganizationReviewsByOrgId(
          this.organization.data.id,
          1,
          pageSize ?? 10,
        ) : null;
    },

    async loadOrganizationReviewsNext() {
      if (!(this.reviews?.meta?.page?.currentPage
        && this.reviews.meta.page.currentPage < this.reviews.meta.page.lastPage
        && this.organization?.data?.id
        && this.reviews?.data?.[0])) return false;
      const reviews = await getOrganizationReviewsByOrgId(
        this.organization.data.id,
        this.reviews.meta.page.currentPage + 1,
      );
      this.reviews.data = this.reviews.data.concat(reviews.data);
      this.reviews.meta = { ...reviews.meta };
      return true;
    },
  },
});

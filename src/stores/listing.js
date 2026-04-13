import { defineStore } from 'pinia';
import { getCityByCode, getSubjectByCode } from 'src/api/cities';
import { getDirectionByCode, getDirectionsByCityId } from 'src/api/directions';
import { getEvents } from 'src/api/events';
import { getOrganizationsListing } from 'src/api/organizations';
import { getSpecialtiesByDirection, getSpecialtyByCode } from 'src/api/specialties';
import { api } from 'src/boot/axios';
import {
  getAll, mapItemRelations, rel, rels,
} from 'src/lib/api';
import { lfEducationForm, lfEducationLevel, smDirectionsTopCodes } from 'src/lib/constants';
import { getTags, makeCityUrl } from 'src/lib/functions';
import { metaStrategy } from 'src/lib/meta';

export const useListingStore = defineStore('listing', {
  state: () => ({
    organizations: null,
    city: null,
    subject: null,
    directions: null,
    direction: null,
    specialties: null,
    specialty: null,
    exams: null,
    forms: null,
    route: null,
    events: null,
  }),

  getters: {
    getOrganizations: (state) => (state.organizations?.data
      ? mapItemRelations(state.organizations, {
        metro: 'metros',
        directions: 'directions',
        contacts: 'contacts',
      }).data
      : []),

    txtGeoName: (state) => state.city?.name ?? state.subject?.name ?? 'Россия',

    txtGeoNameRp: (state) => state.city?.name_rp ?? state.subject?.name_rp ?? 'России',

    txtOrgType: () => (api.hostnames.isVuz ? 'ВУЗы' : 'Колледжи'),

    txtOrgTypeRp: () => (api.hostnames.isVuz ? 'ВУЗах' : 'Колледжах'),

    txtCurrentYear: () => new Date().getFullYear(),

    txtLastYear: () => new Date().getFullYear() - 1,

    txtCount: (state) => state.organizations?.meta?.page?.total ?? 0,

    txtDirectionName: (state) => (state.direction?.name ? state.direction.name.toLowerCase() : 'вузы'),

    txtDirectionSynonym: (state) => state.direction?.synonym ?? '',

    txtSuffixes: (state) => {
      const suffixes = [];
      if (state.route.query.free === 'y') suffixes.push('бюджетными местами');
      if (state.route.query.mil === 'y') suffixes.push('военной кафедрой');
      if (state.route.query.hos === 'y') suffixes.push('общежитием');
      return suffixes.length > 0 ? ` с ${suffixes.join(', ')}` : '';
    },

    txtState: (state) => (state.route.query.gos === 'y' ? ' государственные ' : ''),

    txtStateRp: (state) => (state.route.query.gos === 'y' ? ' государственных ' : ''),

    txtForm: (state) => (lfEducationForm[state.route.query.form] ? ` ${lfEducationForm[state.route.query.form]}` : ''),

    txtSpec: (state) => (state.specialty?.name ?? ''),

    txtSpecQuot: (state) => (state.txtSpec ? ` «${state.txtSpec}»` : ''),

    txtSpecPo: (state) => (state.txtSpec ? ` ${lfEducationLevel[state.route.params.level].page?.text_po ?? lfEducationLevel.default.page.text_po} ${state.txtSpec}` : ''),

    txtSpecPoOkso: (state) => (state.txtSpec ? `${state.txtSpecPo} (${state.specialty.code_okso})` : ''),

    txtOkso: (state) => (state.specialty?.code_okso ?? ''),

    txtLevel: (state) => (state.route.params.level ? lfEducationLevel[state.route.params.level].page.text_level : ''),

    enabledMap: (state) => state.city?.calculation_data?.has_vuz_coordinates ?? false,

    getGeoUrl: (state) => (state.subject?.id && state.city?.id
      ? makeCityUrl(state.subject.id, state.city.id) : '/'),

    getMeta: (state) => {
      let { name } = state.route;
      let data = {};
      if (['lsDefault', 'lsDistant'].includes(name)) {
        if (state.route?.params?.level) {
          name = 'lsEducationLevel';
        } else if (state.specialty) {
          name = 'lsSpecialty';
        }
      }
      data = (metaStrategy[name] ?? metaStrategy.lsDefault)(state);
      data = {
        ...data,
        title: data.title ?? `ВУЗы России - список ${state.getCurrentYear}`,
        meta: {
          description: { name: 'description', content: data.metaDescription ?? '' },
        },
      };
      return data;
    },

    getPaging: (state) => state.organizations?.meta ?? { page: {} },

    getEventsPaging: (state) => state.events?.meta ?? { page: {} },

    getTopDirections: (state) => (state.directions
      ? state.directions.filter(
        (direction) => smDirectionsTopCodes.includes(parseInt(direction.code, 10)),
      ) : null),

    getBottomDirections: (state) => (state.directions
      ? state.directions.filter(
        (direction) => !smDirectionsTopCodes.includes(parseInt(direction.code, 10)),
      ) : null),

    getActiveDirectionCode: (state) => state.direction?.code ?? null,

    getSpecialties: (state) => state.specialties,

    getRel(state) {
      return (item, r, i) => rel(item, state.organizations, r, i);
    },

    getRels(state) {
      return (item, r, i) => rels(item, state.organizations, r, i);
    },

    getMetro(state) {
      return (item) => state.getRel(item, 'metro', 'metros');
    },

    getTags(state) {
      return (item) => getTags(item, state.getRels(item, 'directions'));
    },

    getFilter(state) {
      return (r) => {
        const f = {};
        if (state.subject?.id) f.subject_id = state.subject.id;
        if (state.city?.id) f.city_id = state.city.id;
        if (state.direction?.id) f.directions = state.direction.id;
        if (state.specialty?.id) f.specialties = state.specialty.id;
        // f.levels = (r.params.level && lfEducationLevel[r.params.level])
        //   ? lfEducationLevel[r.params.level].filter : lfEducationLevel.default.filter;
        if (r.params.level && lfEducationLevel[r.params.level]) {
          f.levels = lfEducationLevel[r.params.level].filter;
        }
        if (r.query.form && lfEducationForm[r.query.form]) {
          f.forms = r.query.form;
        }
        if (r.name === 'lsDistant') f.forms = 4;
        if (r.query.gos === 'y') f.is_state = true;
        if (r.query.free === 'y') f.has_free = true;
        if (r.query.mil === 'y') f.is_military = true;
        if (r.query.hos === 'y') f.is_hostel = true;

        // EGE
        if (r.query['exam[]']) {
          f.exams = Array.isArray(r.query['exam[]'])
            ? r.query['exam[]'].join(',')
            : r.query['exam[]'];
        }
        if (r.query['ege-min']) f.min_score_exam = r.query['ege-min'];
        if (r.query['ege-max']) f.max_score_exam = r.query['ege-max'];
        if (r.query['only-free'] === '1') f.is_budget_exam = true;
        return f;
      };
    },

    isLoaded: (state) => !!state.organizations?.meta,

    getExamsAll: (state) => state.exams?.data ?? null,

    getFormsAll: (state) => state.forms?.data ?? null,

    getOpenDays: (state) => state.events.data.map((item) => ({
      ...item,
      organization: rel(item, state.events, 'organization', 'organizations'),
      faculty: rel(item, state.events, 'faculty', 'faculties'),
    })),
  },

  actions: {

    async loadGeo() {
      const { route } = this;
      if (route.params.cid) {
        const r = await getCityByCode(route.params.cid);
        this.city = r.data;
        this.subject = rel(r.data, r, 'subject', 'subjects');
      } else if (route.params.rid) {
        const r = await getSubjectByCode(route.params.rid);
        this.subject = r.data;
        this.city = rel(r.data, r, 'city', 'cities');
      }
    },

    async loadDirections() {
      const { route } = this;
      if (this.city?.id) {
        this.directions = await getDirectionsByCityId(
          this.city.id,
          route.params.rid,
          route.params.cid,
        );
      }
      if (route.params.did) {
        this.direction = (await getDirectionByCode(route.params.did)).data;
      }
    },

    async loadSpecialties() {
      const { route } = this;
      const levels = (route.params.level && lfEducationLevel[route.params.level])
        ? lfEducationLevel[route.params.level].filter : lfEducationLevel.default.filter;
      if (this.direction?.id) {
        this.specialties = await getSpecialtiesByDirection(
          this.direction.id,
          levels,
          route.params.rid,
          route.params.cid,
        );
      }
      if (route.query.spec) {
        this.specialty = (await getSpecialtyByCode(route.query.spec, levels)).data;
      }
    },

    clearStoreData() {
      this.organizations = null;
      this.city = null;
      this.subject = null;
      this.directions = null;
      this.direction = null;
      this.specialties = null;
      this.specialty = null;
      this.route = null;
      this.events = null;
    },

    async loadExams() {
      this.exams = await getAll('/education/exams', {});
    },

    async loadForms() {
      this.forms = await getAll('/education/forms', {});
    },

    async loadEvents(route, number) {
      this.route = {
        name: route.name,
        params: { ...route.params },
        query: { ...route.query },
      };
      this.events = await getEvents(route, number);
      await this.loadGeo();
    },

    async loadOrganizations(route) {
      this.clearStoreData();
      this.route = {
        name: route.name,
        params: { ...route.params },
        query: { ...route.query },
      };
      if (this.route.name === 'lsDistant' && !this.route.query.form) {
        this.route.query.form = 4;
      }
      await this.loadGeo();
      await this.loadDirections();
      await this.loadSpecialties();

      const params = {
        filter: {
          ...this.getFilter(route),
          organization_type: api.hostnames.organization_type,
          published: true,
        },
        page: {
          size: route.name === 'lsMap' ? 1000 : 10,
          number: route.query.page ? parseInt(route.query.page, 10) + 1 : 1,
        },
      };
      this.organizations = await getOrganizationsListing(params);
    },
  },
});

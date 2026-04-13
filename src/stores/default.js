import { defineStore } from 'pinia';
import {
  getCitiesTop, getSubjectsWithCities,
} from 'src/api/cities';
import { api } from 'src/boot/axios';
import {
  forgetCache,
  getAccessToken,
  getAll, getOne, rel, rels,
  setAccessToken,
} from 'src/lib/api';
import { testUsers } from 'src/lib/constants';
import { crossRedirect, formatDate, notifyError } from 'src/lib/functions';

export const useDefaultStore = defineStore('default', {
  state: () => ({
    accessToken: null,
    citiesTop: [],
    selectedCity: { name: 'Москва', url: '/77/' },
    searchCity: { name: 'Москва', url: '/77/' },
    subjectsWithCities: [],
    articles: null,
    articleRubrics: null,
    article: null,
    articleRubricsMeta: null,
    isAuthorized: null,
    me: null,
    favoriteIds: null,
    favoriteSpecialties: null,
  }),
  getters: {
    getArticleMeta: (state) => (state.getArticle
      ? {
        title: state.getArticle.name,
        meta: {
          description: {
            name: 'description',
            content: state.getArticle.h1,
          },
        },
      } : {}),

    getArticlesMeta: (state) => ({
      h1: state.articleRubricsMeta?.h1 ?? 'Медиа',
      title: state.articleRubricsMeta?.title ?? 'Медиа',
      meta: {
        description: {
          name: 'description',
          content: state.articleRubricsMeta?.description ?? 'Журнал',
        },
      },
    }),

    getArticles: (state) => state.articles?.data ?? null,

    getArticleRubrics: (state) => state.articleRubrics?.data ?? null,

    getArticlesPaging: (state) => state.articles?.meta ?? { page: {} },

    getArticle: (state) => (state.article?.data ? ({
      ...state.article.data,
      date: formatDate(state.article.data.date),
      $tags: rels(state.article.data, state.article, 'articleRubrics', 'article-rubrics'),
      $seo: rel(state.article.data, state.article, 'articleSeoTags', 'article-seo-tags'),
      $author: rel(state.article.data, state.article, 'articleAuthor', 'article-authors'),
    }) : null),
  },

  actions: {
    async setAuthRefresh() {
      if (process.env.CLIENT && getAccessToken()) {
        setInterval(async () => {
          const refreshResult = await api.post('/auth/refresh');
          if (refreshResult.status === 200) {
            setAccessToken(refreshResult.data.access_token, refreshResult.data.expires_in);
            return true;
          }
          setAccessToken(null);
          crossRedirect(api.hostnames.fullSecure);
          return false;
        }, 5 * 60 * 1000);
        return true;
      }
      return false;
    },

    async loadMe(ctx) {
      const jwt = getAccessToken(ctx);
      if (jwt) {
        this.isAuthorized = true;
        if (!this.me) {
          const r = await api.post('/auth/me');
          if (r?.data) {
            this.isAuthorized = true;
            this.me = { ...r.data };
          } else {
            this.isAuthorized = false;
            this.me = null;
            setAccessToken(null, null, ctx);
          }
        }
      }
      return true;
    },

    async login(email, password) {
      const result = await api.post('/auth/login', { email, password });
      if (result.status === 200) {
        setAccessToken(result.data.access_token, result.data.expires_in);
        crossRedirect(api.hostnames.fullVuz);
        return result;
      }
      notifyError('Ошибка авторизации', 'Проверьте правильность ввода Email и пароля');
      return null;
    },

    async tempLogin(role) {
      role = testUsers[role] ? role : 'default';
      const result = await this.login(testUsers[role].email, testUsers[role].password);
      return result;
    },

    async logout() {
      const r = await api.post('/auth/logout');
      setAccessToken(null);
      crossRedirect(api.hostnames.fullSecure);
      return r?.data ?? null;
    },

    async loadArticleRubrics(route) {
      this.articleRubrics = await getAll('/article/article-rubrics', {
        entity: 'article-rubrics',
        fields: { data: 'code,name,meta' },
        filter: { organization_type: api.hostnames.organization_type },
        page: {
          size: 100,
        },
      });
      const currentRubric = this.articleRubrics.data.find(
        (item) => item.code === route.query.rubric,
      );
      this.articleRubricsMeta = currentRubric ? currentRubric.meta : null;
    },

    async loadArticles(route) {
      const filter = {
        organization_type: api.hostnames.organization_type,
        published: true,
      };

      if (route.query.rubric) filter.articleRubricCodes = route.query.rubric;

      this.articles = await getAll('/article/articles', {
        entity: 'articles',
        include: 'articleRubrics',
        fields: {
          data: 'code,slug,name,preview_image,published_at',
          'article-rubrics': 'code,name',
        },
        filter,
        sort: '-published_at',
        page: {
          size: 10,
          number: route.query.page ? parseInt(route.query.page, 10) + 1 : 1,
        },
      });
    },

    async loadFavoriteSpecialties() {
      if (this.isAuthorized) {
        await forgetCache('organization/organization-specialties');
        const r = await getAll('/organization/organization-specialties', {
          entity: 'organization-specialties',
          include: 'specialty,organization,form,faculty',
          filter: { is_favorite: true },
          fields: {
            data: `is_first,is_second,base,budget_places,budget_score,
                    commercial_score,description,duration,calculation_data`,
            organizations: 'logo,code,calculation_data',
            specialties: 'code,name,level_code',
            forms: 'name',
            faculties: 'code',
          },
          calculation_data: {
            organizations: 'city_id, subject_id',
          },
          page: { size: 1000 },
          map: {
            specialty: 'specialties',
            organization: 'organizations',
            form: 'forms',
            faculty: 'faculties',
          },
        });
        this.favoriteSpecialties = r?.data ?? null;
      } else this.favoriteSpecialties = null;
      return true;
    },

    async loadArticle(route) {
      if (!route.params.artId) return;
      this.article = await getOne('/article/articles', {
        entity: 'articles',
        include: 'articleRubrics,articleAuthor',
        filter: {
          slug: route.params.artId,
          organization_type: api.hostnames.organization_type,
        },
        page: { size: 1 },
      });
    },

    async loadSubjectsWithCities() {
      const data = await getSubjectsWithCities();
      this.subjectsWithCities = data;
      return data;
    },

    async loadCitiesTop() {
      const data = await getCitiesTop();
      this.citiesTop = data;
      return data;
    },
  },
});

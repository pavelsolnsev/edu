import axios from 'axios';
import qs from 'qs';
import { boot } from 'quasar/wrappers';
// import { getAccessToken } from 'src/lib/api';
import {
  getAccessToken,
} from 'src/lib/api';
import {
  hostnames,
  notifyError,
} from 'src/lib/functions';

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
  baseURL: process.env.API,
  headers: {
    Accept: 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json',
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: '0',
  },
  paramsSerializer(params) {
    return qs.stringify(params, { arrayFormat: 'brackets' });
  },
  validateStatus: (status) => status < 500,
});

export default boot(({ app, ssrContext }) => {
  const ssr = process.env.SERVER ? ssrContext : null;
  api.hostnames = hostnames(ssr);
  api.interceptors.request.use((config) => {
    const jwt = getAccessToken({ ssrContext });
    if (jwt) config.headers.Authorization = `Bearer ${jwt}`;
    return config;
  });
  api.interceptors.response.use(
    (response) => {
      if (ssrContext && response.status > 400) {
        ssrContext.res.status(response.status);
      }
      return response;
    },
    (error) => {
      notifyError(
        'Сервер недоступен',
        'Пожалуйста, проверьте соединение с интернетом и обновите страницу',
      );
      return Promise.reject(error);
    },
  );
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
  app.config.globalProperties.$hostnames = api.hostnames;
});

export { api };

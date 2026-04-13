import { api } from 'src/boot/axios';

const routes = [
  {
    path: '/',
    component: () => import('layouts/default.vue'),
    children: [
      {
        path: '',
        component: () => (api.hostnames?.isSecure
          ? import('pages/signIn.vue')
          : import('pages/main.vue')),
      },
      // Вузы дистанционно
      {
        path: 'dist/:level(sec|mag|phd)?/',
        name: 'lsDistant',
        component: () => import('pages/listing/listing.vue'),
      },
      // Все города
      { path: 'cities', component: () => import('pages/cities.vue') },
      // Проверка Вуза
      { path: 'checkVuz', component: () => import('pages/checkVuz.vue') },
      // Правила публикации отзывов
      { path: 'publishing-rules', component: () => import('pages/publishingRules.vue') },
      // Контакты
      { path: 'contacts', component: () => import('pages/contacts.vue') },
      // Реклама
      { path: 'ads', component: () => import('pages/ads.vue') },
      // Информация для ВУЗов
      { path: 'info', component: () => import('pages/info.vue') },
      // О проекте
      { path: 'about', component: () => import('pages/about.vue') },
      // Справочник абитуриента
      {
        path: 'faq-:tabKey(f|s|m|p)/:topicId(\\d+)?/',
        name: 'faq',
        component: () => import('pages/handbook.vue'),
      },
      // Статейник
      {
        path: 'jour/:rfr(_rfr)?/',
        children: [
          { path: '', name: 'articles', component: () => import('pages/media/index.vue') },
          { path: ':artId(\\d+)/', name: 'article', component: () => import('pages/media/article.vue') },
        ],
      },
      // Правила участия в проекте для представителей вузов
      { path: 'regulations', component: () => import('pages/regulations.vue') },
      // Авторизация/Регистрация
      { path: 'sign-in', component: () => import('pages/signIn.vue') },
      // Авторизация/Регистрация
      { path: 'profile', component: () => import('pages/profile.vue') },
      // Спасибо
      { path: 'thanks', component: () => import('pages/thanks.vue') },
      // Специальность ОКСО
      { path: 'spec', component: () => import('pages/specAbout.vue') },
      // Специальность ОКСО общая
      { path: 'specs', component: () => import('pages/specsAll.vue') },
      // Мои специальности
      { path: 'favor', component: () => import('pages/favorites.vue') },
      // Вузы города
      {
        // Region ID / City ID
        path: ':rid(\\d+)/:cid(\\d+)?/:level(sec|mag|phd)?/',
        // component: { render: () => h(RouterView) },
        children: [
          // Листинг вузов
          { path: '', name: 'lsDefault', component: () => import('pages/listing/listing.vue') },
          // ВУЗы на карте
          { path: 'map', name: 'lsMap', component: () => import('pages/listing/map.vue') },
          // Дни открытых дверей
          { path: 'openDays', name: 'lsOpendays', component: () => import('pages/listing/opendays.vue') },
          // ВУЗы Москвы по ЕГЭ
          { path: 'ege/:rfr(_rfr)?/', name: 'lsEge', component: () => import('pages/listing/ege.vue') },
          // Профтест
          { path: 'prof', component: () => import('pages/prof.vue') },
          // ВУЗы по направлениям
          {
            path: 'd:did(\\d+)/',
            name: 'lsDirection',
            component: () => import('pages/listing/listing.vue'),
          },
          {
            path: ':u(c|v):vid(\\d+)/',
            children: [
              // Странциа Вуза
              { path: '', name: 'orgDefault', component: () => import('pages/org/index.vue') },
              // ВУЗ в цифрах
              { path: 'data', name: 'orgData', component: () => import('pages/org/data.vue') },
              {
                path: 'faculties',
                children: [
                  // Факультеты общая ВУЗа
                  { path: '', name: 'orgFaculties', component: () => import('pages/org/faculties.vue') },
                  // Факультет Вуза
                  { path: ':fid(\\d+)', name: 'orgFaculty', component: () => import('pages/org/faculty.vue') },
                ],
              },
              // Специальности общая ВУЗа
              { path: 'specs', name: 'orgSpecs', component: () => import('pages/org/specs.vue') },
              // Специальность Вуза
              { path: 'sv:fid(\\d+)/s:spec(\\d+)', name: 'orgSpec', component: () => import('pages/org/specialty.vue') },
              // Отзывы Вуза
              { path: 'opinions', name: 'orgReviews', component: () => import('pages/org/reviews.vue') },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/uikit/',
    component: () => import('layouts/default.vue'),
    children: [
      { path: '', component: () => import('src/pages/uikit/index.vue') },
      { path: 'buttons', component: () => import('src/pages/uikit/buttons.vue') },
      { path: 'inputs', component: () => import('src/pages/uikit/inputs.vue') },
    ],
  },

  // Страница не найдена
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/error404.vue'),
  },
];

export default routes;

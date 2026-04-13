import { date, Notify } from 'quasar';

import { smCityPopulation, tagRules } from './constants';

export function notifyError(message, caption) {
  Notify.create({
    icon: 'report_problem',
    iconColor: 'red',
    message,
    ...caption ? { caption } : {},
  });
}

export function notifySuccess(message, caption) {
  Notify.create({
    message,
    icon: 'done',
    iconColor: 'green',
    ...caption ? { caption } : {},
  });
}

export function notifyAuth(url) {
  Notify.create({
    message: 'Необходима авторизация',
    caption: 'Чтобы выполнить это действие, нужно авторизоваться или зарегистрироваться на портале',
    icon: 'account_circle',
    iconColor: 'stroke',
    timeout: 30000,
    actions: [
      {
        label: 'Авторизация',
        color: 'dark-bluer',
        noCaps: true,
        class: 'text-medium-l',
        handler: () => { document.location.href = url; },
      },
      {
        label: 'Закрыть',
        color: 'dark-bluer',
        noCaps: true,
        class: 'text-medium-l',
        handler: () => {},
      },
    ],
  });
}

export const isMajorCity = (subjectId) => ['77', '78', 77, 78].includes(subjectId);

export const makeCityUrl = (subjectId, cityId) => (isMajorCity(subjectId) || !cityId ? `/${subjectId}/` : `/${subjectId}/${cityId}/`);

export const makeOrgUrl = (subjectId, cityId, orgCode) => `${makeCityUrl(subjectId, cityId) + orgCode}/`;

export const makeOrgItemUrl = (item) => makeOrgUrl(
  item.calculation_data.subject_id,
  item.calculation_data.city_id,
  item.code,
);

export const capitalFirst = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export const compareCityPopulation = (a, b) => {
  const ar = smCityPopulation[a.ratio_population] ?? smCityPopulation.default;
  const br = smCityPopulation[b.ratio_population] ?? smCityPopulation.default;
  return ar - br;
};

export const sortCitiesByPopulation = (data) => data.map((city) => ({
  ...city,
  sort_population: smCityPopulation[city.ratio_population || 'default'],
})).sort((a, b) => a.sort_population - b.sort_population);

export const keysEn2Ru = (str) => {
  const ru = 'йцукенгшщзхъфывапролджэячсмитьбюЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ';
  const en = "qwertyuiop[]asdfghjkl;'zxcvbnm,.QWERTYUIOP{}ASDFGHJKL:\"ZXCVBNM<>";
  return str.split('').map((s) => (en.indexOf(s) === -1 ? s : ru[en.indexOf(s)])).join('');
};

export function plural(val, forms) {
  const cases = [2, 0, 1, 1, 1, 2];
  return forms[(val % 100 > 4 && val % 100 < 20) ? 2 : cases[(val % 10 < 5) ? val % 10 : 5]];
}

export const getTags = (item, directions) => tagRules.reduce((acc, tr) => {
  if (tr.rule(item)) acc.push(tr.tag);
  return acc;
}, [])
  .concat(
    directions
      .sort((a, b) => Number(a.code) - Number(b.code))
      .slice(0, 1)
      .map((el) => el.name),
  );

export const validateEmail = (email) => String(email)
  .toLowerCase()
  .match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );

export const validatePhone = (phone) => String(phone)
  .match(/\+7-\(\d{3}\)-\d{3}-\d{2}-\d{2}/);

export const parseAdmissionSchedule = (data) => {
  const weekDays = 'ПН,ВТ,СР,ЧТ,ПТ,СБ,ВС'.split(',');
  data = data.map(
    (el) => el.split('|').map((schedule) => {
      const days = [];
      schedule.slice(0, 7).replace(/1{1,7}/g, (a, b) => {
        days.push(a.length > 2
          ? `${weekDays[b]}-${weekDays[b + a.length - 1]}`
          : a.length === 2 ? `${weekDays[b]}, ${weekDays[b + 1]}` : `${weekDays[b]}`);
        return a;
      });
      const result = `${days.join(', ')} с ${schedule.slice(7, 9)}:${schedule.slice(9, 11)} до ${schedule.slice(11, 13)}:${schedule.slice(13, 15)} ${schedule.slice(15)}`;
      return result.trim();
    }).join('; '),
  ).join('; ');
  return data;
};

export const parseAdmissionPhones = (data) => {
  const phones = [];
  data.forEach((item) => {
    if (item.phone && item.phone.length === 14) {
      const p = item.phone;
      phones.push({
        phone: `${p.slice(0, 10)}-${p.slice(10, 12)}-${p.slice(12, 14)}`,
        suffix: item.extension ? `Доб.: ${item.extension.join(', ')}` : '',
      });
    } else if (item.length === 17 && item[0] === '8') {
      phones.push({
        phone: `+7${item.slice(1)}`.replace(/ /g, ''),
        suffix: '',
      });
    }
  });
  return phones;
};

// export const parseAdmissionPhones = (data) => {
//   const phones = [];
//   const [el, suffix] = data;
//   el.split('\n').forEach((item) => {
//     const suffixes = [];
//     const p = item.split('@');
//     p[1] = `${p[1].slice(0, 3)}-${p[1].slice(3, 5)}-${p[1].slice(5)}`;
//     if (p[2]) suffixes.push(!Number(p[2]) ? p[2] : `доб. ${p[2]}`);
//     if (suffix) suffixes.push(!Number(suffix) ? suffix : `доб. ${suffix}`);
//     phones.push({
//       phone: `+7 (${p[0]}) ${p[1]}`,
//       suffix: suffixes.join(', '),
//     });
//   });
//   return phones;
// };

export const stripHtml = (html) => html.replace(/(<([^>]+)>)/gi, '');

// export const formatDate = (d, pattern) => {
//   if (!d) return '';
//   pattern = pattern ?? 'D.M.Y';
//   const dateRegex = /(?<Y>\d{4})-(?<M>\d{2})-(?<D>\d{2})T(?<H>\d{2}):(?<I>\d{2}):(?<S>\d{2})/;
//   const matches = d.match(dateRegex);
//   if (!matches?.groups) return '';
//   return pattern.replace(/(?<letter>[DMYHIS]{1})/gm, (a) => matches.groups?.[a] ?? '');
// };

// export const formatTime = (d) => formatDate(d, 'H:I');

export const formatDate = (d, pattern) => {
  const timeStamp = Date.parse(d);
  pattern = pattern ?? 'DD.MM.YYYY';
  if (pattern === 'D.M.Y H:I') pattern = 'DD.MM.YYYY HH:mm';
  return date.formatDate(timeStamp, pattern);
};

export const formatTime = (d) => formatDate(d, 'HH:mm');

export const formatDateTime = (d) => formatDate(d, 'DD.MM.YYYY HH:mm');

export const formatTxtDate = (d) => {
  if (!d) return '';
  const monthNames = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
  ];
  const dateObj = new Date(d);
  const day = dateObj.getDate();
  const month = monthNames[dateObj.getMonth()];
  const year = dateObj.getFullYear();
  return `${day} ${month} ${year} года`;
};

export const formatVuzAbout = (about) => about
  .replace(/<h([3-5])>/gm, (a, h) => `<h${Number(h) + 1}>`)
  .replace(/<\/h([3-5])>/gm, (a, h) => `</h${Number(h) + 1}>`)
  .replace(/<p><b>(.+)<\/b><\/p>/gm, (a, b) => `<h4>${b}</h4>`)
  .replace(/<p><strong>(.+)<\/strong><\/p>/gm, (a, b) => `<h4>${b}</h4>`);

export const formatArticleText = (s) => s
  .replace(/<h2>(.+)<\/h2>/gm, (a, b) => `<p class="text-semibold-xl">${b}</p>`)
  .replace(/<h3>(.+)<\/h3>/gm, (a, b) => `<p class="text-semibold-l">${b}</p>`)
  .replace(/style="[^"]*"/gm, '')
  .replace(/<table[^>]*>/gm, '<table>')
  .replace(/<table[^>]*>([\s\S]+?)<\/table>/gm, (a) => `<div class="s-article-main__table">${a}</div>`)
  .replace(/<p><strong>(.+)<\/strong><\/p>/gm, (a, b) => `<h3>${b}</h3>`)
  .replace(/href="#topic(\d+)/gm, (a, b) => `href="javascript:void(0);" onclick="document.getElementById('topic${b}').scrollIntoView();"`);

export const formatPrice = (price) => String(price).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');

export const formatDuration = (duration) => {
  const monthes = duration % 12;
  const years = (duration - monthes) / 12;
  const txt = [];
  if (years) txt.push(`${years} ${years % 10 === 1 ? 'год' : years % 10 > 1 && years % 10 < 5 ? 'года' : 'лет'}`);
  if (monthes) txt.push(`${monthes} ${plural(monthes, ['месяц', 'месяца', 'месяцев'])}`);
  return txt.join(' ');
};

export function replacePage(route, page) {
  const query = { ...route.query };
  if (page === 1) {
    delete query.page;
  } else {
    query.page = page - 1;
  }
  return {
    name: route.name,
    params: { ...route.params },
    query,
  };
}

export const toPrepositional = (s) => (s.charAt(s.length - 1) === 'т'
  ? `${s}е` : s.charAt(s.length - 1) === 'а'
    ? `${s.slice(0, s.length - 1)}е` : s);

export const hostnames = (ssr) => {
  const protocol = (ssr ? ssr.req.protocol : document.location.protocol).replace(':', '');
  const current = ssr ? `${ssr.req.headers.host}` : document.location.host;
  const hostOnly = current.split(':')[0];
  const sd = ['vuz', 'college', 'secure'];
  const isLocalhost = /^(localhost|127\.0\.0\.1)$/i.test(hostOnly);
  const dev = isLocalhost || hostOnly.endsWith('.local');
  const partsRegex = /(?<subdomain>secure|vuz|college)?(?<delim>\.|-)?(?<root>.+)/;
  const parts = current.match(partsRegex).groups;
  return {
    dev,
    isLocalhost,
    accessTokenName: dev ? 'demoAccessToken' : 'accessToken',
    userDataVar: dev ? 'demoUserData' : 'userData',
    cookieDomain: isLocalhost ? hostOnly : parts.root.replace(/([\w.-]+)(:\d+)?/, '$1'),
    current,
    root: parts.root,
    isRoot: current === parts.root,
    ...sd.reduce((acc, el) => {
      acc[el] = `${el}${dev ? '-' : '.'}${parts.root}`;
      acc[`full${capitalFirst(el)}`] = `${protocol}://${acc[el]}`;
      acc[`is${capitalFirst(el)}`] = current === acc[el];
      acc.organization_type = acc.isCollege ? 'Колледж' : 'ВУЗ';
      return acc;
    }, {}),
  };
};

export function formValidateAll(form) {
  form.getValidationComponents().forEach((el) => {
    el.validate();
  });
}

export function crossRedirect(url, ctx) {
  if (process.env.CLIENT) {
    document.location.href = url;
  } else if (process.env.SERVER && ctx?.redirect) {
    ctx.redirect(url);
  }
}

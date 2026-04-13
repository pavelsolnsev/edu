// import { api } from 'src/boot/axios';
import { getAll, getOne, rel } from 'src/lib/api';
import {
  compareCityPopulation,
  isMajorCity,
  makeCityUrl,
} from 'src/lib/functions';

export const getCitiesTop = async () => [
  { url: '/77/', name: 'Москва' },
  { url: '/78/', name: 'Санкт-Петербург' },
  { url: '/54/32/', name: 'Новосибирск' },
  { url: '/66/11/', name: 'Екатеринбург' },
  { url: '/52/30/', name: 'Нижний Новгород' },
  { url: '/16/14/', name: 'Казань' },
  { url: '/74/58/', name: 'Челябинск' },
  { url: '/55/33/', name: 'Омск' },
  { url: '/63/43/', name: 'Самара' },
  { url: '/61/40/', name: 'Ростов-на-Дону' },
  { url: '/2/54/', name: 'Уфа' },
  { url: '/24/21/', name: 'Красноярск' },
  { url: '/59/37/', name: 'Пермь' },
  { url: '/36/10/', name: 'Воронеж' },
  { url: '/34/8/', name: 'Волгоград' },
  { url: '/23/20/', name: 'Краснодар' },
  { url: '/64/45/', name: 'Саратов' },
  { url: '/72/52/', name: 'Тюмень' },
];

export async function getSubjectByCode(code) {
  const params = {
    entity: 'subjects',
    fields: {
      data: 'code,name,name_rp',
      cities: 'name,name_rp,calculation_data,ratio_population',
    },
    filter: { code },
  };
  if (isMajorCity(code)) params.include = 'city';
  const r = await getOne('/address/subjects', params);
  return r;
}

export async function getSubjectName(code) {
  const params = {
    entity: 'subjects',
    include: 'city',
    fields: {
      data: 'name_rp',
      cities: 'name_rp',
    },
    filter: { code },
  };
  const r = await getOne('/address/subjects', params);
  return r;
}

export const getCityByCode = (code) => getOne('/address/cities', {
  entity: 'cities',
  include: 'subject',
  fields: {
    data: 'name,name_rp,calculation_data,ratio_population',
    subjects: 'code,name,name_rp',
  },
  filter: { id: code },
});

export async function getSubjectsWithCities() {
  const response = await getAll('/address/cities/', {
    entity: 'cities',
    include: 'subject',
    fields: {
      data: 'name,ratio_population',
      subjects: 'code,name',
    },
    filter: { is_has_vuz: true },
    page: { size: 2000 },
  });
  if (!response?.data && !response?.rel?.subjects) return [];
  response.data
    .sort(compareCityPopulation)
    .forEach((city) => {
      const subject = rel(city, response, 'subject', 'subjects');
      if (!subject.cities) subject.cities = [];
      subject.cities.push({
        name: city.name,
        id: city.id,
        url: makeCityUrl(subject.code, city.id),
      });
    });
  return Object.values(response.rel.subjects)
    .sort((a, b) => ((a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0));
}

export async function getCitiesFiltered(search) {
  if (!search) return [];
  const response = await getAll('/address/cities', {
    entity: 'cities',
    include: 'subject',
    fields: {
      data: 'name,name_rp,ratio_population',
      subjects: 'code',
    },
    filter: { name: search },
    page: { size: 24 },
  });
  return response.data ? response.data
    .sort(compareCityPopulation)
    .map((city) => ({
      ...city,
      url: makeCityUrl(rel(city, response, 'subject', 'subjects')?.code, city.id),
    })) : [];
}

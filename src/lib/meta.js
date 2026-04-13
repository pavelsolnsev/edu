import { api } from 'src/boot/axios';

import { capitalFirst } from './functions';

export const metaStrategy = {

  article: (s) => (s.getArticle ? {
    title: s.getArticle.h1,
    metaDescription: s.getArticle.h1,
    metaKeywords: '',
  } : {}),

  orgDefault: (s) => ({
    title: `${s.txtShortName}. ${s.txtName}`,
    h1: s.txtName,
    metaDescription: `${s.txtName} (${s.txtShortName}). Адрес, официальный сайт, приемная комиссия, дни открытых дверей, лицензия, аккредитация, фото`,
    metaKeywords: `${s.txtShortName}, ${s.txtName}, общая информация, приемная комиссия, филиалы,${api.hostnames.isVuz ? 'колледжи при вузе,' : ''} фотографии ${api.hostnames.isVuz ? 'вуза' : 'колледжа'}`,
  }),

  orgData: (s) => ({
    title: `Демо: статистика ${s.txtShortName}`,
    h1: s.txtName,
    metaDescription: `Демо (портфолио): сводные показатели ${s.txtShortName} на одной странице.`,
    metaKeywords: '',
  }),

  orgFaculties: (s) => ({
    title: `Факультеты ${s.txtShortName} ${s.txtCurrentYear}`,
    h1: `${s.txtName}`,
    metaDescription: `Факультеты ${s.txtName} (${s.txtShortName}): бюджетные и коммерческие места, проходной балл ЕГЭ, стоимость обучения. Информация о поступлении на факультеты ${s.txtShortName}`,
    metaKeywords: `${s.txtName} ${s.txtShortName} специальности бакалавриат проходной балл ЕГЭ стоимость обучения`,
  }),

  orgFaculty: (s) => ({
    title: `${s.txtFacultyName} в ${s.txtShortName} ${s.txtCurrentYear}`,
    h1: `${s.txtFacultyName} в ${s.txtShortName}`,
    h2Faculty: `О факультете ${s.txtShortName}`,
    metaDescription: `${s.txtFacultyName} в ${s.txtName} (${s.txtShortName}): бюджетные и платные места, проходной балл ЕГЭ, стоимость обучения, список программ обучения. Информация о поступлении на факультет ${s.txtFacultyName} в ${s.txtCurrentYear}.`,
    metaKeywords: `${s.txtName} ${s.txtShortName} специальности бакалавриат проходной балл ЕГЭ стоимость обучения`,
  }),

  orgSpecs: (s) => (api.hostnames.isVuz ? {
    title: `Специальности ${s.txtShortName} ${s.txtCurrentYear}: бюджетные места, стоимость обучения, проходные баллы, экзамены`,
    h1: `Специальности в ${s.txtShortName}`,
    metaDescription: `Специальности в ${s.txtName} (${s.txtShortName}): бюджетные и коммерческие места, проходной балл ЕГЭ, стоимость обучения. Информация о поступлении на первое, второе высшее и в магистратуру.`,
    metaKeywords: `${s.txtName}  ${s.txtShortName} специальности бакалавриат проходной балл ЕГЭ стоимость обучения`,
  } : {
    title: `${s.txtShortName}. Специальности на базе 9 и 11 классов`,
    h1: `${s.txtName}`,
    metaDescription: `${s.txtName} (${s.txtShortName}). Специальности после 9 и 11 классов, количество мест, формы обучения`,
    metaKeywords: `${s.txtShortName}, ${s.txtName} , специальности, специальности после 9 и 11 класса, экзамены, бюджетные места`,
  }),

  orgSpec: (s) => ({
    title: `Специальность ${s.txtSpecName} ${s.txtSpecOkso} в ${s.txtSpecLevelPp} в ${s.txtShortName} - ${s.txtFacultyName} ${s.txtCurrentYear}`,
    h1: `Специальность ${s.txtSpecName} ${s.txtSpecOkso} в ${s.txtSpecLevelPp} - ${s.txtFacultyName}`,
    metaDescription: `${s.txtSpecName} в ${s.txtName} ${s.txtShortName} ${s.txtFacultyName}: бюджетные и платные места, проходной балл ЕГЭ, стоимость обучения в ${s.txtCurrentYear}`,
    metaKeywords: `${s.txtName} ${s.txtShortName} специальности бакалавриат проходной балл ЕГЭ стоимость обучения`,
  }),

  orgReviews: (s) => ({
    title: `Отзывы о ${s.txtShortName}. ${s.txtName}`,
    h1: `${s.txtName}`,
    metaDescription: `${s.txtName} (${s.txtShortName}). Отзывы абитуриентов, студентов, сотрудников ${api.hostnames.isVuz ? 'вуза' : 'колледжа'}`,
    metaKeywords: `${s.txtShortName}, ${s.txtName}, отзывы, оставить отзыв`,
  }),

  lsMap: (s) => ({
    title: `${s.txtOrgType} ${s.txtGeoNameRp} на карте`,
    h1: `${s.txtOrgType} ${s.txtGeoNameRp} на карте`,
    metaDescription: `Карта, на которой отмечены все ${s.txtOrgType} ${s.txtGeoNameRp}`,
    metaKeywords: `${s.txtOrgType}, ${s.txtGeoNameRp}, на карте, города`,
  }),

  lsDefault: (s) => ({
    title: capitalFirst(`${s.txtState}вузы ${s.txtGeoNameRp} (университеты и институты)${s.txtForm}${s.txtSuffixes} – список ${s.txtCurrentYear}`.trim()),
    h1: capitalFirst(`${s.txtState}вузы ${s.txtGeoNameRp}${s.txtForm}${s.txtSuffixes}`.trim()),
    h2Charts: `Статистика университетов ${s.txtGeoNameRp} – бюджетные места, направления и формы обучения`,
    h2Description: `Высшее образование в${s.txtStateRp.trimRight()} вузах ${s.txtGeoNameRp}`,
    description: [
      `Специальности, профили обучения, конкурс и проходные баллы в${s.txtState.trimRight()} вузы ${s.txtGeoNameRp} (университеты и институты)${s.txtSuffixes},
    которые представлены ${s.txtCount} вузами, имеющими действующую лицензию
    на образовательную деятельность в ${s.txtCurrentYear} году`,

      'Демо: фильтры по лицензии, аккредитации и условному индексу (ESI) — только для иллюстрации UI.',

      'Демо: блоки с контактами и специальностями заполняются из API при его наличии.',

      'Демо-портфолио: нейтральный текст без привязки к конкретному продукту в продакшене.',
    ],
    metaDescription: `Специальности, конкурс, стоимость обучения и проходные баллы в${s.txtState.trimRight()} вузы ${s.txtGeoNameRp} (университеты и институты) ${s.txtCurrentYear}${s.txtForm}${s.txtSuffixes}`,
    metaKeywords: `Специальность конкурс стоимость обучение проходной балл${s.txtState.trimRight()} вуз университет институт ${s.txtGeoNameRp}${s.txtForm}${s.txtSuffixes}`,
  }),

  lsEducationLevel: (s) => ({
    title: capitalFirst(`${s.txtLevel}${s.txtSpecQuot} –${s.txtState.trimRight()} вузы ${s.txtGeoNameRp}${s.txtSuffixes}`.trim()),
    h1: capitalFirst(`${s.txtLevel}${s.txtSpecQuot} в${s.txtStateRp.trimRight()} вузах ${s.txtGeoNameRp}${s.txtForm}${s.txtSuffixes}`.trim()),
    h2Charts: `Статистика университетов ${s.txtGeoNameRp} – бюджетные места, направления и формы обучения`,
    specName: s.specialty ? s.txtSpec : null,
    specUrl: s.specialty ? `/specs/${s.specialty.code}/` : null,
    metaDescription: s.specialty
      ? `${s.txtLevel}${s.txtSpecPoOkso} в${s.txtStateRp.trimRight()} вузах ${s.txtGeoNameRp}${s.txtForm}${s.txtSuffixes}`
      : `${s.txtLevel} – специальности, конкурс, стоимость обучения и проходные баллы в${s.txtState.trimRight()} вузы ${s.txtGeoNameRp} (университеты и институты) ${s.txtCurrentYear}${s.txtForm}${s.txtSuffixes}`,
    metaKeywords: s.specialty
      ? `${s.txtSpec} ${s.txtLevel.toLowerCase()}${s.txtState.trimRight()} вузы ${s.txtGeoNameRp} университеты институты${s.txtSuffixes}`
      : `${s.txtLevel} специальность конкурс стоимость обучение проходной балл${s.txtState.trimRight()} вуз университет институт ${s.txtGeoNameRp}${s.txtForm}${s.txtSuffixes}`,
  }),

  lsSpecialty: (s) => ({
    title: `Специальность «${s.txtSpec}»${s.txtForm} –${s.txtState.trimRight()} вузы ${s.txtGeoNameRp}${s.txtSuffixes}`,
    h1: capitalFirst(`${s.txtState}вузы ${s.txtGeoNameRp}${s.txtSuffixes} со специальностью «${s.txtSpec}»${s.txtForm}`.trim()),
    specName: s.txtSpec,
    specUrl: `/specs/${s.specialty.code}/`,
    h2Charts: '',
    metaDescription: `Все${s.txtState.trimRight()} вузы ${s.txtGeoNameRp} со специальностью ${s.txtSpec} (${s.txtOkso})${s.txtSuffixes}${s.txtForm}`,
    metaKeywords: `${s.txtSpec} ${s.txtOkso}${s.txtState.trimRight()} вузы ${s.txtGeoNameRp} университеты институты${s.txtSuffixes}`,
  }),

  lsDirection: (s) => ({
    title: capitalFirst(`${s.txtDirectionName} ${s.txtGeoNameRp} – список ${s.txtCurrentYear}`),
    h1: capitalFirst(`${s.txtDirectionName} ${s.txtGeoNameRp}`),
    h2Specialties: `Все вузы ${s.txtGeoNameRp} по ${s.txtDirectionSynonym} специальностям`,
    h2Charts: `Статистика университетов ${s.txtGeoNameRp} – бюджетные места, направления и формы обучения`,
    description: [`Список содержит все вузы ${s.txtGeoNameRp} (университеты и институты), в которых можно получить высшее образование соответствующего профиля подготовки. Если Вам необходимо узнать количество бюджетных мест в ${s.txtCurrentYear}  году, проходных баллах ЕГЭ в ${s.txtDirectionName} ${s.txtGeoNameRp} , необходимо выбрать одно из направлений подготовки выше.`],
    metaDescription: `Все ${s.txtDirectionName} ${s.txtGeoNameRp} (университеты и институты), поиск государственных вузов с бюджетными местами ${s.txtCurrentYear} и проходному баллу ${s.txtLastYear}`,
    metaKeywords: capitalFirst(`${s.txtDirectionName} университеты институты ${s.txtGeoNameRp} факультеты специальности проходной балл бюджетные места стоимость обучения`),
  }),

  lsEge: (s) => {
    const routeExams = s.route.query?.['exam[]'] ?? null;
    const examIds = routeExams ? Array.isArray(routeExams) ? routeExams : [routeExams] : null;
    const examsString = examIds && s.exams?.data
      ? s.exams.data.filter((e) => examIds.includes(e.id)).map((e) => e.name).join(', ')
      : '';
    const e1 = examIds ? `: ${examsString}` : '';
    const e2 = examIds ? ` (${examsString})` : '';
    const e3 = examIds ? ` ${examsString}` : '';
    return {
      title: `Вузы ${s.txtGeoNameRp} по предметам ЕГЭ (демо)${e1}`,
      h1: `Вузы ${s.txtGeoNameRp} по ЕГЭ${e2}`,
      metaDescription: `Демо: подбор по ЕГЭ для ${s.txtGeoNameRp}${e2}`,
      metaKeywords: `вузы университеты институты ${s.txtGeoNameRp} поиск предмет ЕГЭ${e3}`,
    };
  },

  openDays: (s) => ({
    title: `Дни открытых дверей в ${s.txtOrgTypeRp} ${s.txtGeoNameRp} (${s.txtCurrentYear}, демо)`,
    metaDescription: api.hostnames.isVuz
      ? `Демо: календарь дней открытых дверей для ВУЗов ${s.txtGeoNameRp} (${s.txtCurrentYear}).`
      : `Демо: календарь дней открытых дверей для колледжей ${s.txtGeoNameRp} (${s.txtCurrentYear}).`,
    metaKeywords: `дни открытых дверей ${s.txtOrgType} ${s.txtGeoNameRp} ${api.hostnames.isVuz ? 'календарь университеты институты' : 'техникумы'} ${s.txtCurrentYear}`,
  }),
};

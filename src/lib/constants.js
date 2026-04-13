export const monLabelsVuz = {
  eff: 'ESI / Показатель эффективности (до 2020 года)',
  ege: 'Средний балл ЕГЭ по всем специальностям и формам обучения',
  free: 'Средний балл ЕГЭ зачисленных на бюджет',
  pay: 'Средний балл ЕГЭ зачисленных на коммерческой основе',
  min: 'Средний по всем специальностям минимальный балл ЕГЭ зачисленных на очное отделение',
  o: 'Очное отделение',
  oz: 'Очно-заочное отделение',
  z: 'Заочное отделение',
};

export const monLabelsCollege = {
  peop: 'Количество студентов',
  att: 'Средний балл аттестата, принятых по очной форме обучения',
  attF: 'Средний балл аттестата, принятых по очной форме обучения на бюджет',
  attP: 'Средний балл аттестата, принятых по очной форме обучения на коммерческой основе',
  att4: 'Доля студентов по очной форме обучения, имеющих средний балл аттестата не менее 4-х баллов',
  gos4: 'Доля выпускников, получивших оценки «хорошо» и «отлично» по результатам государственной итоговой аттестации',
  o: 'Доля студентов очного обучения',
  free: 'Доля студентов обучающихся на бюджете',
};

export const lfEducationLevel = {
  default: { filter: 'бакалавриат,специалитет', page: { text_level: 'Высшее образование', text_po: 'по специальности', text_level_in: 'Высшее образование в ' } },
  sec: { filter: 'бакалавриат,специалитет', page: { text_level: 'Второе высшее образование', text_po: 'по специальности', text_level_in: 'Второе высшее в ' } },
  mag: { filter: 'магистратура', page: { text_level: 'Магистратура', text_po: 'по направлению (программа)', text_level_in: 'Магистратура в ' } },
  phd: { filter: 'аспирантура,адъюнтура,ординатура,ассистентура', page: { text_level: 'Аспирантура', text_po: 'по направлению (программа)', text_level_in: 'Аспирантура в ' } },
};

export const lfEducationForm = {
  1: 'очно',
  2: 'очно-заочно',
  3: 'заочно',
  4: 'дистанционно',
};

// cities sort model by population
export const smCityPopulation = {
  'Средние города': 5,
  'Большие города': 4,
  'Крупные города': 3,
  'Города-миллионеры': 1,
  'Крупнейшие города': 2,
  default: 1000,
};

export const tagRules = [
  { tag: 'Государственный ВУЗ', rule: (item) => item.is_state },
  { tag: 'Негосударственный ВУЗ', rule: (item) => item.is_state !== undefined && !item.is_state },
  { tag: 'Ведомственный', rule: (item) => item.is_departmental },
  { tag: 'С военной кафедрой', rule: (item) => item.is_military },
  { tag: 'С общежитием', rule: (item) => item.is_hostel },
  { tag: 'Есть бюджетные места', rule: (item) => item.calculation_data.budget_places > 0 },
];

export const smDirectionsTopCodes = [1, 2, 3, 4, 5, 8, 9, 12, 15, 39];

export const mapDirections = [
  {
    name: 'Технические ВУЗы',
    image: '/img/map/vuz-directions/vuz-directions-tech.png',
  },
  {
    name: 'Военные ВУЗы',
    image: '/img/map/vuz-directions/vuz-directions-military.png',
  },
  {
    name: 'Гуманитарные ВУЗы',
    image: '/img/map/vuz-directions/vuz-directions-humanitarian.png',
  },
  {
    name: 'Юридические ВУЗы',
    image: '/img/map/vuz-directions/vuz-directions-law.png',
  },
  {
    name: 'Лингвистические вузы',
    image: '/img/map/vuz-directions/vuz-directions-lang.png',
  },
  {
    name: 'Педагогические ВУЗы',
    image: '/img/map/vuz-directions/vuz-directions-teach.png',
  },
  {
    name: 'Медицинские ВУЗы',
    image: '/img/map/vuz-directions/vuz-directions-med.png',
  },
  {
    name: 'Театральные ВУЗы',
    image: '/img/map/vuz-directions/vuz-directions-theater.png',
  },
  {
    name: 'Экономические ВУЗы',
    image: '/img/map/vuz-directions/vuz-directions-economics.png',
  },
  {
    name: 'Строительные ВУЗы',
    image: '/img/map/vuz-directions/vuz-directions-build.png',
  },
  {
    name: 'Художественные ВУЗы',
    image: '/img/map/vuz-directions/vuz-directions-art.png',
  },
  {
    name: 'Архитектурные ВУЗы',
    image: '/img/map/vuz-directions/vuz-directions-architecture.png',
  },
  {
    name: 'Музыкальные ВУЗы',
    image: '/img/map/vuz-directions/vuz-directions-music.png',
  },
  {
    name: 'Химические ВУЗы',
    image: '/img/map/vuz-directions/vuz-directions-chemistry.png',
  },
  {
    name: 'Инженерные ВУЗы',
    image: '/img/map/vuz-directions/vuz-directions-engineering.png',
  },
  {
    name: 'Психологические ВУЗы',
    image: '/img/map/vuz-directions/vuz-directions-psychology.png',
  },
  {
    name: 'Информационные ВУЗы',
    url: '/',
    image: '/img/map/vuz-directions/vuz-directions-info.png',
    count: 123,
  },
  {
    name: 'Финансовые ВУЗы',
    image: '/img/map/vuz-directions/vuz-directions-finance.png',
  },
  {
    name: 'Биологические ВУЗы',
    image: '/img/map/vuz-directions/vuz-directions-biology.png',
  },
  {
    name: 'Авиационные ВУЗы',
    image: '/img/map/vuz-directions/vuz-directions-avia.png',
  },
  {
    name: 'Технологические ВУЗы',
    image: '/img/map/vuz-directions/vuz-directions-technological.png',
  },
  {
    name: 'Физические ВУЗы',
    image: '/img/map/vuz-directions/vuz-directions-physics.png',
  },
  {
    name: 'МВД ВУЗы',
    image: '/img/map/vuz-directions/vuz-directions-mvd.png',
  },
  {
    name: 'Транспортные ВУЗы',
    image: '/img/map/vuz-directions/vuz-directions-transport.png',
  },
  {
    name: 'Аграрные вузы',
    image: '/img/map/vuz-directions/vuz-directions-agrarian.png',
  },
  {
    name: 'Пищевые ВУЗы',
    image: '/img/map/vuz-directions/vuz-directions-food.png',
  },
  {
    name: 'Нефтяные ВУЗы',
    image: '/img/map/vuz-directions/vuz-directions-oil.png',
  },
  {
    name: 'МЧС ВУЗы',
    image: '/img/map/vuz-directions/vuz-directions-mchs.png',
  },
  {
    name: 'Международные ВУЗы',
    image: '/img/map/vuz-directions/vuz-directions-international.png',
  },
  {
    name: 'Железнодорожные вузы',
    image: '/img/map/vuz-directions/vuz-directions-zhd.png',
  },
];

export const testUsers = {
  admin: { email: 'admin@university.example', password: 'demo-only-password' },
  'senior-content-manager': { email: 'senior-content-manager@university.example', password: 'demo-only-password' },
  'junior-content-manager': { email: 'junior-content-manager@university.example', password: 'demo-only-password' },
  seo: { email: 'seo@university.example', password: 'demo-only-password' },
  agent: { email: 'agent@university.example', password: 'demo-only-password' },
  user: { email: 'user@university.example', password: 'demo-only-password' },
  'advertising-manager': { email: 'advertising-manager@university.example', password: 'demo-only-password' },
  default: { email: 'user@university.example', password: 'demo-only-password' },
};

import { getAll, getOne } from 'src/lib/api';

export const getFacultyByCode = (code) => getOne('/organization/faculties', {
  entity: 'faculties',
  // fields: {
  //   data: 'code,name,address',
  // },
  filter: {
    code,
  },
  page: { size: 1 },
});

export const getFacultiesByOrgId = (id) => getAll('/organization/faculties', {
  entity: 'faculties',
  fields: {
    data: 'code,name,address',
  },
  filter: {
    organization_id: id,
  },
});

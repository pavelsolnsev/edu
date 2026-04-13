import { getAll, getOne } from 'src/lib/api';
import { lfEducationLevel } from 'src/lib/constants';

const orgSpecialtiesCollegeFields = {
  data: `base,budget_places,commercial_places,cost,is_accreditation,calculation_data,
          description,duration,profile,updated_at`,
  faculties: 'code,name,address',
  specialties: 'code,code_okso,name,qualification',
};

export const getOrganizationSpecialtiesByOrgId = (id, college) => getAll('/organization/organization-specialties', {
  entity: 'organization-specialties',
  include: 'faculty,specialty,form',
  fields: college ? orgSpecialtiesCollegeFields : {
    data: `budget_places,budget_score,commercial_places,commercial_score,cost,
          cost_second_education,is_accreditation,calculation_data,
          description,duration,is_first,is_second,profile,updated_at`,
    faculties: 'code,name',
    specialties: 'code,code_okso,description_work,level_code,name',
  },
  filter: {
    published: true,
    organization_id: id,
  },
  page: { size: 1000 },
  sort: 'faculty_code',
});

export const getOrganizationSpecialtiesByFaculty = (code) => getAll('/organization/organization-specialties', {
  entity: 'organization-specialties',
  include: 'faculty,specialty,form,exams',
  fields: {
    data: `budget_places,budget_score,commercial_places,commercial_score,cost,calculation_data,
          cost_second_education,is_accreditation,
          description,duration,is_first,is_second,profile,updated_at`,
    faculties: 'code,name',
    specialties: 'code,code_okso,description_work,level_code,name',
  },
  filter: {
    published: true,
    faculty_code: code,
  },
  page: { size: 1000 },
  sort: 'faculty_code',
});

export async function getSpecialtiesByName(name, eduType) {
  const response = await getAll('/education/specialties', {
    entity: 'specialties',
    fields: { data: 'code,name,code_okso' },
    filter: {
      name,
      level_code: lfEducationLevel[eduType]
        ? lfEducationLevel[eduType].filter : lfEducationLevel.default.filter,
    },
    page: { size: 10 },
  });
  return response;
}

export async function getSpecialtiesByDirection(directionId, levels, rid, cid) {
  const r = await getAll('/education/specialties', {
    entity: 'specialties',
    fields: {
      data: 'code,name',
    },
    filter: {
      directions: directionId,
      level_code: levels,
    },
    page: { size: 100 },
  });
  return r.data.map((item) => ({
    ...item,
    url: {
      name: 'lsDefault',
      params: {
        rid,
        cid,
      },
      query: {
        spec: item.code,
      },
    },
  }));
}

export const getSpecialtyByCode = (code, levels) => getOne('/education/specialties', {
  entity: 'specialties',
  fields: {
    data: 'code,name,code_okso',
  },
  filter: {
    code,
    level_code: levels,
  },
  page: { size: 1 },
});

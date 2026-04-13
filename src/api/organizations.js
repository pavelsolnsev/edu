import { api } from 'src/boot/axios';
import { getAll, getOne, rel } from 'src/lib/api';

export const getOrganizationById = (id) => getOne('/organization/organizations', {
  entity: 'organizations',
  include: 'city,parentOrganization',
  // fields: {
  //   data: 'code,name',
  // },
  page: {
    size: 5,
  },
  filter: {
    id,
    organization_type: api.hostnames.organization_type,
    published: true,
  },
});

export const getOrganizationsByName = (search) => getAll('/organization/organizations', {
  entity: 'organizations',
  include: 'parentOrganization',
  fields: {
    data: 'code,name,short_name',
  },
  page: {
    size: 5,
  },
  filter: {
    all_names: search,
    organization_type: api.hostnames.organization_type,
    published: true,
  },
});

export async function getOrganizationsListing(params) {
  params = {
    ...params,
    entity: 'organizations',
    include: 'metro,directions,contacts',
    fields: {
      data: `code,logo,name,short_name,short_seo,esi,calculation_data,
          is_state,is_military,is_departmental,is_hostel,is_confirmed,
          longitude_latitude`,
      metros: 'name',
      directions: 'code,name',
      contacts: 'address',
    },
    sort: '-sort',
  };
  const response = await getAll('/organization/organizations', params);
  return response;
}

export async function getOrganizationByCode(code, customParams) {
  const params = {
    entity: 'organizations',
    include: `directions,metro,admissionOffices,specialties,notImplementSpecialties,galleries,contacts,affiliations,parentOrganization,
              parentOrganizationForCollege,colleges,monitorings,charts`,
    fields: {
      data: `name,short_name,code,logo,esi,full_name,accreditation_date,accreditation_number,old_names,
            about, licence_date,licence_num,is_state,is_military,is_departmental,is_hostel,calculation_data`,
      metros: 'name',
      directions: 'code,name',
      'admission-offices': 'address,email,start_date,end_date,phones,schedule,site',
      // specialties: 'name,code_okso,level_code',
      galleries: 'image_url, title',
      contacts: 'address, phones, site, email',
      monitorings: 'year,label,value',
    },
    filter: { code },
    ...customParams ?? {},
  };
  const response = await getOne('/organization/organizations', params);
  return response;
}

export async function getOrganizationBriefByCode(code, customParams) {
  const params = {
    entity: 'organizations',
    include: 'directions,metro,charts',
    fields: {
      data: `name,short_name,code,logo,esi,full_name,
            is_state,is_military,is_hostel,calculation_data`,
      metros: 'name',
      directions: 'code,name',
    },
    filter: { code },
    ...customParams ?? {},
  };
  const response = await getOne('/organization/organizations', params);
  return response;
}

export async function getOrganizationByCodeBrief(code) {
  const params = {
    entity: 'organizations',
    include: 'directions,metro',
    fields: {
      data: 'name,short_name,code,logo,esi,full_name,is_state,is_military,is_departmental,is_hostel,calculation_data',
      metros: 'name',
      directions: 'code,name',
    },
    filter: { code },
  };
  const response = await getOne('/organization/organizations', params);
  return response;
}

export async function getOrganizationEsiRating(id) {
  const response = await getOne('/organization/organizations', {
    entity: 'organizations',
    include: 'esiRatings',
    filter: { id },
    fields: {
      data: `name,full_name,esi,esi_marks,calculation_data,licence_num,licence_date,
      accreditation_number,accreditation_date,is_departmental,is_state,is_hostel,is_military`,
    },
  });
  return response?.data?.id ? {
    ...response.data,
    $rating: rel(response.data, response, 'esiRatings', 'esi-ratings'),
  } : null;
}

export const getOrganizationEvents = (id) => getAll(`/organization/organizations/${id}/events`, {
  entity: 'organizations',
  include: 'faculty',
  filter: {
    published: true,
    start_date: new Date().toISOString(),
  },
});

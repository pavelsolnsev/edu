import { api } from 'src/boot/axios';
import { getAll } from 'src/lib/api';

export const getEvents = (route, pageSize) => getAll('/organization/events', {
  entity: 'events',
  include: 'organization,faculty',
  fields: {
    organizations: 'name,code,logo',
    faculties: 'name',
  },
  page: {
    size: pageSize ?? 30,
    number: route.query.page ? parseInt(route.query.page, 10) + 1 : 1,
  },
  filter: {
    start_date: new Date().toISOString(),
    subject_code: route.params.rid,
    organization_type: api.hostnames.organization_type,
    ...(route.params.cid ? { city_id: route.params.cid } : {}),
    published: true,
  },
  sort: 'start_date',
});

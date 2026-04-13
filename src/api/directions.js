import { api } from 'src/boot/axios';
import { getAll, getOne } from 'src/lib/api';

export const getDirectionByCode = (code) => getOne('/organization/directions', {
  entity: 'directions',
  fields: { data: 'code,name,synonym' },
  page: { size: 1 },
  filter: {
    code,
    organization_type: api.hostnames.organization_type,
  },
});

export async function getDirectionsByCityId(cityId, rid, cid) {
  const r = await getAll('/organization/directions', {
    entity: 'directions',
    fields: { data: 'code,name,calculation_data' },
    page: { size: 100 },
    filter: {
      city_id: cityId,
      organization_type: api.hostnames.organization_type,
    },
  });
  return r.data.map((item) => ({
    ...item,
    url: {
      name: 'lsDirection',
      params: {
        rid,
        cid,
        did: item.code,
      },
    },
  }));
}

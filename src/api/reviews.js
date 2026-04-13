import { getAll } from 'src/lib/api';

export const getOrganizationReviewsByOrgId = (orgId, page, pageSize) => getAll('/organization/reviews', {
  entity: 'reviews',
  fields: {
    data: 'calculation_data,score,created_at,text,answer_date,answer_text',
  },
  filter: {
    is_approved: true,
    organization: orgId,
  },
  page: {
    number: page ?? 1,
    size: pageSize ?? 10,
  },
  sort: '-created_at',
});

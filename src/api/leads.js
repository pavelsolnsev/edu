import { Notify } from 'quasar';
import { api } from 'src/boot/axios';
import { forgetCache } from 'src/lib/api';

export async function createLead(data, router, orgId) {
  const rbody = {
    data: {
      type: 'leads',
      attributes: {
        ...data,
      },
    },
  };
  if (orgId) {
    rbody.data.relationships = {
      organization: {
        data: {
          type: 'organizations',
          id: orgId,
        },
      },
    };
  }
  const response = await api.post('/user/leads/', rbody);
  if (response.status === 201) {
    router.push('/thanks');
  } else {
    Notify.create({
      message: 'Ошибка отправки заявки',
      caption: 'Ваша заявка не отправлена. Попробуйте повторить отправку позже.',
    });
  }
  forgetCache('user/leads');
  return response.data;
}

export async function getLeadsAll() {
  const response = await api.get('/leads/');
  return response.data;
}

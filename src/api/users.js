import { Notify } from 'quasar';
import { api } from 'src/boot/axios';

export async function register(data) {
  const response = await api.post('/auth/register', data);
  if (response.status === 200) {
    Notify.create({
      message: 'Успешная регистрация',
      caption: 'Вы успешно зарегистрировались (демо)',
    });
  } else {
    Notify.create({
      message: 'Ошибка регистрации',
      caption: 'Произошла ошибка при регистрации',
    });
    // console.log(response);
  }
}

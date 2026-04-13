<template>
  <div class="m-register">
    <q-form ref="form">
      <div class="m-register__row">
        <AInputLabeled
          v-model="name"
          placeholder="Иван"
          label="Введите имя"
          :rules="[emptyCheck]"
          class="m-register__input"
        />
        <AInputLabeled
          v-model="surname"
          placeholder="Иванович"
          label="Введите фамилию"
          :rules="[emptyCheck]"
          class="m-register__input"
        />
      </div>
      <div class="m-register__row">
        <AInputLabeledDate
          v-model="birthDate"
          placeholder="ДД.ММ.ГГГГ"
          label="Дата рождения"
          :rules="[emptyCheck, dateLengthCheck]"
          :navigation-max-year-month="`${new Date().getFullYear()}/12`"
          mask="##.##.####"
          class="m-register__input"
        />
        <AButtonToggle
          v-model="sex"
          :options="[
            { label: 'М', value: 'Мужчина', class: 'text-semibold-m'},
            { label: 'Ж', value: 'Женщина', class: 'text-semibold-m' },
          ]"
          label="Укажите ваш пол"
        />
      </div>
      <div class="m-register__row">
        <AInputLabeled
          v-model.trim="email"
          type="email"
          placeholder="you@example.com"
          label="Введите почту"
          :rules="[
            emptyCheck,
            (val, rules) => rules.email(val) || 'Введите правильный email'
          ]"
          class="m-register__input"
          @keydown.space.prevent
        >
          <template #append>
            <q-icon
              name="o_email"
              color="gray"
              size="1.5rem"
            />
          </template>
        </AInputLabeled>
      </div>
      <div class="m-register__row">
        <AInputLabeled
          v-model.trim="password"
          :type="isPwd1 ? 'password' : 'text'"
          placeholder="Пароль"
          label="Введите пароль"
          :rules="[emptyCheck]"
          class="m-register__input"
          @keydown.space.prevent
        >
          <template #append>
            <q-icon
              :name="isPwd1 ? 'o_visibility' : 'o_visibility_off'"
              color="gray"
              size="1.5rem"
              @click="isPwd1 = !isPwd1"
            />
          </template>
        </AInputLabeled>
        <AInputLabeled
          v-model.trim="passwordCheck"
          :type="isPwd2 ? 'password' : 'text'"
          placeholder="Пароль"
          label="Повторите пароль"
          :rules="[emptyCheck, passwordSecurityCheck]"
          class="m-register__input"
          @keydown.space.prevent
        >
          <template #append>
            <q-icon
              :name="isPwd2 ? 'o_visibility' : 'o_visibility_off'"
              color="gray"
              size="1.5rem"
              @click="isPwd2 = !isPwd2"
            />
          </template>
        </AInputLabeled>
      </div>
      <div class="m-register__buttons">
        <AButton
          label="Зарегистрироваться"
          class="m-register__btn"
          :disabled="!agree"
          @click="onSubmit"
        />
        <AButton
          outline
          label="Войти с помощью VK"
          class="m-register__btn a-button--bold"
          :disabled="!agree"
          @click="onSubmit"
        />
      </div>
      <ACheckbox
        v-model="agree"
        class="text-medium-s"
      >
        Нажимая на кнопку, я соглашаюсь с
        <a
          href="/"
          target="_blank"
          class="test"
          @click="$event.stopPropagation()"
        >политикой конфиденциальности</a>
        и на получение рассылок
      </ACheckbox>
    </q-form>
    <button
      class="a-mt-24 m-register__change text-medium-m"
      @click="emit('change')"
    >
      У меня есть аккаунт
    </button>
  </div>
</template>

<script setup>
import ACheckbox from 'components/atoms/ACheckbox';
import AInputLabeled from 'components/atoms/AInputLabeled';
import AInputLabeledDate from 'components/atoms/AInputLabeledDate';
import { date } from 'quasar';
import { register } from 'src/api/users';
import AButton from 'src/components/atoms/AButton';
import AButtonToggle from 'src/components/atoms/AButtonToggle';
import { ref } from 'vue';

const form = ref(null);
const name = ref('');
const surname = ref('');
const birthDate = ref('');
const sex = ref('Мужчина');
const email = ref('');
const password = ref('');
const passwordCheck = ref('');
const isPwd1 = ref(true);
const isPwd2 = ref(true);
const agree = ref(true);

const emit = defineEmits(['change']);
const emptyCheck = (val) => (!!val || 'Поле не должно быть пустым');
const passwordSecurityCheck = (val) => (val === password.value || 'Пароли не совпадают');
const dateLengthCheck = (val) => (val.length === 10 || 'Введите полную дату');

async function onSubmit() {
  if (await form.value.validate()) {
    const data = {
      password: password.value,
      username: email.value,
      email: email.value,
      // is_local: 'string',
      // status: 'active',
      // vk_id: 'vk.com/1232113',
      // valid_until: '2020-12-15T15:26:12.000000Z',
      firstname: name.value,
      lastname: surname.value,
      // surname: 'Иванович',
      gender: sex.value,
      birthday: date.formatDate(date.extractDate(birthDate.value, 'DD.MM.YYYY'), 'YYYY-MM-DD'),
      // phone: '+79999999999',
      // comment: 'string',
      // avatar: 'test.ru/test.jpg',
      // properties: [
      //   'string',
      // ],
    };
    await register(data);
  }
}
</script>

<style lang="scss">
.m-register {
  &__row {
    display: flex;
    gap: rem(12) rem(24);
    margin-bottom: margin(12);

    & > * {
      flex: 1 1 0;
    }

    @media(max-width: $breakpoint-xs) {
      flex-direction: column;
    }
  }

  &__change {
    display: block;
    width: 100%;
    padding: 0;
    border: none;
    background-color: transparent;
    color: color(gray);
    cursor: pointer;
  }

  &__buttons {
    display: flex;
    flex-wrap: wrap;
    gap: rem(16) rem(24);
    margin-bottom: margin(8);
  }

  .a-button-toggle {
    @media(max-width: $breakpoint-xs) {
      margin-bottom: margin(20);
    }
  }

  &__btn {
    flex: 1 1 0;

    @media(max-width: $breakpoint-xs) {
      flex-basis: 100%;
    }
  }
}
</style>

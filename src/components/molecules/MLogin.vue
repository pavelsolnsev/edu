<template>
  <div class="m-login">
    <q-form ref="form">
      <AInputLabeled
        v-model.trim="email"
        placeholder="Email"
        label="Введите логин"
        :rules="[emptyCheck]"
        class="m-login__input"
        @keydown.space.prevent
      >
        <template #append>
          <q-icon
            name="login"
            color="gray"
            size="1.5rem"
          />
        </template>
      </AInputLabeled>
      <AInputLabeled
        v-model.trim="password"
        placeholder="Пароль"
        :type="isPwd ? 'password' : 'text'"
        label="Введите пароль"
        :rules="[emptyCheck]"
        class="a-mb-20 m-login__input"
        @keydown.space.prevent
      >
        <template #append>
          <q-icon
            :name="isPwd ? 'o_visibility' : 'o_visibility_off'"
            class="cursor-pointer"
            color="gray"
            size="1.5rem"
            @click="isPwd = !isPwd"
          />
        </template>
      </AInputLabeled>
      <div class="m-login__buttons">
        <AButton
          label="Войти"
          class="m-login__btn"
          :disabled="!agree"
          @click="onSubmit"
        />
        <AButton
          outline
          label="Войти с помощью VK"
          class="m-login__btn a-button--bold"
          :disabled="!agree"
          @click="onSubmitTemp"
        />
      </div>
      <ACheckbox
        v-model="agree"
        class="text-medium-s"
      >
        Нажимая на кнопку, я соглашаюсь с политикой
        конфиденциальности и на получение рассылок
      </ACheckbox>
    </q-form>
    <button
      class="m-login__change text-medium-m"
      @click="emit('change')"
    >
      Зарегистрироваться
    </button>
  </div>
</template>

<script setup>
import ACheckbox from 'components/atoms/ACheckbox';
// import { login } from 'src/api/users';
import AButton from 'src/components/atoms/AButton';
import AInputLabeled from 'src/components/atoms/AInputLabeled';
import { formValidateAll } from 'src/lib/functions';
import { useDefaultStore } from 'src/stores/default';
import { ref } from 'vue';

const $store = useDefaultStore();

const form = ref(null);
const emit = defineEmits(['change']);
const email = ref('');
const password = ref('');
const agree = ref(true);
const isPwd = ref(true);

const emptyCheck = (val) => (!!val || 'Поле не должно быть пустым');

async function onSubmit() {
  if (await form.value.validate()) {
    await $store.login(email.value, password.value);
  } else {
    formValidateAll(form.value);
  }
}

async function onSubmitTemp() {
  $store.tempLogin('user');
}
</script>

<style lang="scss">
.m-login {
  &__input:first-child {
    margin-bottom: margin(12);
  }

  &__buttons {
    display: flex;
    flex-wrap: wrap;
    gap: rem(16) rem(24);
    margin-bottom: margin(8);
  }

  &__change {
    display: block;
    padding: 0;
    margin: rem(24) auto;
    border: none;
    background-color: transparent;
    color: color(gray);
    cursor: pointer;
  }

  &__btn {
    flex: 1 1 0;
    min-width: 0;

    @media(max-width: $breakpoint-xs) {
      flex-basis: 100%;
    }
  }
}
</style>

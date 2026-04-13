<template>
  <div class="m-lead-form">
    <h3 v-if="title!==''">
      {{ title }}
    </h3>
    <q-form ref="form">
      <div :class="['row q-col-gutter-md', {'a-mt-8': title!==''}]">
        <div class="col-xs-12 col-sm-6 col-md-3 m-lead-form__item">
          <q-input
            v-model="name"
            outlined
            placeholder="Иван"
            :rules="[val => !!val || 'Введите имя']"
            lazy-rules
          />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-3 m-lead-form__item">
          <q-input
            v-model="phone"
            outlined
            mask="+7-(###)-###-##-##"
            placeholder="Телефон"
            :rules="[
              val => !!val || 'Введите телефон',
              val => validatePhone(val) || 'Введите корректный телефон'
            ]"
            lazy-rules
          />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-3 m-lead-form__item">
          <q-input
            v-model="email"
            outlined
            placeholder="you@example.com"
            :rules="[
              val => !!val || 'Введите E-mail',
              val => validateEmail(val) || 'Введите корректный E-mail'
            ]"
            lazy-rules
          />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-3 m-lead-form__item">
          <q-btn
            unelevated
            color="primary"
            class="button-m text-button-m button-wide"
            :disabled="!agree && !loading"
            @click="submit"
          >
            <q-spinner
              v-if="loading"
              color="white"
              class="a-mr-16"
            />
            <span>Отправить</span>
          </q-btn>
        </div>
      </div>
      <div>
        <ACheckbox
          v-model="agree"
          label="Нажимая на кнопку, я соглашаюсь с политикой
                 конфиденциальности и на получение рассылок"
          class="text-regular-s a-mt-8"
        />
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { createLead } from 'src/api/leads';
import ACheckbox from 'src/components/atoms/ACheckbox';
import { validateEmail, validatePhone } from 'src/lib/functions';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  orgId: {
    type: [Number, String, null],
    default: null,
  },
});
const $router = useRouter();

const form = ref(null);
const name = ref('');
const phone = ref('');
const email = ref('');
const agree = ref(true);
const loading = ref(false);

const submit = async () => {
  const success = await form.value.validate(true);
  if (success && agree.value) {
    const rbody = {
      name: name.value,
      phone: phone.value.replace(/[()]/g, ''),
      email: email.value,
    };
    try {
      loading.value = true;
      await createLead(rbody, $router, props.orgId);
    } finally {
      loading.value = false;
    }
  }
};
</script>

<style lang="scss">
.m-lead-form {
  .q-field--with-bottom {
    padding-bottom: 0;
  }

  .q-field--error.q-field--with-bottom {
    padding-bottom: rem(20);
  }

  .m-lead-form__item {
    @media(max-width: $breakpoint-xs) {
      padding-top: padding(8);
    }
  }
}
</style>

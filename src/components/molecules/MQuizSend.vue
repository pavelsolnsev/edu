<template>
  <div :class="['quiz-send', {'quiz-send--loading': loading}]">
    <h3 class="quiz-send__title">
      Специалист «Единой приёмной комиссии» подобрал программу обучения
    </h3>
    <q-form class="quiz-send__inputs">
      <q-input
        v-model="phone"
        borderless
        class="quiz-send__input"
        stack-label
        mask="+7-(###)-###-##-##"
        name="phone"
        label="Телефон"
        placeholder="+7"
        label-color="black"
      />

      <q-input
        v-model="name"
        borderless
        class="quiz-send__input"
        stack-label
        name="name"
        label="Имя"
        placeholder="Иванов"
        label-color="black"
      />

      <q-input
        v-model="email"
        borderless
        class="quiz-send__input"
        stack-label
        name="email"
        label="Почта"
        placeholder="you@example.com"
        label-color="black"
      />

      <q-btn
        unelevated
        class="quiz-send__submit text-semibold-l"
        color="primary"
        label="Отправить"
        :disabled="!agree"
        @click="submit"
      />
    </q-form>

    <div class="quiz-send__agreement">
      <ACheckbox
        v-model="agree"
        class="quiz-send__agreement-checkbox"
      >
        <p class="quiz-send__agreement-text text-medium-s">
          Я даю своё
          <a
            href="/docs/pdf/privacy_policy.pdf"
            target="_blank"
            @click="$event.stopPropagation()"
          >
            согласие на обработку персональных данных
          </a>
          и подтверждаю, что с текстом
          <a
            href="/docs/pdf/terms_of_use.pdf"
            target="_blank"
            @click="$event.stopPropagation()"
          >
            Правил, Соглашение об использовании электронной подписи
          </a>
          ознакомлен и полностью согласен, их содержание мне понятно
        </p>
      </ACheckbox>
    </div>
  </div>
</template>

<script setup>
import { createLead } from 'src/api/leads';
import ACheckbox from 'src/components/atoms/ACheckbox';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const $router = useRouter();
const name = ref('');
const phone = ref('');
const email = ref('');
const agree = ref(true);
const loading = ref(false);

const emit = defineEmits(['on-end']);

const submit = async () => {
  const rbody = {
    name: name.value,
    phone: phone.value.replace(/[()]/g, ''),
    email: email.value,
  };
  loading.value = true;
  try {
    await createLead(rbody, $router);
    emit('on-end');
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss">
.quiz-send {
  input {
    -webkit-box-shadow: 0 0 0 1000px white inset;
    box-shadow: 0 0 0 1000px white inset;
  }

  &__title {
    width: 90%;
    margin: margin4(0, 0, 32, 0);
    color: color(dark);

    @media (max-width: $breakpoint-sm) {
      width: 100%;
    }
  }

  &__inputs {
    display: flex;
    gap: rem(16);

    @media (max-width: $breakpoint-sm) {
      flex-wrap: wrap;
      gap: rem(16) rem(20);
    }

    @media (max-width: $breakpoint-xs) {
      flex-direction: column;
    }
  }

  &__input {
    width: calc(25% - 0.5rem);
    height: rem(64);
    padding: padding4(8, 16, 16, 16);
    border-radius: bradius(8);

    @media (max-width: $breakpoint-sm) {
      width: calc(50% - 0.625rem);
    }

    @media (max-width: $breakpoint-xs) {
      width: 100%;
      height: rem(72);
    }
  }

  &__submit {
    width: calc(25% - 0.5rem);
    text-transform: none;

    @media (max-width: $breakpoint-sm) {
      width: calc(50% - 0.625rem);
    }

    @media (max-width: $breakpoint-xs) {
      width: 100%;
      height: rem(72);
      margin-bottom: 0;
    }
  }

  .q-field {
    background-color: white;
  }

  .q-field__label {
    top: rem(8);
    font-weight: 500;
    font-size: rem(12);
    line-height: rem(12);
    color: color(dark);
  }

  .q-field__native {
    padding: padding4(16, 0, 8, 0);

    &::placeholder {
      font-weight: 500;
      font-size: rem(16);
      line-height: rem(16);
      opacity: 1;
      color: color(stroke);
    }
  }

  &__agreement {
    display: flex;
    align-items: flex-start;
    margin-top: margin(24);
  }

  &__agreement-checkbox {
    margin-right: margin(16);
  }

  &__agreement-text {
    width: 80%;
    color: color(gray);
  }

  &.quiz-send--loading {
    opacity: 0.6;
    pointer-events: none;
  }
}
</style>

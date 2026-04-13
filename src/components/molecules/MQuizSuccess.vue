<template>
  <div class="m-quiz-success">
    <div class="m-quiz-success__content">
      <h1>Ваша заявка успешно отправлена</h1>
      <AButton
        :label="'Вернуться в начало'"
        class="gt-xs a-mt-32 m-quiz-success__btn"
        @click="emit('to-start')"
      />
    </div>
    <div class="m-quiz-success__visual">
      <q-img
        :src="require('/public/img/thumb-up.png')"
        class="m-quiz-success__img"
      />
      <AButton
        :label="'Вернуться в начало'"
        class="lt-sm a-mt-16 m-quiz-success__btn"
        @click="emit('to-start')"
      />
    </div>
  </div>
</template>

<script setup>
import AButton from 'src/components/atoms/AButton';

const emit = defineEmits(['to-start']);
</script>

<style lang="scss">
.m-quiz-success {
  display: flex;

  @media(max-width: $breakpoint-sm) {
    flex-direction: column;
  }

  &__img {
    width: rem(462);

    @media(max-width: $breakpoint-md) {
      width: rem(350);
    }

    @media(max-width: $breakpoint-sm) {
      width: rem(380);
    }

    @media(max-width: $breakpoint-xs) {
      width: 100%;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: rem(570);
    margin-right: rem(84);

    @media(max-width: $breakpoint-md) {
      width: calc(100% - 350px);
      margin-right: 0;
    }

    @media(max-width: $breakpoint-sm) {
      width: 100%;
    }
  }

  &__visual {
    display: flex;

    @media(max-width: $breakpoint-sm) {
      width: 100%;
      justify-content: space-around;
      margin-top: margin(32);
    }

    @media(max-width: $breakpoint-xs) {
      margin-top: margin(16);
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
    }
  }

  &__btn {
    @media(max-width: $breakpoint-xs) {
      width: 100%;
    }
  }
}
</style>

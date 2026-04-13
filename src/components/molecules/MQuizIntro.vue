<template>
  <div class="quiz-intro">
    <div class="quiz-intro__action">
      <h5 class="quiz-intro__title font--32-40 font--600">
        Подобрать программу обучения
      </h5>
      <a-button
        class="quiz-intro__start"
        label="Начать"
        @click="emit('next')"
      />
    </div>
    <div class="quiz-intro__image">
      <q-img
        src="/img/start-quiz.png"
        alt="start-quiz-img"
      />
    </div>
  </div>
</template>

<script setup>
import AButton from 'src/components/atoms/AButton';

const emit = defineEmits(['next']);
</script>

<style lang="scss">
.quiz-intro {
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: $breakpoint-sm) {
    flex-direction: column;
  }

  .a-button {
    @media (max-width: $breakpoint-xs) {
      width: 100%;
      height: rem(72);
    }
  }

  &__title {
    width: rem(397);
    margin: margin4(0, 0, 32, 0);
    color: color(dark);

    @media (max-width: $breakpoint-sm) {
      width: auto;
    }
  }

  &__image {
    box-sizing: content-box;
    display: flex;
    padding: padding2(0, 76);
    @include wh(426, 308);

    img {
      width: 100%;
    }

    @media (max-width: $breakpoint-sm) {
      width: 100%;
      max-width: rem(623);
      height: auto;
      padding: 0;
    }
  }

  &__action {
    @media (max-width: $breakpoint-sm) {
      margin-bottom: margin(32);
      align-self: flex-start;
    }
  }

  &__start {
    @include wh(170, 60);

    @media (max-width: $breakpoint-xs) {
      width: 100%;
      height: 72px;
    }
  }
}
</style>

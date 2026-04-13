<template>
  <div class="prof-result">
    <div class="prof-result__box">
      <h1 class="a-mb-16">
        Результат
      </h1>
      <p class="prof-result__desc a-mb-24">
        Вы любите создавать что-то своими руками,
        использовать язык своего тела. Вы любите создавать
        что-то своими руками, использовать язык своего тела
      </p>
      <p class="a-mb-32">
        Чаще всего, люди вашего типа увлекаются творчеством,
        спортом, имеют разнообразные хобби.
        Для вас важно видеть результат вашего труда,
        участвовать в его достижении. Монотонная работа за компьютером будет
        приводить вас в уныние. Поэтому вы можете выбирать созидательные профессии:
        стоматолог, реставратор, хореограф. Кроме этого,
        вы сможете добиться успехов в сфере физической культуры
        и искусства.Чаще всего, люди вашего типа увлекаются творчеством,
        спортом, имеют разнообразные хобби. Для вас важно видеть результат
        вашего труда, участвовать в его достижении. Монотонная работа за
        компьютером будет приводить вас в уныние. Поэтому вы можете выбирать
        созидательные профессии: стоматолог, реставратор, хореограф.
        Кроме этого, вы сможете добиться успехов в сфере
        физической культуры и искусства.
      </p>
      <div class="prof-result__button">
        <AButton
          label="Посмотреть рекомендованные ВУЗы "
          class="prof-result__button-inner"
          @click="emit('show-to-vuz')"
        />
        <AButton
          outline
          label="Пройти еще раз"
          class="prof-result__button-inner"
          @click="emit('to-start')"
        />
      </div>
    </div>
    <div class="prof-result__image">
      <q-img
        src="/img/result-prof.svg"
        alt="result-prof-img"
      />
    </div>
  </div>
</template>
<script setup>
import AButton from 'components/atoms/AButton.vue';

const emit = defineEmits(['to-start', 'show-to-vuz']);
</script>
<style lang="scss">
.prof-result {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: rem(95);
  grid-row-gap: rem(56);
  align-items: flex-start;
  justify-content: space-between;
  @media (max-width: $breakpoint-sm) {
    grid-template-columns: 1fr;
  }

  &__button {
    display: grid;
    grid-template-columns: repeat(2, auto);
    gap: rem(16);
    align-items: flex-start;
    justify-content: flex-start;

    .q-btn__content {
      text-align: left;
    }

    &-inner {
      white-space: initial;
    }

    @media (max-width: $breakpoint-sm) {
      grid-template-columns: auto;
    }
    @media (max-width: $breakpoint-xs) {
      grid-template-columns: 1fr;
    }
  }

  &__desc {
    font-size: 24px;
    line-height: 133%;
    font-weight: 600;
    @media (max-width: $breakpoint-xs) {
      font-size: 18px;
      line-height: 122%;
    }
  }

  &__image {
    box-sizing: content-box;
    display: flex;
    @include wh(205, 275);

    img {
      width: 100%;
    }

    @media (max-width: $breakpoint-sm) {
      width: 100%;
      max-width: rem(215);
      height: auto;
      margin: 0 auto;
    }
  }
}
</style>

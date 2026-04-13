<template>
  <s-main-section class="s-vuz-choose">
    <div class="s-vuz-choose__card">
      <h3 class="s-vuz-choose__title">
        Подбери ВУЗ по баллам ЕГЭ
      </h3>
      <a-button
        class="s-vuz-choose__button"
        label="Подобрать ВУЗ"
      />
    </div>
    <div class="s-vuz-choose__card">
      <h3 class="s-vuz-choose__title">
        Выбери ВУЗ по рейтингу
      </h3>
      <a-button
        class="s-vuz-choose__button"
        label="Подобрать ВУЗ"
      />
    </div>
  </s-main-section>
</template>

<script setup>
import AButton from 'src/components/atoms/AButton';
import SMainSection from 'src/components/sections/SMainSection';
</script>

<style lang="scss">
.s-vuz-choose {
  padding-top: rem(64);
  padding-bottom: rem(32);

  .container {
    display: flex;
    gap: rem(30);

    @media (max-width: $breakpoint-md) {
      flex-direction: column;
    }
  }

  &__card {
    width: rem(570);
    padding: rem(73) rem(32) rem(40) rem(32);
    border-radius: bradius(8);
    background-color: color(blue-gray);
    background-size: rem(482) rem(403);
    background-repeat: no-repeat;
    background-position: bottom right;

    &:first-child {
      background-image: url('/img/main/vuz-choose-girl.png');
    }

    &:nth-child(2) {
      background-image: url('/img/main/vuz-choose-boy.png');
    }

    @media (max-width: $breakpoint-md) {
      width: 100%;
    }

    @media (max-width: $breakpoint-sm) {
      background-size: rem(370) rem(310);
    }

    @media (max-width: $breakpoint-xs) {
      background-size: rem(280) rem(234);
      padding: rem(24) rem(16) rem(22) rem(16);
    }
  }

  &__title {
    width: rem(250);
    margin-bottom: rem(165);

    @media (max-width: $breakpoint-xs) {
      width: rem(190);
      margin-bottom: rem(180);
    }
  }

  &__button {
    .q-btn__content {
      font-weight: 600;
    }

    @media (max-width: $breakpoint-xs) {
      width: 100%;
    }
  }
}
</style>

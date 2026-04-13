<template>
  <div class="s-register-cta">
    <div class="container">
      <div class="s-register-cta__card">
        <h3 class="s-register-cta__title">
          Еще 9 показателей доступны зарегистрированным пользователям
        </h3>
        <a-button
          class="s-register-cta__button"
          label="Зарегистрироваться"
          :href="$hostnames.fullSecure"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import AButton from 'src/components/atoms/AButton';
</script>

<style lang="scss">
.s-register-cta {
  margin-bottom: margin(120);

  @media(max-width: $breakpoint-sm) {
    margin-bottom: margin(72);
  }

  @media(max-width: $breakpoint-xs) {
    margin-bottom: margin(56);
  }

  &__card {
    padding: padding2(64, 40);
    background-color: color(pink);
    border-radius: rem(32);
    background-image: url('/img/vuz-data/register-cta-bg.png');
    background-repeat: no-repeat;
    background-size: rem(558) rem(428);
    background-position: right bottom;

    @media(max-width: $breakpoint-md) {
      background-size: rem(463) rem(355);
    }

    @media(max-width: $breakpoint-sm) {
      padding: rem(32) rem(24) rem(403) rem(24);
      background-position: center bottom;
    }

    @media(max-width: $breakpoint-xs) {
      padding: rem(40) rem(20) rem(277) rem(20);
      background-size: rem(280) auto;
    }
  }

  &__title {
    width: rem(530);
    margin-bottom: margin(64);
    margin-top: rem(62);

    @media(max-width: $breakpoint-md) {
      margin-top: 0;
    }

    @media(max-width: $breakpoint-sm) {
      width: rem(400);
      margin-bottom: margin(24);
    }

    @media(max-width: $breakpoint-xs) {
      width: 100%;
    }
  }

  &__button {
    margin-bottom: rem(30);

    @media(max-width: $breakpoint-md) {
      margin-bottom: 0;
    }

    @media(max-width: $breakpoint-xs) {
      width: 100%;
    }
  }

  .container {
    @media(max-width: $breakpoint-xs) {
      padding: 0;
    }
  }
}
</style>

<template>
  <SMainSection
    class="s-integration-sub"
  >
    <div class="s-integration-sub__wrapper">
      <div class="s-integration-sub__text1 text-medium-m">
        ВУЗы России
      </div>
      <div class="s-integration-sub__img">
        <img
          :src="require('assets/img/remote.png')"
          alt=""
        >
      </div>
      <div class="s-integration-sub__text2 text-medium-m">
        Образование дистанционно
      </div>
    </div>
  </SMainSection>
</template>

<script setup>
import SMainSection from './SMainSection';
</script>

<style lang="scss">
.s-integration-sub {
  padding: padding2(20, 0);
  background-color: color(blue-gray);

  @media screen and (max-width: $breakpoint-xs) {
    padding: padding2(24, 0);
  }

  &__text1 {
    flex: 1;
  }
  &__img {
    margin-left: margin(16);
    flex: 0;
  }
  &__text2 {
    flex: 0;
    white-space: nowrap;
    margin-left: margin(16);
    @media screen and (max-width: $breakpoint-xs) {
      margin-left: 0;
      flex-basis: 100%;
    }
  }

  &__wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
  }

  &__text {
    flex: 1 1 auto;
    @media screen and (max-width: $breakpoint-xs) {
      flex-basis: 100%;
    }
  }

  &__info {
    flex: 0 1 auto;
    display: flex;
    align-items: center;
    @media screen and (max-width: $breakpoint-xs) {
      margin-top: margin(8);
      flex-basis: 100%;
    }
  }

  &__info > img {
    flex: 0 1 auto;
    height: rem(40);
    width: rem(60);
    @media screen and (max-width: $breakpoint-xs) {
      order: 1;
    }
  }

  &__info > span {
    margin-left: margin(16);
    display: block;
    flex: 1 1 auto;
    @media screen and (max-width: $breakpoint-xs) {
      order: 0;
      margin-left: 0;
      margin-right: margin(0);
      white-space: nowrap;
      overflow: hidden;
    }
  }
}
</style>

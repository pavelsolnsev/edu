<template>
  <SMainSection class="s-main-vuzlist">
    <div class="s-main-vuzlist__content">
      <h3
        class="s-main-vuzlist__title"
      >
        ВУЗы России
      </h3>
      <div class="s-main-vuzlist__items">
        <router-link
          v-for="(item, i) in citiesTop"
          :key="i"
          :to="item.url"
          class="s-main-vuzlist__item row inline items-center text-medium-m text-dark"
        >
          <div>{{ item.name }}</div>
          <q-icon
            v-if="i === 0"
            name="star"
            class="a-ml-8 text-red"
            size="1.25rem"
          />
        </router-link>
      </div>
      <div class="a-mt-24 text-h4">
        <router-link
          to="/cities/"
          class="text-dark"
        >
          <span>Все города</span>
          <q-icon
            name="trending_flat"
            class="material-symbols-outlined"
            size="2rem"
            right
          />
        </router-link>
      </div>
    </div>
    <div class="s-main-vuzlist__logos">
      <q-img
        :src="require('/public/img/main/vuzlist/mai.png')"
        class="s-main-vuzlist__logo"
      />
      <q-img
        :src="require('/public/img/main/vuzlist/kultura.png')"
        class="s-main-vuzlist__logo"
      />
      <q-img
        :src="require('/public/img/main/vuzlist/gaugn.png')"
        class="s-main-vuzlist__logo"
      />
      <q-img
        :src="require('/public/img/main/vuzlist/kubsu.png')"
        class="s-main-vuzlist__logo"
      />
      <q-img
        :src="require('/public/img/main/vuzlist/nes.png')"
        class="s-main-vuzlist__logo"
      />
      <q-img
        :src="require('/public/img/main/vuzlist/hse.png')"
        class="s-main-vuzlist__logo"
      />
      <q-img
        :src="require('/public/img/main/book.png')"
        class="s-main-vuzlist__logo"
      />
      <q-img
        :src="require('/public/img/main/vuzlist/marhi.png')"
        class="s-main-vuzlist__logo"
      />
      <q-img
        :src="require('/public/img/main/vuzlist/dubna.png')"
        class="s-main-vuzlist__logo"
      />
      <q-img
        :src="require('/public/img/main/vuzlist/ssmu.png')"
        class="s-main-vuzlist__logo"
      />
    </div>
  </SMainSection>
</template>

<script setup>
import { useDefaultStore } from 'src/stores/default';

import SMainSection from './SMainSection';

const { citiesTop } = useDefaultStore();
</script>

<style lang="scss">
.s-main-vuzlist {
  padding: padding2(64, 0);

  & > .container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  & > .container > div {
    @media screen and (max-width: $breakpoint-md) {
      flex-basis: 100%;
      flex-grow: 1;
    }
  }

  &__content {
    flex: 1;
  }

  &__logos {
    flex: 0 1 auto;
    width: rem(496);
    display: flex;
    flex-wrap: wrap;
    gap: rem(48);

    @media screen and (min-width: $breakpoint-lg-min) {
      width: rem(496);
    }

    @media screen and (max-width: $breakpoint-md) {
      width: auto;
      margin-top: margin(40);
    }

    @media screen and (max-width: $breakpoint-xs) {
      width: auto;
      gap: rem(20);
    }
  }

  &__logo {
    flex: 0 1 rem(88);
    @media screen and (max-width: $breakpoint-xs) {
      flex: 0 1 rem(72);
    }
  }

  &__title {
    @media screen and (min-width: $breakpoint-lg-min) {
      margin-top: margin(16);
    }
  }

  &__items {
    height: rem(224);
    margin-top: margin(24);
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: rem(16);
    overflow: hidden;
    align-items: flex-start;
    @media screen and (min-width: $breakpoint-lg-min) {
      height: rem(224);
      row-gap: rem(16);
      column-gap: rem(28);
    }
    @media screen and (min-width: $breakpoint-md-min) and (max-width: $breakpoint-md) {
      height: rem(120);
      row-gap: rem(8);
      column-gap: rem(24);
    }
    @media screen and (min-width: $breakpoint-sm-min) and (max-width: $breakpoint-sm) {
      height: rem(224);
      row-gap: rem(16);
      column-gap: rem(20);
    }
    @media screen and (max-width: $breakpoint-xs) {
      height: auto;
      row-gap: rem(16);
    }
  }

  &__item {
    flex: 0 1 auto;
    width: calc(100% / 3 - 1rem);
    cursor: pointer;
    @media screen and (min-width: $breakpoint-lg-min) {
      width: calc(100% / 3 - 1.75rem);
    }
    @media screen and (min-width: $breakpoint-md-min) and (max-width: $breakpoint-md) {
      width: calc(100% / 5 - 1.5rem);
    }
    @media screen and (min-width: $breakpoint-sm-min) and (max-width: $breakpoint-sm) {
      width: calc(100% / 3 - 1.25rem);
    }
    @media screen and (max-width: $breakpoint-xs) {
      width: 100%;
    }
  }
}
</style>

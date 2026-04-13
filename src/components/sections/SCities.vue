<template>
  <section class="s-cities">
    <h1 class="s-cities__title">
      Все города
    </h1>
    <section
      v-for="item in subjectsWithCities"
      :key="item.id"
      class="s-cities__item"
    >
      <h5 class="s-cities__subtitle">
        {{ item.name }}
      </h5>
      <ul class="s-cities__list">
        <li
          v-for="city in item.cities"
          :key="city"
        >
          <router-link
            :to="city.url"
            class="s-cities__link text-medium-m"
          >
            {{ city.name }}
          </router-link>
        </li>
      </ul>
    </section>
  </section>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useDefaultStore } from 'src/stores/default';

const $store = useDefaultStore();
const { subjectsWithCities } = storeToRefs($store);
</script>

<style lang="scss">
.s-cities {
  margin-bottom: margin(72);

  &__title {
    margin-bottom: margin(64);

    @media(max-width: $breakpoint-sm) {
      margin-bottom: margin(48);
    }
  }

  &__subtitle {
    margin-bottom: margin(16);
  }

  &__item {
    padding: padding2(24, 0);
    border-bottom: 1px solid color(stroke);

    &:first-of-type {
      padding-top: 0;
    }

    &:last-child {
      border-bottom: none;
    }
  }

  ul, li {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: rem(16) rem(32);

    @media(max-width: $breakpoint-xs) {
      gap: rem(16) rem(24);
    }
  }

  &__link {
    text-decoration: none;
  }
}

.section--sidebar-padding .container .s-cities__title {
  margin-top: 0;
}
</style>

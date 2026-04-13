<template>
  <s-main-section class="s-main-directions">
    <h2 class="s-main-directions__title">
      {{ title }}
    </h2>
    <div class="s-main-directions__items">
      <m-vuz-direction
        v-for="direction in directions"
        :key="direction.name"
        :item="direction"
        class="s-main-directions__item"
      />
      <m-vuz-direction
        v-if="showAllBtn"
        class="s-main-directions__item _show-all"
        :item="{ url: '/' }"
      />
    </div>
  </s-main-section>
</template>

<script setup>
import MVuzDirection from 'src/components/molecules/MVuzDirection';
import SMainSection from 'src/components/sections/SMainSection';

defineProps({
  title: {
    type: String,
    default: '',
  },
  directions: {
    type: Array,
    default: () => {},
  },
  showAllBtn: {
    type: Boolean,
    default: true,
  },
});
</script>

<style lang="scss">
.s-main-directions {
  padding: padding2(32, 0);

  @media (max-width: $breakpoint-sm) {
    padding: padding2(24, 0);
  }

  &__title {
    margin-bottom: margin(40);

    @media (max-width: $breakpoint-sm) {
      margin-bottom: margin(32);
    }
  }

  &__item {
    &._show-all:last-child:nth-child(odd) {
      @media(max-width: $breakpoint-sm) {
        grid-column-end: span 2;
      }

      @media (max-width: $breakpoint-xs) {
        grid-column-end: auto;
      }
    }
  }

  &__items {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: rem(30);

    @media (max-width: $breakpoint-md) {
      gap: rem(20);
    }

    @media (max-width: $breakpoint-sm) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: $breakpoint-xs) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
}
</style>

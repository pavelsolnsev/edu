<template>
  <div class="m-listing-cardlogo">
    <router-link :to="to">
      <q-img
        :src="src"
        :ratio="1"
        fit="contain"
        class="m-listing-cardlogo__img"
      />
    </router-link>
    <MVuzRating :esi="esi" />
  </div>
</template>

<script setup>
import MVuzRating from 'src/components/molecules/MVuzRating.vue';

defineProps({
  src: {
    type: [String, null],
    required: true,
  },
  to: {
    type: [String, Object],
    required: true,
  },
  esi: {
    type: [String, Number, null],
    required: true,
  },
});
</script>

<style lang="scss">
.m-listing-cardlogo {
  width: rem(128);
  min-width: rem(128);
  margin-right: margin(32);

  &__img {
    border: 1px solid #E5EBF2;
    border-radius: 8px;
  }

  @media screen and (max-width: $breakpoint-xs) {
    min-width: rem(64);
    width: rem(64);
    margin-right: margin(16);
  }
  @media screen and (min-width: $breakpoint-sm-min) and (max-width: $breakpoint-sm) {
    min-width: rem(80);
    width: rem(80);
  }
}
</style>

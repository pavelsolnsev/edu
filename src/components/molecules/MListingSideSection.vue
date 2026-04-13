<template>
  <div class="m-listing-side__section">
    <template
      v-for="item in items"
      :key="item.url"
    >
      <router-link
        v-if="!item.hide"
        :to="item.url"
        class="m-listing-side__item"
      >
        <div class="m-listing-side__icon">
          <img
            :src="'/3dicons/' + item.icon + '.png'"
            alt=""
          >
        </div>
        <div class="m-listing-side__title-wrapper">
          <div class="m-listing-side__title text-medium-l">
            {{ item.title }}
          </div>
          <div
            v-if="item.subtitle"
            class="m-listing-side__subtitle a-mt-4 text-xs text-medium"
          >
            {{ item.subtitle }}
          </div>
        </div>
      </router-link>
    </template>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="scss">
.m-listing-side {
  &__section {
    padding: padding(24);
  }

  a,
  a:visited {
    text-decoration: none;
    color: color(dark);
  }

  &__item {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
  }

  &__item:not(:last-child) {
    padding-bottom: padding(24);
    margin-bottom: margin(24);
    border-bottom: 1px solid color(light-blue);
  }

  &__icon {
    flex: 0 1 auto;
    margin-right: margin(16);

    img {
      width: rem(48);
      height: rem(48);
    }
  }

  &__title {
    flex: 1 1 auto;
  }
}
</style>

<template>
  <div class="m-integration-main">
    <div class="m-integration-main__logo">
      <q-img :src="item.src" />
    </div>
    <div class="m-integration-main__info">
      <div class="m-integration-main__title text-m text-semibold">
        {{ item.title }}
      </div>
      <div class="m-integration-main__content text-xs text-medium">
        {{ item.content }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style lang="scss">
.m-integration-main {
  padding: padding(16);
  background-color: color(light-yellow);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  @media screen and (max-width: $breakpoint-xs) {
    flex-direction: column;
  }
  &__logo {
    width: rem(56);
    flex: 0 1 auto;
  }

  &__info {
    flex: 1;
    margin-left: margin(16);
    @media screen and (max-width: $breakpoint-xs) {
      flex: 0;
      margin-left: 0;
      margin-top: margin(16);
    }
  }

  &__title {
    margin-bottom: margin(8);
  }
}
</style>

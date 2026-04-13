<template>
  <router-link
    v-if="link"
    :to="link"
    class="a-chart-link text-medium-l"
  >
    <span class="a-chart-link__dots">
      <span class="a-chart-link__dot" />
      <span class="a-chart-link__dot" />
      <span class="a-chart-link__dot" />
    </span>
    Обучение в ВУЗе
  </router-link>
</template>

<script setup>
defineProps({
  link: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss">
.a-chart-link {
  display: flex;
  align-items: center;
  text-decoration: none;

  &__dots {
    display: flex;
  }

  &__dot {
    @include wh(6, 6);
    margin-right: margin(4);
    background-color: color(blue-button);
    border-radius: 50%;

    &:last-child {
      margin-right: margin(8);
    }
  }
}
</style>

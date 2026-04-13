<template>
  <section
    v-if="item"
    class="s-specialty-about"
  >
    <h2 class="s-specialty-about__title">
      О программе
    </h2>
    <div class="text-regular-m">
      {{ item.$specialty.description_work }}
    </div>
  </section>
</template>

<script setup>
defineProps({
  item: {
    type: [Object, null],
    default: null,
  },
});
</script>

<style lang="scss">
.s-specialty-about {
  // border-top: 1px solid color(stroke);

  &__title {
    margin-bottom: margin(24);
  }

  p {
    margin-bottom: margin(8);
    color: color(gray);
  }
}
</style>

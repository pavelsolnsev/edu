<template>
  <section class="s-vuz-gallery">
    <h2
      v-if="title"
      class="s-vuz-gallery__title container"
    >
      {{ title }}
    </h2>
    <MVuzGallery :images="items" />
  </section>
</template>

<script setup>
import MVuzGallery from 'src/components/molecules/MVuzGallery';

defineProps({
  title: {
    type: String,
    default: '',
  },
  items: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="scss">
.s-vuz-gallery {
  &__title {
    margin-bottom: margin(40);
  }
}
</style>

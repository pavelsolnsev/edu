<template>
  <section
    v-if="items"
    class="s-vuz-brief"
  >
    <MListingCard
      v-for="(item, i) in items"
      :key="i"
      :item="item"
    />
  </section>
</template>

<script setup>
import MListingCard from '../molecules/MListingCard';

defineProps({
  items: {
    type: [Array, null],
    default: null,
  },
});
</script>

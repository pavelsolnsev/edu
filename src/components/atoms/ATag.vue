<template>
  <router-link
    :to="link"
    class="a-tag"
  >
    <q-chip
      color="blue-gray"
      :label="label"
      class="text-medium-s"
    />
  </router-link>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss">
.a-tag {
  .q-chip {
    padding: padding2(12, 24);
    height: auto;
    border-radius: rem(100);
  }
}
</style>

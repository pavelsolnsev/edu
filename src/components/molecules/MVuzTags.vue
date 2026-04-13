<template>
  <div class="m-vuz-tags">
    <template
      v-for="(label, i) in tags"
      :key="i"
    >
      <q-chip
        v-if="label"
        dense
        icon="check"
        :label="label"
        :class="['bg-inherit', 'text-gray', fontClass]"
      />
    </template>
  </div>
</template>

<script setup>
defineProps({
  tags: {
    type: Array,
    default: () => [],
  },
  fontClass: {
    type: String,
    default: 'text-medium-xs',
  },
});
</script>

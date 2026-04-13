<template>
  <div class="a-button-toggle">
    <p
      v-if="label"
      class="a-button-toggle__label text-medium-xs"
    >
      {{ label }}
    </p>
    <q-btn-toggle
      unelevated
      v-bind="$attrs"
      padding="0.5rem 1.5rem"
      color="light-blue"
      text-color="dark-blue-table"
      toggle-color="dark-blue-table"
      toggle-text-color="white"
      class="a-button-toggle__toggle text-semibold-m"
    />
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss">
.a-button-toggle {
  text-align: left;

  &__toggle {
    gap: 0 rem(16);
  }

  .q-btn:not(:last-child) {
    border-top-right-radius: bradius(8);
    border-bottom-right-radius: bradius(8);
  }

  .q-btn:last-child {
    border-top-left-radius: bradius(8);
    border-bottom-left-radius: bradius(8);
  }

  &__label {
    margin-bottom: margin(8)
  }
}
</style>

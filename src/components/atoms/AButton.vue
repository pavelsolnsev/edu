<template>
  <q-btn
    :unelevated="!$props.outline"
    :outline="!!$props.outline"
    color="primary"
    class="a-button"
    v-bind="$attrs"
  >
    <slot />
  </q-btn>
</template>

<script setup>
defineProps({
  outline: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss">
.a-button {
  text-transform: none;
  white-space: nowrap;
  font-size: rem(16);
  line-height: rem(24);
  padding: padding2(16, 24);
  font-weight: 500;

  &--form {
    padding: rem(14) padding(24);
    font-weight: 600;
  }

  &--card {
    padding: rem(18) padding(24);
    font-weight: 500;
  }

  &--wide {
    width: 100%;
  }

  &--lg {
    padding: padding2(20, 24);
    height: rem(72);
    font-weight: 500;
    font-size: rem(24);
    line-height: rem(32);
  }

  &--bold {
    font-weight: 600;

    &:before {
      border-width: 2px;
    }
  }
}
</style>

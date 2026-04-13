<template>
  <SMainSection class="s-static-text">
    <h3 v-if="title">
      {{ title }}
    </h3>
    <div :class="['text-regular-m text-gray', { 'a-mt-32': !!title}]">
      <slot name="default" />
    </div>
  </SMainSection>
</template>

<script setup>
import SMainSection from './SMainSection.vue';

defineProps({
  title: {
    type: [String, null],
    required: true,
  },
});
</script>

<style lang="scss">
.s-static-text {
  // $
  @include adaptivePadding(64, 40);

  p:not(:first-child) {
    margin-top: margin(16);
    margin-bottom: 0;
  }
}
</style>

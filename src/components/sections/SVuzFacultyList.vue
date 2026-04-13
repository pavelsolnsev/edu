<template>
  <SMainSection class="s-vuz-faculty-list section--sidebar-padding">
    <div
      v-for="item in items"
      :key="item.name"
      class="m-faculty-item a-mt-32"
    >
      <router-link :to="`${url}faculties/${item.code}/`">
        <h4 class="text-dark">
          {{ item.name }}
        </h4>
      </router-link>
      <div class="a-mt-8 text-regular-m text-gray">
        {{ item.address }}
      </div>
    </div>
  </SMainSection>
</template>

<script setup>
import SMainSection from './SMainSection.vue';

defineProps({
  items: {
    type: Array,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss">
.s-vuz-faculty-list {
  margin-bottom: margin(120);
  .m-faculty-item:not(:last-child) {
    padding-bottom: padding(32);
    border-bottom: 1px solid color(stroke);
  }
}
</style>

<template>
  <div>
    <h4 class="a-mb-24">
      {{ title }}
    </h4>
    <ul>
      <li
        v-for="(item, index) in items"
        :key="index"
      >
        <router-link :to="`/jour/?rubric=${item.code}`">
          {{ item.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    default: () => [],
  },
});
</script>
<style lang="scss">

</style>

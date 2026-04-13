<template>
  <div class="m-specs-all-box a-mb-24">
    <h4 class="a-mb-16">
      {{ title }}
    </h4>
    <div
      v-for="item in items"
      :key="item.id"
      class="m-specs-all-box__item a-mb-8"
    >
      <time class="text-medium a-mr-8">
        {{ item.date }}
      </time>
      <div>
        {{ item.name }}
      </div>
    </div>
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
    required: true,
  },
});
</script>
<style lang="scss">
.m-specs-all-box {
  &:last-child {
    margin-bottom: 0;
  }
  &__item {
    display: flex;
    align-items: center;
    font-size: rem(14);
    @media (max-width: $breakpoint-xs) {
      flex-direction: column;
      align-items: flex-start;
    }
  }
}
</style>

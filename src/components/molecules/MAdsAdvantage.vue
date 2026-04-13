<template>
  <div class="m-ads-advantage">
    <div class="m-ads-advantage__icon a-mb-20">
      <q-icon
        :name="icon"
        size="3rem"
        color="primary"
      />
    </div>
    <p class="m-ads-advantage__title text-medium-l a-mb-8">
      {{ title }}
    </p>
    <p class="m-ads-advantage__text text-regular-m">
      {{ text }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss">
.m-ads-advantage {
  &__icon {
    display: inline-block;
    padding: rem(4);
    margin-bottom: margin(20);
    background-color: color(light-gray);
    border-radius: bradius(8);
  }

  &__text {
    margin-bottom: 0;
  }
}
</style>

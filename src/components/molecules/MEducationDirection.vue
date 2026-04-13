<template>
  <router-link
    :to="link"
    class="m-education-direction"
  >
    <div class="m-education-direction__image-wrap">
      <q-img
        class="m-education-direction__image"
        :src="image"
      />
    </div>
    <div
      class="m-education-direction__text text-semibold-m"
    >
      {{ label }}
    </div>
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
  image: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss">
.m-education-direction {
  display: flex;
  align-items: center;
  padding: padding2(24, 16);
  border-radius: bradius(8);
  border: rem(1) solid color(light-blue);
  text-decoration: none;

  &:visited {
    color: color(dark);
  }

  @media (max-width: $breakpoint-md) {
    padding: padding(16);
  }

  @media (max-width: $breakpoint-sm) {
    padding: padding(8);
  }

  &__image-wrap {
    @include wh(80, 80);
    flex: 0 0 auto;
    margin-right: margin(16);
    border-radius: bradius(8);
  }

  &__image {
    height: rem(80);
  }
}
</style>

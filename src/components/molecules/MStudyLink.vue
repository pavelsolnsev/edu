<template>
  <router-link
    :to="link"
    class="m-study-link"
  >
    <div class="m-study-link__icon-wrap">
      <q-img
        class="m-study-link__icon"
        :src="icon"
      />
    </div>
    <div class="m-study-link__text text-medium-l">
      {{ label }}
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  link: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss">
.m-study-link {
  display: flex;
  min-height: rem(91);
  text-decoration: none;
  color: color(dark);
  border-radius: bradius(8);
  border: 1px solid color(light-blue);

  &:visited {
    color: color(dark);
  }

  &__icon-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    width: rem(80);
    border-radius: bradius(8);
    background-color: color(blue-gray);
  }

  &__icon {
    width: rem(56);
  }

  &__text {
    display: flex;
    align-items: center;
    padding: padding(16);
  }
}
</style>

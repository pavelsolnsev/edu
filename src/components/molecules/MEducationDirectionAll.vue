<template>
  <router-link
    :to="'/'"
    class="m-education-direction-all"
  >
    <div class="m-education-direction-all__label">
      <p
        class="m-education-direction-all__text text-semibold-m"
      >
        Показать все
      </p>
      <q-icon
        name="trending_flat"
        size="1.5rem"
      />
    </div>
    <q-img
      :src="require('/public/img/main/education-directions/direction-all.png')"
      class="m-education-direction-all__image"
    />
  </router-link>
</template>

<style lang="scss">
.m-education-direction-all {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  min-height: rem(112);
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

  @media (max-width: $breakpoint-xs) {
    min-height: rem(98);
  }

  &__label {
    display: flex;
    align-items: center;
  }

  &__text {
    margin-bottom: 0;
    margin-right: margin(8);
  }

  &__image {
    width: rem(64);
    height: rem(48);
  }
}
</style>

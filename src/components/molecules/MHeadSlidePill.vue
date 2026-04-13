<template>
  <div class="m-headslide-pill">
    <div class="m-headslide-pill__wrapper">
      <div class="m-headslide-pill__value text-card-l">
        {{ value }}
      </div>
      <div class="m-headslide-pill__label text-medium-m">
        {{ label }}
      </div>
    </div>
    <div class="m-headslide-pill__icon">
      <q-img :src="icon" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
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
.m-headslide-pill {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: flex-start;
  min-height: rem(124);
  padding: padding2(24, 16);
  background-color: color(white);
  border-radius: bradius(16);

  &__wrapper {
    flex: 1 1 auto;
  }

  &__value {
    color: color(primary);
  }

  &__label {
    margin-top: margin(8);
    color: color(gray);
    @media screen and (max-width: $breakpoint-sm) {
      margin-top: margin(4);
    }
  }

  &__icon {
    flex: 0 1 auto;
    padding-left: padding(8);
    width: rem(80);
    @media screen and (max-width: $breakpoint-sm) {
      width: rem(64);
    }
  }
}
</style>

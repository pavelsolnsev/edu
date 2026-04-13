<template>
  <div class="m-vuz-additional-info">
    <div
      v-if="$hostnames.isVuz"
      class="m-vuz-additional-info__item text-medium-m"
    >
      <div class="m-vuz-additional-info__verified text-medium-m">
        {{ info.esi_letter }}
      </div>
      {{ info.status }}
    </div>
    <div
      v-if="info.metro"
      class="m-vuz-additional-info__item text-medium-m"
    >
      <q-icon
        class="m-vuz-additional-info__icon"
        name="img:/icons/metro.svg"
        size="1.5rem"
      />
      {{ info.metro }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  info: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss">
.m-vuz-additional-info {
  display: flex;

  @media(max-width: $breakpoint-xs) {
    flex-direction: column;
  }

  &__item {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: color(basic);

    &:visited {
      color: color(basic);
    }

    &:first-child {
      margin-right: margin(32);

      @media(max-width: $breakpoint-xs) {
        margin-right: 0;
        margin-bottom: margin(12)
      }
    }
  }

  &__icon {
    margin-right: margin(8);
  }

  &__verified {
    @include wh(24, 24);
    margin-right: margin(8);
    text-align: center;
    color: white;
    background: color(positive);
    border-radius: bradius(100);
  }
}
</style>

<template>
  <div class="m-ads-price">
    <div class="m-ads-price__head">
      <p class="m-ads-price__number text-semibold-xl">
        <span>{{ number }}</span>
      </p>
      <p class="text-medium-l">
        {{ title }}
      </p>
    </div>
    <p class="text-regular-m">
      Сквозное размещение
    </p>
    <p class="m-ads-price__caption text-medium-xs">
      Стоимость размещения в неделю:
    </p>
    <p class="m-ads-price__price-weekly text-semibold-m">
      {{ priceWeek }}
    </p>
    <p class="m-ads-price__caption text-medium-xs">
      Стоимость размещения в месяц:
    </p>
    <p class="m-ads-price__price-monthly text-semibold-m">
      {{ priceMonth }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  number: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  priceWeek: {
    type: String,
    default: '',
  },
  priceMonth: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss">
.m-ads-price {
  color: color(gray);

  &__head {
    display: flex;
    align-items: center;
    margin-bottom: margin(8);
    gap: rem(8) rem(8);

    p {
      margin-bottom: 0;
    }

    @media(max-width: $breakpoint-sm) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  &__caption {
    margin-bottom: 0;
  }

  &__price-weekly {
    margin-bottom: margin(8);
  }

  &__price-monthly {
    margin-bottom: 0;
  }

  &__number {
    position: relative;
    @include wh(48, 48);
    flex-shrink: 0;
    border-radius: 50%;
    border: 2px dashed color(dark-bluer);

    span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>

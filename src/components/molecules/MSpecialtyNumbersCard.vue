<template>
  <q-card class="m-specialty-numbers-card">
    <div class="m-specialty-numbers-card__top">
      <div class="m-specialty-numbers-card__price">
        <p class="m-specialty-numbers-card__title text-medium-s">
          Стоимость обучения:
        </p>
        <p class="m-specialty-numbers-card__value text-semibold-xl">
          {{ price }}
        </p>
      </div>
      <div class="m-specialty-numbers-card__time">
        <p class="m-specialty-numbers-card__title text-medium-s">
          Время обучения:
        </p>
        <p class="m-specialty-numbers-card__value text-semibold-xl">
          {{ time }}
        </p>
      </div>
    </div>
    <div class="m-specialty-numbers-card__bottom">
      <p
        :class="['m-specialty-numbers-card__timestamp text-medium-s', {
          'text-green': actual,
          'text-red': !actual
        }]"
      >
        <q-icon
          :name="actual ? 'done' : 'warning'"
          :color="actual? 'green': 'red'"
          size="1.5rem"
        />
        Информация {{ timeStamp }} года
      </p>
    </div>
  </q-card>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  price: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: String,
    required: true,
  },
});
const actual = computed(() => String(new Date().getFullYear()) === props.timeStamp);
</script>

<style lang="scss">
.m-specialty-numbers-card {
  width: rem(536);
  box-shadow: none;
  border-radius: bradius(16);

  @media(max-width: $breakpoint-xs) {
    width: 100%;
  }

  &__top {
    display: flex;
    padding: padding2(24, 32);
    gap: rem(16) 0;
    background-color: color(blue-gray);

    & > * {
      width: 50%;
    }

    @media(max-width: $breakpoint-xs) {
      flex-direction: column;

      & > * {
        width: 100%;
      }
    }
  }

  &__bottom {
    padding: padding2(12, 32);
    background-color: color(light-blue);
  }

  &__price {
    padding-right: 8px;
  }

  &__title {
    margin-bottom: rem(4);
  }

  &__value {
    margin-bottom: 0;
  }

  &__timestamp {
    margin-bottom: 0;
    color: color(green);
  }
}
</style>

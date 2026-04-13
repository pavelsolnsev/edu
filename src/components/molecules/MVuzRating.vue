<template>
  <div class="m-vuz-rating row no-wrap justify-center items-center">
    <div class="col-auto">
      <div class="m-vuz-rating__label">
        {{ level }}
      </div>
    </div>
    <div class="col-auto text-medium-s">
      ESI
    </div>
    <div class="col-auto">
      <q-icon
        name="help_outline"
        color="secondary"
        class="a-ml-4 text-s"
      >
        <q-tooltip
          class="m-vuz-rating__tooltip a-pa-16 bg-blue-gray text-dark text-regular-s cursor-pointer"
        >
          Внутренний рейтинг ВУЗов.<br>
          Рассчитывается на основании <br>
          формальных показателей деятельности<br>
          из официальных источников.
        </q-tooltip>
      </q-icon>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  esi: {
    type: [String, Number, null],
    required: true,
  },
});

const level = computed(() => {
  const esi = parseInt(props.esi, 10);
  return esi === null ? 'C' : esi > 7 ? 'A' : esi > 3 ? 'B' : 'C';
});

</script>

<style lang="scss">
.m-vuz-rating {
  margin-top: margin(16);

  &__label {
    @include wh(24, 24);
    font-size: rem(12);
    font-weight: 500;
    line-height: rem(24);
    margin-right: margin(8);
    text-align: center;
    color: color(white);
    background: color(positive);
    border-radius: bradius(100);
    @media screen and (max-width: $breakpoint-xs) {
      @include wh(16, 16);
      margin-right: margin(4);
      font-size: rem(10);
      line-height: rem(16);
    }
  }

  &__tooltip {
    border: 1px solid color(light-gray);
  }
}
</style>

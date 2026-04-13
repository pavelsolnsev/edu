<template>
  <div class="m-chart-numbers">
    <div class="m-chart-numbers__top bg-white a-pa-24">
      <div class="text-h3 text-blue-button">
        {{ cardValue }}<span v-if="formatter==='m2'"> м<sup>2</sup></span>
      </div>
      <div class="text-regular-s a-mt-8">
        {{ data.data[0].label }}
      </div>
    </div>
    <div class="m-chart-numbers__bottom bg-blue-gray a-pa-24">
      <span class="text-h3">{{ data.data[1].value }}</span>
      <span class="text-regular-s">&nbsp;{{ data.data[1].label }}</span>
      <span class="text-semibold-s">&nbsp;{{ data.data[2].value }}</span>
      <span class="text-regular-s">&nbsp;{{ data.data[2].label }}</span>
    </div>
  </div>
</template>

<script setup>
import { formatPrice } from 'src/lib/functions';
import { computed } from 'vue';

const props = defineProps({
  data: {
    type: [Object, null],
    default: null,
  },
  formatter: {
    type: String,
    default: 'number',
  },
});

const cardValue = computed(() => {
  const r = props.data.data[0].value;
  switch (props.formatter) {
    case 'roubles': return `${formatPrice(r)} ₽`;
    case 'percent': return `${r} %`;
    default: return r;
  }
});
</script>

<style lang="scss">
.m-chart-numbers {
  border: 1px solid color(blue-gray);
  border-radius: bradius(16);
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;

  &__bottom {
    overflow: hidden;
    flex: 0 1 auto;
  }

  &__top {
    overflow: hidden;
    flex: 1 1 auto;
  }
}
</style>

<template>
  <div class="m-simple-chart">
    <div class="m-simple-chart__legend-wrapper">
      <div class="m-simple-chart__title text-l text-medium">
        {{ title }}
      </div>
      <div class="m-simple-chart__legend">
        <div
          v-for="(item, i) in data"
          :key="i"
          class="row n-wrap m-simple-chart__legend-item"
        >
          <div
            class="m-simple-chart__legend-item-marker"
            :style="{ backgroundColor: getColor(i) }"
          />
          <div class="m-simple-chart__legend-item-label text-xs text-gray">
            {{ item.label }}
          </div>
        </div>
      </div>
    </div>
    <div class="m-simple-chart__content">
      <div
        v-for="(col, i) in data"
        :key="i"
        class="m-simple-chart__content-col"
        :style="getColumnStyle(i, col)"
      >
        <div class="m-simple-chart__content-datalabel text-xs text-medium">
          {{ formatValue(col.value) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  data: {
    type: Array,
    default: () => [],
  },
  colors: {
    type: Array,
    default: () => [
      '#4650F1', // Blue
      '#71C6F1', // Cyan
      '#3F87E3',
      '#53759A',
      '#E57836', // Brown
    ],
  },
  formatter: {
    type: String,
    default: 'none',
  },
});

const getColor = (i) => props.colors[i % props.colors.length];
const formatValue = (val) => (props.formatter === 'percent' ? `${val}%` : val);

const series = computed(() => props.data.map((item) => item.value));
const maxValue = computed(() => Math.max(...series.value));

const getColumnStyle = (i, col) => ({
  backgroundColor: getColor(i),
  height: '100%',
  maxHeight: `${((col.value * 100) / maxValue.value).toFixed(3)}%`,
});
</script>

<style lang="scss">
.m-simple-chart {
  width: 100%;
  height: rem(248);

  display: flex;
  flex-direction: column;

  &__content {
    flex: 1 1 auto;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: flex-end;
    margin-top: margin(48);
    padding: padding4(0, 24, 8, 24);
    border-bottom: 2px solid color(stroke);
  }

  &__content-col {
    flex: 1 1 auto;
    overflow: visible;
    border-radius: bradius(8);
  }

  &__content-col:not(:first-child) {
    margin-left: margin(16);
  }

  &__content-datalabel {
    margin-top: rem(-26);
    text-align: center;
  }

  &__legend {
    margin-top: margin(16);
  }

  &__legend-item {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }

  &__legend-item-marker {
    flex: 0 1 auto;
    @include wh(24, 18);
    margin-right: margin(8);
    background-color: color(primary);
    border-radius: margin(4);
  }

  &__legend-item-label {
    flex: 1 1 auto;
  }

  &__legend-item:not(:first-child) {
    margin-top: margin(16);
  }
}
</style>

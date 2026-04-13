<template>
  <div class="m-complex-chart">
    <div class="m-complex-chart__legend-wrapper">
      <div class="m-complex-chart__title">
        {{ title }}
      </div>
      <div class="m-complex-chart__legend">
        <div
          v-for="(item, i) in data"
          :key="i"
          class="row n-wrap m-complex-chart__legend-item"
        >
          <div
            class="m-complex-chart__legend-item-marker"
            :style="{ backgroundColor: getColor(i) }"
          />
          <div class="m-complex-chart__legend-item-label">
            {{ item.label }}
          </div>
        </div>
      </div>
    </div>
    <div class="m-complex-chart__content">
      <VueApexCharts
        type="bar"
        :options="chart.chartOptions"
        :series="chart.series"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

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

const series = computed(() => props.data.map((item) => item.value));
const categories = computed(() => props.data.map((item) => item.label));

const chart = {
  series: [
    {
      name: 'Бюджетные места',
      data: series.value,
    },
  ],
  chartOptions: {
    chart: {
      height: 'auto',
      type: 'bar',
      sparkline: { enabled: true },
    },
    colors: props.colors,
    plotOptions: {
      bar: {
        distributed: true,
        columnWidth: '87%',
        dataLabels: { position: 'top' },
      },
    },
    dataLabels: {
      enabled: true,
      formatter(val) {
        if (props.formatter === 'percent') {
          return `${val}%`;
        }
        return `${val}`;
      },
      offsetY: -22,
      style: {
        fontWeight: '400',
        fontSize: '12px',
        colors: ['#2E2E2E;'],
      },
    },
    xaxis: { categories: categories.value },
    yaxis: {
      max: props.formatter === 'percent' ? 120 : undefined,
    },
  },
};
</script>

<style lang="scss">
.m-complex-chart {
  width: rem(370);
  overflow: hidden;
  height: rem(248);
  display: flex;
  flex-direction: column;

  &__content {
    flex: 1 1 auto;
    margin-top: rem(22);
    padding: 0 rem(24) rem(8) rem(24);
    border-bottom: 2px solid #a7a7a7;
  }

  &__legend-wrapper {
    flex: 0 1 auto;
  }

  &__title {
    font-weight: 500;
    font-size: rem(18);
    line-height: rem(22);
  }

  &__legend {
    margin-top: rem(16);
  }

  &__legend-item-marker {
    width: rem(24);
    height: rem(18);
    margin-right: rem(8);
    background-color: $primary;
    border-radius: bradius(4);
  }

  &__legend-item-label {
    font-weight: 400;
    font-size: rem(12);
    line-height: rem(18);
    color: #4b4b4b;
  }

  &__legend-item:not(:first-child) {
    margin-top: rem(16);
  }
}

</style>

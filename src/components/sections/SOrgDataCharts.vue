<template>
  <SChartTemplate
    v-if="charts"
    :title="title"
    :subtitle="subtitle"
    :link="link"
  >
    <template #top>
      <MSimpleChart
        v-if="charts?.data?.direction"
        :title="charts.data.direction.label"
        :data="charts.data.direction.data"
        :colors="colors.five"
        class="m-simple-chart_landscape"
        formatter="percent"
      />
    </template>
    <template
      v-for="chart in dataCharts"
      :key="chart.key"
    >
      <MSimpleChart
        v-if="charts?.data?.[chart.key]"
        :title="charts.data[chart.key].label"
        :data="charts.data[chart.key].data"
        :colors="colors[chart.colors]"
        :formatter="chart.formatter"
      />
    </template>
    <template v-if="full">
      <h2 class="a-mt-64">
        Вуз в регионе
      </h2>
      <div
        style="width: 100%"
        class="row q-col-gutter-lg a-mt-32"
      >
        <template
          v-for="chart in dataNumbers"
          :key="chart.key"
        >
          <div
            v-if="charts?.data?.[chart.key]"
            class="col-lg-4 col-md-4 col-sm-6 col-xs-12"
          >
            <MChartNumbers
              :data="charts.data[chart.key]"
              :formatter="chart.formatter"
            />
          </div>
        </template>
      </div>
      <h2 class="a-mt-48">
        Преподаватели
      </h2>
      <template
        v-for="chart in dataCharts2"
        :key="chart.key"
      >
        <MSimpleChart
          v-if="charts?.data?.[chart.key]"
          :title="charts.data[chart.key].label"
          :data="charts.data[chart.key].data"
          :colors="colors[chart.colors]"
          :formatter="chart.formatter"
        />
      </template>
    </template>
  </SChartTemplate>
</template>

<script setup>
import MSimpleChart from 'src/components/molecules/MSimpleChart';

import MChartNumbers from '../molecules/MChartNumbers';
import SChartTemplate from './SChartTemplate';

defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
  link: {
    type: String,
    default: '',
  },
  charts: {
    type: [Object, null],
    default: null,
  },
  full: {
    type: Boolean,
    default: false,
  },
});

const colors = {
  five: [
    '#4650F1', // Blue
    '#71C6F1', // Cyan
    '#3F87E3',
    '#53759A',
    '#E57836', // Brown
  ],
  bcb: [
    '#4650F1', // Blue
    '#71C6F1', // Cyan
    '#E57836', // Brown
  ],
  bbg: [
    '#4650F1', // Blue
    '#E57836', // Brown
    '#428293', // Green
  ],
  two: [
    '#4650F1', // Blue
    '#E57836', // Brown
  ],
};

const dataCharts = [
  { key: 'form', formatter: 'percent', colors: 'bcb' },
  { key: 'level', formatter: 'percent', colors: 'two' },
  { key: 'budget', formatter: 'percent', colors: 'two' },
  { key: 'nat_student', formatter: 'percent', colors: 'bbg' },
  { key: 'reg_teacher', formatter: 'percent', colors: 'two' },
];

const dataNumbers = [
  { key: 'ege_budget', formatter: 'number' },
  { key: 'ege_commercial', formatter: 'number' },
  { key: 'cost', formatter: 'roubles' },
  { key: 'place', formatter: 'm2' },
  { key: 'pc', formatter: 'number' },
  { key: 'hostel', formatter: 'percent' },
];

const dataCharts2 = [
  { key: 'education', formatter: 'percent', colors: 'bbg' },
  { key: 'age_teacher', formatter: 'percent', colors: 'bcb' },
  { key: 'nat_teacher', formatter: 'percent', colors: 'two' },
];

</script>

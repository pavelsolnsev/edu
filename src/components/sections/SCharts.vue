<template>
  <SChartTemplate
    :title="title"
    :subtitle="subtitle"
    class="section--adaptive-padding bg-blue-gray"
  >
    <template #top>
      <MSimpleChart
        title="Направления обучения"
        :data="data.napravlenia"
        :colors="colors.five"
        class="m-simple-chart_landscape"
      />
    </template>
    <MSimpleChart
      title="Форма обучения"
      :data="data.forma_obuchenia"
      :colors="colors.bcb"
      formatter="percent"
    />
    <MSimpleChart
      title="Учебные заведения"
      :data="data.uchebnie_zavedenia"
      :colors="colors.two"
      formatter="percent"
    />
    <MSimpleChart
      title="Форма собственности"
      :data="data.forma_sobstvennosti"
      :colors="colors.two"
      formatter="percent"
    />
    <MSimpleChart
      title="Обучается на"
      :data="data.obuchaetsa_na"
      :colors="colors.two"
      formatter="percent"
    />
    <MSimpleChart
      title="Количество студентов в"
      :data="data.kolichestvo_studentov"
      :colors="colors.two"
      formatter="percent"
    />
  </SChartTemplate>
</template>

<script setup>
import MSimpleChart from 'src/components/molecules/MSimpleChart';

import SChartTemplate from './SChartTemplate.vue';

defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
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

const data = {
  napravlenia: [
    { label: 'Науки об обществе', value: 3245 },
    { label: 'Инженерное дело, технологии и технически', value: 2937 },
    { label: 'Здравоохранение и медицинские науки', value: 1832 },
    { label: 'Математические и естественные науки', value: 1832 },
    { label: 'Другое', value: 2523 },
  ],
  forma_obuchenia: [
    { label: 'Очно', value: 68 },
    { label: 'Очно-заочно', value: 24 },
    { label: 'Заочно', value: 8 },
  ],
  uchebnie_zavedenia: [
    { label: 'ВУЗы', value: 95 },
    { label: 'Филиалы', value: 5 },
  ],
  forma_sobstvennosti: [
    { label: 'Государственные ВУЗы', value: 59 },
    { label: 'Негосударственные ВУЗы', value: 41 },
  ],
  obuchaetsa_na: [
    { label: 'Бюджете', value: 43 },
    { label: 'Платном', value: 57 },
  ],
  kolichestvo_studentov: [
    { label: 'Государственных ВУЗах', value: 43 },
    { label: 'Негосударственных ВУЗах', value: 57 },
  ],
};
</script>

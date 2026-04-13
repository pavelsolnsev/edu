<template>
  <SMainHeadSlide />
  <SMainVuzList />
  <SMainEnter />
  <SVuzChoose />
  <SEducationDirections />
  <SMainDirections
    :title="'Направление ВУЗов'"
    :directions="directions"
  />
  <SRemoteStudy />
  <SAboutMain />
  <SCharts title="Статистика вузов проекта" />
  <SQuiz />
</template>

<script>
import { useDefaultStore } from 'stores/default';

export default {
  preFetch({ store }) {
    const $store = useDefaultStore(store);
    return $store.loadCitiesTop();
  },
};
</script>

<script setup>
import SAboutMain from 'src/components/sections/SAboutMain';
import SCharts from 'src/components/sections/SCharts';
import SEducationDirections from 'src/components/sections/SEducationDirections';
import SMainDirections from 'src/components/sections/SMainDirections';
import SMainEnter from 'src/components/sections/SMainEnter.vue';
import SMainHeadSlide from 'src/components/sections/SMainHeadSlide.vue';
import SMainVuzList from 'src/components/sections/SMainVuzList.vue';
import SQuiz from 'src/components/sections/SQuiz.vue';
import SRemoteStudy from 'src/components/sections/SRemoteStudy';
import SVuzChoose from 'src/components/sections/SVuzChoose';
import { mapDirections } from 'src/lib/constants';

const directions = mapDirections;

</script>

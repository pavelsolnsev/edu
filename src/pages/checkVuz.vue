<template>
  <MBreadcrumbs
    :items="breadcrumbs"
    class="section--sidebar-padding"
  />
  <SMainSection class="section--sidebar-padding">
    <MOrgSide
      :items-top="sideItems"
      class="m-org-side--detail m-org-side--dense"
    />
    <h1 class="s-vuzdata-header__title">
      Проверить вуз
    </h1>
    <SVuzSearch
      class="a-mt-32"
      @get-vuz="org = $event"
    />
    <SVuzSearchResult :org="org" />
  </SMainSection>
  <SQuiz />
</template>

<script setup>
import MOrgSide from 'components/molecules/MOrgSide';
import MBreadcrumbs from 'src/components/molecules/MBreadcrumbs';
import SMainSection from 'src/components/sections/SMainSection.vue';
import SQuiz from 'src/components/sections/SQuiz';
import SVuzSearch from 'src/components/sections/SVuzSearch';
import SVuzSearchResult from 'src/components/sections/SVuzSearchResult';
import { ref } from 'vue';

const org = ref(null);

const sideItems = [
  {
    title: 'Проверить ВУЗ',
    icon: 'magnify',
    url: '/',
  },
  {
    title: 'Мои специальности',
    icon: 'docs',
    url: '/favor/',
  },
];
const breadcrumbs = [
  {
    title: 'Вузы России',
    link: '/',
  },
];
</script>

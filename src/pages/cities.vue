<template>
  <MBreadcrumbs
    :items="breadcrumbs"
    class="section--sidebar-padding"
  />
  <SMainSection class="section--sidebar-padding">
    <MOrgSide
      :items-top="sideItems"
      integration="/img/integration/integration-placeholder.png"
      class="m-org-side--detail m-org-side--dense"
    />
    <SCities />
  </SMainSection>
  <SQuiz />
</template>

<script>
import { useDefaultStore } from 'src/stores/default';

export default {
  preFetch({ store }) {
    const $store = useDefaultStore(store);
    return $store.loadSubjectsWithCities();
  },
};
</script>

<script setup>
import { useMeta } from 'quasar';
import MBreadcrumbs from 'src/components/molecules/MBreadcrumbs';
import MOrgSide from 'src/components/molecules/MOrgSide';
import SCities from 'src/components/sections/SCities';
import SMainSection from 'src/components/sections/SMainSection';
import SQuiz from 'src/components/sections/SQuiz';

const sideItems = [
  { title: 'Проверить ВУЗ', icon: 'magnify', url: '/' },
  { title: 'Мои специальности', icon: 'docs', url: '/favor/' },
];

const breadcrumbs = [
  {
    title: 'Вузы России',
    link: '/',
  },
];
useMeta(() => ({
  title: 'Вузы в городах России',
  meta: {
    description: { name: 'description', content: 'Демо: вузы по городам (портфолио)' },
  },
}));
</script>

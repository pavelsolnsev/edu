<template>
  <MBreadcrumbs
    :items="breadcrumbs"
    class="section--sidebar-padding"
  />
  <SMainSection class="section--sidebar-padding">
    <SContacts />
  </SMainSection>
  <SQuiz />
</template>
<script setup>
import { useMeta } from 'quasar';
import MBreadcrumbs from 'src/components/molecules/MBreadcrumbs';
import SContacts from 'src/components/sections/SContacts';
import SMainSection from 'src/components/sections/SMainSection';
import SQuiz from 'src/components/sections/SQuiz';

const breadcrumbs = [
  {
    title: 'Главная',
    link: '/',
  },
  {
    title: 'Контакты',
    link: '/',
  },
];

useMeta(() => ({
  title: 'Контакты (демо)',
  meta: {
    description: {
      name: 'description',
      content: 'Демо: вымышленные контакты для портфолио.',
    },
  },
}));
</script>
<style lang="scss">
</style>

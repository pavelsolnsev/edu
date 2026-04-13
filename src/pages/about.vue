<template>
  <MBreadcrumbs
    :items="breadcrumbs"
    class="section--sidebar-padding"
  />
  <SAbout />
  <SQuiz />
</template>
<script setup>
import { useMeta } from 'quasar';
import MBreadcrumbs from 'src/components/molecules/MBreadcrumbs';
import SAbout from 'src/components/sections/SAbout';
import SQuiz from 'src/components/sections/SQuiz';

const breadcrumbs = [
  {
    title: 'Главная',
    link: '/',
  },
  {
    title: 'О проекте',
    link: '/',
  },
];

useMeta(() => ({
  title: 'О проекте (демо, портфолио)',
  meta: {
    description: {
      name: 'description',
      content: 'Демо-страница «О проекте» без привязки к продакшен-домену.',
    },
  },
}));
</script>
<style lang="scss">
</style>

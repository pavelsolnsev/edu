<template>
  <MBreadcrumbs :items="breadcrumbs" />
  <SHandbook />
  <SQuiz />
</template>

<script setup>
import MBreadcrumbs from 'src/components/molecules/MBreadcrumbs';
import SHandbook from 'src/components/sections/SHandbook';
import SQuiz from 'src/components/sections/SQuiz';

const breadcrumbs = [
  {
    title: 'Вузы России',
    link: '/',
  },
];
</script>

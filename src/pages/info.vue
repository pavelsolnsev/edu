<template>
  <MBreadcrumbs
    :items="breadcrumbs"
  />
  <SMainSection class="section--sidebar-padding">
    <h1 class="a-mb-40">
      Информация для вузов
    </h1>
    <SInfo class="a-mb-72" />
  </SMainSection>
  <SQuiz />
</template>

<script setup>
import MBreadcrumbs from 'src/components/molecules/MBreadcrumbs';
import SInfo from 'src/components/sections/SInfo';
import SMainSection from 'src/components/sections/SMainSection';
import SQuiz from 'src/components/sections/SQuiz';

const breadcrumbs = [
  {
    title: 'Вузы России',
    link: '/',
  },
];
</script>

<template>
  <MBreadcrumbs
    :items="breadcrumbs"
    class="section--sidebar-padding"
  />
  <SMainSection class="section--sidebar-padding">
    <SRegulations />
  </SMainSection>
  <SQuiz />
</template>
<script setup>
import MBreadcrumbs from 'src/components/molecules/MBreadcrumbs';
import SMainSection from 'src/components/sections/SMainSection';
import SQuiz from 'src/components/sections/SQuiz';
import SRegulations from 'src/components/sections/SRegulations';

const breadcrumbs = [
  {
    title: 'Вузы России',
    link: '/',
  },
];
</script>
<style lang="scss">
</style>

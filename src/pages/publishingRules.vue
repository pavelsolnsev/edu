<template>
  <MBreadcrumbs
    :items="breadcrumbs"
    class="section--sidebar-padding"
  />
  <SMainSection class="section--sidebar-padding">
    <SPublishingRules />
  </SMainSection>
  <SQuiz />
</template>
<script setup>
import MBreadcrumbs from 'src/components/molecules/MBreadcrumbs';
import SMainSection from 'src/components/sections/SMainSection';
import SPublishingRules from 'src/components/sections/SPublishingRules.vue';
import SQuiz from 'src/components/sections/SQuiz';

const breadcrumbs = [
  {
    title: 'Отзывы',
    link: '/',
  },
];
</script>
<style lang="scss">
</style>

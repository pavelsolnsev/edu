<template>
  <MBreadcrumbs
    :items="breadcrumbs"
  />
  <SMainSection>
    <h1 class="s-ads__title">
      Реклама вузов
    </h1>
    <h3 class="a-mb-32">
      Контекстная и баннерная реклама
    </h3>
    <SAdsAdvantages />
    <SAdsMain />
  </SMainSection>
  <SAdsCoeff />
  <SQuiz />
</template>

<script setup>
import MBreadcrumbs from 'src/components/molecules/MBreadcrumbs';
import SAdsAdvantages from 'src/components/sections/SAdsAdvantages';
import SAdsCoeff from 'src/components/sections/SAdsCoeff';
import SAdsMain from 'src/components/sections/SAdsMain';
import SMainSection from 'src/components/sections/SMainSection';
import SQuiz from 'src/components/sections/SQuiz';

const breadcrumbs = [
  {
    title: 'Вузы России',
    link: '/',
  },
];
</script>

<style lang="scss">
.s-ads {
  &__title {
    margin-bottom: margin(40);

    @media(max-width: $breakpoint-sm) {
      margin-bottom: margin(16);
    }
  }
}
</style>

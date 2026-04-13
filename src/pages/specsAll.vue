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
    <SSpecsAll />
  </SMainSection>
  <SQuiz />
</template>

<script>
import { useListingStore } from 'stores/listing';

export default {
  preFetch({ store, currentRoute }) {
    const $listing = useListingStore(store);
    return $listing.loadOrganizations(currentRoute);
  },
};
</script>

<script setup>
import MBreadcrumbs from 'components/molecules/MBreadcrumbs.vue';
import SMainSection from 'components/sections/SMainSection.vue';
import SQuiz from 'components/sections/SQuiz.vue';
import SSpecsAll from 'components/sections/SSpecsAll.vue';
import MOrgSide from 'src/components/molecules/MOrgSide';

const breadcrumbs = [
  {
    title: 'Вузы России',
    link: '/',
  },
  {
    title: 'Специальности ВУЗов',
    link: '/',
  },
];

const sideItems = [
  { title: 'Проверить ВУЗ', icon: 'magnify', url: '/' },
  { title: 'Мои специальности', icon: 'docs', url: '/favor/' },
];

</script>
<style lang="scss">
  .s-vuz-wrapper {
    max-width: rem(770);
    @media (max-width: $breakpoint-md) {
      max-width: 100%;
    }
  }
</style>

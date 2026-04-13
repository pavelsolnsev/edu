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
    <SSpecAbout />
  </SMainSection>
  <div class="container">
    <div class="s-spec-about__wrapper a-mb-72">
      <div class="s-spec-about__step s-spec-about__step-prev">
        <span class="text-medium">Предыдущая специальность</span>
        <router-link to="/">
          <span>Прикладная математика и информатика</span>
        </router-link>
      </div>
      <div class="s-spec-about__step s-spec-about__step-next">
        <span class="text-medium">Следующая специальность</span>
        <router-link to="/">
          <span>Прикладная математика и информатика</span>
        </router-link>
      </div>
    </div>
  </div>
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
import SSpecAbout from 'components/sections/SSpecAbout.vue';
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

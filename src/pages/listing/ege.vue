<template>
  <MBreadcrumbs
    :items="breadcrumbs"
    class="section--sidebar-padding"
  />
  <SMainSection class="section--sidebar-padding a-mb-72">
    <MOrgSide
      :items-top="sideItems"
      integration="/img/integration/integration-placeholder.png"
      class="m-org-side--detail m-org-side--dense"
    />
    <SListingEge
      :key="$route"
      :h1="$listing.getMeta.h1"
      :forms="$listing.getFormsAll"
      :exams="$listing.getExamsAll"
      :route="$route"
    />
    <main
      v-if="$route.query['exam[]']"
      class="s-vuz-wrapper a-mt-40"
    >
      <SIntegrationMain />
      <SlistingCards :items="$listing.getOrganizations" />
      <MPagination
        :meta="$listing.getPaging"
        class="a-mt-40"
      />
      <div class="a-mt-40">
        <h4 class="a-mb-16">
          Куда можно поступить по ЕГЭ (Математика, Физика, Биология, Обществознание)
          в вузы Москвы?
        </h4>
        <p>
          В результатах поиска показаны все специальности в вузах Москвы с
          необходимым для поступления перечнем ЕГЭ (Математика, Физика, Биология, Обществознание).
          В контрольных цифрах приема указано количество
          бюджетных мест и стоимость обучения в 2023 году.
          Минимальный проходной балл указан по сумме всех
          предметов на основании результатов приема в 2022 году.
        </p>
      </div>
    </main>
  </SMainSection>
  <SQuiz />
</template>

<script>
import { useListingStore } from 'src/stores/listing';

export default {
  async preFetch({ store, currentRoute }) {
    const $listing = useListingStore(store);
    await $listing.loadForms();
    await $listing.loadExams();
    await $listing.loadOrganizations(currentRoute);
    return true;
  },
};
</script>

<script setup>
import { useMeta } from 'quasar';
import MBreadcrumbs from 'src/components/molecules/MBreadcrumbs';
import MOrgSide from 'src/components/molecules/MOrgSide';
import MPagination from 'src/components/molecules/MPagination';
import SIntegrationMain from 'src/components/sections/SIntegrationMain';
import SlistingCards from 'src/components/sections/SListingCards';
import SListingEge from 'src/components/sections/SListingEge';
import SMainSection from 'src/components/sections/SMainSection';
import SQuiz from 'src/components/sections/SQuiz';
import { useRoute } from 'vue-router';

const $listing = useListingStore();
const $route = useRoute();

const breadcrumbs = [
  {
    title: 'Главная',
    link: '/',
  },
  {
    title: 'Вузы Москвы по ЕГЭ',
    link: '/',
  },
];

const sideItems = [
  { title: 'Проверить ВУЗ', icon: 'magnify', url: '/' },
  { title: 'Мои специальности', icon: 'docs', url: '/favor/' },
];

useMeta(() => $listing.getMeta);
</script>
<style lang="scss">
  .s-vuz-wrapper {
    max-width: rem(770);
    @media (max-width: $breakpoint-md) {
      max-width: 100%;
    }
  }
</style>

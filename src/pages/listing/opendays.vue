<template>
  <MBreadcrumbs
    :items="breadcrumbs"
    class="section--sidebar-padding"
  />
  <SMainSection class="section--sidebar-padding">
    <MOrgSide
      :items-top="$hostnames.isVuz ? sideItems : []"
      integration="/img/integration/integration-placeholder.png"
      class="m-org-side--detail m-org-side--dense"
    />
    <h1 class="a-mb-24">
      Дни открытых дверей в {{ $hostnames.isVuz ? 'вузах' : 'колледжах' }}
      {{ $listingStore?.city?.name_rp ?? $listingStore?.subject?.name_rp ?? 'России' }}
    </h1>
    <SOpenDays
      :open-days="$listingStore.getOpenDays"
      :paging="$listingStore.getEventsPaging"
      :place-name="$listingStore?.city?.name_rp ?? $listingStore?.subject?.name_rp ?? 'России'"
    />
  </SMainSection>
  <SQuiz />
</template>

<script>
import { useListingStore } from 'stores/listing';

export default {
  async preFetch({ store, currentRoute }) {
    const $listingStore = useListingStore(store);
    await $listingStore.loadEvents(currentRoute, 30);
  },
};
</script>

<script setup>
import MBreadcrumbs from 'components/molecules/MBreadcrumbs';
import MOrgSide from 'components/molecules/MOrgSide';
import SMainSection from 'components/sections/SMainSection';
import SOpenDays from 'components/sections/SOpenDays';
import SQuiz from 'components/sections/SQuiz';
import { useMeta } from 'quasar';
import { computed } from 'vue';

const $listingStore = useListingStore();

const sideItems = [
  { title: 'Проверить ВУЗ', icon: 'magnify', url: '/' },
  { title: 'Мои специальности', icon: 'docs', url: '/favor/' },
];
const breadcrumbs = computed(() => [
  {
    title: 'Вузы России',
    link: '/',
  },
  {
    title: 'Вузы Москвы',
    link: '/',
  },
]);

useMeta(() => $listingStore.getMeta);
</script>

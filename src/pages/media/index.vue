<template>
  <MBreadcrumbs
    :items="breadcrumbs"
    class="section--sidebar-padding"
  />
  <SMainSection>
    <h1 class="a-mb-40">
      {{ $store.getArticlesMeta.h1 }}
    </h1>
    <div class="s-two-columns">
      <SMedia
        :items="$store.getArticles"
        :data="$store.articles"
        class="s-media"
      />
      <MVuzHeading
        :list="$store.getArticleRubrics"
        :list-title="listTitle"
        integration="/img/integration/krasivoe.png"
        class="m-vuz-heading"
      />
    </div>
  </SMainSection>
  <MPagination
    :meta="$store.getArticlesPaging"
    class="a-mt-40"
  />
  <SQuiz />
</template>

<script>
import { useDefaultStore } from 'src/stores/default';

export default {
  async preFetch({ store, currentRoute }) {
    const $store = useDefaultStore(store);
    await $store.loadArticleRubrics(currentRoute);
    await $store.loadArticles(currentRoute);
    return true;
  },
};
</script>

<script setup>
import MVuzHeading from 'components/molecules/MVuzHeading';
import { useMeta } from 'quasar';
import MBreadcrumbs from 'src/components/molecules/MBreadcrumbs';
import MPagination from 'src/components/molecules/MPagination';
import SMainSection from 'src/components/sections/SMainSection';
import SMedia from 'src/components/sections/SMedia';
import SQuiz from 'src/components/sections/SQuiz';

const $store = useDefaultStore();

useMeta(() => $store.getArticlesMeta);
const breadcrumbs = [
  {
    title: 'Главная',
    link: '/',
  },
  {
    title: 'Медиа',
    link: '/',
  },
];
const listTitle = 'Рубрики';
</script>
<style lang="scss">
  .s-two-columns {
    display: flex;
    align-items: flex-start;
    @media screen and (max-width: $breakpoint-md) {
      flex-direction: column-reverse;
    }
  }
  .s-media, .m-vuz-heading {
    width: 100%;
  }
</style>

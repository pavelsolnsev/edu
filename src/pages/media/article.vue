<template>
  <MBreadcrumbs
    :items="breadcrumbs"
    class="section--sidebar-padding"
  />
  <SMainSection
    v-if="article"
    class="section--sidebar-padding"
  >
    <MOrgSide
      integration="/img/integration/integration-placeholder.png"
      class="m-org-side--detail m-org-side--dense"
    />
    <MArticleTags
      :tags="article.$tags"
      :date="formatDate(article.published_at)"
    />
    <h1 class="s-article__title">
      {{ article.h1 }}
    </h1>
    <SArticleIntro
      :contents="null"
      :text="null"
      :img="null"
      class="a-mb-40"
    />
    <SArticleMain
      :content="content"
      :author="article.$author"
      class="a-mb-72"
    />
  </SMainSection>
  <SQuiz />
</template>
<script>
import { formatArticleText, formatDate } from 'src/lib/functions';
import { useDefaultStore } from 'src/stores/default';

export default {
  async preFetch({ store, currentRoute }) {
    const $store = useDefaultStore(store);
    await $store.loadArticle(currentRoute);
    return true;
  },
};
</script>

<script setup>
import MArticleTags from 'components/molecules/MArticleTags';
import { storeToRefs } from 'pinia';
import { useMeta } from 'quasar';
import MBreadcrumbs from 'src/components/molecules/MBreadcrumbs';
import MOrgSide from 'src/components/molecules/MOrgSide';
import SArticleIntro from 'src/components/sections/SArticleIntro';
import SArticleMain from 'src/components/sections/SArticleMain.vue';
import SMainSection from 'src/components/sections/SMainSection.vue';
import SQuiz from 'src/components/sections/SQuiz';
import { computed } from 'vue';

const $store = useDefaultStore();
const { getArticle: article } = storeToRefs($store);
const content = computed(() => (article.value ? formatArticleText(article.value.full_text) : ''));

if (article.value.$seo) {
  useMeta(() => (article.value ? {
    title: article.value.$seo.title,
    meta: {
      description: {
        name: 'description',
        content: article.value.$seo.description,
      },
    },
  } : {}));
}

const breadcrumbs = [
  {
    title: 'Главная',
    link: '/',
  },
  {
    title: 'Медиа',
    link: '/',
  },
  {
    title: 'РЕГЭ и ОГЭ',
    link: '/',
  },
  {
    title: 'Как подготовиться к ЕГЭ по математике и сдать экзамен на 100 баллов?',
    link: '/',
  },
];
</script>

<style lang="scss">
.s-article {
  &__title,
  &__leadform {
    margin-bottom: margin(56);

    @media(max-width: $breakpoint-sm) {
      margin-bottom: margin(48);
    }
  }
}
</style>

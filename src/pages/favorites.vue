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
    <h1 class="s-favorites__title">
      Мои специальности
    </h1>
  </SMainSection>
  <SFavorites
    v-if="$store.isAuthorized"
    :items="$store.favoriteSpecialties"
    class="section--sidebar-padding"
  />
  <SQuiz />
</template>

<script>
import { useMeta } from 'quasar';
import { api } from 'src/boot/axios';
import { crossRedirect } from 'src/lib/functions';
import { useDefaultStore } from 'src/stores/default';

export default {
  async preFetch({ ssrContext, redirect, store }) {
    const $store = useDefaultStore(store);

    if (!$store.isAuthorized) {
      crossRedirect(api.hostnames.fullSecure, { ssrContext, redirect });
    } else {
      await $store.loadFavoriteSpecialties();
    }
    return true;
  },
};
</script>

<script setup>
import MOrgSide from 'components/molecules/MOrgSide';
import MBreadcrumbs from 'src/components/molecules/MBreadcrumbs';
import SFavorites from 'src/components/sections/SFavoritesList';
import SMainSection from 'src/components/sections/SMainSection';
import SQuiz from 'src/components/sections/SQuiz';

const $store = useDefaultStore();

const breadcrumbs = [
  {
    title: 'Вузы России',
    link: '/',
  },
];

const sideItems = [
  {
    title: 'Проверить ВУЗ',
    icon: 'magnify',
    url: '/',
  },
  {
    title: 'Мои специальности',
    icon: 'docs',
    url: '/favor/',
  },
];

useMeta(() => ({
  title: 'Мои специальности',
  meta: {
    description: {
      name: 'description',
      content: 'Демо: избранные специальности (портфолио)',
    },
  },
}));
</script>

<style lang="scss">
.s-favorites {
  &__title {
    margin-bottom: margin(40);

    @media (max-width: $breakpoint-sm) {
      margin-bottom: margin(32);
    }
  }
}
</style>

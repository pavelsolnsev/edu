<template>
  <div v-if="org && meta">
    <MBreadcrumbs
      :items="meta.breadcrumbs"
      class="section--sidebar-padding"
    />
    <SMainSection class="s-vuzdata-header section--sidebar-padding">
      <MOrgSide
        :logo="org.logo"
        :items-top="sideItems"
        :reviews="reviews"
        :no-menu="noMenu"
        :no-ads="noAds"
        :org-id="org.id"
        integration="/img/integration/integration-placeholder.png"
        class="m-org-side--detail m-org-side--dense"
      />
      <h1 class="s-vuz-data-main__title">
        {{ meta.h1 }}
      </h1>
      <MVuzTags
        v-if="meta.tags"
        :tags="meta.tags"
        :font-class="'text-medium-m'"
        class="a-mt-16"
      />
      <MVuzAdditionalInfo
        v-if="org.$status"
        :info="org.$status"
        class="a-mt-16"
      />
      <MLeadForm
        title="Подобрать программу обучения"
        class="a-mt-40"
        :org-id="org?.id ?? null"
      />
    </SMainSection>
    <MRouteTabs
      :tabs="meta.tabs"
      class="a-mt-64 a-mb-24 section--sidebar-padding m-tabs--separators"
    />
  </div>
</template>

<script setup>
import MBreadcrumbs from 'src/components/molecules/MBreadcrumbs.vue';
import MLeadForm from 'src/components/molecules/MLeadForm.vue';
import MOrgSide from 'src/components/molecules/MOrgSide.vue';
import MRouteTabs from 'src/components/molecules/MRouteTabs.vue';
import MVuzAdditionalInfo from 'src/components/molecules/MVuzAdditionalInfo.vue';
import MVuzTags from 'src/components/molecules/MVuzTags.vue';

import SMainSection from './SMainSection.vue';

defineProps({
  org: {
    type: [Object, null],
    default: null,
  },
  meta: {
    type: [Object, null],
    default: null,
  },
  reviews: {
    type: [Object, null],
    default: null,
  },
  noMenu: {
    type: Boolean,
    default: false,
  },
  noAds: {
    type: Boolean,
    default: false,
  },
});

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
</script>

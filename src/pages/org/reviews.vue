<template>
  <SVuzHead
    :org="org"
    :meta="$org.getMeta"
    :reviews="summary"
  />
  <SReviews
    :items="$org.getReviews"
    :summary="$org.getOrganizationSummary"
    :load-more="$org.loadOrganizationReviewsNext"
    :show-more="$org.reviews?.meta?.page?.currentPage < $org.reviews?.meta?.page?.lastPage"
    :org-id="$org.id"
    class="a-mt-40 section--sidebar-padding"
  />
  <SQuiz />
</template>

<script>
import { useOrganizationStore } from 'src/stores/organization';

export default {
  async preFetch({ store, currentRoute }) {
    const $org = useOrganizationStore(store);
    await $org.loadOrganization(currentRoute);
    await $org.loadOrganizationReviews();
    return true;
  },
};
</script>

<script setup>
import { storeToRefs } from 'pinia';
import { useMeta } from 'quasar';
import SQuiz from 'src/components/sections/SQuiz';
import SReviews from 'src/components/sections/SReviews';
import SVuzHead from 'src/components/sections/SVuzHead';
import { computed } from 'vue';

const $org = useOrganizationStore();
const { getOrganization: org } = storeToRefs($org);
const summary = computed(() => $org.organization?.data?.calculation_data ?? {});

useMeta(() => $org.getMeta);
</script>

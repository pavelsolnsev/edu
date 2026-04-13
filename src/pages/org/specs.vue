<template>
  <SVuzHead
    :org="org"
    :meta="$org.getMeta"
  />
  <SSpecs
    v-if="$org.specialties && $hostnames.isVuz"
    :items="$org.specialties"
    :url="$org.getUrl"
    :show-faculty="true"
    class="a-mt-40 section--sidebar-padding"
  />
  <SSpecsCollege
    v-else-if="$org.specialties && $hostnames.isCollege"
    :items="$org.specialties"
    :url="$org.getUrl"
    :city="$org.getOrgCity"
    class="a-mt-40 section--sidebar-padding"
  />
  <SQuiz />
</template>

<script>
// import { useDefaultStore } from 'src/stores/default';
import { useOrganizationStore } from 'src/stores/organization';

export default {
  async preFetch({ store, currentRoute }) {
    const $org = useOrganizationStore(store);
    await $org.loadOrganization(currentRoute);
    await $org.loadOrganizationSpecialties();
    return true;
  },
};
</script>

<script setup>
import { storeToRefs } from 'pinia';
import { useMeta } from 'quasar';
import SQuiz from 'src/components/sections/SQuiz';
import SSpecs from 'src/components/sections/SSpecs';
import SSpecsCollege from 'src/components/sections/SSpecsCollege';
import SVuzHead from 'src/components/sections/SVuzHead';

const $org = useOrganizationStore();
const { getOrganization: org } = storeToRefs($org);
useMeta(() => $org.getMeta);

</script>

<template>
  <SVuzHead
    :org="org"
    :meta="$org.getMeta"
  />
  <SFacultyAbout
    :title="$org.getMeta.h2Faculty"
    :item="$org.getFaculty"
    class="a-mt-40 section--sidebar-padding"
  />
  <SSpecs
    v-if="$org.specialties"
    :items="$org.specialties"
    :url="$org.getUrl"
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
    await $org.loadOrganizationFaculty();
    return true;
  },
};
</script>

<script setup>
import { storeToRefs } from 'pinia';
import { useMeta } from 'quasar';
import SFacultyAbout from 'src/components/sections/SFacultyAbout';
import SQuiz from 'src/components/sections/SQuiz';
import SSpecs from 'src/components/sections/SSpecs';
import SVuzHead from 'src/components/sections/SVuzHead';

const $org = useOrganizationStore();
const { getOrganization: org } = storeToRefs($org);

useMeta(() => $org.getMeta);
</script>

<style lang="scss">

</style>

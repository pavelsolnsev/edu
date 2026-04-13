<template>
  <SVuzHead
    :org="org"
    :meta="$org.getMeta"
  />
  <SVuzFacultyList
    v-if="$org.faculties"
    :items="$org.getFacultiesItems"
    :url="$org.getUrl"
  />
  <SQuiz />
</template>

<script>
import { useOrganizationStore } from 'src/stores/organization';

export default {
  async preFetch({ store, currentRoute }) {
    const $org = useOrganizationStore(store);
    await $org.loadOrganization(currentRoute);
    await $org.loadOrganizationFaculties();
    return true;
  },
};
</script>

<script setup>
import { storeToRefs } from 'pinia';
import { useMeta } from 'quasar';
import SQuiz from 'src/components/sections/SQuiz';
import SVuzFacultyList from 'src/components/sections/SVuzFacultyList';
import SVuzHead from 'src/components/sections/SVuzHead';

const $org = useOrganizationStore();
const { getOrganization: org } = storeToRefs($org);

useMeta(() => $org.getMeta);
</script>

<style lang="scss">

</style>

<template>
  <SVuzHead
    :org="org"
    :meta="$org.getMeta"
  />
  <SOrgDataCharts
    :title="`Демо: ${$org.txtShortName} в цифрах`"
    :charts="org?.$charts ?? null"
    subtitle="Обучение в ВУЗе"
    :full="isAuthorized"
    class="a-mt-40 a-mb-72 section--sidebar-padding"
  />
  <SRegisterCta v-if="!isAuthorized" />
</template>

<script>
import { useOrganizationStore } from 'src/stores/organization';

export default {
  preFetch({ store, currentRoute }) {
    const $org = useOrganizationStore(store);
    return $org.loadOrganization(currentRoute);
  },
};
</script>

<script setup>
import { storeToRefs } from 'pinia';
import { useMeta } from 'quasar';
import SOrgDataCharts from 'src/components/sections/SOrgDataCharts';
import SRegisterCta from 'src/components/sections/SRegisterCta.vue';
import SVuzHead from 'src/components/sections/SVuzHead';

const $org = useOrganizationStore();
const { getOrganization: org } = storeToRefs($org);
const isAuthorized = true;
useMeta(() => $org.getMeta);
</script>

<style lang="scss">

</style>

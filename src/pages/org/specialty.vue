<template>
  <SVuzHead
    :org="org"
    :meta="$org.getMeta"
    no-menu
    no-ads
  />
  <SMainSection class="s-vuz-section section--sidebar-padding">
    <SSpecialtyAbout
      :item="$org.getOrganizationSpecialty"
      class="s-vuz-section a-pt-40 section--sidebar-padding"
    />
  </SMainSection>
  <SSpecialtySpec
    :item="$org.getOrganizationSpecialty"
    class="s-vuz-section section--sidebar-padding"
  />
  <SQuiz />
</template>

<script>
import { useOrganizationStore } from 'src/stores/organization';

export default {
  async preFetch({ store, currentRoute }) {
    const $org = useOrganizationStore(store);
    await $org.loadOrganization(currentRoute);
    await $org.loadOrganizationSpecialty(currentRoute);
    return true;
  },
};
</script>

<script setup>
import { storeToRefs } from 'pinia';
import { useMeta } from 'quasar';
import SMainSection from 'src/components/sections/SMainSection';
import SQuiz from 'src/components/sections/SQuiz';
import SSpecialtyAbout from 'src/components/sections/SSpecialtyAbout';
import SSpecialtySpec from 'src/components/sections/SSpecialtySpec';
import SVuzHead from 'src/components/sections/SVuzHead';

const $org = useOrganizationStore();
const { getOrganization: org } = storeToRefs($org);

useMeta(() => $org.getMeta);
</script>

<style lang="scss">
.s-vuz-section {
  margin-bottom: margin(72);

  @media(max-width: $breakpoint-sm) {
    margin-bottom: margin(48);
  }
}
</style>

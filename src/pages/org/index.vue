<template>
  <SVuzHead
    :org="org"
    :meta="$org.getMeta"
  />
  <div v-if="org">
    <SOrgDataCharts
      :title="`${$org.txtShortName} в цифрах`"
      subtitle="Обучение в ВУЗе"
      :link="$org.getLinks.chart"
      :charts="org.$charts"
      class="a-mt-40 s-vuz-section section--sidebar-padding"
    />
    <SVuzEvents
      v-if="org.$events && org.$events.length"
      :title="$org.txtShortName"
      :events="org.$events"
    />
    <SVuzContacts
      v-if="org.$admission"
      :title="`Приемная комиссия ${$org.txtShortName}`"
      :content="$org.getAdmission"
      :data="org.$admission"
      class="s-vuz-section section--sidebar-padding"
    />
    <SVuzSpecialties
      v-if="org.$specialties && org.$specialties.length"
      :title="`${$org.getShortName}`"
      xitems="$org.getSpecialties"
      :items="org.$specialties"
      :add-items="org.$notImplementedSpecs"
      class="s-vuz-section section--sidebar-padding"
    />
    <SVuzComments
      v-if="org.$reviews && org.$reviews.length"
      :title="`Последние отзывы ${$org.txtShortName}`"
      :items="org.$reviews"
      class="s-vuz-section section--sidebar-padding"
    />
    <SVuzGallery
      v-if="org.$galleries && org.$galleries.length"
      :title="`Галерея ${$org.txtShortName}`"
      :items="org.$galleries"
      class="s-vuz-section section--sidebar-padding"
    />
    <SVuzInfo
      :title="`${$org.txtShortName}`"
      :contacts="$org.getContacts"
      :affiliations="org.$affiliations"
      :colleges="org.$colleges"
      :info="org"
      class="s-vuz-section section--sidebar-padding"
    />
    <SVuzMonitoring
      v-if="$org.getMonitoring?.data.length"
      :title="`${$org.txtShortName}`"
      :data="$org.getMonitoring"
      class="s-vuz-section section--sidebar-padding"
    />
    <SVuzAbout
      :title="`${$org.txtShortName}`"
      :about="$org.getAbout"
      class="s-vuz-section section--sidebar-padding"
    />
    <SQuiz />
  </div>
</template>

<script>
import { useOrganizationStore } from 'src/stores/organization';

export default {
  async preFetch({ store, currentRoute }) {
    const $org = useOrganizationStore(store);
    await $org.loadOrganization(currentRoute, true);
    await $org.loadOrganizationEvents();
    await $org.loadOrganizationReviews(3);
    return true;
  },
};
</script>

<script setup>

import SVuzEvents from 'components/sections/SVuzEvents';
import { storeToRefs } from 'pinia';
import { useMeta } from 'quasar';
import SOrgDataCharts from 'src/components/sections/SOrgDataCharts';
import SQuiz from 'src/components/sections/SQuiz';
import SVuzAbout from 'src/components/sections/SVuzAbout';
import SVuzComments from 'src/components/sections/SVuzComments';
import SVuzContacts from 'src/components/sections/SVuzContacts';
import SVuzGallery from 'src/components/sections/SVuzGallery';
import SVuzHead from 'src/components/sections/SVuzHead';
import SVuzInfo from 'src/components/sections/SVuzInfo';
import SVuzMonitoring from 'src/components/sections/SVuzMonitoring';
import SVuzSpecialties from 'src/components/sections/SVuzSpecialties';

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

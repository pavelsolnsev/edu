<template>
  <div v-if="$listing.isLoaded">
    <MBreadcrumbs :items="breadcrumbs" />
    <SMainSection>
      <h1>{{ $listing.getMeta.h1 }}</h1>
      <SMap
        v-if="$listing.organizations"
        :items="$listing.organizations"
        class="a-mt-32"
      />
    </SMainSection>
    <SMapInfo :name="$listing.txtGeoNameRp" />
    <SMainDirections
      :title="`${$listing.getMeta.h1} по направлениям`"
      :directions="dirs"
      :show-all-btn="false"
    />
  </div>
  <SQuiz />
</template>
<script>
import { useListingStore } from 'src/stores/listing';

export default {
  preFetch({ store, currentRoute }) {
    const $listing = useListingStore(store);
    return $listing.loadOrganizations(currentRoute);
  },
};
</script>

<script setup>
import { useMeta } from 'quasar';
import MBreadcrumbs from 'src/components/molecules/MBreadcrumbs';
import SMainDirections from 'src/components/sections/SMainDirections';
import SMainSection from 'src/components/sections/SMainSection.vue';
import SMap from 'src/components/sections/SMap';
import SMapInfo from 'src/components/sections/SMapInfo';
import SQuiz from 'src/components/sections/SQuiz.vue';
import { mapDirections } from 'src/lib/constants';
import { computed } from 'vue';

const $listing = useListingStore();

const dirs = computed(
  () => ($listing.directions
    ? $listing.directions.map((direction) => {
      const mapDirection = mapDirections.find(
        (item) => item.name.toLowerCase().trim() === direction.name.toLowerCase().trim(),
      );
      return {
        ...direction,
        image: mapDirection?.image ?? null,
        url: `${$listing.getGeoUrl}d${direction.code}/`,
        count: direction.calculation_data?.organizations_count ?? 0,
      };
    }) : []),
);

const breadcrumbs = computed(() => [
  {
    title: 'Вузы России',
    link: '/',
  },
  {
    title: $listing.getMeta.h1,
    link: '/',
  },
]);

useMeta(() => $listing.getMeta);
</script>

<style lang="scss">
.s-map-info {
  margin-bottom: margin(32);
}
</style>

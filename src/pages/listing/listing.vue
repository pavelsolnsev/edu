<template>
  <SListingFindForm
    :route="$listing.route"
    :specialty="$listing.specialty"
    :loading="!$listing.isLoaded"
  />
  <SIntegrationSub />
  <div v-if="$listing.isLoaded">
    <SListingChips
      :title="$listing.getMeta.h1"
      :items="$listing.getTopDirections"
      :active="$listing.getActiveDirectionCode"
    />
    <div class="s-two-columns container">
      <main class="s-two-columns__main a-mt-40">
        <SIntegrationMain />
        <SlistingCards :items="$listing.getOrganizations" />
        <MPagination
          :meta="$listing.getPaging"
          class="a-mt-40"
        />
      </main>
      <aside class="gt-sm s-two-columns__sidebar a-mt-40">
        <MListingSide
          :enabled-map="$listing.enabledMap"
          :major-city="isMajorCity"
          :name-rp="$listing.txtGeoNameRp"
        />
        <q-img
          src="/img/integration/integration_sb.png"
          class="s-two-columns__sidebar-integration"
        />
      </aside>
    </div>
    <div class="s-listing-chips-list">
      <SListingChips
        v-if="$listing.getBottomDirections && $listing.getBottomDirections.length > 0"
        title=""
        heading="h3"
        :items="$listing.getBottomDirections"
        :active="$listing.getActiveDirectionCode"
      />
      <SListingChips
        v-if="$listing.getSpecialties && $listing.getSpecialties.length > 0"
        :title="$listing.getMeta.h2Specialties"
        heading="h3"
        :items="$listing.getSpecialties"
      />
    </div>
    <SListingDescription
      :title="$listing.getMeta.h2Description"
      :description="$listing.getMeta.description"
      :spec-name="$listing.getMeta.specName"
      :spec-url="$listing.getMeta.specUrl"
    />
    <SCharts
      :title="$listing.getMeta.h2Charts ?? ''"
    />
  </div>
  <SQuiz />
</template>

<script>
import { useListingStore } from 'src/stores/listing';

export default {
  async preFetch({ store, currentRoute }) {
    const $listing = useListingStore(store);
    await $listing.loadOrganizations(currentRoute);
    return true;
  },
};
</script>

<script setup>
import { useMeta } from 'quasar';
import MListingSide from 'src/components/molecules/MListingSide';
import MPagination from 'src/components/molecules/MPagination';
import SCharts from 'src/components/sections/SCharts';
import SIntegrationMain from 'src/components/sections/SIntegrationMain';
import SIntegrationSub from 'src/components/sections/SIntegrationSub';
import SlistingCards from 'src/components/sections/SListingCards';
import SListingChips from 'src/components/sections/SListingChips';
import SListingDescription from 'src/components/sections/SListingDescription';
import SListingFindForm from 'src/components/sections/SListingFindForm';
import SQuiz from 'src/components/sections/SQuiz';
import { computed } from 'vue';

const $listing = useListingStore();

const isMajorCity = computed(() => $listing?.city?.ratio_population
  && ($listing?.city?.ratio_population === 'Города-миллионеры'
    || $listing?.city?.ratio_population === 'Крупные города'
    || $listing?.city?.ratio_population === 'Крупнейшие города'
  ));

useMeta(() => $listing.getMeta);
</script>

<style lang="scss">
.s-two-columns {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  &__main {
    flex: 1 1 auto;
  }
  &__sidebar {
    min-width: rem(320);
    width: rem(320);
    margin-left: margin(28);
    flex: 0 1 auto;

    &-integration {
      margin-top: margin(32);
    }
  }
}

.s-listing-chips-list {
  .s-listing-chips:last-child {
    border-bottom: none;
  }
}
</style>

<template>
  <SProf />
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
import SProf from 'components/sections/SProf.vue';

</script>

<style lang="scss">
</style>

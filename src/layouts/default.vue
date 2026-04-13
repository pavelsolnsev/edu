<template>
  <SIntegrationTop />
  <SHeader />
  <router-view />
  <SFooter />
  <q-ajax-bar
    position="bottom"
    color="primary"
    size="4px"
  />
</template>

<script>
import { api } from 'src/boot/axios';
import { crossRedirect } from 'src/lib/functions';
import { useDefaultStore } from 'src/stores/default';

export default {
  async preFetch(ctx) {
    const $store = useDefaultStore();
    await $store.loadMe(ctx);
    if (api.hostnames.isRoot) {
      crossRedirect(api.hostnames.fullSecure, ctx);
    }
    return true;
  },
};
</script>

<script setup>
import SFooter from 'src/components/sections/SFooter';
import SHeader from 'src/components/sections/SHeader';
import SIntegrationTop from 'src/components/sections/SIntegrationTop';
import { onMounted } from 'vue';

const $store = useDefaultStore();

onMounted(async () => {
  await $store.setAuthRefresh();
});

</script>

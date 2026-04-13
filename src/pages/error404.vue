<template>
  <SHeader />
  <SMainSection>
    <SError404 />
  </SMainSection>
  <SFooter />
  <q-ajax-bar
    position="bottom"
    color="primary"
    size="4px"
  />
</template>

<script>
export default {
  preFetch({ ssrContext }) {
    if (process.env.SERVER) ssrContext.res.status(404);
  },
};
</script>

<script setup>
import SError404 from 'src/components/sections/SError404';
import SFooter from 'src/components/sections/SFooter';
import SHeader from 'src/components/sections/SHeader';
import SMainSection from 'src/components/sections/SMainSection';
</script>

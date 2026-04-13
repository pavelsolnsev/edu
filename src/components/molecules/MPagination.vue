<template>
  <div
    v-if="meta && meta.page && meta.page.lastPage && meta.page.lastPage > 1"
    class="m-pagination a-my-40"
  >
    <q-pagination
      :model-value="meta.page.currentPage"
      :max="meta.page.lastPage"
      :to-fn="toFn"
      ellipsis
      max-pages="7"
      boundary-numbers
      direction-links
      color="gray"
      flat
      size="1rem"
      gutter="1rem"
      class="gt-xs justify-center"
    />
    <q-pagination
      :model-value="meta.page.currentPage"
      :max="meta.page.lastPage"
      :to-fn="toFn"
      ellipsis
      max-pages="3"
      :boundary-numbers="false"
      :boundary-links="true"
      :direction-links="false"
      :ellipses="false"
      color="gray"
      size="1rem"
      gutter="1rem"
      round
      unelevated
      flat
      class="xs justify-center"
    />
  </div>
</template>

<script setup>
import { replacePage } from 'src/lib/functions';
import { useRoute } from 'vue-router';

const props = defineProps({
  meta: {
    type: [Object, null, undefined],
    required: true,
  },
});
const $route = useRoute();
const toFn = (page) => (page === props.meta.page.currentPage ? null : replacePage($route, page));
</script>

<style lang="scss">
.m-pagination {
  .q-btn {
    @include wh(40, 40);
    border-radius: bradius(100);
    font-weight: 600;
  }
  .q-btn::before {
    box-shadow: none !important;
  }
}
</style>

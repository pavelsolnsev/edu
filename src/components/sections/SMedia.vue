<template>
  <section v-if="data">
    <MMediaArticle
      v-for="(item,i) in items"
      :key="i"
      :item="item"
      :tags="rels(item, data, 'articleRubrics', 'article-rubrics')"
      class="a-mb-32 a-pt-32"
    />
  </section>
</template>

<script setup>
import MMediaArticle from 'components/molecules/MMediaArticle';
import { rels } from 'src/lib/api';

defineProps({
  items: {
    type: [Array, null],
    default: null,
  },
  data: {
    type: [Object, null],
    default: null,
  },
});
</script>

<style lang="scss">
.s-media {
  margin-right: rem(30);
  @media screen and (max-width: $breakpoint-md) {
    margin-right: 0;
  }
}
</style>

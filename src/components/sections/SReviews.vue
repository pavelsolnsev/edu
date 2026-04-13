<template>
  <section class="s-reviews">
    <div class="container">
      <MReviewsStats
        v-if="summary"
        :summary="summary"
        class="lt-lg"
      />
      <template v-if="items">
        <MReview
          v-for="review in items"
          :key="review.author"
          :review="review"
        />
        <AButton
          v-if="showMore"
          :label="'Показать еще...'"
          outline
          @click="loadMore"
        />
      </template>
    </div>
  </section>
</template>

<script setup>
import AButton from 'src/components/atoms/AButton';
import MReview from 'src/components/molecules/MReview';
import MReviewsStats from 'src/components/molecules/MReviewsStats';

defineProps({
  items: {
    type: [Array, null],
    default: null,
  },
  summary: {
    type: [Object, null],
    default: null,
  },
  showMore: {
    type: Boolean,
    default: false,
  },
  loadMore: {
    type: Function,
    required: true,
  },
  orgId: {
    type: [Number, String, null],
    default: null,
  },
});
</script>

<style lang="scss">
.s-reviews {
  margin-bottom: margin(72);
}
</style>

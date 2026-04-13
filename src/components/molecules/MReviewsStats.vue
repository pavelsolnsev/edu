<template>
  <div
    v-if="summary"
    class="m-reviews-stats"
  >
    <p class="a-mb-8 text-medium-l">
      Средняя оценка
    </p>
    <q-rating
      :model-value="Number(summary.avg_score)"
      class="a-mb-8 m-reviews-stats__rating"
      size="2rem"
      icon="img:/icons/rating-icon-empty.svg"
      icon-selected="img:/icons/rating-icon.svg"
      icon-half="img:/icons/rating-icon-half.svg"
      readonly
      no-dimming
    />
    <p class="m-reviews-stats__origin text-medium-xs">
      исходя из {{ summary.reviews_count }} отзывов
    </p>
    <div class="a-mb-24 m-reviews-stats__main">
      <p class="m-reviews-stats__main-item">
        <span class="text-medium-l">Положительных:</span>
        <span class="text-semibold-xl text-green">{{ summary.positive_score_count }}</span>
      </p>
      <p class="m-reviews-stats__main-item">
        <span class="text-medium-l">Нейтральных:</span>
        <span class="text-semibold-xl text-orange">{{ summary.neutral_score_count }}</span>
      </p>
      <p class="m-reviews-stats__main-item">
        <span class="text-medium-l">Отрицательных:</span>
        <span class="text-semibold-xl text-red">{{ summary.negative_score_count }}</span>
      </p>
      <p class="m-reviews-stats__main-item">
        <span class="text-medium-l">Аннулированных:</span>
        <span class="text-semibold-xl text-stroke">{{ summary.canceled_score_count }}</span>
      </p>
    </div>
    <AButton
      outline
      label="Оставить отзыв"
      class="a-mb-8 m-reviews-stats__btn"
      @click="dlgReview = !dlgReview"
    />
    <p class="m-reviews-stats__disclaimer text-regular-xs">
      <q-icon
        name="o_account_tree"
        size="1rem"
        color="stroke"
        class="m-reviews-stats__disclaimer-icon"
      />
      Представленные отзывы являются оценочными суждениями, мнениями
      и убеждениями их авторов. Содержание отзывов может не соответствовать
      действительности.
    </p>
    <MDlgReview
      v-model="dlgReview"
      :org-id="orgId"
    />
  </div>
</template>

<script setup>
import MDlgReview from 'components/molecules/MDlgReview';
import AButton from 'src/components/atoms/AButton';
import { ref } from 'vue';

defineProps({
  summary: {
    type: [Object, null],
    default: null,
  },
  orgId: {
    type: [Number, String, null],
    default: null,
  },
});
const dlgReview = ref(false);
</script>

<style lang="scss">
.m-reviews-stats {
  padding: padding2(24, 16);
  max-width: rem(544);
  border: 1px solid color(light-blue);
  border-radius: 8px;

  &__main {
    display: grid;
    grid-template-columns: max-content max-content;
    gap: rem(8) rem(20);

    @media(max-width: $breakpoint-xs) {
      grid-template-columns: max-content;
    }
  }

  &__main-item {
    display: flex;
    gap: 0 rem(24);
    align-items: flex-end;
    margin-bottom: 0;

    span:first-child {
      height: rem(24);
      width: rem(171);
    }
  }

  &__origin {
    margin-bottom: margin(24);
  }

  &--side {
    .m-reviews-stats__main {
      grid-template-columns: max-content;
    }

    .m-reviews-stats__origin {
      margin-bottom: margin(32);
    }
  }

  &__btn {
    width: 100%;
    max-width: rem(488);
  }

  &__disclaimer {
    display: flex;
    max-width: rem(488);
    margin-bottom: 0;
    color: color(stroke);
  }

  &__disclaimer-icon {
    margin-right: rem(4);
  }
}
</style>

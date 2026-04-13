<template>
  <div class="m-review">
    <div class="m-review__head">
      <q-rating
        v-model="rating"
        class="m-review__rating"
        size="1.5rem"
        icon="img:/icons/rating-icon-empty.svg"
        icon-selected="img:/icons/rating-icon.svg"
        icon-half="img:/icons/rating-icon-half.svg"
        readonly
        no-dimming
      />
      <p class="m-review__author text-medium-xl">
        {{ review.author }}
      </p>
      <time class="m-review__date text-medium-l">{{ review.date }}</time>
      <time class="m-review__time text-medium-l">{{ review.time }}</time>
    </div>
    <p class="m-review__text text-regular-m">
      {{ review.text }}
    </p>
    <div
      v-if="review.answer && review.answer.text"
      class="m-review__answer"
    >
      <div class="m-review__answer-head">
        <q-icon
          :name="'img:' + require('/public/icons/review-answer-icon.svg')"
          class="m-review__answer-icon"
        />
        <div class="m-review__answer-title text-semibold-m">
          Официальный ответ
          <time class="m-review__answer-date text-regular-s">{{ review.answer.date }}</time>
          <time class="m-review__answer-time text-regular-s">{{ review.answer.time }}</time>
        </div>
      </div>
      <div class="m-review__answer-text text-regular-m">
        {{ review.answer.text }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  review: {
    type: Object,
    required: true,
  },
});
const rating = ref(props.review.rating);
</script>

<style lang="scss">
.m-review {
  padding: padding2(24, 0);
  border-bottom: 1px solid color(light-gray);

  &:last-of-type {
    border-bottom: none;
  }

  &__head {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: margin(16);
  }

  &__rating {
    width: 100%;
    margin-bottom: margin(8);
  }

  &__time {
    color: color(stroke);
  }

  &__date {
    margin-right: margin(8);
    color: color(stroke);
  }

  &__author {
    margin-right: margin(24);
    margin-bottom: 0;
  }

  &__text {
    color: color(dark);
  }

  &__answer {
    padding: padding2(24, 16);
    background-color: color(light-blue);
  }

  &__answer-title {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 0;
    color: color(blue-button);
  }

  &__answer-text {
    color: color(dark);
  }

  &__answer-icon {
    @include wh(24, 24);
    margin-right: rem(10);
  }

  &__answer-head {
    display: flex;
    align-items: flex-start;
    margin-bottom: rem(10);
  }

  &__answer-date {
    margin-left: rem(10);
    color: color(stroke);

    @media(max-width: $breakpoint-xs) {
      margin-left: 0;
    }
  }

  &__answer-time {
    margin-left: margin(8);
    color: color(stroke);
  }
}
</style>

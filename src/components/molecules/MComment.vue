<template>
  <div class="m-comment">
    <div class="m-comment__head">
      <q-rating
        v-model="rating"
        class="m-comment__rating"
        size="1.25rem"
        readonly
      />
      <p class="m-comment__author text-semibold-l">
        {{ comment.author }}
      </p>
      <time class="m-comment__time text-regular-s">{{ comment.time }}</time>
      <time class="m-comment__date text-regular-s">{{ comment.date }}</time>
    </div>
    <p class="m-comment__text text-regular-m">
      {{ comment.text }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
});

const rating = ref(props.comment.rating);
</script>

<style lang="scss">
.m-comment {
  padding: padding(24);
  border: 1px solid color(stroke);
  border-radius: bradius(16);

  @media(max-width: $breakpoint-xs) {
    padding: padding(16);
  }

  &__head {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: margin(8);

    & > * {
      margin-right: margin(8);
    }
  }

  &__author,
  &__text {
    margin-bottom: 0;
  }

  &__rating {
    @media(max-width: $breakpoint-xs) {
      width: 100%;
      margin-bottom: margin(8);
    }
  }

  .q-rating__icon {
    color: color(stroke);
    text-shadow: none;

    &.q-rating__icon--active {
      color: color(bright-orange);
    }
  }
}
</style>

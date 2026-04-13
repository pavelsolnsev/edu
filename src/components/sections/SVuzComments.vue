<template>
  <section class="s-vuz-comments container">
    <h2
      v-if="title"
      class="s-vuz-comments__title"
    >
      {{ title }}
    </h2>
    <MComment
      v-for="(comment, index) in items"
      :key="index"
      :comment="comment"
      class="s-vuz-comments__comment"
    />
    <q-btn
      :to="showAllUrl"
      class="s-vuz-comments__btn text-semibold-m"
    >
      Показать еще ...
    </q-btn>
  </section>
</template>

<script setup>
import MComment from 'src/components/molecules/MComment';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

defineProps({
  title: {
    type: String,
    default: '',
  },
  items: {
    type: Array,
    default: () => [],
  },
});
const $route = useRoute();
const showAllUrl = computed(() => `${$route.path}opinions/`);
</script>

<style lang="scss">
.s-vuz-comments {
  &__title {
    margin-bottom: margin(40);
  }

  &__comment {
    margin-bottom: margin(16);

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__btn {
    margin-top: margin(40);
    padding: padding2(16, 24);
    border: 1px solid color(blue-button);
    text-transform: unset;
    color: color(blue-button);

    @media(max-width: $breakpoint-xs) {
      width: 100%;
    }

    &:before {
      box-shadow: none !important;
    }
  }
}
</style>

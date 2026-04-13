<template>
  <div class="m-article-tags">
    <div class="m-article-tags__tags">
      <ATag
        v-for="tag in tags"
        :key="tag.name"
        :link="`/jour/?rubric=${tag.code}`"
        :label="`#${tag.name}`"
        class="m-article-tags__tag"
      />
    </div>
    <p class="m-article-tags__date text-medium-m">
      {{ date }}
    </p>
  </div>
</template>

<script setup>
import ATag from 'src/components/atoms/ATag';

defineProps({
  tags: {
    type: Array,
    default: () => [],
  },
  date: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss">
.m-article-tags {
  display: flex;
  margin-bottom: margin(32);
  gap: rem(24) rem(24);
  justify-content: space-between;
  align-items: center;

  @media(max-width: $breakpoint-sm) {
    flex-direction: column;
    align-items: flex-start;
  }

  &__tag {
    .q-chip {
      margin: 0;
    }
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: rem(8) rem(8);
  }

  &__date {
    margin-bottom: 0;
  }
}
</style>

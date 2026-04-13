<template>
  <div class="m-author">
    <q-img
      v-if="author.image_url"
      :src="author.image_url"
      class="m-author__avatar"
    />
    <div class="m-author__main">
      <p class="m-author__name a-mb-16 text-semibold-xl">
        {{ author.name }}
      </p>
      <p
        v-if="author.position"
        class="m-author__position a-mb-8 text-medium-m"
      >
        {{ author.position }}
      </p>
      <p
        v-if="author.description"
        class="m-author__about text-regular-m"
      >
        {{ author.description }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  author: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss">
.m-author {
  display: flex;
  gap: rem(16) rem(16);
  padding: padding(24);
  border: 1px solid color(stroke);
  border-radius: rem(24);
  background-color: color(light-gray);

  @media(max-width: $breakpoint-xs) {
    flex-direction: column;
  }

  &__avatar {
    @include wh(100, 100);
    flex-shrink: 0;
    border-radius: bradius(16);
  }

  &__about {
    margin-bottom: 0;
  }
}
</style>

<template>
  <article
    v-if="item"
    class="m-media-item"
  >
    <router-link :to="`/jour/${item.code}/`">
      <q-img
        :src="item.preview_image"
        class="m-media-item__img"
        :fit="'cover'"
      />
    </router-link>
    <div class="m-media-item__wrap">
      <time class="m-media-item__time">
        {{ formatDate(item.published_at) }}
      </time>
      <router-link :to="`/jour/${item.slug}/`">
        <h4 class="text-dark a-mb-24">
          {{ item.name }}
        </h4>
      </router-link>
      <ul
        v-if="tags && tags.length > 0"
        class="m-media-item__list"
      >
        <li
          v-for="tag in tags"
          :key="tag"
        >
          <router-link :to="`/jour/?rubric=${tag.code}`">
            #{{ tag.name }}
          </router-link>
        </li>
      </ul>
    </div>
  </article>
</template>

<script setup>
import { formatDate } from 'src/lib/functions';

defineProps({
  item: {
    type: [Object, null],
    default: null,
  },
  tags: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="scss">
  .m-media-item {
    display: flex;
    align-items: flex-start;
    border-top: rem(1) solid color(stroke);
    @media screen and (max-width: $breakpoint-sm) {
      flex-direction: column;
    }
    &:first-child {
      border: none;
      padding-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
    &__img {
      max-width: rem(270);
      width: rem(270);
      border-radius: bradius(8);
      margin-right: rem(30);
      @media screen and (max-width: $breakpoint-sm) {
        margin-right: 0;
        max-width: 100%;
        height: rem(218);
        margin-bottom: rem(30);
      }
    }
    &__time {
      font-size: rem(12);
    }
    &__list {
      font-size: rem(12);
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      padding: 0;
      margin: margin(0) rem(-4);
      li {
        background: color(blue-gray);
        border-radius: bradius(100);
        padding: padding(4) padding(12);
        display: block;
        margin: 0 margin(4) margin(4) margin(4);
        a {
          color: color(dark);
        }
      }
    }
  }
</style>

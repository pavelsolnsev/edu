<template>
  <router-link
    :to="item.url ?? ''"
    class="m-vuz-direction text-dark"
  >
    <div class="m-vuz-direction__image-wrap">
      <q-img
        v-if="item.name"
        class="m-vuz-direction__image"
        :src="item.image"
      />
      <q-img
        v-else
        class="m-vuz-direction__image-all"
        :src="require('/public/img/main/vuz-directions/vuz-directions-all.png')"
      />
    </div>
    <div
      v-if="item.name"
      class="m-vuz-direction__text"
    >
      <h5 class="m-vuz-direction__title">
        {{ item.name }}
      </h5>
      <p
        v-if="item.count"
        class="m-vuz-direction__count text-medium-s"
      >
        {{ item.count }} {{ plural(item.count, ['ВУЗ', 'ВУЗа', 'ВУЗов']) }}
      </p>
    </div>
    <div
      v-else
      class="m-vuz-direction__show-all-wrap"
    >
      <p class="m-vuz-direction__show-all text-semibold-m">
        Показать все направления
      </p>
      <q-icon
        class="gt-xs"
        size="1.5rem"
        :name="'trending_flat'"
      />
    </div>
  </router-link>
</template>

<script setup>
import { plural } from 'src/lib/functions';

defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss">
.m-vuz-direction {
  display: block;
  padding: padding2(24, 16);
  border: 1px solid color(light-blue);
  border-radius: bradius(8);
  text-decoration: none;

  &:visited {
    color: unset;
  }

  &__image-wrap {
    width: 100%;
    height: rem(157);
    margin-bottom: margin(16);
    border-radius: bradius(8);
    overflow: hidden;
  }

  &__image {
    height: 100%;
  }

  &__image-all {
    @include wh(114, 103);
  }

  &__show-all-wrap {
    display: flex;
    margin-bottom: 0;
    margin-top: margin(40);
  }

  &__show-all {
    margin-bottom: 0;
    margin-right: margin(8);
  }

  &__title {
    margin-bottom: margin(8);
    color: color(dark);
  }

  &__count {
    margin-bottom: 0;
    color: color(gray);
  }
}
</style>

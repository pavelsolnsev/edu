<!-- eslint-disable vue/no-v-html -->
<template>
  <section class="s-vuz-about container">
    <div
      v-if="about"
      class="s-vuz-about__item"
      v-html="formatVuzAbout(about)"
    />
  </section>
</template>

<script setup>
import { formatVuzAbout } from 'src/lib/functions';

defineProps({
  about: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss">
.s-vuz-about {
  &__title {
    margin-bottom: margin(48);
  }

  &__item {
    margin-bottom: margin(32);

    &:last-child {
      margin-bottom: 0;
    }
  }

  h4 {
    margin-bottom: margin(24);
  }

  p {
    margin-bottom: margin(16);
    color: color(dark);

    &:last-child {
      margin-bottom: 0;
    }
  }

  ul {
    margin: 0 0 rem(32) 0;
    padding: 0;

    &:last-child {
      margin-bottom: 0;
    }

    li {
      position: relative;
      padding-left: padding(28);
      margin-bottom: margin(8);
      list-style-type: none;

      &:last-child {
        margin-bottom: 0;
      }

      &:before {
        content: "";
        position: absolute;
        top: rem(6);
        left: 0;
        @include wh(12, 12);
        border-radius: 50%;
        background-color: color(orange);
      }
    }
  }
}
</style>

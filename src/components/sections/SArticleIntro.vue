<template>
  <section class="s-article-intro">
    <div
      v-if="contents"
      class="s-article-intro__contents a-mb-40"
    >
      <h3 class="s-article-intro__contents-title a-mb-16">
        Содержание
      </h3>
      <ul class="s-article-intro__contents-list">
        <li
          v-for="item in contents"
          :key="item"
          class="text-medium-m"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="s-article-intro__intro">
      <q-img
        v-if="img"
        :src="img"
        class="s-article-intro__intro-img a-mb-16"
      />
      <p
        v-if="text"
        class="s-article-intro__intro-text text-regular-m"
      >
        {{ text }}
      </p>
    </div>
    <h3 class="a-mb-24">
      Подобрать программу обучения
    </h3>
    <MLeadForm class="s-article-intro__leadform" />
  </section>
</template>

<script setup>
import MLeadForm from 'src/components/molecules/MLeadForm';

defineProps({
  contents: {
    type: Array,
    default: () => [],
  },
  img: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss">
.s-article-intro {
  &__contents-list {
    margin: 0;
    padding: 0;

    li {
      position: relative;
      padding-left: padding(16);
      margin-bottom: margin(8);
      list-style-type: none;

      &:last-child {
        margin-bottom: 0;
      }

      &:before {
        content: "";
        position: absolute;
        top: rem(8);
        left: 0;
        @include wh(8, 8);
        border-radius: 50%;
        background-color: color(primary);
      }
    }
  }

  &__intro-img {
    width: 100%;
    height: rem(351);
    border-radius: bradius(8);
  }

  &__intro-text {
    margin-bottom: margin(40);
    color: color(gray);
  }

  &__leadform {
    margin-bottom: margin(56);

    @media(max-width: $breakpoint-md) {
      margin-bottom: margin(48);
    }
  }
}
</style>

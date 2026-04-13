<!-- eslint-disable vue/no-v-html -->
<template>
  <section class="s-article-main">
    <div
      v-if="content"
      class="s-article-main__article"
      v-html="content"
    />
    <MAuthor
      :author="author"
    />
  </section>
</template>

<script setup>
import MAuthor from 'src/components/molecules/MAuthor';

defineProps({
  content: {
    type: [String, null],
    default: null,
  },
  author: {
    type: Object,
    default: () => {
    },
  },
});
</script>

<style lang="scss">
.s-article-main {
  &__article {
    margin-bottom: margin(56);

    @media(max-width: $breakpoint-sm) {
      margin-bottom: margin(48);
    }

    ol, ul {
      padding-left: padding(28);
      list-style: none;
      counter-reset: item;
    }

    li {
      display: flex;
      counter-increment: item;
      margin-bottom: margin(8);
    }

    li:before {
      content: counter(item)".";
      display: inline-block;
      margin-right: margin(8);
      color: color(orange);
      font-weight: 500;
    }
  }

  &__table {
    padding: padding2(56, 40);
    margin-bottom: margin(20);
    border-radius: rem(24);
    background-color: color(blue-gray);

    @media(max-width: $breakpoint-xs) {
      padding: padding2(48, 20);
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
  }

  tr {
    border-bottom: 1px solid color(stroke);

    &:last-child {
      border-bottom: none;
    }
  }

  tr:first-child {
    td, td > *, th, th > * {
      font-size: 18px;
      line-height: 22px;
      font-weight: 500;

      @media(max-width: $breakpoint-xs) {
        font-size: 16px;
        line-height: 24px;
      }
    }

    td, th {
      padding-bottom: padding(16);
      padding-right: rem(30);
    }
  }

  td {
    padding: rem(16) rem(30) rem(16) 0;

    &, & > * {
      font-size: 16px;
      line-height: 24px;
    }

    p {
      margin-bottom: 0;
    }
  }
}
</style>

<template>
  <aside class="m-vuz-heading">
    <MVuzHeadingList
      :items="list"
      :title="listTitle"
      class="m-vuz-heading__box"
    />
    <q-img
      v-if="integration!==''"
      :src="integration"
      class="gt-md"
    />
  </aside>
</template>
<script setup>
import MVuzHeadingList from 'src/components/molecules/MVuzHeadingList';

defineProps({
  integration: {
    type: String,
    default: '',
  },
  listTitle: {
    type: String,
    default: '',
  },
  list: {
    type: Array,
    default: () => [],
  },
});
</script>
<style lang="scss">
.m-vuz-heading {
  flex: 0 0 auto;
  max-width: rem(270);
  margin-top: rem(-65);
  @media screen and (max-width: $breakpoint-md) {
    max-width: 100%;
    margin-top: 0;
  }
  &__box {
    background: color(blue-gray);
    padding: padding(24) padding(16);
    margin-bottom: margin(24);
    border-radius: bradius(8);
    @media screen and (max-width: $breakpoint-md) {
      margin-bottom: margin(40);
      padding: padding(24) padding(20) padding(8) padding(16);
    }
    ul {
      padding: 0;
      margin: 0;
      @media screen and (max-width: $breakpoint-md) {
        display: flex;
        flex-wrap: wrap;
        margin: 0 rem(-12);
      }
      li {
        font-weight: 500;
        font-size: rem(18);
        color: color(gray);
        border-bottom: rem(1) solid color(light-blue);
        display: block;
        margin-bottom: margin(16);
        padding-bottom: margin(16);
        @media screen and (max-width: $breakpoint-md) {
          border: none;
          margin: 0 margin(12) margin(16) margin(12);
          padding: 0;
        }
        @media screen and (max-width: $breakpoint-xs) {
          font-size: rem(16);
        }
        &:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border: none;
          @media screen and (max-width: $breakpoint-md) {
            margin: 0 margin(12) margin(16) margin(12);
          }
        }
        a {
          color: color(gray);
          transition: all ease .3s;
          &:hover {
            color: color(blue-button);
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="m-breadcrumbs container-scrollable">
    <q-breadcrumbs
      class="m-breadcrumbs__breadcrumbs"
      :separator="'•'"
    >
      <q-breadcrumbs-el
        v-for="item in items"
        :key="item.title"
        :label="item.title"
        :to="item.link"
        class="m-breadcrumbs__breadcrumbs-el text-regular-xs"
      />
    </q-breadcrumbs>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="scss">
.m-breadcrumbs {
  overflow-x: auto;

  &__breadcrumbs {
    width: 100%;
    margin-top: margin(8);
    margin-bottom: margin(40);
    padding-bottom: rem(10);

    div {
      flex-wrap: nowrap;
      flex-shrink: 0;
    }
  }

  .q-breadcrumbs__separator {
    font-size: rem(28);
    line-height: rem(28);
    transform: translateY(-0.125rem);
  }

  a,
  a:visited {
    text-decoration: none;
    color: color(gray);
  }
}
</style>

<template>
  <div class="m-tabs">
    <ASeparator
      class="--top"
    />
    <div class="m-tabs__tabs-wrap container-scrollable">
      <q-tabs
        :no-caps="true"
        indicator-color="transparent"
        class="m-tabs__tabs"
      >
        <q-route-tab
          v-for="item in tabs"
          :key="item.label"
          class="m-tabs__tab text-medium-m"
          :name="item.name"
          :label="item.label"
          :to="item.anchor ?
            { name: item.anchor.routeName, hash: item.anchor.elementId } :
            { name: item.routeName }
          "
          @click="checkAnchor"
        />
      </q-tabs>
    </div>
    <ASeparator
      class="--bottom"
    />
  </div>
</template>

<script setup>
import ASeparator from 'src/components/atoms/ASeparator';

defineProps({
  tabs: {
    type: Array,
    default: () => ([]),
  },
});

function checkAnchor(e) {
  const activeTab = document.querySelector('.m-tabs__tab.q-tab--active');
  const targetTab = e.target.closest('.m-tabs__tab');

  if (activeTab && targetTab && activeTab.pathname === targetTab.pathname) {
    e.preventDefault();
    if (targetTab.hash) document.querySelector(targetTab.hash).scrollIntoView({ behavior: 'smooth' });
  }
}
</script>

<style lang="scss">
.m-tabs {
  &__tabs-scroll {
    height: rem(52);

    .q-tabs__content {
      padding: 0 rem(40);

      @media screen and (max-width: $breakpoint-xs) {
        padding: 0 rem(20);
      }
      @media screen and (min-width: $breakpoint-sm-min) and (max-width: $breakpoint-sm) {
        padding: 0 rem(28);
      }
    }
  }

  &__tabs-wrap {
    .q-tabs__content {
      @media(min-width: $breakpoint-md-min) {
        flex-wrap: wrap;
      }
    }
  }

  &__tab:visited {
    color: color(dark);
  }

  &__tab {
    padding: rem(14) rem(24);
    background-color: color(light-gray);
    border-radius: bradius(8);

    &.q-tab--active {
      background-color: color(purple);
      color: white;
    }

    &.q-tab--active:visited {
      color: white;
    }
  }

  .q-tabs__arrow {
    display: none;
  }

  .q-tab__content {
    padding: 0;
  }

  .q-tabs__content {
    justify-content: flex-start;
    gap: rem(16);
  }

  .a-separator {
    display: none;
  }

  &--separators {
    .a-separator {
      display: block;
    }
  }

  .a-separator.--top {
    padding-bottom: rem(24);
  }

  .a-separator.--bottom {
    padding-top: rem(24);
  }
}
</style>

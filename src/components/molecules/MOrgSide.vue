<template>
  <aside class="m-org-side">
    <div
      v-if="logo!==''"
      class="m-org-side__logo-wrapper"
    >
      <q-img
        :src="logo"
        ratio="1"
        fit="contain"
        class="m-org-side__logo"
      />
    </div>
    <MReviewsStats
      v-if="reviews"
      class="gt-md m-reviews-stats--side"
      :summary="reviews"
      :org-id="orgId"
    />
    <MListingSideSection
      v-if="!noMenu && itemsTop.length > 0"
      :items="itemsTop"
      class="m-listing-side m-org-side--bg"
    />
    <MListingSideSection
      v-if="!noMenu && itemsBottom.length > 0"
      :items="itemsBottom"
    />
    <q-img
      v-if="!noAds && integration!==''"
      :src="integration"
      class="m-org-side__integration"
    />
  </aside>
</template>

<script setup>
import MListingSideSection from 'src/components/molecules/MListingSideSection';
import MReviewsStats from 'src/components/molecules/MReviewsStats';

defineProps({
  logo: {
    type: String,
    default: '',
  },
  itemsTop: {
    type: Array,
    default: () => [],
  },
  itemsBottom: {
    type: Array,
    default: () => [],
  },
  integration: {
    type: String,
    default: '',
  },
  reviews: {
    type: Object,
    default: () => {},
  },
  noMenu: {
    type: Boolean,
    default: false,
  },
  noAds: {
    type: Boolean,
    default: false,
  },
  orgId: {
    type: [Number, String, null],
    default: null,
  },
});
</script>

<style lang="scss">
// $
.m-org-side--detail {
  max-width: rem(270);
  @media screen and (min-width: $breakpoint-lg-min) {
    width: rem(270);
    position: absolute;
    top: 0;
    right: 0;
    margin-right: 40px;
  }
  @media screen and (min-width: $breakpoint-md-min) and (max-width: $breakpoint-md) {
    width: rem(270);
    position: absolute;
    top: 0;
    right: 0;
    margin-right: 40px;

    .m-listing-side__section, .m-org-side__integration {
      display: none;
    }
    .m-org-side__logo {
      max-width: rem(146);
    }
  }
  @media screen and (max-width: $breakpoint-sm) {
    width: rem(270);
    position: absolute;
    top: 0;
    left: 0;
    .m-listing-side__section, .m-org-side__integration {
      display: none;
    }
    .m-org-side__logo {
      max-width: rem(146);
    }
  }
}

.m-org-side--dense {
  .m-listing-side__section {
    .m-listing-side__icon {
      margin-right: margin(8);
    }

    img {
      width: rem(40);
      height: rem(40);
    }
  }

  .m-listing-side__title {
    font-size: rem(16);
    font-weight: 600;
    line-height: rem(24);
  }
}

.m-org-side {

  display: flex;
  flex-direction: column;
  z-index: 1;

  > div:not(:first-child) {
    margin-top: margin(24);
  }

  &--bg {
    background-color: color(sidebar-bg);
    border-radius: bradius(8);
  }

  &__logo-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: padding2(16, 0);
  }

  &__logo {
    max-width: rem(128);
    border-radius: bradius(8);
  }

  .m-listing-side__section:not(:first-child) {
    margin-top: margin(24);
  }

  &--rounded-accent {
    background-color: color(sidebar-bg);
    border-radius: bradius(8);
  }

  a {
    text-decoration: none;
  }
}
</style>

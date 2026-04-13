<template>
  <SMainSection class="s-charts">
    <h2 v-if="subtitle!==''">
      Демо-статистика
      <router-link :to="link">
        {{ title }}
      </router-link>
    </h2>
    <h3
      v-else
      class="s-charts__title"
    >
      Демо-статистика
      <router-link :to="link">
        {{ title }}
      </router-link>
    </h3>
    <div class="s-charts__subtitle a-mt-16">
      <h4
        v-if="subtitle"
      >
        {{ subtitle }}
      </h4>
    </div>
    <slot name="top" />
    <div class="s-charts__wrapper">
      <slot name="default" />
    </div>
  </SMainSection>
</template>

<script setup>
import SMainSection from './SMainSection.vue';

defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
  link: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss">
.s-charts {

  &__wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    @media screen and (min-width: $breakpoint-sm-min) {
      margin-top: rem(-40);
      margin-left: rem(-16);
    }
  }

  &__subtitle {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: rem(12) rem(24);
  }

  h2 {
    width: 100%;
  }

  .m-simple-chart {
    height: rem(248);

    @media screen and (max-width: $breakpoint-xs) {
      &:not(:first-child) {
        margin-top: margin(24);
      }
    }

    @media screen and (min-width: $breakpoint-sm-min) and (max-width: $breakpoint-sm) {
      margin-top: margin(40);
      margin-left: margin(16);
      flex-basis: #{"calc(50% - " + rem(16) + ")"};
    }

    @media screen and (min-width: $breakpoint-md-min) {
      margin-top: margin(40);
      margin-left: margin(16);
      flex-basis: #{"calc(33.33% - " + rem(16) + ")"};
    }
  }

  .m-simple-chart_landscape {
    margin: margin2(40, 0);
    padding-bottom: padding(40);
    border-bottom: 1px solid color(stroke);
    height: auto;

    .m-simple-chart__content {
      height: rem(214);
    }

    @media screen and (max-width: $breakpoint-xs) {
      margin-top: margin(32);
    }

    @media screen and (min-width: $breakpoint-sm-min) and (max-width: $breakpoint-sm) {
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: flex-end;
      .m-simple-chart__legend-wrapper {
        flex: 1;
      }
      .m-simple-chart__content {
        flex: 1;
        margin-top: rem(26);
      }
      .m-simple-chart__title {
        margin-top: rem(22);
      }
    }

    @media screen and (min-width: $breakpoint-md-min) and (max-width: $breakpoint-md) {
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: flex-end;
      .m-simple-chart__legend-wrapper {
        flex: 1;
      }
      .m-simple-chart__content {
        flex: 1;
        margin-top: rem(26);
      }
      .m-simple-chart__title {
        margin-top: rem(22);
      }
    }

    @media screen and (min-width: $breakpoint-lg-min) {
      height: rem(291);
      flex-direction: row;
      .m-simple-chart__legend-wrapper {
        flex: 0 1 auto;
      }
      .m-simple-chart__content {
        flex: 0 1 auto;
        width: rem(526);
        margin-left: rem(32);
        margin-top: rem(26);
      }
      .m-simple-chart__title {
        margin-top: rem(22);
      }
    }
  }
}
</style>

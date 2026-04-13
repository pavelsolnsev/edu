<template>
  <SMainSection class="s-listing-chips">
    <div class="row wrap q-col-gutter-md items-end a-mb-16">
      <h1
        v-if="heading === 'h1'"
        class="s-listing-chips__title"
      >
        {{ title }}
      </h1>
      <h3
        v-if="heading === 'h3'"
        class="s-listing-chips__title"
      >
        {{ title }}
      </h3>
      <div class="col-shrink gt-xs">
        <div
          class="s-listing-chips__expand text-medium-s text-primary"
          @click="chipsCollapsed = !chipsCollapsed"
        >
          <span>{{ controlLabel }}</span>
          <q-icon
            name="expand_less"
            size="1.5rem"
            :style="{ transform: chipsCollapsed ? 'rotate(180deg)' : 'none' }"
          />
        </div>
      </div>
    </div>
    <template #scroll>
      <div
        :class="[
          's-listing-chips__wrapper q-gutter-md ',
          { 'chips-collapsed': chipsCollapsed }]"
      >
        <q-btn
          v-for="(chip, i) in items"
          :key="i"
          :outline="active !== chip.code "
          rounded
          unelevated
          color="secondary"
          :to="chip.url"
          :label="chip.name"
          :class="['a-button--chips']"
        />
      </div>
    </template>
  </SMainSection>
</template>

<script setup>
import { computed, ref } from 'vue';

import SMainSection from './SMainSection.vue';

defineProps({
  title: {
    type: String,
    required: true,
  },
  heading: {
    type: String,
    default: 'h1',
  },
  items: {
    type: Array,
    default: () => [],
  },
  active: {
    type: [String, null, undefined],
    default: null,
  },
});

const chipsCollapsed = ref(true);
const controlLabel = computed(() => (chipsCollapsed.value ? 'Показать все' : 'Свернуть'));

</script>

<style lang="scss">
// $
.a-button {
  &--chips {
    @include typoClass('medium-s');
    padding: 12px 24px;
    text-transform: none;

    &.q-btn--outline {
      .q-btn__content {
        color: color(dark);
      }
    }
  }
}

.s-listing-chips {
  padding: padding2(28, 0);
  border-bottom: 2px solid color(light-gray);

  &__wrapper {
    max-height: rem(1024);
    transition: max-height 0.5s;
  }

  &__wrapper.chips-collapsed {
    @media screen and (min-width: $breakpoint-sm-min) {
      max-height: rem(42+16+6);
    }
  }

  &__expand {
    cursor: pointer;
  }

  &__title-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-end;
    margin-bottom: margin(12);
  }

  &__title {
    max-width: calc(100% - 8.75rem);
    flex: 1 1 auto;

    @media(max-width: $breakpoint-xs) {
      max-width: 100%;
    }
  }

  .q-icon {
    transition: all 0.3s;
  }
}
</style>

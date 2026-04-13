<template>
  <div class="m-tabs">
    <ASeparator
      class="--top"
    />
    <div class="m-tabs__tabs-wrap container-scrollable">
      <q-tabs
        v-model="activeTab"
        :no-caps="true"
        indicator-color="transparent"
        class="m-tabs__tabs"
        @update:model-value="onTabSwitch"
      >
        <q-tab
          v-for="item in tabs"
          :key="item.label"
          :class="['m-tabs__tab', textClass]"
          :name="item.name"
          :label="item.label"
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
import { ref, watch } from 'vue';

const props = defineProps({
  tabs: {
    type: Array,
    default: () => ([]),
  },
  modelValue: {
    type: String,
    default: '',
  },
  textClass: {
    type: String,
    default: 'text-medium-m',
  },
});
const activeTab = ref(props.modelValue);
const emit = defineEmits(['update:modelValue']);

watch(() => props.modelValue, (newValue) => {
  activeTab.value = newValue;
});

function onTabSwitch(tabName) {
  emit('update:modelValue', tabName);
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

  &__tab {
    padding: rem(14) rem(24);
    background-color: color(light-gray);
    border-radius: bradius(8);

    &.q-tab--active {
      background-color: color(purple);
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

  .q-tab__label {
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
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

  &--pills {
    .q-tabs__content {
      flex-wrap: wrap;

      @media(max-width: $breakpoint-xs) {
        flex-wrap: nowrap;
      }
    }

    .q-tab {
      padding: rem(12) rem(24);
      background-color: transparent;
      border-radius: rem(100);
      border: 1px solid color(dark-bluer);

      &.q-tab--active {
        background-color: color(dark-bluer);
        color: white;
      }
    }
  }
}
</style>

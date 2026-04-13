<template>
  <q-input
    stack-label
    label-slot
    class="a-input-labeled"
    input-class="text-medium-m"
    v-bind="$attrs"
  >
    <template #label>
      <p class="text-medium-xs">
        {{ $attrs.label }}
      </p>
    </template>
    <template #append>
      <slot name="append" />
    </template>
  </q-input>
</template>

<style lang="scss">
.a-input-labeled {
  .q-field__label {
    top: 0;
    color: color(dark);
    transform: none;
  }

  .q-field__control {
    height: rem(66);
    align-items: flex-end;

    &:before {
      border-bottom: 2px solid color(light-blue);
    }
  }

  &.q-field--highlighted {
    .q-field__label {
      color: color(primary);
    }
  }

  .q-field__native {
    padding-left: padding(8);
    padding-bottom: padding(16);

    &::placeholder {
      color: color(stroke);
      opacity: 1;
    }
  }

  .q-field__append {
    padding-right: padding(16);
  }
}
</style>

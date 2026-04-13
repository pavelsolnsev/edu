<template>
  <q-select
    borderless
    class="a-select"
    dropdown-icon="expand_more"
    clear-icon="close"
    v-bind="$attrs"
  />
</template>

<style lang="scss">
.a-select,
.a-input {
  background-color: color(control-bg);
  border-radius: bradius(8);
  height: rem(52);

  .q-field {
    &__control {
      padding: padding2(0, 16);
    }

    &__native {
      padding: padding2(14, 0);
      font-weight: 500;
      font-size: rem(16);
      line-height: rem(24);
    }

    &__input {
      font-weight: 500;
      font-size: rem(16);
      line-height: rem(24);
    }

    &__append {
      padding-left: padding(4);
    }
  }

  &--primary {
    .q-field__native,
    .q-field__append {
      color: color(primary);
    }
  }
  &--orange {
    .q-field__native,
    .q-field__append {
      color: color(orange);
    }
  }

  &--textline {
    height: rem(32);
    min-height: rem(32);
    padding: 0;
    background-color: inherit;
    .q-field__native,
    .q-field__control,
    .q-field__append {
      padding: 0;
      height: rem(40);
      min-height: rem(40);
      font-size: rem(32);
      font-weight: 600;
      line-height: rem(40);
      white-space: nowrap;
      @media screen and (max-width: $breakpoint-xs) {
        height: rem(32);
        min-height: rem(32);
        font-size: rem(24);
        line-height: rem(32);
      }
    }
    .q-field__append {
      margin-left: margin(8);
    }
  }
}
</style>

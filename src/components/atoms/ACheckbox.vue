<template>
  <q-checkbox
    color="primary"
    v-bind="$attrs"
    size="1.5rem"
    class="a-checkbox"
  >
    <div class="a-checkbox__label-wrap">
      <slot />
    </div>
  </q-checkbox>
</template>

<style lang="scss">
.a-checkbox {
  text-align: left;
  align-items: flex-start;

  .q-checkbox__inner {
    margin-right: margin(8);
    color: color(gray);
  }

  .q-checkbox__label {
    display: flex;
    align-items: center;
    min-height: rem(24);
    line-height: unset;
  }

  .q-checkbox__svg {
    width: rem(12) !important;
    height: rem(12) !important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .q-checkbox__bg {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: rem(4);
  }
}
</style>

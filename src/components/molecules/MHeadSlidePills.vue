<template>
  <div class="m-headslide-pills">
    <slot />
  </div>
</template>

<style lang="scss">
.m-headslide-pills {
  display: flex;

  @media screen and (max-width: $breakpoint-xs) {
    flex-direction: column;
    margin: margin4(32, 0, 0, 0);
  }

  @media screen and (min-width: $breakpoint-sm-min) {
    flex-direction: row;
    flex-wrap: wrap;
    margin-left: rem(-20);
    margin-top: rem(12);
  }

  @media screen and (min-width: $breakpoint-md-min) and (max-width: $breakpoint-md) {
    margin-top: rem(24);
    max-width: rem(590);
  }

  @media screen and (min-width: $breakpoint-lg-min) {
    margin-top: rem(16);
    margin-left: rem(-28);
    max-width: rem(598);
  }

  .m-headslide-pill {
    flex: 0 1 auto;
    margin: 0;
    @media screen and (min-width: $breakpoint-sm-min) {
      width: calc(50% - 1.25rem);
      margin-left: margin(20);
      margin-top: margin(20);
    }
    @media screen and (min-width: $breakpoint-lg-min) {
      width: calc(50% - 1.75rem);
      margin-left: margin(28);
      margin-top: margin(24);
    }
  }

  .m-headslide-pill:not(:first-child) {
    @media screen and (max-width: $breakpoint-xs) {
      margin: margin4(20, 0, 0, 0);
    }
  }
}
</style>

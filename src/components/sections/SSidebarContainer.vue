<template>
  <section class="s-sidebar-container">
    <slot />
  </section>
</template>

<style lang="scss">
.s-sidebar-container {
  & .container,
  & *.container {
    @media(min-width: $breakpoint-lg-min) {
      padding-right: rem(340);
    }
  }

  .s-charts {
      background-color: transparent !important;
  }
}
</style>

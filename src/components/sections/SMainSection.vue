<template>
  <section class="s-main-section">
    <div class="container">
      <slot />
    </div>
    <div
      v-if="!!$slots['scroll']"
      class="container-scroll"
    >
      <div class="container-scroll__content">
        <slot name="scroll" />
      </div>
    </div>
  </section>
</template>

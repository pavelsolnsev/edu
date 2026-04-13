<template>
  <div class="container">
    <h2>Filled Buttons</h2>
    <div
      v-for="size in sizes"
      :key="size"
      class="q-gutter-sm a-mb-32"
    >
      <q-btn
        v-for="color in colors"
        :key="color"
        unelevated
        :color="color"
        :size="size"
        :label="`${color} ${size}`"
      />
    </div>
    <h2>Outline buttons</h2>
    <div
      v-for="size in sizes"
      :key="size"
      class="q-gutter-sm a-mb-32"
    >
      <q-btn
        v-for="color in colors"
        :key="color"
        unelevated
        outline
        :color="color"
        :size="size"
        :label="`${color} ${size}`"
      />
    </div>
  </div>
  <div
    v-if="false"
    class="bg-light-blue"
  >
    <div class="container">
      <h2>Borderless buttons</h2>
      <div
        v-for="size in sizes"
        :key="size"
        class="q-gutter-sm a-mb-32"
      >
        <q-btn
          v-for="color in colors"
          :key="color"
          unelevated
          :size="size"
          :color="color"
          text-color="dark"
          :label="`${color} ${size}`"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const sizes = ['sm', 'md', 'lg', 'xl'];
const colors = [
  'dark',
  'gray',
  'blue-gray',
  'white',
  'blue-button',
  'purple',
  'blue-bg',
  'pink',
  'yellow',
  'dark-bluer',
  'green',
  'orange',
  'cyan',
  'light-blue-table',
  'dark-blue-table',
  'bright-orange',
  'blue-green',
  'light-gray',
  'stroke',
  'light-blue',
  'orange-light',
];
</script>

<style lang="scss">
.q-btn {
  text-transform: none;
}
</style>

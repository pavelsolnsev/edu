<template>
  <section class="s-vuz-contacts container">
    <h2
      v-if="title"
      class="s-vuz-contacts__title"
    >
      {{ title }}
    </h2>
    <MVuzContacts
      v-if="content"
      :contacts="content"
    />
  </section>
</template>

<script setup>
import MVuzContacts from 'src/components/molecules/MVuzContacts';

defineProps({
  title: {
    type: String,
    default: '',
  },
  content: {
    type: [Object, null],
    default: () => ({}),
  },
});
</script>

<style lang="scss">
.s-vuz-contacts {
  &__title {
    margin-bottom: margin(40);
  }
}
</style>

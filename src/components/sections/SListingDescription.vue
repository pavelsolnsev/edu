<!-- eslint-disable vue/no-v-html -->
<template>
  <SStaticText
    :title="title"
  >
    <p v-if="specName && specUrl">
      Подробнее о специальности
      <router-link :to="specUrl">
        {{ specName }}
      </router-link>
    </p>
    <p
      v-for="(item, i) in description"
      :key="i"
    >
      {{ item }}
    </p>
  </SStaticText>
</template>

<script setup>
import SStaticText from './SStaticText';

defineProps({
  title: {
    type: [String, null, undefined],
    default: null,
  },
  description: {
    type: [Array, null, undefined],
    default: null,
  },
  specName: {
    type: [String, null, undefined],
    default: null,
  },
  specUrl: {
    type: [String, null, undefined],
    default: null,
  },
});

</script>

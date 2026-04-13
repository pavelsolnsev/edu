<template>
  <table class="m-specialties-table">
    <thead>
      <tr>
        <th>Код</th>
        <th>Специальность</th>
        <th>Уровень</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="specialty in specialties"
        :key="specialty.specialty"
      >
        <td>{{ specialty.code }}</td>
        <td>{{ specialty.specialty }}</td>
        <td>{{ specialty.level }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  limit: {
    type: Number,
    default: 10,
  },
});

const specialties = computed(() => props.items.slice(0, props.limit));
</script>

<style lang="scss">
.m-specialties-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;

  tr {
    border-bottom: 1px solid color(stroke);

    &:last-child {
      border-bottom: none;
    }
  }

  th {
    padding-bottom: padding(16);
    padding-right: rem(30);
  }

  td {
    padding: rem(16) rem(30) rem(16) 0;

    &:nth-child(1) {
      min-width: rem(158);
    }

    &:nth-child(2) {
      min-width: rem(400);
    }

    &:nth-child(3) {
      min-width: rem(220);
    }
  }
}
</style>

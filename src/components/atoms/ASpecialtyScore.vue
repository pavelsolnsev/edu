<template>
  <div class="a-specialty-score">
    <div class="text-regular-m">
      <q-icon
        v-if="count"
        name="o_groups_2"
        size="1.5rem"
        color="orange"
        class="a-specialty-score__icon"
      />
      <q-icon
        v-else
        name="block"
        size="1.5rem"
        color="red"
        class="a-specialty-score__icon"
      />
      {{ title }} мест:
      <template v-if="count">
        {{ count }}
      </template>
      <template v-else>
        нет
      </template>
    </div>
    <div
      v-if="count && score"
      class="text-regular-m"
    >
      <q-icon
        name="sym_o_trending_flat"
        color="orange"
        class="a-specialty-score__arrow-icon"
      />
      Проходной балл: {{ score }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  count: {
    type: Number,
    default: 0,
  },
  score: {
    type: Number,
    default: 0,
  },
  title: {
    type: String,
    default: 'Внебюджетных',
  },
});
</script>

<style lang="scss">
.a-specialty-score {
  display: flex;
  align-items: center;
  gap: rem(16) 0;

  @media(max-width: $breakpoint-xs) {
    align-items: flex-start;
    flex-direction: column;
  }

  &__icon {
    margin-right: rem(8);
  }

  &__arrow-icon {
    margin: 0 rem(16);
    font-size: 2rem;

    @media(max-width: $breakpoint-xs) {
      margin-left: 0;
      margin-right: margin(8);
      font-size: 1.5rem;
    }
  }
}
</style>

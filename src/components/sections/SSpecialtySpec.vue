<template>
  <section
    v-if="item"
    class="s-specialty-spec container"
  >
    <div class="s-specialty-spec__wrapper">
      <h2 class="s-specialty-spec__title">
        Проходной балл, количество бюджетных мест, стоимость обучения на специальность
        {{ item.$specialty.name }} ({{ item.$specialty.code_okso }})
      </h2>
      <div class="s-specialty-spec__item">
        <p class="s-specialty-spec__name text-medium-l">
          Направления обучения
        </p>
        <p class="s-specialty-spec__value text-regular-m">
          {{ item.profile.replace('; ', ', ') }}
        </p>
      </div>
      <div class="s-specialty-spec__item">
        <p class="s-specialty-spec__name text-medium-l">
          Форма обучения
        </p>
        <p class="s-specialty-spec__value text-regular-m">
          {{ item.$form.name }}
        </p>
      </div>
      <div
        v-if="item?.calculation_data?.full_exams"
        class="s-specialty-spec__item"
      >
        <p class="s-specialty-spec__name text-medium-l">
          Экзамены / испытания
        </p>
        <p class="s-specialty-spec__value text-regular-m">
          {{ item.calculation_data.full_exams }}
        </p>
      </div>
      <div class="s-specialty-spec__item">
        <p class="s-specialty-spec__name text-medium-l">
          Проходной балл бюджет / платное
        </p>
        <p class="s-specialty-spec__value text-regular-m">
          {{ item.budget_score }} / {{ item.commercial_score }}
        </p>
      </div>
      <div class="s-specialty-spec__item">
        <p class="s-specialty-spec__name text-medium-l">
          Мест Бюджет / платное
        </p>
        <p class="s-specialty-spec__value text-regular-m">
          {{ item.budget_places }} / {{ item.commercial_places }}
        </p>
      </div>
      <div class="s-specialty-spec__item">
        <p class="s-specialty-spec__name text-medium-l">
          Стоимость за год
        </p>
        <p class="s-specialty-spec__value text-regular-m">
          {{ formatPrice(item.cost) }} ₽
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { formatPrice } from 'src/lib/functions';

defineProps({
  item: {
    type: [Object, null],
    default: null,
  },
});

</script>

<style lang="scss">
.s-specialty-spec {

  &.container {
    @media(max-width: $breakpoint-xs) {
      padding: 0;
    }
  }

  &__wrapper {
    padding: padding2(56, 40);
    border: 1px solid color(light-gray);
    border-radius: rem(32);

    @media(max-width: $breakpoint-xs) {
      padding: padding2(32, 20);
    }
  }

  &__title {
    margin-bottom: margin(32);
  }

  &__item {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: rem(32);

    &:last-child {
      margin-bottom: 0;
    }

    @media(max-width: $breakpoint-sm) {
      flex-direction: column;
    }

    @media(max-width: $breakpoint-xs) {
      margin-bottom: rem(24);
    }
  }

  &__name {
    width: rem(383);
    margin-right: margin(24);
    margin-bottom: 0;

    @media(max-width: $breakpoint-sm) {
      width: 100%;
      margin-right: 0;
      margin-bottom: margin(16);
    }
  }

  &__value {
    width: rem(370);
    margin-bottom: 0;

    @media(max-width: $breakpoint-sm) {
      width: 100%;
    }
  }
}
</style>

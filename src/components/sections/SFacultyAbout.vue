<template>
  <section
    v-if="item"
    class="s-faculty-about"
  >
    <div class="s-faculty-about__main container">
      <h2
        v-if="title"
        class="a-mb-24"
      >
        {{ title }}
      </h2>
      <p class="text-regular-m">
        {{ item.name }}. Вся основная информация о
        факультете:
      </p>
      <ul>
        <li>Количество бюджетных мест {{ item.calculation_data.budget_places }}</li>
        <li>Стоимость обучения от {{ formatPrice(item.calculation_data.min_cost) }} ₽</li>
        <li>Средний проходной балл {{ item.calculation_data.avg_score }}</li>
      </ul>
    </div>

    <div class="s-faculty-about__table container">
      <div class="s-faculty-about__table-wrapper">
        <h2 class="s-faculty-about__table-title">
          Ключевые показатели факультета
        </h2>
        <MExtendableTable
          :headings="headings"
          :items="tableValues"
          :th-class="'text-semibold-l'"
          :td-class="'text-medium-xl'"
          class="m-extendable-table--faculty-key-values"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import MExtendableTable from 'src/components/molecules/MExtendableTable';
import { formatPrice } from 'src/lib/functions';
import { computed } from 'vue';

const props = defineProps({
  title: {
    type: String || null,
    default: null,
  },
  item: {
    type: Object || null,
    default: null,
  },
});
const headings = [
  'Средний проходной балл',
  'Бюджетные места',
  'Сред. стоимость обучения за год',
];
const tableValues = computed(() => (props.item ? [
  {
    scrore: props.item.calculation_data.avg_score,
    budget: props.item.calculation_data.budget_places,
    price: `${formatPrice(props.item.calculation_data.avg_cost)} ₽`,
  },
] : []));
</script>

<style lang="scss">
.s-faculty-about {
  &__main {
    margin-bottom: margin(64);

    @media(max-width: $breakpoint-sm) {
      margin-bottom: margin(48);
    }
  }

  &__table.container {
    @media(max-width: $breakpoint-sm) {
      padding: 0;
    }
  }

  &__table-wrapper {
    width: 100%;
    padding: padding2(56, 40);
    border-radius: rem(24);
    background-color: color(blue-gray);
    overflow-x: auto;

    @media(max-width: $breakpoint-xs) {
      padding: padding2(48, 20);
    }
  }

  &__table-title {
    margin-bottom: margin(40);
    hyphens: none;
  }

  ul {
    margin: 0 0 rem(32) 0;
    padding: 0;

    &:last-child {
      margin-bottom: 0;
    }

    li {
      position: relative;
      padding-left: padding(28);
      margin-bottom: margin(8);
      list-style-type: none;

      &:last-child {
        margin-bottom: 0;
      }

      &:before {
        content: "";
        position: absolute;
        top: rem(6);
        left: 0;
        @include wh(12, 12);
        border-radius: 50%;
        background-color: color(orange);
      }
    }
  }
}
</style>

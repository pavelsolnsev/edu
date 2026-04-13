<template>
  <section
    id="licensed-specialties"
    class="s-vuz-specialties container"
  >
    <div class="s-vuz-specialties__wrapper">
      <h2 class="s-vuz-specialties__title">
        Лицензированные специальности
      </h2>
      <MExtendableTable
        :headings="headings"
        :items="data"
        :add-items="additional"
        add-button-text="Показать нереализуемые программы"
        :limit="10"
        class="m-extendable-table--specialties"
      />
    </div>
  </section>
</template>

<script setup>
import { api } from 'src/boot/axios';
import MExtendableTable from 'src/components/molecules/MExtendableTable';
import { computed } from 'vue';

const props = defineProps({
  items: {
    type: [Array, null],
    default: () => null,
  },
  addItems: {
    type: [Array, null],
    default: () => null,
  },
});

const headings = ['Код', 'Специальность', api.hostnames.isVuz ? 'Уровень' : 'Квалификация'];
const convertItems = (items) => (items ? items.map((item) => ({
  code: item.code_okso,
  specialty: {
    data: item.name,
    notAccreditation: !item.calculation_data.is_accreditation,
  },
  ...(api.hostnames.isVuz
    ? { level: item.level_code.charAt(0).toUpperCase() + item.level_code.slice(1) }
    : { qualification: item.qualification }),
})) : null);

const data = computed(() => convertItems(props.items));
const additional = computed(() => convertItems(props.addItems));
</script>

<style lang="scss">
.s-vuz-specialties {
  &.container {
    @media(max-width: $breakpoint-sm) {
      padding: 0;
    }
  }

  &__wrapper {
    width: 100%;
    padding: padding2(56, 40);
    border-radius: rem(24);
    background-color: color(blue-gray);
    overflow-x: auto;

    @media(max-width: $breakpoint-xs) {
      padding: padding2(48, 20);
    }
  }

  &__title {
    margin-bottom: margin(40);

    @media(max-width: $breakpoint-xs) {
      hyphens: auto;
    }
  }
}
</style>

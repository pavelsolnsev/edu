<template>
  <section class="s-specs-all a-mb-72">
    <MTabs
      v-model="tab"
      :tabs="tabs"
      class="a-mb-32 s-specs-all__tabs"
    />
    <q-tab-panels
      v-model="tab"
      class=""
    >
      <q-tab-panel
        name="Бакалавриат"
        class="s-specs-all__content a-pa-0"
      >
        <m-specs-all
          v-for="index in 10"
          :key="index"
          :title="title1"
          :items="items1"
          class=""
        />
      </q-tab-panel>
      <q-tab-panel
        name="Специалитет"
        class="s-specs-all__content a-pa-0"
      >
        <m-specs-all
          v-for="index in 10"
          :key="index"
          :title="title2"
          :items="items2"
        />
      </q-tab-panel>
      <q-tab-panel
        name="Магистратура"
        class="s-specs-all__content a-pa-0"
      >
        <m-specs-all
          v-for="index in 10"
          :key="index"
          :title="title3"
          :items="items3"
        />
      </q-tab-panel>
      <q-tab-panel
        name="Аспирантура"
        class="s-specs-all__content a-pa-0"
      >
        <m-specs-all
          v-for="index in 10"
          :key="index"
          :title="title4"
          :items="items4"
        />
      </q-tab-panel>
    </q-tab-panels>
  </section>
</template>
<script setup>
import MSpecsAll from 'src/components/molecules/MSpecsAll';
import MTabs from 'src/components/molecules/MTabs';
import { ref } from 'vue';

const tab = ref('Бакалавриат');
const tabs = [
  {
    name: 'Бакалавриат',
    label: 'Бакалавриат',
  },
  {
    name: 'Специалитет',
    label: 'Специалитет',
  },
  {
    name: 'Магистратура',
    label: 'Магистратура',
  },
  {
    name: 'Аспирантура',
    label: 'Аспирантура',
  },
];
const title1 = 'Математика и механика';
const items1 = [
  {
    id: 1,
    date: '01.03.01',
    name: 'Математика',
  },
  {
    id: 2,
    date: '01.03.02',
    name: 'Прикладная математика и информатика',
  },
  {
    id: 3,
    date: '01.03.03',
    name: 'Механика и математическое моделирование',
  },
  {
    id: 4,
    date: '01.03.04',
    name: 'Прикладная математика',
  },
  {
    id: 5,
    date: '01.03.05',
    name: 'Статистика',
  },
];
const title2 = 'Компьютерные и информационные науки';
const items2 = [
  {
    id: 1,
    date: '02.03.01',
    name: 'Математика и компьютерные науки',
  },
  {
    id: 2,
    date: '02.03.02',
    name: 'Фундаментальная информатика и информационные технологии',
  },
  {
    id: 3,
    date: '02.03.03',
    name: 'Математическое обеспечение и администрирование информационных систем',
  },
];
const title3 = 'Физика и астрономия';
const items3 = [
  {
    id: 1,
    date: '03.03.01',
    name: 'Прикладные математика и физика',
  },
  {
    id: 2,
    date: '03.03.02',
    name: 'Физика',
  },
  {
    id: 3,
    date: '03.03.03',
    name: 'Радиофизика',
  },
];
const title4 = 'Химия';
const items4 = [
  {
    id: 1,
    date: '04.03.01',
    name: 'Химия',
  },
  {
    id: 2,
    date: '04.03.02',
    name: 'Химия, физика и механика материалов',
  },
];
</script>
<style lang="scss">
.s-specs-all {
  &__tabs {
    .m-tabs__tabs-wrap, .q-tabs {
      padding: 0;
    }
    ::-webkit-scrollbar {
      display: none;
    }
  }
  &__item {
    display: flex;
    align-items: center;
    font-size: rem(14);
  }
}
</style>

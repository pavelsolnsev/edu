<template>
  <section class="s-favorites-list">
    <template v-if="tabs && tabs.length">
      <MTabs
        v-model="tab"
        :tabs="tabs"
        class="a-mb-40 m-tabs--separators"
      />
      <q-tab-panels
        v-model="tab"
        class="s-favorites-list__panels container"
      >
        <q-tab-panel
          v-for="item in tabs"
          :key="item.name"
          :name="item.name"
          class="s-favorites-list__panel"
        >
          <MFavoritesCard
            v-for="spec in item.children"
            :key="spec.name"
            :spec="spec"
          />
        </q-tab-panel>
      </q-tab-panels>
    </template>
    <div
      v-else
      class="s-favorites-list__empty-message container"
    >
      <p class="text-medium-l text-gray">
        Пока вы не добавили специальности к сравнению
      </p>
      <p class="text-regular-m text-gray">
        Но можете это сделать в любой момент нажав на
        <span class="s-favorites-list__fav" /> рядом с названием
        специальности
      </p>
    </div>
  </section>
</template>

<script setup>
import { api } from 'src/boot/axios';
import MFavoritesCard from 'src/components/molecules/MFavoritesCard';
import MTabs from 'src/components/molecules/MTabs';
import { formatDuration } from 'src/lib/functions';
import { capitalize, computed, ref } from 'vue';

const props = defineProps({
  items: {
    type: [Array, null],
    default: null,
  },
});

const allTabs = [
  {
    name: 'first',
    label: 'Первое высшее',
    condition: (e) => api.hostnames.isVuz
                      && e.is_first && 'бакалавриат,специалитет'.split(',').includes(e.specialty.level_code),
  },
  {
    name: 'second',
    label: 'Второе высшее',
    condition: (e) => api.hostnames.isVuz
                      && e.is_second && 'бакалавриат,специалитет'.split(',').includes(e.specialty.level_code),
  },
  {
    name: 'mag',
    label: 'Магистратура',
    condition: (e) => api.hostnames.isVuz && e.specialty.level_code === 'магистратура',
  },
  {
    name: 'phd',
    label: 'Аспирантура',
    condition: (e) => api.hostnames.isVuz
                      && 'аспирантура,адъюнтура,ординатура,ассистентура'.split(',').includes(e.specialty.level_code),
  },
  {
    name: 'after9',
    label: 'После 9 класса',
    condition: (e) => api.hostnames.isCollege && e.base === '9',
  },
  {
    name: 'after11',
    label: 'После 11 класса',
    condition: (e) => api.hostnames.isCollege && e.base === '11',
  },
];

const tabs = computed(() => allTabs.map((tabItem) => ({
  ...tabItem,
  children: props.items
    ? props.items
      .filter((item) => tabItem.condition(item))
      .map((e) => ({
        ...e,
        name: e.specialty.name,
        logo: e.organization.logo,
        educationForm: e.form?.name ?? '',
        educationLevel: e.specialty.level_code ? capitalize(e.specialty.level_code) : '',
        period: formatDuration(e.duration),
        budgetPlaces: e.budget_places,
        budgetPoints: e.budget_score,
        outBudgetPoints: e.commercial_score,
        exams: e.calculation_data?.exams ?? '',
        additional: e.description,
      })) : [],
}))
  .filter((tabItem) => tabItem.children && tabItem.children.length > 0));

const tabNames = computed(() => tabs.value.map((t) => t.name));
const tabVar = ref(null);

const tab = computed({
  get: () => (tabNames.value.includes(tabVar.value)
    ? tabVar.value
    : tabs.value[0]?.name || null),
  set: (v) => { tabVar.value = v; },
});

</script>

<style lang="scss">
.s-favorites-list {
  min-height: rem(500);
  margin-bottom: rem(72);

  &__panel {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: rem(24) rem(30);
    padding: 0;

    &--empty {
      display: block;
    }

    @media(max-width: $breakpoint-md) {
      gap: rem(24) rem(20);
    }

    @media(max-width: $breakpoint-sm) {
      grid-template-columns: 1fr 1fr;
    }

    @media(max-width: $breakpoint-xs) {
      grid-template-columns: 1fr;
      gap: rem(30) rem(20);
    }
  }

  &__fav {
    display: inline-block;
    @include wh(18, 18);
    margin: margin2(0, 8);
    background: url("/icons/heart.svg") no-repeat center center;
    background-size: contain;
    flex-shrink: 0;
  }

  &__empty-message {
    text-align: center;
  }
}
</style>

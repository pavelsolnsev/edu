<template>
  <section class="s-specs">
    <div class="container">
      <div class="a-mt-40 a-mb-32 s-specs__controls">
        <ASelect
          v-model="educationLevel"
          class="s-specs__education-select"
          :options="educationLevels"
          behavior="menu"
        />
        <ASelect
          v-model="educationForm"
          class="s-specs__education-select"
          :options="educationForms"
          behavior="menu"
        />
      </div>
      <div v-if="items?.data && itemsFiltered.length">
        <MSpecialtyItem
          v-for="(item, i) in itemsFiltered"
          :key="i"
          :item="item"
          :specialty="rel(item, items, 'specialty', 'specialties')"
          :faculty="rel(item, items, 'faculty', 'faculties')"
          :show-faculty="showFaculty"
          :form="rel(item, items, 'form', 'forms')"
          :second="educationLevel.value === '2'"
          :url="url"
        />
      </div>
      <p
        v-else
        class="a-mb-40 text-medium-l"
      >
        Образовательных программ удовлетворяющих условиям поиска в данном вузе не найдено
      </p>
    </div>
  </section>
</template>

<script setup>
import ASelect from 'components/atoms/ASelect';
import MSpecialtyItem from 'components/molecules/MSpecialtyItem';
import { rel } from 'src/lib/api';
import { computed, ref } from 'vue';

const props = defineProps({
  items: {
    type: [Object, null],
    default: null,
  },
  url: {
    type: String,
    default: '/',
  },
  showFaculty: {
    type: Boolean,
    default: false,
  },
});

const educationLevels = [
  {
    label: 'Первое высшее',
    value: '1',
    levels: 'бакалавриат,специалитет',
    test: (item) => item.is_first,
  },
  {
    label: 'Второе высшее',
    value: '2',
    levels: 'бакалавриат,специалитет',
    test: (item) => item.is_second,
  },
  {
    label: 'Магистратура',
    value: '3',
    levels: 'магистратура',
    test: () => true,
  },
  {
    label: 'Аспирантура',
    value: '4',
    levels: 'аспирантура,адъюнтура,ординатура,ассистентура',
    test: () => true,
  },
];
const educationForm = ref(null);

const educationForms = computed(() => {
  let forms = props.items?.rel?.forms;
  if (forms) {
    forms = Object.values(forms).map((f) => ({ label: f.name, value: f.id }));
    [educationForm.value] = forms;
    return forms;
  }
  return [];
});

const educationLevel = ref(educationLevels[0]);

const itemsFiltered = computed(
  () => (props.items?.data ? props.items.data.filter(
    (item) => {
      const level = rel(item, props.items, 'specialty', 'specialties')?.level_code;
      if (!level) return false;
      return item.rel.form === educationForm.value?.value
        && educationLevel.value.test(item)
        && educationLevel.value.levels.split(',').includes(level);
    },
  ) : []),
);

</script>

<style lang="scss">
.s-specs {
  &__controls {
    display: flex;
    gap: rem(16) rem(20);

    @media(max-width: $breakpoint-xs) {
      flex-direction: column;
    }
  }

  &__education-select {
    width: rem(240);

    @media(max-width: $breakpoint-xs) {
      width: 100%;
    }
  }
}
</style>

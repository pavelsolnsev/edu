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
      <div v-if="items?.data && hasItems">
        <div
          v-for="(itemGroup, groupName) in itemsGrouped"
          :key="groupName"
        >
          <h2 class="s-specs__faculty-title">
            {{ groupName }}
          </h2>
          <p class="s-specs__faculty-address text-regular-m">
            <q-icon
              :name="'img:' + require('/public/icons/map.svg')"
              size="1.5rem"
              class="m-vuz-contacts__icon a-mr-16"
            />
            {{ city ? `г. ${city}` : '' }}, {{ itemGroup[0].$faculty.address }}
          </p>
          <p class="s-specs__faculty-subtitle a-mb-8 text-medium-l">
            Образовательные программы:
          </p>
          <MSpecilatyCollegeItem
            v-for="(item, i) in itemGroup"
            :key="i"
            :item="item"
            :specialty="item.$specialty"
            :faculty="item.$faculty"
            :form="item.$form"
            :url="url"
          />
        </div>
      </div>
      <p
        v-else
        class="a-mb-40 text-medium-l"
      >
        Образовательных программ удовлетворяющих условиям поиска в данном колледже не найдено
      </p>
    </div>
  </section>
</template>

<script setup>
import ASelect from 'components/atoms/ASelect';
import MSpecilatyCollegeItem from 'src/components/molecules/MSpecilatyCollegeItem';
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
  city: {
    type: String,
    default: '',
  },
});

const specialties = props.items.data.map((item) => ({
  ...item,
  $specialty: rel(item, props.items, 'specialty', 'specialties'),
  $form: rel(item, props.items, 'form', 'forms'),
  $faculty: rel(item, props.items, 'faculty', 'faculties'),
}));

const educationLevels = [
  {
    label: 'На базе 9 классов',
    value: '9',
    levels: 'среднее специальное',
  },
  {
    label: 'На базе 11 классов',
    value: '11',
    levels: 'среднее специальное',
  },
];
const educationForm = ref(null);

const educationForms = computed(() => {
  let forms = props.items?.rel?.forms;
  if (forms) {
    forms = Object.values(forms)
      .map((f) => ({
        label: f.name,
        value: f.id,
      }));
    [educationForm.value] = forms;
    return forms;
  }
  return [];
});

const educationLevel = ref(educationLevels[0]);

const itemsFiltered = computed(() => (specialties.length ? specialties.filter((specialty) => (
  specialty.$form.id === educationForm.value?.value && educationLevel.value.value === specialty.base
)) : []));

const itemsGrouped = computed(() => (itemsFiltered.value.reduce((result, specialty) => {
  if (specialty.$faculty && !result[specialty.$faculty.name]) result[specialty.$faculty.name] = [];
  result[specialty.$faculty.name].push(specialty);
  return result;
}, {})));

const hasItems = computed(() => Object.keys(itemsGrouped.value).length !== 0);
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

  &__faculty-title {
    margin-top: margin(40);
    margin-bottom: margin(16);
  }

  &__faculty-address {
    margin-bottom: margin(24);
  }
}
</style>

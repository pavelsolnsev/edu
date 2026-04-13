<template>
  <SMainSection
    class="s-listing-find-form"
  >
    <div class="s-listing-find-form__layout">
      <div class="row q-col-gutter-md s-listing-find-form__inputs">
        <div class="col-xs-12 col-sm-6">
          <ASelect
            v-model="eduType"
            :options="eduTypes"
            placeholder="Первое высшее"
            @update:model-value="eduSpec = null"
          />
        </div>
        <div class="col-xs-12 col-sm-6">
          <ASelect
            v-model="eduSpec"
            :options="eduSpecs"
            clearable
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            hide-dropdown-icon
            placeholder="Специальность"
            option-label="name"
            option-value="code"
            @filter="filterSpecs"
          />
        </div>
        <div class="col-xs-12 col-sm-6">
          <ASelect
            v-model="eduFormat"
            :options="eduFormats"
            placeholder="Очно"
          />
        </div>
        <div class="col-xs-12 col-sm-6">
          <AButton
            class="a-button--form"
            label="Подобрать ВУЗ"
            :loading="loading"
            :disabled="loading"
            @click="submit"
          />
        </div>
      </div>
      <div class="row q-col-gutter-x-md s-listing-find-form__checkboxes">
        <div
          v-if="showCheckboxes"
          class="col-xs-12 col-sm-6"
        >
          <ACheckbox
            v-model="c1"
            class="text-medium-m"
            label="Государственный ВУЗ"
          />
        </div>
        <div
          v-if="showCheckboxes"
          class="col-xs-12 col-sm-6"
        >
          <ACheckbox
            v-model="c2"
            class="text-medium-m"
            label="Бюджетные места"
          />
        </div>
        <div
          v-if="showCheckboxes"
          class="col-xs-12 col-sm-6"
        >
          <ACheckbox
            v-model="c3"
            class="text-medium-m"
            label="Военная кафедра"
          />
        </div>
        <div class="col-xs-12 col-sm-6">
          <div :class="['row no-wrap items-center', { 'a-mt-8': !showCheckboxes }]">
            <div class="col-grow">
              <ACheckbox
                v-if="showCheckboxes"
                v-model="c4"
                class="text-medium-m"
                label="Общежитие"
              />
              <div
                v-else
                class="text-medium-s"
              >
                Дополнительные параметры
              </div>
            </div>
            <div class="xs col-shrink">
              <q-icon
                name="tune"
                size="1.5rem"
                style="transform: rotate(-90deg)"
                @click="showCheckboxes = !showCheckboxes"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </SMainSection>
</template>

<script setup>
import ACheckbox from 'components/atoms/ACheckbox';
import { getSpecialtiesByName } from 'src/api/specialties';
import AButton from 'src/components/atoms/AButton.vue';
import ASelect from 'src/components/atoms/ASelect.vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import SMainSection from './SMainSection.vue';

const props = defineProps({
  route: {
    type: [Object, null],
    default: null,
  },
  specialty: {
    type: [Object, null],
    default: null,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
const $router = useRouter();

const eduTypes = [
  { label: 'Первое высшее', value: '' },
  { label: 'Второе высшее', value: 'sec' },
  { label: 'Магистратура', value: 'mag' },
  { label: 'Аспирантура', value: 'phd' },
];

const eduFormats = [
  { label: 'Очно', value: 1 },
  { label: 'Очно-заочно', value: 2 },
  { label: 'Заочно', value: 3 },
  { label: 'Дистанционно', value: 4 },
];

const eduSpecs = ref([]);
const eduSpec = ref(null);
const eduType = ref(null);
const eduFormat = ref(null);
const c1 = ref(null);
const c2 = ref(null);
const c3 = ref(null);
const c4 = ref(null);

const showCheckboxes = ref(true);

onMounted(() => {
  eduType.value = props.route?.params?.level
    ? eduTypes.find((t) => t.value === props.route.params.level) ?? eduTypes[0] : eduTypes[0];
  const specialty = props.specialty ? {
    code: props.specialty.code,
    name: props.specialty.name,
  } : null;
  if (specialty) {
    eduSpecs.value = [specialty];
    eduSpec.value = specialty;
  }
  eduFormat.value = props.route?.query?.form
    ? eduFormats.find((f) => f.value === props.route.query.form) ?? eduFormats[0]
    : props.route.name === 'lsDistant' ? eduFormats[3] : eduFormats[0];
  c1.value = props.route?.query?.gos === 'y';
  c2.value = props.route?.query?.free === 'y';
  c3.value = props.route?.query?.mil === 'y';
  c4.value = props.route?.query?.hos === 'y';
});

const submit = () => {
  const route = {
    name: props.route.name === 'lsDistant' ? 'lsDistant' : 'lsDefault',
    params: {},
    query: {},
  };
  if (props.route.params.rid) {
    route.params.rid = props.route.params.rid;
    route.params.cid = props.route.params.cid;
  }
  route.params.level = eduType.value.value;
  route.query.form = eduFormat.value.value;
  if (eduSpec.value?.code) {
    route.query.spec = eduSpec.value.code;
  }
  if (c1.value) route.query.gos = 'y';
  if (c2.value) route.query.free = 'y';
  if (c3.value) route.query.mil = 'y';
  if (c4.value) route.query.hos = 'y';
  $router.push(route);
};

const filterSpecs = async (val, update, abort) => {
  if (val.length < 3) {
    abort();
    return;
  }
  const specs = await getSpecialtiesByName(val, eduType.value.value);
  update(
    () => {
      eduSpecs.value = (val === '') ? [] : specs.data;
    },
    (qref) => {
      if (val !== '' && qref.options.length > 0) {
        qref.setOptionIndex(-1);
        qref.moveOptionSelection(1, true);
      }
    },
  );
};

</script>

<style lang="scss">
.s-listing-find-form {
  background-color: color(light-blue);

  &__layout {
    padding: padding4(32, 0, 24, 0);
  }

  &__inputs {
    @media screen and (min-width: $breakpoint-md-min) {
      & > div:nth-child(1) {
        width: rem(240);
      }
      & > div:nth-child(2) {
        width: rem(298);
      }
      & > div:nth-child(3) {
        width: rem(208);
      }
      & > div:nth-child(4) {
        width: rem(188);
      }
    }
  }

  &__checkboxes {
    margin-top: margin(16);

    @media screen and (min-width: $breakpoint-md-min) {
      & > div {
        width: auto !important;
      }
      & > div:not(:first-child) {
        margin-left: margin(4) !important;
      }
    }
  }

  .a-button,
  .a-input,
  .a-select {
    width: 100%;
  }
}
</style>

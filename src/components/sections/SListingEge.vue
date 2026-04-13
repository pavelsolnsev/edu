<template>
  <section class="s-listing-ege a-pb-120">
    <h1
      v-if="h1"
      class="s-listing-ege__title"
    >
      {{ h1 }}
    </h1>
    <div class="s-listing-ege__box a-mt-32">
      <div class="s-listing-ege__radio">
        <h5>Форма обучения</h5>
        <div>
          <q-radio
            v-for="form in forms"
            :key="form.id"
            v-model="eduForm"
            :val="form.id"
            :label="form.name"
          />
        </div>
      </div>
      <div class="s-listing-ege__select">
        <h5>Экзамены ЕГЭ</h5>
        <div>
          <q-select
            v-for="(item, i) in exam"
            :key="i"
            v-model="exam[i]"
            :options="examList"
            option-label="name"
            option-value="id"
            clearable
            standout="bg-light-gray"
            class="a-select a-select--exam"
            dropdown-icon="expand_more"
            clear-icon="close"
            :label-slot="!exam[i]"
            @update:model-value="updateExamList"
          >
            <template #label>
              <span>Выберите экзамен</span>
            </template>
          </q-select>
        </div>
      </div>
      <div class="s-listing-ege__rang">
        <h5>Проходной балл</h5>
        <div>
          <q-badge>
            {{ rangeEge.min }} — {{ rangeEge.max }} проходной балл
          </q-badge>
          <q-range
            v-model="rangeEge"
            :min="minEge"
            :max="maxEge"
            thumb-size="15px"
            :disable="examIds.length === 0"
          />
          <q-checkbox
            v-model="onlyBudget"
            label="Только на бюджет"
            :disable="examIds.length === 0"
          />
          <q-btn
            unelevated
            color="primary"
            label="Подобрать"
            class="button-m text-button-m button-wide s-listing-ege__rang-btn"
            :disable="examIds.length === 0"
            @click="onSubmit"
          />
        </div>
      </div>
    </div>
    <p class="a-mt-32">
      Поиск специальностей в вузах Москвы по предметам ЕГЭ,
      добавляйте направления подготовки в избранное и сравнивайте проходные баллы.
      Выбирайте список ЕГЭ так, чтобы они требовались для поступления в вузы Москвы
      именно в таком количестве и составе. Среди вступительных испытаний для поступления
      в вуз всегда присутствует русский язык. Обычно для поступления требуется три экзамена
      ЕГЭ, но реже может быть от двух до четырех. Для вашего удобства мы сделали возможным поиск
      по экзаменам в количестве от двух до четырех предметов, чтобы можно было найти любой из
      возможных вариантов.
    </p>
  </section>
</template>
<script setup>
import {
  computed, ref,
} from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  h1: {
    type: String,
    default: '',
  },
  exams: {
    type: [Array, null],
    default: () => [],
  },
  forms: {
    type: [Array, null],
    default: () => [],
  },
  route: {
    type: Object,
    default: () => {},
  },
});

const $router = useRouter();

const eduForm = ref(null);
const exam = ref(Array(4).fill(null));
const examList = ref([]);
const rangeEge = ref({
  min: 0,
  max: 100,
});
const minEge = ref(0);
const maxEge = ref(100);
const onlyBudget = ref(false);

const examIds = computed(() => exam.value
  .filter((e) => e !== null)
  .map((e) => e.id));

function updateExamList() {
  examList.value = props.exams
    ? props.exams.filter((e) => !examIds.value.includes(e.id) && e.min_score > 0)
    : [];
  minEge.value = exam.value.reduce((a, e) => (e ? a + e.min_score : a), 0);
  maxEge.value = examIds.value.length * 100;
  rangeEge.value = {
    min: minEge.value,
    max: maxEge.value,
  };
}

function getOptonsFromRoute(route) {
  const q = route.query;
  eduForm.value = q.form ?? '1';
  exam.value = props.exams
    .filter((e) => route.query?.['exam[]']?.includes(e.id))
    .concat(Array(4).fill(null))
    .slice(0, 4);
  updateExamList();
  rangeEge.value = {
    min: q['ege-min'] ? q['ege-min'] < minEge.value ? minEge.value : q['ege-min'] : minEge.value,
    max: q['ege-max'] ? q['ege-max'] > maxEge.value ? maxEge.value : q['ege-max'] : maxEge.value,
  };
  onlyBudget.value = q['only-free'] === '1';
}

async function onSubmit() {
  $router.push({
    name: 'lsEge',
    query: {
      form: eduForm.value,
      'exam[]': examIds.value,
      'ege-min': rangeEge.value.min,
      'ege-max': rangeEge.value.max,
      ...onlyBudget.value ? { 'only-free': 1 } : {},
    },
    hash: `#${examIds.value.join(',')}`,
  });
}

getOptonsFromRoute(props.route);
</script>

<style lang="scss">
.a-select--exam {
  .q-field__native,
  .q-field__append  {
    color: color(dark) !important;
  }
  .q-field__control {
    box-shadow: none !important;
  }
}

.s-listing-ege {
  &__box {
    display: flex;
    align-items: flex-start;
    position: relative;

    h5 {
      margin-bottom: margin(8);
    }

    @media (max-width: $breakpoint-md) {
      flex-wrap: wrap;
      padding-bottom: padding(64);
    }
    @media (max-width: $breakpoint-sm) {
      padding-bottom: padding(72);
    }
  }

  &__radio {
    margin-right: margin(32);
    flex: 0 0 auto;
    @media (max-width: $breakpoint-md) {
      margin-bottom: margin(24);
      order: 1;
    }

    > div {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      @media (max-width: $breakpoint-md) {
        grid-template-columns: repeat(2, auto);
        grid-column-gap: rem(24);
      }
      @media (max-width: $breakpoint-xs) {
        grid-template-columns: repeat(1, 1fr);
      }
    }

    .q-radio__inner {
      font-size: rem(30);
      color: color(blue-button);
    }
    .q-radio__inner--truthy .q-radio__check {
      stroke: color(blue-button);
      stroke-width: 40%;
    }
  }

  &__select {
    margin-right: rem(30);
    flex: 0 0 rem(470);
    @media (max-width: $breakpoint-md) {
      width: 100%;
      order: 3;
      flex: 0 0 auto;
      margin-right: 0;
    }
    @media (max-width: $breakpoint-xs) {
      order: 2;
      margin-bottom: margin(24);
    }

    > div {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-column-gap: rem(8);
      grid-row-gap: rem(20);
      @media (max-width: $breakpoint-md) {
        grid-column-gap: rem(20);
        grid-row-gap: rem(8);
      }
      @media (max-width: $breakpoint-sm) {
        grid-row-gap: rem(16);
      }
      @media (max-width: $breakpoint-xs) {
        grid-template-columns: repeat(1, 1fr);
        grid-row-gap: rem(8);
      }
    }

    .a-select, .a-input {
      height: rem(56);
      line-break: anywhere;
    }
  }

  &__rang {
    @media (max-width: $breakpoint-md) {
      flex: 0 0 rem(170);
      order: 2;
    }
    @media (max-width: $breakpoint-xs) {
      order: 3;
      flex: 0 0 100%;
    }

    &-btn {
      @media (max-width: $breakpoint-md) {
        position: absolute;
        bottom: 0;
        left: 0;
        max-width: calc(50% - 0.4375rem);
      }
      @media (max-width: $breakpoint-xs) {
        max-width: 100%;
      }
    }

    .q-badge {
      background: transparent;
      color: color(dark);
      font-weight: 500;
      font-size: rem(12);
      line-height: 150%;
      padding: 0;
    }

    .q-slider__track-container--h {
      padding: rem(8) 0;
    }

    .q-checkbox__inner--truthy .q-checkbox__bg, .q-checkbox__inner--indet .q-checkbox__bg {
      background: color(purple);
    }

    .q-checkbox__bg {
      border: 2px solid color(purple);
      border-radius: rem(4);
    }

    .row.inline {
      margin: rem(-16) 0 0 rem(-9);
      white-space: nowrap;
      font-size: rem(12);
    }
  }
}
</style>

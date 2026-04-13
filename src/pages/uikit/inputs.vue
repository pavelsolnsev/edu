<template>
  <div
    v-for="borderless in [false, true]"
    :key="borderless"
    :class="{ 'bg-light-blue': borderless, 'q-py-lg': true }"
  >
    <div class="container">
      <template
        v-for="dense in [false, true]"
        :key="dense"
      >
        <template
          v-for="labeled in [false, true]"
          :key="labeled"
        >
          <template
            v-for="stacked in [false, true]"
            :key="stacked"
          >
            <div class="row q-col-gutter-md q-mb-md">
              <div class="col-xs-12 col-sm-6 col-md-3">
                <q-input
                  v-model="phone"
                  outlined
                  mask="+7-(###)-###-##-##"
                  :dense="dense"
                  :stack-label="stacked"
                  :class="{ 'input--borderless': borderless }"
                  :placeholder="!labeled ? 'Телефон' : undefined"
                  :label="labeled ? 'Телефон' : undefined"
                />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-3">
                <q-input
                  v-model="email"
                  outlined
                  :dense="dense"
                  :stack-label="stacked"
                  :class="{ 'input--borderless': borderless }"
                  :placeholder="!labeled ? 'E-mail' : undefined"
                  :label="labeled ? 'E-mail' : undefined"
                />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-3">
                <q-input
                  v-model="name"
                  outlined
                  :dense="dense"
                  :stack-label="stacked"
                  :class="{ 'input--borderless': borderless }"
                  :placeholder="!labeled ? 'Имя' : undefined"
                  :label="labeled ? 'Имя' : undefined"
                />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-3">
                <q-btn
                  unelevated
                  color="primary"
                  label="Отправить"
                  :class="getBtnClass(dense)"
                  style="width: 100%"
                />
              </div>
            </div>
            <div class="row q-col-gutter-md q-mb-md">
              <div class="col-xs-12 col-sm-6 col-md-3">
                <q-select
                  v-model="eduType"
                  :options="eduTypes"
                  outlined
                  :dense="dense"
                  :stack-label="stacked"
                  :class="{ 'input--borderless': borderless }"
                  :placeholder="!labeled ? 'Тип обучения' : undefined"
                  :label="labeled ? 'Тип обучения' : undefined"
                  dropdown-icon="expand_more"
                  clear-icon="close"
                />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-3">
                <q-select
                  v-model="eduSpec"
                  :options="eduSpecs"
                  outlined
                  :dense="dense"
                  :stack-label="stacked"
                  :class="{ 'input--borderless': borderless }"
                  :placeholder="!labeled ? 'Специальность' : undefined"
                  :label="labeled ? 'Специальность' : undefined"
                  dropdown-icon="expand_more"
                  clear-icon="close"
                  clearable
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="0"
                  hide-dropdown-icon
                  @filter="filterSpecs"
                />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-3">
                <q-select
                  v-model="eduFormat"
                  :options="eduFormats"
                  outlined
                  :dense="dense"
                  :stack-label="stacked"
                  :class="{ 'input--borderless': borderless }"
                  :placeholder="!labeled ? 'Форма обучения' : undefined"
                  :label="labeled ? 'Форма обучения' : undefined"
                  dropdown-icon="expand_more"
                  clear-icon="close"
                />
              </div>
              <div class="col">
                <q-btn
                  unelevated
                  color="primary"
                  label="Подобрать"
                  :class="getBtnClass(dense)"
                  style="width: 100%"
                />
              </div>
            </div>
          </template>
        </template>
      </template>
    </div>
  </div>
  <div class="container">
    <h2>Outline</h2>
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-xs-12 col-sm-6 col-md-3">
        <q-input
          v-model="phone"
          outlined
          placeholder="Телефон"
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-3">
        <q-input
          v-model="email"
          outlined
          placeholder="E-mail"
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-3">
        <q-input
          v-model="name"
          outlined
          placeholder="Имя"
        />
      </div>
      <div class="col">
        <q-btn
          unelevated
          color="primary"
          label="Отправить"
          :class="getBtnClass(dense)"
          style="width: 100%"
        />
      </div>
    </div>
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-xs-12 col-sm-6 col-md-3">
        <q-select
          v-model="eduType"
          :options="eduTypes"
          outlined
          dropdown-icon="expand_more"
          clear-icon="close"
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-3">
        <q-select
          v-model="eduSpec"
          :options="eduSpecs"
          outlined
          dropdown-icon="expand_more"
          clear-icon="close"
          clearable
          use-input
          hide-selected
          fill-input
          input-debounce="0"
          hide-dropdown-icon
          placeholder="Специальность"
          @filter="filterSpecs"
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-3">
        <q-select
          v-model="eduFormat"
          :options="eduFormats"
          outlined
          dropdown-icon="expand_more"
          clear-icon="close"
        />
      </div>
      <div class="col">
        <q-btn
          unelevated
          color="primary"
          label="Подобрать"
          :class="getBtnClass(dense)"
          style="width: 100%"
        />
      </div>
    </div>
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-xs-12 col-sm-6 col-md-3">
        <q-input
          v-model="phone"
          outlined
          dense
          placeholder="Телефон"
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-3">
        <q-input
          v-model="email"
          outlined
          dense
          placeholder="E-mail"
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-3">
        <q-input
          v-model="name"
          outlined
          dense
          placeholder="Имя"
        />
      </div>
      <div class="col">
        <q-btn
          unelevated
          color="primary"
          label="Отправить"
          :class="getBtnClass(true)"
          style="width: 100%"
        />
      </div>
    </div>
    <div class="row q-col-gutter-md q-mb-xl">
      <div class="col-xs-12 col-sm-6 col-md-3">
        <q-select
          v-model="eduType"
          :options="eduTypes"
          dense
          outlined
          dropdown-icon="expand_more"
          clear-icon="close"
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-3">
        <q-select
          v-model="eduSpec"
          :options="eduSpecs"
          dense
          outlined
          dropdown-icon="expand_more"
          clear-icon="close"
          clearable
          use-input
          hide-selected
          fill-input
          input-debounce="0"
          hide-dropdown-icon
          placeholder="Специальность"
          @filter="filterSpecs"
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-3">
        <q-select
          v-model="eduFormat"
          :options="eduFormats"
          dense
          outlined
          dropdown-icon="expand_more"
          clear-icon="close"
        />
      </div>
      <div class="col">
        <q-btn
          unelevated
          color="primary"
          label="Отправить"
          :class="getBtnClass(true)"
          style="width: 100%"
        />
      </div>
    </div>
  </div>
  <div class="bg-light-blue">
    <div class="container">
      <h2>Borderless</h2>
      <div class="row q-col-gutter-md q-mb-lg">
        <div class="col-xs-12 col-sm-6 col-md-3">
          <q-input
            v-model="phone"
            outlined
            class="input--borderless"
            placeholder="Телефон"
          />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-3">
          <q-input
            v-model="email"
            outlined
            class="input--borderless"
            placeholder="E-mail"
          />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-3">
          <q-input
            v-model="name"
            outlined
            class="input--borderless"
            placeholder="Имя"
          />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-3">
          <q-btn
            unelevated
            color="primary"
            label="Отправить"
            :class="getBtnClass(dense)"
            style="width: 100%"
          />
        </div>
      </div>
      <div class="row q-col-gutter-md q-mb-lg">
        <div class="col-xs-12 col-sm-6 col-md-3">
          <q-select
            v-model="eduType"
            :options="eduTypes"
            outlined
            class="input--borderless"
            dropdown-icon="expand_more"
            clear-icon="close"
          />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-3">
          <q-select
            v-model="eduSpec"
            :options="eduSpecs"
            outlined
            class="input--borderless"
            dropdown-icon="expand_more"
            clear-icon="close"
            clearable
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            hide-dropdown-icon
            placeholder="Специальность"
            @filter="filterSpecs"
          />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-3">
          <q-select
            v-model="eduFormat"
            :options="eduFormats"
            outlined
            class="input--borderless"
            dropdown-icon="expand_more"
            clear-icon="close"
          />
        </div>
        <div class="col">
          <q-btn
            unelevated
            color="primary"
            label="Отправить"
            :class="getBtnClass(dense)"
            style="width: 100%"
          />
        </div>
      </div>
      <h2>Borderless Labeled</h2>
      <div class="row q-col-gutter-md q-mb-xl">
        <div class="col-xs-12 col-sm-6 col-md-3">
          <q-input
            v-model="phone"
            outlined
            class="input--borderless"
            label="Телефон"
          />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-3">
          <q-input
            v-model="email"
            outlined
            class="input--borderless"
            label="E-mail"
          />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-3">
          <q-input
            v-model="name"
            outlined
            class="input--borderless"
            label="Имя"
          />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-3">
          <q-btn
            unelevated
            color="primary"
            label="Отправить"
            :class="getBtnClass(dense)"
            style="width: 100%"
          />
        </div>
      </div>
      <div class="row q-col-gutter-md q-mb-lg">
        <div class="col-xs-12 col-sm-6 col-md-3">
          <q-select
            v-model="eduType"
            :options="eduTypes"
            outlined
            class="input--borderless"
            dropdown-icon="expand_more"
            clear-icon="close"
            label="Тип обучения"
          />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-3">
          <q-select
            v-model="eduSpec"
            :options="eduSpecs"
            outlined
            class="input--borderless"
            dropdown-icon="expand_more"
            clear-icon="close"
            clearable
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            hide-dropdown-icon
            label="Специальность"
            @filter="filterSpecs"
          />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-3">
          <q-select
            v-model="eduFormat"
            :options="eduFormats"
            outlined
            class="input--borderless"
            dropdown-icon="expand_more"
            clear-icon="close"
            label="Формат обучения"
          />
        </div>
        <div class="col">
          <q-btn
            unelevated
            color="primary"
            label="Отправить"
            :class="getBtnClass(dense)"
            style="width: 100%"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const phone = ref('');
const email = ref('');
const name = ref('');

const eduTypes = ['Первое высшее', 'Второе высшее', 'Магистратура', 'Аспирантура'];
const eduType = ref('Первое высшее');
const eduSpecsAll = [
  'Прикладная математика и информатика',
  'Прикладные математика и физика',
  'Экология и природопользование',
  'Юриспруденция',
  'Педагогическое образование (с двумя профилями подготовки)',
];
const eduSpecs = ref(eduSpecsAll);
const eduSpec = ref(null);
const eduFormats = ['Очно', 'Очно-заочно', 'Заочно', 'Дистанционно'];
const eduFormat = ref('Очно');
const getBtnClass = (dense) => (dense ? 'button-s' : 'button-m');
const filterSpecs = (val, update, abort) => {
  if (val.length < 2) {
    abort();
    return;
  }
  update(
    () => {
      if (val === '') {
        eduSpecs.value = eduSpecsAll;
      } else {
        const needle = val.toLowerCase();
        eduSpecs.value = eduSpecsAll.filter((v) => v.toLowerCase().indexOf(needle) > -1);
      }
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
// $
.button-m {
  @include typoClass('button-m');
  height: rem(56);
}

.button-s {
  @include typoClass('button-s');
  height: rem(40);
}

.q-btn {
  text-transform: none;
}

.input--borderless {
  .q-field__control {
    background-color: color(white);
  }
  .q-field__control:after,
  .q-field__control:before {
    border: none !important;
  }
  .q-field__native {
    font-size: 1rem;
  }
}
</style>

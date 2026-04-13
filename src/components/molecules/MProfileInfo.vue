<template>
  <div class="m-profile-info">
    <q-form ref="form">
      <div
        class="m-profile-info__title a-mb-32"
        :class="{ active: isClickableActive }"
      >
        <h4>О себе</h4>
        <div @click="changeInfo">
          <span>Изменить информацию</span>
          <q-icon
            name="sym_o_stylus_note"
            size="1.5rem"
            :class="{'blue-button': !isClickableActive, 'stroke': isClickableActive}"
            class="a-ml-8"
          />
        </div>
      </div>
      <div class="m-profile-info__row a-mb-52">
        <AInputLabeled
          v-model="name"
          placeholder="Иван"
          label="Имя"
          :rules="[emptyCheck]"
          class="m-profile-info__input"
          :readonly="inputDisabled"
        />
        <AInputLabeled
          v-model="surname"
          placeholder="Иванов"
          label="Фамилия"
          :rules="[emptyCheck]"
          class="m-profile-info__input"
          :readonly="inputDisabled"
        />
        <AInputLabeled
          v-model.trim="email"
          type="email"
          placeholder="you@example.com"
          label="Электронная почта"
          :rules="[emptyCheck, (val, rules) => rules.email(val) || 'Введите правильный email']"
          class="m-register__input"
          :readonly="inputDisabled"
          @keydown.space.prevent
        >
          <template #append>
            <q-icon
              name="o_email"
              color="gray"
              size="1.5rem"
            />
          </template>
        </AInputLabeled>
        <AInputLabeled
          v-model="city"
          placeholder="Москва"
          label="Город"
          :rules="[emptyCheck]"
          class="m-profile-info__input"
          :readonly="inputDisabled"
        />
      </div>
      <div class="m-profile-info__buttons">
        <AButton
          v-if="showSaveButton"
          label="Сохранить"
          class="m-profile-info__btn"
          :disabled="agree"
        />
        <AButton
          v-if="showCancelButton"
          outline
          label="Отменить изменения"
          class="m-profile-info__btn"
          @click="CancelBtn"
        />
      </div>
    </q-form>
  </div>
</template>
<script setup>
import AButton from 'src/components/atoms/AButton';
import AInputLabeled from 'src/components/atoms/AInputLabeled';
import { ref, watch } from 'vue';

const form = ref(null);
const agree = ref(true);
const surname = ref('');
const name = ref('');
const email = ref('');
const city = ref('');
const showSaveButton = ref(false);
const showCancelButton = ref(false);
const inputDisabled = ref(true);
const isClickableActive = ref(false);
const emptyCheck = (val) => (!!val || 'Поле не должно быть пустым');

function changeInfo() {
  showSaveButton.value = true;
  inputDisabled.value = false;
  isClickableActive.value = true;
}

function CancelBtn() {
  isClickableActive.value = false;
}

watch([name, surname, email, city], () => {
  showCancelButton.value = true;
  agree.value = false;
});
</script>
<style lang="scss">
.m-profile-info {
  &__title {
    display: flex;
    justify-content: space-between;

    &.active {
      div {
        color: color(stroke);
        cursor: auto;
      }
    }

    div {
      color: color(blue-button);
      font-size: 16px;
      font-weight: 500;
      display: flex;
      align-items: center;
      cursor: pointer;

      span {
        @media(max-width: $breakpoint-xs) {
          display: none;
        }
      }
    }
  }

  &__row {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: rem(32);
    grid-row-gap: rem(24);
    @media(max-width: $breakpoint-xs) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  .q-field--with-bottom {
    padding-bottom: 0;
  }

  &__buttons {
    display: flex;
    flex-wrap: wrap;
    gap: rem(16);
  }

  .q-field--standard.q-field--readonly .q-field__control:before {
    border-bottom-style: solid;
  }

  .q-field--standard.q-field--readonly .q-field__control:hover:before {
    border-color: var(--q-light-blue);
  }

  &__change {
    display: block;
    padding: 0;
    margin: rem(24) auto;
    border: none;
    background-color: transparent;
    color: color(gray);
    cursor: pointer;
  }

  &__btn {
    @media(max-width: $breakpoint-xs) {
      flex-basis: 100%;
    }
  }
}
</style>

<template>
  <div class="m-profile-change">
    <q-form ref="form">
      <div
        class="m-profile-info__title a-mb-32"
        :class="{ active: isClickableActive }"
      >
        <h4>
          Пароль
        </h4>
        <div @click="changeInfo">
          <span>Изменить пароль</span>
          <q-icon
            name="sym_o_stylus_note"
            size="1.5rem"
            :class="{'blue-button': !isClickableActive, 'stroke': isClickableActive}"
            class="a-ml-8"
          />
        </div>
      </div>
      <div class="m-profile-change__wrapper">
        <div class="m-profile-change__col a-mb-32">
          <AInputLabeled
            v-model.trim="password"
            placeholder="Пароль"
            :type="isPwd1 ? 'password' : 'text'"
            label="Текущий пароль"
            :rules="[emptyCheck]"
            class="m-profile-change__input"
            :readonly="inputDisabled"
            @keydown.space.prevent
          >
            <template #append>
              <q-icon
                :name="isPwd1 ? 'o_visibility' : 'o_visibility_off'"
                class="cursor-pointer"
                color="gray"
                size="1.5rem"
                @click="isPwd1 = !isPwd1"
              />
            </template>
          </AInputLabeled>
        </div>
        <div class="m-profile-change__row a-mb-52">
          <AInputLabeled
            v-if="showSaveButton"
            v-model.trim="passwordNew"
            placeholder="Не менее 6 символов"
            :type="isPwd ? 'password' : 'text'"
            label="Новый пароль"
            :rules="[emptyCheck]"
            class="m-profile-change__input"
            :readonly="inputDisabled"
            @keydown.space.prevent
          >
            <template #append>
              <q-icon
                :name="isPwd ? 'o_visibility' : 'o_visibility_off'"
                class="cursor-pointer"
                color="gray"
                size="1.5rem"
                @click="isPwd = !isPwd"
              />
            </template>
          </AInputLabeled>
          <AInputLabeled
            v-if="showSaveButton"
            v-model.trim="passwordCheck"
            :type="isPwd2 ? 'password' : 'text'"
            placeholder="Не менее 6 символов"
            label="Повторите пароль"
            :rules="[emptyCheck, passwordSecurityCheck]"
            class="m-profile-change__input"
            :readonly="inputDisabled"
            @keydown.space.prevent
          >
            <template #append>
              <q-icon
                :name="isPwd2 ? 'o_visibility' : 'o_visibility_off'"
                color="gray"
                size="1.5rem"
                @click="isPwd2 = !isPwd2"
              />
            </template>
          </AInputLabeled>
        </div>
      </div>
      <div class="m-profile-change__buttons">
        <AButton
          v-if="showSaveButton"
          label="Сохранить"
          class="m-profile-change__btn"
          :disabled="agree"
        />
        <AButton
          v-if="showCancelButton"
          outline
          label="Отменить изменения"
          class="m-profile-change__btn"
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
const password = ref('');
const passwordNew = ref('');
const passwordCheck = ref('');
const agree = ref(true);
const isPwd = ref(true);
const isPwd1 = ref(true);
const isPwd2 = ref(true);
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

const passwordSecurityCheck = (val2) => (val2 === passwordNew.value || 'Пароли не совпадают');
watch([password, passwordNew, passwordCheck], () => {
  showCancelButton.value = true;
  agree.value = false;
});
</script>
<style lang="scss">
.m-profile-change {
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

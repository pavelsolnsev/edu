<template>
  <section class="s-vuz-filter">
    <div class="s-vuz-filter__box">
      <div class="s-vuz-filter__list">
        <div class="s-vuz-filter__item">
          <ACheckbox
            v-model="f1"
            class="s-vuz-filter__check"
            label="Москва"
          />
        </div>
        <div class="s-vuz-filter__item">
          <ACheckbox
            v-model="f2"
            class="s-vuz-filter__check"
            label="Санкт-Петербург"
          />
        </div>
        <div class="s-vuz-filter__item">
          <ACheckbox
            v-model="f3"
            class="s-vuz-filter__check"
            label="Новосибирск"
          />
        </div>
        <div class="s-vuz-filter__item">
          <ACheckbox
            v-model="f4"
            class="s-vuz-filter__check"
            label="Екатеринбург"
          />
        </div>
        <div class="s-vuz-filter__item">
          <ACheckbox
            v-model="f5"
            class="s-vuz-filter__check"
            label="Нижний Новгород"
          />
        </div>
        <div class="s-vuz-filter__item">
          <ACheckbox
            v-model="f6"
            class="s-vuz-filter__check"
            label="Казань"
          />
        </div>
        <div class="s-vuz-filter__item">
          <ACheckbox
            v-model="f7"
            class="s-vuz-filter__check"
            label="Челябинск"
          />
        </div>
        <div class="s-vuz-filter__item">
          <ACheckbox
            v-model="f8"
            class="s-vuz-filter__check"
            label="Омск"
          />
        </div>
        <div class="s-vuz-filter__item">
          <ACheckbox
            v-model="f9"
            class="s-vuz-filter__check"
            label="Самара"
          />
        </div>
        <div class="s-vuz-filter__item">
          <ACheckbox
            v-model="f10"
            class="s-vuz-filter__check"
            label="Раменское"
          />
        </div>
      </div>
      <AButton
        class=""
        label="Найти"
      />
    </div>
  </section>
</template>
<script setup>
import AButton from 'components/atoms/AButton.vue';
import ACheckbox from 'components/atoms/ACheckbox.vue';
import { ref } from 'vue';

const f1 = ref(false);
const f2 = ref(false);
const f3 = ref(false);
const f4 = ref(false);
const f5 = ref(false);
const f6 = ref(false);
const f7 = ref(false);
const f8 = ref(false);
const f9 = ref(false);
const f10 = ref(false);
</script>
<style lang="scss">
.s-vuz-filter {
  padding-top: rem(40);
  &__box {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    background: color(sidebar-bg);
    border-radius: bradius(8);
    padding: padding(24);
    @media screen and (max-width: $breakpoint-xs) {
      padding: padding(16);
    }
  }

  &__list {
    height: rem(480);
    margin-bottom: margin(32);
    overflow: auto;
    padding-right: padding(8);
    &::-webkit-scrollbar {
      width: rem(8);
      background-color: #E5EBF2;
      border-radius: rem(20);
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #4650F1;
      -webkit-transition: 0.3s;
      transition: 0.3s;
      border-radius: rem(20);
    }
  }

  &__item {
    border-bottom: 1px solid color(light-blue);
    padding: padding2(16, 0);

    &:first-child {
      padding: padding4(0, 0, 16, 0);
    }
    &:last-child {
      padding: padding4(16, 0, 0, 0);
      border-bottom: none;
    }
  }

  .a-checkbox .q-checkbox__bg {
    border: rem(2) solid color(blue-button);
  }

  .a-checkbox .q-checkbox__label {
    font-weight: 500;
    font-size: rem(18);
  }
}
</style>

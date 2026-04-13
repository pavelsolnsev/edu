<template>
  <section class="s-main-enter">
    <div class="container-lg">
      <div class="container">
        <div class="s-main-enter__content">
          <h2>
            Я хочу поступить
          </h2>
          <div class="a-mt-12 text-h3 cursor-pointer">
            <div class="row inline">
              <div>{{ eduType.v ? 'в' : 'на' }}&nbsp;</div>
              <div>
                <ASelect
                  v-model="eduType"
                  :options="eduTypes"
                  class="a-select--textline a-select--primary"
                />
              </div>
            </div>
          </div>
          <div class="a-mt-12 text-h3 cursor-pointer">
            в городе
          </div>
          <div class="a-mt-12 text-h3 cursor-pointer">
            <div class="row inline no-wrap">
              <ASelect
                v-model="searchCity"
                :options="citiesAll"
                option-value="url"
                option-label="name"
                class="a-select--textline a-select--orange"
              />
            </div>
          </div>
          <AButton
            label="Подобрать"
            class="a-mt-32 a-button--lg"
          />
        </div>
      </div>
      <div class="gt-sm s-main-enter__image-lg" />
      <q-img
        src="/img/main/enter.jpg"
        class="lt-md"
      />
    </div>
  </section>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import AButton from 'src/components/atoms/AButton.vue';
import ASelect from 'src/components/atoms/ASelect.vue';
import { useDefaultStore } from 'src/stores/default';
import { ref } from 'vue';

const eduTypes = [
  { label: 'первое высшее', value: '0', v: false },
  { label: 'второе высшее', value: '1', v: false },
  { label: 'магистратуру', value: '2', v: true },
  { label: 'аспирантуру', value: '3', v: true },
];
const { citiesAll, searchCity } = storeToRefs(useDefaultStore());
const eduType = ref(eduTypes[0]);
</script>

<style lang="scss">
.s-main-enter {
  background-color: color(pink);

  &__image-lg {
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 100%;
    background-image: url('/img/main/enter.jpg');
    background-repeat: no-repeat;
    background-position: 50% 100%;
    background-size: cover;
    @media screen and (min-width: $breakpoint-md-min) and (max-width: $breakpoint-md) {
      width: 52%;
    }
  }

  &__content {
    @media screen and (min-width: $breakpoint-lg-min) {
      height: rem(448);
      width: rem(368+204);
      padding: padding2(96, 0);
    }
    @media screen and (min-width: $breakpoint-md-min) and (max-width: $breakpoint-md) {
      height: rem(448);
      width: 50%;
      padding: padding2(96, 0);
    }
    @media screen and (min-width: $breakpoint-sm-min) and (max-width: $breakpoint-sm) {
      height: auto;
      width: 100%;
      padding: padding2(40, 0);
    }
    @media screen and (max-width: $breakpoint-xs) {
      height: auto;
      width: 100%;
      padding: padding2(48, 0);
    }
  }

  .a-button {
    width: rem(368);
    max-width: rem(368);
    @media screen and (max-width: $breakpoint-xs) {
      width: 100%;
      max-width: 100%;
    }
  }
}
</style>

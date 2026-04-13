<template>
  <div class="s-education-directions">
    <h2 class="s-education-directions__title container">
      Направления подготовки в ВУЗах
    </h2>
    <m-tabs
      v-model="tab"
      class="s-education-directions__tabs"
      :tabs="tabs"
    />
    <s-main-section>
      <div class="s-education-directions__content">
        <q-tab-panels
          v-model="tab"
          class="s-education-directions__panel"
        >
          <q-tab-panel name="Бакалавриат">
            <MEducationDirection
              v-for="direction in directions"
              :key="direction.label"
              class="s-education-directions__item"
              :label="direction.label"
              :link="direction.link"
              :image="direction.image"
            />
            <MEducationDirectionAll class="s-education-directions__item" />
          </q-tab-panel>
          <q-tab-panel name="Специалитет">
            <MEducationDirection
              v-for="direction in directions"
              :key="direction.label"
              class="s-education-directions__item"
              :label="direction.label"
              :link="direction.link"
              :image="direction.image"
            />
            <MEducationDirectionAll class="s-education-directions__item" />
          </q-tab-panel>
          <q-tab-panel name="Магистратура">
            <MEducationDirection
              v-for="direction in directions"
              :key="direction.label"
              class="s-education-directions__item"
              :label="direction.label"
              :link="direction.link"
              :image="direction.image"
            />
            <MEducationDirectionAll class="s-education-directions__item" />
          </q-tab-panel>
          <q-tab-panel name="Аспирантура">
            <MEducationDirection
              v-for="direction in directions"
              :key="direction.label"
              class="s-education-directions__item"
              :label="direction.label"
              :link="direction.link"
              :image="direction.image"
            />
            <MEducationDirectionAll class="s-education-directions__item" />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </s-main-section>
  </div>
</template>

<script setup>
import MTabs from 'components/molecules/MTabs';
import MEducationDirection from 'src/components/molecules/MEducationDirection';
import MEducationDirectionAll from 'src/components/molecules/MEducationDirectionAll';
import SMainSection from 'src/components/sections/SMainSection';
import { ref } from 'vue';

const tab = ref('Бакалавриат');
const tabs = [
  {
    name: 'Бакалавриат',
    label: 'Бакалавриат',
  },
  {
    name: 'Специалитет',
    label: 'Специалитет',
  },
  {
    name: 'Магистратура',
    label: 'Магистратура',
  },
  {
    name: 'Аспирантура',
    label: 'Аспирантура',
  },
];

const directions = [
  {
    label: 'Математика и механика',
    link: '/',
    image: '/img/main/education-directions/direction-math.png',
  },
  {
    label: 'Физика и астрономия',
    link: '/',
    image: '/img/main/education-directions/direction-physics.png',
  },
  {
    label: 'Науки о земле',
    link: '/',
    image: '/img/main/education-directions/direction-earth.png',
  },
  {
    label: 'Архитектура',
    link: '/',
    image: '/img/main/education-directions/direction-architecture.png',
  },
  {
    label: 'Информатика и вычислительная техника',
    link: '/',
    image: '/img/main/education-directions/direction-info.png',
  },
  {
    label: 'Психологические науки',
    link: '/',
    image: '/img/main/education-directions/direction-psych.png',
  },
  {
    label: 'Экономика и управление',
    link: '/',
    image: '/img/main/education-directions/direction-economics.png',
  },
  {
    label: 'Юриспруденция',
    link: '/',
    image: '/img/main/education-directions/direction-law.png',
  },
];
</script>

<style lang="scss">
.s-education-directions {
  padding: padding2(32, 0);

  &__title {
    margin-bottom: margin(40);
  }

  .q-tab-panel {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: rem(30);
    padding: 0;

    @media(max-width: $breakpoint-md) {
      gap: rem(20);
    }

    @media(max-width: $breakpoint-sm) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media(max-width: $breakpoint-xs) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  &__item {
    &:last-child:nth-child(odd) {
      @media(max-width: $breakpoint-sm) {
        grid-column-end: span 2;
      }

      @media(max-width: $breakpoint-xs) {
        grid-column-end: auto;
      }
    }
  }

  &__tabs {
    margin-bottom: margin(32);

    @media(max-width: $breakpoint-sm) {
      margin-bottom: margin(24);
    }
  }
}
</style>

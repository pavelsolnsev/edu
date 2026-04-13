<template>
  <q-dialog
    v-model="opened"
    class="m-menu lt-md"
    allow-focus-outside
    position="top"
  >
    <q-card class="m-menu__inner">
      <div class="m-menu__main">
        <m-header-actions class="m-menu__actions lt-md" />
        <div class="m-menu__items">
          <div
            v-for="(item, i) in menuItems"
            :key="i"
            class="m-menu__item"
          >
            <div class="m-menu__item-icon">
              <img
                :src="'/3dicons/' + item.icon + '.png'"
                alt=""
              >
            </div>
            <div class="m-menu__title-wrapper">
              <div class="m-menu__title text-medium-l">
                {{ item.title }}
              </div>
              <div class="m-menu__subtitle text-medium-xs">
                {{ item.subtitle }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="m-menu__additional">
        <div class="m-menu__additional-links">
          <div class="m-menu__additional-link text-medium-l">
            ВУЗы России
          </div>
          <div class="m-menu__additional-link text-medium-l">
            Образование дистанционно
          </div>
        </div>
        <div class="m-menu__additional-contacts">
          <a
            href="tel:+70000000000"
            class="m-menu__additional-phone text-h3"
          >
            +7 (000) 000-00-00
          </a>
          <div class="m-menu__additional-label text-medium-m">
            Приемная комиссия
          </div>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import MHeaderActions from 'src/components/molecules/MHeaderActions';
import { toRefs } from 'vue';

const props = defineProps({
  opened: Boolean,
});

const { opened } = toRefs(props);

const menuItems = [
  {
    icon: 'pov',
    title: 'ВУЗы на карте',
    subtitle: 'ВУЗы Москвы на карте города',
  },
  {
    icon: 'calendar',
    title: 'Дни открытых дверей',
    subtitle: 'Календарь дней открытых дверей',
  },
  {
    icon: 'hat',
    title: 'ВУЗы Москвы по ЕГЭ',
    subtitle: '',
  },
  {
    icon: 'magnify',
    title: 'Проверить ВУЗ',
    subtitle: '',
  },
];
</script>

<style lang="scss">
.m-menu {
  z-index: 1;

  & .q-dialog__inner {
    top: rem(100);
    width: 100%;
    height: calc(100% - 6.25rem);
    padding: 0;
    background-color: white;

    & > div {
      max-width: none;
      max-height: none;
    }
  }

  &__inner {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    border-radius: 0;
    box-shadow: none !important;
    background-color: color(light-blue);
  }

  &__main {
    padding: padding(40);
    margin-bottom: auto;

    @media (max-width: $breakpoint-xs) {
      padding: padding(20);
    }
  }

  &__items {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: rem(32) 0;
  }

  &__item {
    width: 50%;
    padding-right: padding(16);
    display: flex;
    align-items: center;

    @media (max-width: $breakpoint-xs) {
      width: 100%;
    }
  }

  &__additional {
    padding: padding(40);
    border-top: rem(1) solid color(gray);

    @media (max-width: $breakpoint-xs) {
      padding: padding(20);
    }
  }

  &__item-icon {
    @include wh(48, 48);
    margin-right: margin(16);
  }

  &__title {
    margin-bottom: margin(4);
    color: color(dark);
  }

  &__subtitle {
    color: color(gray);
  }

  &__additional-links {
    display: flex;
    margin-bottom: margin(64);

    @media (max-width: $breakpoint-xs) {
      flex-direction: column;
    }
  }

  &__additional-link {
    color: color(dark);

    &:first-child {
      margin-right: margin(64);

      @media (max-width: $breakpoint-xs) {
        margin-right: 0;
        margin-bottom: margin(28);
      }
    }
  }

  &__additional-phone {
    text-decoration: none;
    color: color(dark);
  }

  &__additional-label {
    color: color(gray);
  }

  &__actions {
    margin-bottom: margin(32);
  }
}
</style>

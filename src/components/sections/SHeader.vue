<template>
  <header class="bg-blue-gray">
    <div :class="['container', 'header', { 'header--menuOpened': menuOpened }]">
      <div class="header__logo">
        <router-link to="/">
          <img
            src="/img/logo.svg"
            class="gt-sm"
            alt=""
          >
          <img
            src="/img/logo-sm.svg"
            class="lt-md"
            alt=""
          >
        </router-link>
      </div>
      <div
        class="header__location gt-sm cursor-pointer text-medium-s"
        @click="dlgSelectCity = !dlgSelectCity"
      >
        <span class="a-mr-8">{{ selectedCity.name }}</span>
        <q-icon
          name="expand_more"
          class="text-l"
          :style="dlgSelectCity ? 'transform: rotate(180deg)' : ''"
        />
        <MDlgSelectCity v-model="dlgSelectCity" />
      </div>
      <div class="header__menu gt-xs">
        <div
          v-if="false"
          class="header__menu-item text-medium-m active"
        >
          <router-link to="/77/">
            Вузы
          </router-link>
        </div>
        <div :class="['header__menu-item text-medium-m', { active: $hostnames.isVuz }]">
          <a
            :href="$hostnames.isVuz ? null : $hostnames.fullVuz"
          >Вузы</a>
        </div>
        <div :class="['header__menu-item text-medium-m', { active: $hostnames.isCollege }]">
          <a
            :href="$hostnames.isCollege ? null : $hostnames.fullCollege"
          >Колледжи</a>
        </div>
      </div>
      <AButton class="header__button gt-md">
        <span class="text-medium-s">Подобрать программу</span>
      </AButton>
      <div class="header__contacts gt-sm">
        <div class="header__contacts-wrapper">
          <div class="text-no-wrap text-m text-semibold">
            +7 (000) 000-00-00
          </div>
          <div class="text-no-wrap text-xs text-medium">
            Приемная комиссия
          </div>
        </div>
      </div>
      <m-header-actions class="header__actions gt-sm" />
      <div
        class="header__location lt-md"
        @click="dlgSelectCity = !dlgSelectCity"
      >
        <q-icon
          name="o_near_me"
          size="1.5rem"
          color="blue-button"
        />
      </div>
      <a
        href="tel:+70000000000"
        class="header__phone-link lt-md"
      >
        <q-img :src="require('/public/icons/phone-icon.svg')" />
      </a>
      <m-menu-toggle
        class="header__menu-toggle lt-md"
        @click="onToggle"
      />
      <m-menu :opened="menuOpened" />
    </div>
  </header>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import AButton from 'src/components/atoms/AButton';
import MDlgSelectCity from 'src/components/molecules/MDlgSelectCity';
import MHeaderActions from 'src/components/molecules/MHeaderActions';
import MMenu from 'src/components/molecules/MMenu';
import MMenuToggle from 'src/components/molecules/MMenuToggle';
import { useDefaultStore } from 'src/stores/default';
import { ref } from 'vue';

const { selectedCity } = storeToRefs(useDefaultStore());
const menuOpened = ref(false);
const dlgSelectCity = ref(false);

function onToggle() {
  window.scrollTo(0, 0);
  menuOpened.value = !menuOpened.value;
}
</script>

<style lang="scss">
.header {
  position: relative;
  z-index: 2;
  height: rem(72);
  background-color: color(blue-gray);
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  align-content: flex-start;
  transition: all 0.3s ease-in;

  @media (max-width: $breakpoint-sm) {
    height: rem(100);
  }

  &.header--menuOpened {
    background-color: color(light-blue);
    border-bottom: 1px solid color(gray);
  }

  & > div {
    flex: 0 0 auto;
  }

  &__space {
    flex: 1 1 auto !important;
  }

  &__logo {
    height: rem(42);
  }

  &__location {
    margin-left: margin(24);
    cursor: pointer;

    @media(max-width: $breakpoint-md) {
      margin-left: margin(16);
    }

    &.lt-md {
      margin-left: auto;
    }
  }

  &__menu {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;

    @media(max-width: $breakpoint-md) {
      margin-left: margin(40);
    }

    @media(max-width: $breakpoint-sm) {
      margin-left: margin(24);
    }
  }

  div.header__menu {
    flex-grow: 1;

    @media(max-width: $breakpoint-sm) {
      flex-grow: 0;
    }
  }

  &__menu-item:not(:first-child) {
    margin-left: margin(24);

    @media(max-width: $breakpoint-sm) {
      margin-left: margin(16);
    }
  }

  &__menu-item {
    flex: 0 1 auto;
    height: rem(32);

    a {
      color: color(gray);
      text-decoration: none;
    }
  }

  &__menu-item.active {
    @include typoClass(m);
    @include typoClass(semibold);
    border-bottom: 2px solid color(primary);
    a {
      color: color(primary);
    }
  }

  &__menu-toggle {
    cursor: pointer;
    margin-left: margin(16);

    @media(max-width: $breakpoint-xs) {
      margin-left: margin(8);
    }
  }

  &__contacts {
    margin: auto;
    flex: 1 1 auto !important;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
  }

  &__phone-link {
    @include wh(24, 24);
    flex: 0 0 auto;
    margin-left: margin(16);

    @media(max-width: $breakpoint-xs) {
      margin-left: rem(8);
    }
  }

  &__button.a-button {
    padding: rem(10);
  }
}
</style>

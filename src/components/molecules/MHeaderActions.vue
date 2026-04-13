<template>
  <div class="m-header-actions">
    <a
      v-if="$store.isAuthorized"
      class="m-header-actions__item text-m text-medium text-dark cursor-pointer"
      @click="onLogout"
    >
      <q-icon
        name="logout"
        left
        size="1.5rem"
      />
      <span>Выйти</span>
    </a>
    <a
      v-if="!$store.isAuthorized"
      :href="$hostnames.fullSecure"
      class="m-header-actions__item text-m text-medium text-dark"
    >
      <q-icon
        name="login"
        left
        size="1.5rem"
      />
      <span>Войти</span>
    </a>
    <div class="m-header-actions__item text-m text-medium">
      <q-icon
        name="search"
        left
        size="1.5rem"
      />
      <span>Поиск</span>
    </div>
  </div>
</template>

<script setup>
import { useDefaultStore } from 'src/stores/default';

const $store = useDefaultStore();
const onLogout = async () => {
  await $store.logout();
};
</script>

<style lang="scss">
.m-header-actions {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  &__item {
    flex: 0 1 auto;
    color: color(gray);
  }

  &__item:not(:first-child) {
    margin-left: margin(24);
  }
}
</style>

<template>
  <div class="m-listing-side">
    <MListingSideSection
      :items="menu.top"
      class="m-listing-side--rounded-accent"
    />
    <MListingSideSection :items="menu.bottom" />
  </div>
</template>

<script setup>
import MListingSideSection from 'src/components/molecules/MListingSideSection';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  enabledMap: {
    type: Boolean,
    default: false,
  },
  majorCity: {
    type: Boolean,
    default: false,
  },
  nameRp: {
    type: [String, null],
    default: null,
  },
});

const $route = useRoute();
const menu = computed(() => ({
  top: [
    { title: `ВУЗы ${props.nameRp} по ЕГЭ`, icon: 'hat', url: `${$route.path}ege/` },
    { title: 'Проверить ВУЗ', icon: 'magnify', url: '/checkVuz/' },
    { title: 'Мои специальности', icon: 'docs', url: '/favor/' },
  ],
  bottom: [
    {
      title: 'ВУЗы на карте',
      subtitle: `ВУЗы ${props.nameRp} на карте города`,
      icon: 'pov',
      url: `${$route.path}map/`,
      hide: !props.enabledMap,
    },
    {
      title: 'Дни открытых дверей',
      subtitle: 'Календарь дней открытых дверей',
      icon: 'calendar',
      url: `${$route.path}openDays/`,
      hide: !props.majorCity,
    },
  ],
}));
</script>

<style lang="scss">
.m-listing-side {
  .m-listing-side__section:not(:first-child) {
    margin-top: margin(24);
  }
  &--rounded-accent {
    background-color: color(sidebar-bg);
    border-radius: bradius(8);
  }
}
</style>

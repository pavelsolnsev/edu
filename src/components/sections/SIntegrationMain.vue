<template>
  <div class="s-integration-main">
    <MIntegrationMain
      v-for="(item, i) in integrations"
      :key="i"
      :item="item"
    />
  </div>
</template>

<script setup>
import MIntegrationMain from 'src/components/molecules/MIntegrationMain';

const integrations = [
  {
    title: 'Демо-партнёр А — условная карточка интеграции',
    src: '/img/integration/integration-placeholder.png',
    content:
      'Текст-заглушка для портфолио: описание партнёрского блока без привязки к реальному заказчику.',
  },
  {
    title: 'Демо-партнёр Б — условная карточка интеграции',
    src: '/img/integration/integration-placeholder.png',
    content:
      'Текст-заглушка для портфолио: описание партнёрского блока без привязки к реальному заказчику.',
  },
  {
    title: 'Демо-партнёр В — условная карточка интеграции',
    src: '/img/integration/integration-placeholder.png',
    content:
      'Текст-заглушка для портфолио: описание партнёрского блока без привязки к реальному заказчику.',
  },
];
</script>

<style lang="scss">
.s-integration-main {
  .m-integration-main:not(:first-child) {
    margin-top: margin(8);
  }
}
</style>

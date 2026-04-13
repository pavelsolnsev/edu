<template>
  <MBreadcrumbs
    :items="breadcrumbs"
    class="section--sidebar-padding"
  />
  <SProfile />
</template>

<script setup>
import MBreadcrumbs from 'components/molecules/MBreadcrumbs.vue';
import SProfile from 'src/components/sections/SProfile';

const breadcrumbs = [
  {
    title: 'Мой профиль',
    link: '/',
  },
];
</script>

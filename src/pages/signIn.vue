<template>
  <SSignIn />
</template>

<script setup>
import { useMeta } from 'quasar';
import SSignIn from 'src/components/sections/SSignIn';

useMeta(() => ({
  title: 'Авторизация (демо)',
  meta: {
    description: {
      name: 'description',
      content: 'Демо: страница входа (портфолио)',
    },
  },
}));
</script>

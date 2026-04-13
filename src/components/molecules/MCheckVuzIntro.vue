<template>
  <div class="m-check-vuz-intro">
    <h2 class="m-check-vuz-intro__title a-mb-24">
      Мы проверим:
    </h2>
    <ul class="m-check-vuz-intro__list">
      <li
        v-for="item in preItems"
        :key="item"
        class="m-check-vuz-intro__list-item"
      >
        <q-icon
          name="done"
          color="green"
          size="1rem"
          class="a-mr-8"
        />
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script setup>
const preItems = [
  'Наличие действующей лицензии и аккредитации',
  'Действующие запреты приема',
  'Организационно-правовую форму',
  'Наличие общежития, военной кафедры',
  'Мониторинг вузов Министерства образования РФ',
  'Оценку по отзывам пользователей нашего проекта',
];
</script>

<style lang="scss">
.m-check-vuz-intro {
  margin-top: margin(64);
  margin-bottom: margin(120);

  &__list {
    margin: 0;
    padding: 0;
  }

  &__list-item {
    display: flex;
    align-items: center;
    margin-bottom: margin(8);

    &:last-child {
      margin: 0;
    }
  }
}
</style>

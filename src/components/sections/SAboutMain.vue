<template>
  <div class="s-about-main bg-blue-gray">
    <div class="container">
      <div class="s-about-main__wrapper">
        <h3 class="s-about-main__title">
          О демо-проекте
        </h3>
        <div class="s-about-main__main">
          <div class="s-about-main__image-wrap">
            <img
              class="s-about-main__image"
              src="/img/about-edu.png"
              alt="about image"
            >
          </div>
          <div class="s-about-main__info">
            <p class="s-about-main__info-title text-medium-xl">
              Демо-каталог
            </p>
            <p class="s-about-main__text text-regular-m text-gray">
              Это навигатор абитуриента для выбора и поступления в вузы России. Текст-заполнитель —
              это текст, который имеет некоторые характеристики реального письменного текста, но
              является случайным набором слов или сгенерирован иным образом. Его можно использовать
              для отображения образца шрифтов, создания текста для тестирования или обхода
              спам-фильтра
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
</script>
<style lang="scss" scoped>
.s-about-main {
  &__wrapper {
    padding-top: padding(64);
    border-bottom: 1px solid color(gray);
    @media (max-width: $breakpoint-sm) {
      padding-top: padding(48);
      padding-bottom: padding(48);
    }
  }

  &__text {
    margin-bottom: 0;
  }

  &__title {
    margin-bottom: margin(32);
  }

  &__main {
    display: flex;
    align-items: center;
    @media (max-width: $breakpoint-sm) {
      flex-direction: column;
    }
  }

  &__image-wrap {
    @include wh(500, 384);
    margin-right: rem(30);
    flex: 0 0 auto;
    @media screen and (min-width: $breakpoint-md-min) and (max-width: $breakpoint-md) {
      @include wh(463, 384);
      margin-right: margin(20);
    }
    @media (max-width: $breakpoint-sm) {
      width: 100%;
      height: auto;
      margin-right: 0;
      margin-bottom: margin(20);
    }
    @media (max-width: $breakpoint-xs) {
      @include wh(280, 232);
    }
  }

  &__image {
    display: block;
    height: 100%;
    margin-left: margin(20);
    @media (max-width: $breakpoint-sm) {
      margin-left: 0;
    }
  }

  &__info {
    width: rem(570);
    flex: 0 0 auto;
    @media (max-width: $breakpoint-sm) {
      width: 100%;
    }
    @media screen and (min-width: $breakpoint-md-min) and (max-width: $breakpoint-md) {
      width: rem(463);
      flex-grow: 1;
    }
  }
}
</style>

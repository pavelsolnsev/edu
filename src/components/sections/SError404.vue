<template>
  <section class="s-error-404">
    <div class="s-error-404__content">
      <h1 class="s-error-404__title a-mb-32">
        К сожалению, запрашиваемой Вами страницы не существует.
      </h1>
      <p class="s-error-404__apology text-regular-m">
        К сожалению, запрашиваемой Вами страницы не существует.
        Возможно, это случилось по одной из указанных ниже причин:
      </p>
      <ul class="list-type-minus">
        <li>Вы ошиблись при наборе адреса страницы (URL)</li>
        <li>Перешли по некорректной (неработающей, неправильной) ссылке</li>
        <li>В запрашиваемой страницы никогда не было на сайте или она была удалена</li>
      </ul>
      <p class="text-medium-m">
        Мы просим прощение за доставленные неудобства и предлагаем следующие пути решения:
      </p>
      <ul class="list-type-dot">
        <li @click="$router.go(-1)">
          <span>Вернуться на <u>предыдущую страницу</u></span>
        </li>
        <li>
          <router-link to="/">
            <span>Перейти на <u>главную страницу сайта</u></span>
          </router-link>
        </li>
      </ul>
      <p class="text-medium-m">
        Если Вы уверены в правильности набранного адреса страницы и считаете, что эта
        ошибка произошла по нашей вине, пожалуйста, сообщите нам об этом при помощи
        электронной почты demo-support@example.com
      </p>
    </div>
    <q-img
      src="/img/404.png"
      class="s-error-404__img gt-sm"
    />
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router';

const $router = useRouter();
</script>

<style lang="scss">
.s-error-404 {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: margin(64);
  margin-bottom: margin(120);

  @media(max-width: $breakpoint-sm) {
    margin-bottom: margin(72);
  }

  @media(max-width: $breakpoint-xs) {
    margin-bottom: margin(56);
  }

  &__title {
    margin-bottom: margin(32);
  }

  &__apology {
    width: rem(550);

    @media(max-width: $breakpoint-sm) {
      width: 100%;
    }
  }

  &__content {
    width: rem(770);

    @media(max-width: $breakpoint-md) {
      width: calc(100% - 20rem);
    }

    @media(max-width: $breakpoint-sm) {
      width: 100%;
    }
  }

  &__img {
    width: rem(369);
    flex-shrink: 0;

    @media(max-width: $breakpoint-md) {
      width: rem(301);
    }
  }

  ul {
    margin-bottom: margin(24);

    &.list-type-dot li {
      cursor: pointer;
      color: color(blue-button);
    }
  }
}
</style>

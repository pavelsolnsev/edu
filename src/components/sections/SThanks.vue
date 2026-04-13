<template>
  <section class="s-thanks">
    <div class="s-thanks__main">
      <h1 class="s-thanks__title a-mb-8">
        Спасибо!
      </h1>
      <h4 class="s-thanks__subtitle a-mb-40">
        За доверие к EDUNDETWORK
      </h4>
      <p class="s-thanks__desc a-mb-16">
        Ожидайте звонка от нашего специалиста, в течение 2-х минут,
        а пока подпишитесь на наш телеграмм канал, чтобы получить:
      </p>
      <ul class="s-thanks__list a-mb-40">
        <li class="a-mb-8">
          Чек –лист по поступлению в учебные заведения России
        </li>
        <li class="a-mb-8">
          Информацию по необходимым предметам ОГЭ, ЕГЭ и минимальным баллам
        </li>
        <li class="a-mb-8">
          Информацию про дни открытых дверей в ВУЗах
        </li>
        <li class="a-mb-8">
          Информацию по подготовке и сдаче ОГЭ и ЕГЭ
        </li>
        <li class="">
          Информацию какие заведения считаются ЛУЧШИМИ для поступления в 2023 году
        </li>
      </ul>
      <div class="s-thanks__button">
        <AButton
          label="Наш телеграм канал"
          class="s-thanks__button-inner s-thanks__button-telegram"
          href="https://t.me/+YAgn7pyFV2BjNzBi"
          target="_blank"
        />
        <AButton
          outline
          label="Вернуться на главную"
          class="s-thanks__button-inner s-thanks__button-back"
          to="/"
        />
      </div>
    </div>
    <div class="gt-sm s-thanks__bg">
      <q-img
        :src="require('/public/img/thanks/thanks.png')"
        class="s-thanks__bg-img"
      />
    </div>
  </section>
</template>
<script setup>
import AButton from 'src/components/atoms/AButton';
</script>
<style lang="scss">
.s-thanks {
  display: flex;
  &__title {
    color: color(blue-button);
    font-size: rem(72);
    @media(max-width: $breakpoint-xs) {
      font-size: rem(40);
    }
  }

  &__subtitle {
    font-weight: 500;
  }

  &__desc {
    font-weight: 500;
    font-size: rem(18);
    max-width: rem(410);
  }

  &__list {
    padding: 0;

    li {
      display: flex;
      align-items: flex-start;

      &:before {
        content: '';
        width: rem(8);
        height: rem(8);
        background: color(blue-button);
        border-radius: 100%;
        margin-right: margin(8);
        display: block;
        flex: 0 0 auto;
        margin-top: rem(7);
      }
    }
  }

  &__button {
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-column-gap: rem(30);
    grid-row-gap: rem(20);
    @media(max-width: $breakpoint-lg) {
      max-width: rem(450);
    }
    @media(max-width: $breakpoint-sm) {
      grid-column-gap: rem(20);
      max-width: rem(521);
    }

    @media(max-width: $breakpoint-xs) {
      grid-template-columns: repeat(1, 1fr);
    }

    &-inner {
      @media(max-width: $breakpoint-md) {
        max-width: rem(210);
      }
      @media(max-width: $breakpoint-sm) {
        max-width: rem(251);
      }
      @media(max-width: $breakpoint-xs) {
        max-width: 100%;
      }
    }
  }

  &__main {
    width: 50%;
    margin-left: auto;
    max-width: rem(625);
    padding: rem(153) rem(30) rem(153) rem(40);

    @media(max-width: $breakpoint-md) {
      padding-right: padding(20);
    }

    @media(max-width: $breakpoint-sm) {
      width: 100%;
      max-width: 100%;
      padding: padding2(72, 28);
    }

    @media(max-width: $breakpoint-xs) {
      padding: padding2(56, 20);
    }
  }

  &__bg {
    width: 50%;
    background: color(light-blue);
    display: flex;
    align-items: center;
    padding: 0 rem(30);
    &-img {
      max-width: rem(645);
    }
  }
}
</style>

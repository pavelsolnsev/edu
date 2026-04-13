<template>
  <section class="s-ads-main">
    <div class="s-ads-main__window">
      <div class="s-ads-main__head">
        <p class="s-ads-main__title text-medium-l">
          Рекламный отдел
        </p>
        <div class="s-ads-main__contacts">
          <a
            href="tel:+70000000000"
            class="s-ads-main__phone text-medium-m"
          >
            <q-icon
              name="sym_o_ad_units"
              size="1.5rem"
              color="dark"
            />
            <span>+7 (000) 000-00-00</span>
          </a>
          <a
            href="mailto:demo-ads@example.com"
            class="s-ads-main__email text-medium-m"
          >
            <q-icon
              name="sym_o_mail"
              size="1.5rem"
              color="dark"
            />
            <span>demo-ads@example.com</span>
          </a>
        </div>
      </div>
      <div class="s-ads-main__content">
        <div class="s-ads-main__basic-placing">
          <MAdsPrice
            number="1"
            title="Растяжка (1000х90)"
            price-week="40 000 ₽"
            price-month="120 000 ₽"
            class="s-ads-main__item"
          />
          <MAdsPrice
            number="2"
            title="Текстово-графический блок (300х120)"
            price-week="25 000 ₽"
            price-month="75 000 ₽"
            class="s-ads-main__item"
          />
          <MAdsPrice
            number="3"
            title="Баннер (300х300)"
            price-week="30 000 ₽"
            price-month="90 000 ₽"
            class="s-ads-main__item"
          />
        </div>
        <MAdsPriceSubject class="s-ads-main__item-last" />
        <q-img
          src="/img/ads/ads-screen-320.png"
          alt="Картинка расположения рекламных блоков"
          class="s-ads-main__img xs"
        />
        <q-img
          src="/img/ads/ads-screen-600.png"
          alt="Картинка расположения рекламных блоков"
          class="s-ads-main__img sm"
        />
        <q-img
          src="/img/ads/ads-screen-1024.png"
          alt="Картинка расположения рекламных блоков"
          class="s-ads-main__img md"
        />
        <q-img
          src="/img/ads/ads-screen-1440.png"
          alt="Картинка расположения рекламных блоков"
          class="s-ads-main__img gt-md"
        />
      </div>
    </div>
    <div class="s-ads-main__additional a-mt-24">
      <p class="text-regular-m">
        <sup>*</sup> Демо: условные цены для макета, не являются коммерческим предложением
      </p>
      <p class="text-regular-m">
        <sup>**</sup> Не применяются сезонные коэффициенты
      </p>
    </div>
  </section>
</template>

<script setup>
import MAdsPrice from 'src/components/molecules/MAdsPrice';
import MAdsPriceSubject from 'src/components/molecules/MAdsPriceSubject';
</script>

<style lang="scss">
.s-ads-main {
  margin-bottom: margin(64);

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: padding2(24, 40);
    border-radius: rem(32) rem(32) 0 0;
    background-color: color(light-blue);

    @media(max-width: $breakpoint-sm) {
      flex-direction: column;
      align-items: flex-start;
      gap: rem(16) 0;
    }

    @media(max-width: $breakpoint-xs) {
      padding: padding(16);
    }
  }

  &__title {
    margin-bottom: 0;
    color: color(dark);
  }

  &__contacts {
    display: flex;

    @media(max-width: $breakpoint-xs) {
      flex-direction: column;
      gap: rem(4) 0;
    }
  }

  &__phone {
    margin-right: margin(24);
  }

  &__phone,
  &__email {
    display: flex;
    align-items: center;
    color: color(dark);
    gap: 0 rem(8);
  }

  &__content {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: padding4(40, 40, 52, 40);
    border: 1px solid color(light-gray);
    border-radius: 0 0 rem(32) rem(32);
    gap: rem(56) rem(20);

    @media(max-width: $breakpoint-md) {
      padding: padding2(40, 32);
    }

    @media(max-width: $breakpoint-sm) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      padding: rem(40) 0 rem(460) rem(10);
    }

    @media(max-width: $breakpoint-xs) {
      grid-template-columns: 1fr;
      gap: rem(32) 0;
      padding: rem(32) rem(8) rem(450) rem(8);
    }
  }

  &__basic-placing {
    display: flex;
    gap: 0 rem(72);

    @media(max-width: $breakpoint-md) {
      gap: rem(20) rem(20);
    }

    @media(max-width: $breakpoint-sm) {
      flex-direction: column;
    }

    @media(max-width: $breakpoint-md) {
      gap: rem(32) 0;
    }
  }

  &__item {
    width: rem(280);

    @media(max-width: $breakpoint-md) {
      width: rem(270);

      &:nth-child(2) {
        width: rem(302);
      }
    }

    @media(max-width: $breakpoint-sm) {
      width: auto;

      &:nth-child(2) {
        width: auto;
      }
    }
  }

  &__item-last {
    width: rem(476);

    @media(max-width: $breakpoint-md) {
      width: rem(431);
    }

    @media(max-width: $breakpoint-sm) {
      width: auto;
    }
  }

  &__img {
    position: absolute;
    width: rem(559);
    bottom: 0;
    right: rem(40);

    @media(max-width: $breakpoint-md) {
      width: 47.8%;
      right: rem(32);
    }

    @media(max-width: $breakpoint-sm) {
      width: rem(544);
      left: 50%;
      right: unset;
      transform: translateX(-50%);
    }

    @media(max-width: $breakpoint-xs) {
      width: rem(280);
    }
  }

  &__additional {
    display: flex;
    justify-content: space-between;
    padding: padding2(0, 40);

    p {
      margin-bottom: 0;
    }

    @media(max-width: $breakpoint-md) {
      padding: padding2(0, 32);
      justify-content: flex-start;
      gap: rem(8) rem(54);

      p:first-child {
        max-width: rem(375);
      }
    }

    @media(max-width: $breakpoint-sm) {
      padding: 0;
      flex-direction: column;

      p:first-child {
        max-width: 100%;
      }
    }
  }

  .material-symbols-outlined {
    font-variation-settings: "FILL" 0,
    "wght" 500,
    "GRAD" 0,
    "opsz" 48
  }
}
</style>

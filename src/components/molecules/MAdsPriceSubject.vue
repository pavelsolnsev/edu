<template>
  <div class="m-ads-price-subject">
    <div class="m-ads-price-subject__head">
      <p class="m-ads-price-subject__number text-semibold-xl">
        <span>4</span>
      </p>
      <p class="text-medium-l">
        Текстово-графический блок (700х85)
      </p>
    </div>
    <p class="text-regular-m">
      Размещение по субъектам (ротация до пяти объявлении на трех местах)
    </p>
    <div class="m-ads-price-subject__items">
      <div class="m-ads-price-subject__item">
        <p class="text-semibold-m text-primary a-mb-8">
          Москва
        </p>
        <p class="m-ads-price-subject__caption text-medium-xs">
          Стоимость размещения в неделю:
        </p>
        <p class="m-ads-price-subject__price-weekly text-semibold-m">
          15 000 ₽
        </p>
        <p class="m-ads-price-subject__caption text-medium-xs">
          Стоимость размещения в месяц:
        </p>
        <p class="m-ads-price-subject__price-monthly text-semibold-m">
          45 000 ₽
        </p>
      </div>
      <div class="m-ads-price-subject__item">
        <p class="text-semibold-m text-primary a-mb-8">
          Санкт-Петербург
        </p>
        <p class="m-ads-price-subject__caption text-medium-xs">
          Стоимость размещения в неделю:
        </p>
        <p class="m-ads-price-subject__price-weekly text-semibold-m">
          9 000 ₽
        </p>
        <p class="m-ads-price-subject__caption text-medium-xs">
          Стоимость размещения в месяц:
        </p>
        <p class="m-ads-price-subject__price-monthly text-semibold-m">
          27 000 ₽
        </p>
      </div>
      <div class="m-ads-price-subject__item">
        <p class="text-semibold-m text-primary a-mb-8">
          Другие субъекты <sup>**</sup>
        </p>
        <div class="m-ads-price-subject__item-values">
          <div>
            <p class="m-ads-price-subject__caption text-medium-xs">
              Стоимость за 3 месяца:
            </p>
            <p class="m-ads-price-subject__price text-semibold-m">
              15 000 ₽
            </p>
          </div>
          <div>
            <p class="m-ads-price-subject__caption text-medium-xs">
              Стоимость за 6 месяцев:
            </p>
            <p class="m-ads-price-subject__price text-semibold-m">
              24 000 ₽
            </p>
          </div>
          <div>
            <p class="m-ads-price-subject__caption text-medium-xs">
              Стоимость за год:
            </p>
            <p class="m-ads-price-subject__price text-semibold-m">
              36 000 ₽
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.m-ads-price-subject {
  color: color(gray);

  &__head {
    display: flex;
    align-items: center;
    margin-bottom: margin(8);
    gap: rem(8) rem(8);

    p {
      margin-bottom: 0;
    }

    @media(max-width: $breakpoint-sm) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  &__caption {
    margin-bottom: 0;
  }

  &__price-weekly {
    margin-bottom: margin(8);
  }

  &__price,
  &__price-monthly {
    margin-bottom: 0;
  }

  &__number {
    position: relative;
    @include wh(48, 48);
    flex-shrink: 0;
    border-radius: 50%;
    border: 2px dashed color(dark-bluer);

    span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  &__item:last-child {
    @media(max-width: $breakpoint-md) {
      grid-column-end: span 2;
    }
  }

  &__items {
    display: flex;
    flex-wrap: wrap;
    gap: rem(16) rem(40);

    @media(max-width: $breakpoint-md) {
      display: grid;
      grid-template-columns: rem(152) rem(152);
    }

    @media(max-width: $breakpoint-sm) {
      display: flex;
      flex-direction: column;
    }
  }

  &__item-values {
    display: flex;
    gap: rem(24) rem(24);

    @media(max-width: $breakpoint-md) {
      flex-direction: column;
    }

    @media(max-width: $breakpoint-sm) {
      gap: rem(8) 0;
    }
  }
}
</style>

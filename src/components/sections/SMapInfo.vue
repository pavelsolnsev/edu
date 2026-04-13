<template>
  <div class="s-map-info a-py-24">
    <div class="container">
      <div class="s-map-info__title-wrap">
        <h4 class="s-map-info__title text-semibold">
          В ВУЗы отмеченные красной рамкой, запрещен набор абитуриентов
        </h4>
        <span class="s-map-info__icon" />
      </div>
      <p class="s-map-info__text text-m text-gray">
        На карте представлены все вузы {{ name }} их главными зданиями.
        Крупные вузы {{ name }} зачастую представляют собой множество учебных
        корпусов в разных концах города. Таким образом, метка на карте не
        всегда означает, что вы будете проходить обучение именно в этом месте.
        Информацию о расположении приемных комиссий, наличие корпусов и их адреса
        вы можете уточнить непосредственно на странице вуза на нашем проекте.
      </p>
    </div>
  </div>
</template>
<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss">
  .s-map-info {
    background-color: color(blue-gray);

    &__title-wrap {
      display: flex;
      width: rem(970);

      @media (max-width: $breakpoint-md) {
        width: 100%;
      }
    }

    &__title {
      margin-right: margin(16);
      margin-bottom: margin(24);

      @media(max-width: $breakpoint-md) {
        margin-bottom: margin(16);
      }

      @media(max-width: $breakpoint-xs) {
        margin-bottom: margin(8);
      }
    }

    &__text {
      width: rem(970);

      @media(max-width: $breakpoint-md) {
        width: 100%;
      }
    }

    &__icon {
      position: relative;
      @include wh(40, 40);
      flex: 0 0 auto;
      background-color: white;
      border: 1px solid color(stroke);
      border-radius: bradius(4);

      &:before,
      &:after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
      }

      &:before {
        @include wh(20, 20);
        border: 2px solid color(red);
      }

      &:after {
        @include wh(12, 12);
        background-color: color(red);
      }
    }
  }
</style>

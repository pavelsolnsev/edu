<template>
  <div class="s-main-headslide">
    <div class="s-main-headslide__slide" />
    <div class="container-lg">
      <div class="container">
        <div class="s-main-headslide__content">
          <h1 class="s-main-headslide__title text-h1-banner">
            Демо-каталог
          </h1>
          <div class="s-main-headslide__navigator-wrapper text-medium-l">
            <div class="row no-wrap items-center">
              <div class="col-grow">
                <div class="s-main-headslide__navigator">
                  Это навигатор абитуриента
                </div>
              </div>
            </div>
            <div class="a-mt-8">
              для выбора и поступления в ВУЗы России
            </div>
          </div>
          <MHeadSlidePills>
            <MHeadSlidePill
              label="Вузов"
              value="3000"
              :icon="require('/public/img/main/pill-vuzes.png')"
            />
            <MHeadSlidePill
              label="Специальностей"
              value="500"
              :icon="require('/public/img/main/pill-specs.png')"
            />
            <MHeadSlidePill
              label="Бюджетных мест"
              value="5000"
              :icon="require('/public/img/main/pill-budget.png')"
            />
            <MHeadSlidePill
              label="Платных мест"
              value="6000"
              :icon="require('/public/img/main/pill-commercial.png')"
            />
          </MHeadSlidePills>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MHeadSlidePill from 'src/components/molecules/MHeadSlidePill.vue';
import MHeadSlidePills from 'src/components/molecules/MHeadSlidePills.vue';
</script>

<style lang="scss">
.s-main-headslide {
  border-top: 1px solid color(stroke);
  background-color: color(blue-gray);

  & > .container-lg {
    background-image: url(/img/main/headslide/lg.webp);
    background-color: color(blue-gray);
    background-repeat: no-repeat;
    background-size: contain;
    background-position: 100% 100%;
    @media screen and (min-width: $breakpoint-md-min) and (max-width: $breakpoint-md) {
      background-image: url(/img/main/headslide/md.webp);
    }
    @media screen and (max-width: $breakpoint-sm) {
      background-image: none;
    }
  }

  &__slide {
    display: none;
    background-color: color(blue-gray);
    background-repeat: no-repeat;

    @media screen and (max-width: $breakpoint-xs) {
      min-height: rem(364);
      display: block;
      background-image: url(/img/main/headslide/xs.webp);
      background-size: cover;
      background-position: 50% 20%;
    }
    @media screen and (min-width: $breakpoint-sm-min) and (max-width: $breakpoint-sm) {
      min-height: rem(488);
      display: block;
      background-image: url(/img/main/headslide/sm.webp);
      background-size: contain;
      background-position: 50% 100%;
    }
  }

  &__content {
    min-height: rem(645);
    padding: padding4(72, 0, 64, 0);

    @media screen and (max-width: $breakpoint-sm) {
      min-height: auto;
      padding: padding4(32, 0, 40, 0);
    }
  }

  &__navigator-wrapper {
    margin-top: margin(16);
    max-width: rem(570);
  }

  &__navigator {
    background: color(white);
    border: 1px solid color(orange);
    padding: rem(10) margin(12);
    text-align: center;
    border-radius: bradius(8);
  }
}
</style>

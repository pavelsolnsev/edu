<template>
  <div class="s-remote-study">
    <div class="container">
      <h3 class="s-remote-study__title">
        Дистанционное обучение
      </h3>
      <div class="s-remote-study__items">
        <MStudyLink
          class="s-remote-study__link"
          :link="'/'"
          :label="'Первое высшее'"
          :icon="require('/public/img/main/suitcase.png')"
        />
        <MStudyLink
          class="s-remote-study__link"
          :link="'/'"
          :label="'Второе высшее'"
          :icon="require('/public/img/main/graduate-hat.png')"
        />
        <MStudyLink
          class="s-remote-study__link"
          :link="'/'"
          :label="'Магистратура'"
          :icon="require('/public/img/main/book.png')"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import MStudyLink from 'src/components/molecules/MStudyLink';
</script>

<style lang="scss">
.s-remote-study {
  padding-top: padding(32);
  padding-bottom: padding(64);

  @media (max-width: $breakpoint-sm) {
    padding-top: padding(24);
    padding-bottom: padding(48);
  }

  &__title {
    margin-bottom: margin(32);
  }

  &__items {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: rem(30);

    @media (max-width: $breakpoint-md) {
      gap: rem(20);
    }

    @media (max-width: $breakpoint-sm) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
}
</style>

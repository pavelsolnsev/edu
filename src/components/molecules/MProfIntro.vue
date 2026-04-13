<template>
  <div class="prof-intro">
    <div class="prof-intro__image">
      <q-img
        src="/img/start-prof.svg"
        alt="start-prof-img"
      />
    </div>
    <div class="prof-intro__action">
      <h1 class="prof-intro__title font--600">
        Профориентационное тестирование
      </h1>
      <AButton
        class="prof-intro__start"
        label="Начать"
        @click="emit('next')"
      />
    </div>
  </div>
</template>
<script setup>
import AButton from 'src/components/atoms/AButton';

const emit = defineEmits(['next']);
</script>
<style lang="scss">
.prof-intro {
  display: flex;
  align-items: center;

  @media (max-width: $breakpoint-sm) {
    flex-direction: column-reverse;
  }

  &__title {
    width: rem(397);
    margin: margin4(0, 0, 32, 0);
    color: color(dark);
    @media (max-width: $breakpoint-sm) {
      width: auto;
      hyphens: auto;
    }
  }

  &__image {
    box-sizing: content-box;
    display: flex;
    padding-right: rem(71);
    @include wh(229, 295);
    img {
      width: 100%;
    }

    @media (max-width: $breakpoint-sm) {
      width: 100%;
      max-width: rem(215);
      height: auto;
      padding: 0;
    }
  }

  &__action {
    @media (max-width: $breakpoint-sm) {
      margin-bottom: margin(56);
      align-self: flex-start;
    }
  }

  &__start {
    @include wh(148, 56);
    align-items: flex-start;
    position: relative;
    &::after {
      content: url("data:image/svg+xml,%3Csvg width='24' height='25' viewBox='0 0 24 25' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cmask id='mask0_5595_41224' style='mask-type:alpha' maskUnits='userSpaceOnUse' x='0' y='0' width='24' height='25'%3E%3Crect y='0.5' width='24' height='24' fill='%23D9D9D9'/%3E%3C/mask%3E%3Cg mask='url(%23mask0_5595_41224)'%3E%3Cpath d='M12 20.5L10.575 19.1L16.175 13.5H4V11.5H16.175L10.575 5.9L12 4.5L20 12.5L12 20.5Z' fill='white'/%3E%3C/g%3E%3C/svg%3E ");
      position: absolute;
      right: 20px;
      top: calc(50% + 3px);
      transform: translate(0, -50%);
    }
  }
}
</style>

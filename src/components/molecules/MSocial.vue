<template>
  <div class="socials">
    <a
      href="https://example.com/social-demo"
      rel="noopener noreferrer"
      class="socials__telegram socials__item"
    />
    <a
      href="https://example.com/social-demo"
      rel="noopener noreferrer"
      class="socials__dzen socials__item"
    />
    <a
      href="https://example.com/social-demo"
      rel="noopener noreferrer"
      class="socials__vk socials__item"
    />
    <a
      href="https://example.com/social-demo"
      rel="noopener noreferrer"
      class="socials__youtube socials__item"
    />
    <a
      href="https://example.com/social-demo"
      rel="noopener noreferrer"
      class="socials__rutube socials__item"
    />
  </div>
</template>

<style lang="scss">
.socials {
  display: flex;

  &__item {
    @include wh(16, 16);
    margin-right: margin(8);
    border-radius: margin(4);
    background-color: color(gray);
    background-size: rem(8);
    background-repeat: no-repeat;
    background-position: center center;

    &:last-child {
      margin-right: 0;
    }
  }

  &__telegram {
    background-image: url('/img/social/icon-telegram.svg');
    background-size: rem(9) rem(8);
  }

  &__dzen {
    background-image: url('/img/social/icon-dzen.svg');
    background-size: rem(16);
  }

  &__vk {
    background-image: url('/img/social/icon-vk.svg');
    background-size: rem(11) rem(7);
  }

  &__youtube {
    background-image: url('/img/social/icon-youtube.svg');
    background-size: rem(4);
  }

  &__rutube {
    position: relative;
    background-image: url('/img/social/icon-rutube.svg');
    background-size: rem(12) rem(10);
    background-position: 0 rem(5);

    &:after {
      content: '';
      position: absolute;
      top: rem(1);
      right: rem(2);
      @include wh(3, 3);
      background-color: #f41240;
      border-radius: 50%;
    }
  }

  @media (max-width: $breakpoint-xs) {
    &__item {
      @include wh(32, 32);
    }

    &__telegram {
      background-size: rem(17) rem(14);
    }

    &__dzen {
      background-size: rem(32);
    }

    &__vk {
      background-size: rem(21) rem(13);
    }

    &__youtube {
      background-size: rem(8);
    }

    &__rutube {
      background-size: rem(23) rem(19);
      background-position: 0 rem(13);

      &:after {
        @include wh(6, 6);
      }
    }
  }
}
</style>

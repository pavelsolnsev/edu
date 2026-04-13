<template>
  <div class="m-vuz-gallery container-scrollable">
    <div class="m-vuz-gallery__wrapper">
      <q-img
        v-for="image in images"
        :key="image.image_url"
        :src="image.image_url"
        :alt="image.title"
        class="m-vuz-gallery__img"
        @click="open"
      />
    </div>
    <q-dialog
      v-model="fullscreen"
      auto-close
      maximized
      class="m-vuz-gallery__fullscreen"
    >
      <q-img
        :src="fullscreenImgSrc"
        width="90%"
        height="90%"
        fit="contain"
      />
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  images: {
    type: Array,
    required: true,
  },
});

const fullscreen = ref(false);
const fullscreenImgSrc = ref('');

function open(event) {
  fullscreenImgSrc.value = event.target.src;
  fullscreen.value = true;
}
</script>

<style lang="scss">
.m-vuz-gallery {
  &.container {
    @media(max-width: $breakpoint-sm) {
      padding: 0;
    }
  }

  &__wrapper {
    display: flex;
    flex-wrap: nowrap;
  }

  &__img {
    @include wh(270, 270);
    flex: 0 0 auto;
    margin-right: rem(30);
    border-radius: bradius(16);
    cursor: zoom-in;
    transition: opacity .2s ease;

    &:last-child {
      margin-right: 0;
    }

    &:hover {
      opacity: .8;
    }

    @media(max-width: $breakpoint-xs) {
      @include wh(250, 250);
    }
  }

  &__fullscreen {
    cursor: zoom-out;

    .q-dialog__inner > div {
      overflow: hidden;
      box-shadow: none;
    }
  }
}
</style>

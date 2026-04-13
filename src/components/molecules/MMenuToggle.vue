<template>
  <div
    :class="['m-menu-toggle', {
      'm-menu-toggle--opened': opened,
      'm-menu-toggle--closing': closing
    }]"
    @click="onClick"
  >
    <span />
    <span />
    <span />
    <span />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['click']);
const opened = ref(false);
const closing = ref(false);

function onClick() {
  opened.value = !opened.value;
  emit('click');

  if (!opened.value) {
    closing.value = true;
    setTimeout(() => {
      closing.value = false;
    }, 400);
  }
}
</script>

<style lang="scss">
.m-menu-toggle {
  position: relative;
  width: rem(24);
  height: rem(24);

  span {
    position: absolute;
    display: block;
    width: rem(24);
    height: rem(2);
    background-color: color(dark);

    &:first-child,
    &:nth-child(4) {
      transition: top 0.2s ease, opacity 0.1s linear 0.2s;
    }

    &:first-child {
      top: rem(3);
      left: 0;
    }

    &:nth-child(2),
    &:nth-child(3) {
      top: rem(11);
      left: 0;
      transition: transform 0.2s ease 0.3s;
    }

    &:nth-child(4) {
      top: rem(19);
      left: 0;
    }
  }

  &.m-menu-toggle--opened {
    span:nth-child(1),
    span:nth-child(4) {
      top: rem(11);
      opacity: 0;
    }

    span:nth-child(2) {
      transform: rotate(45deg);
    }

    span:nth-child(3) {
      transform: rotate(-45deg);
    }
  }

  &.m-menu-toggle--closing {
    span:nth-child(2),
    span:nth-child(3) {
      transition: transform 0.2s ease;
    }

    span:nth-child(1),
    span:nth-child(4) {
      transition: top 0.2s ease 0.2s, opacity 0.1s linear 0.1s;
    }
  }
}
</style>

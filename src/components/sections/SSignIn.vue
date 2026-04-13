<template>
  <section
    ref="block"
    class="s-signin"
  >
    <q-resize-observer
      debounce="2000"
      @resize="setContentHeight"
    />
    <div class="s-signin__main">
      <h1 class="a-mb-40">
        Добро пожаловать в <span class="text-purple">демо-портал</span>
      </h1>
      <transition
        enter-active-class="animated fadeInLeftBig"
        leave-active-class="animated fadeOutLeftBig"
        mode="out-in"
      >
        <MLogin
          v-if="login"
          key="login"
          class="s-signin__login"
          @change="login = false"
        />
        <MRegister
          v-else
          key="register"
          class="s-signin__register"
          @change="login = true"
        />
      </transition>
    </div>
    <div class="gt-sm s-signin__bg">
      <transition
        enter-active-class="animated slideInRight"
        leave-active-class="animated slideOutRight"
        mode="out-in"
      >
        <div
          v-if="login"
          key="login"
          class="s-signin__bg-login"
        />
        <div
          v-else
          key="register"
          class="s-signin__bg-register"
        />
      </transition>
    </div>
  </section>
</template>

<script setup>
import MLogin from 'src/components/molecules/MLogin';
import MRegister from 'src/components/molecules/MRegister';
import { onMounted, ref } from 'vue';

const login = ref(true);
const block = ref(null);

function getContentHeight() {
  const headerHeight = document.querySelector('header').offsetHeight;
  const footerHeight = document.querySelector('footer').offsetHeight;
  const integrationHeight = document.querySelector('.integration-top').offsetHeight;
  return `calc(100vh - ${(headerHeight + footerHeight + integrationHeight)}px)`;
}

function setContentHeight() {
  block.value.style.minHeight = getContentHeight();
}

onMounted(() => {
  setContentHeight();
});
</script>

<style lang="scss">
.s-signin {
  display: flex;
  overflow: hidden;

  &__main {
    width: 50%;
    margin-left: auto;
    max-width: rem(625);
    padding: rem(72) rem(30) rem(50) rem(40);

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
    position: relative;
    z-index: -1;
    width: 50%;
    overflow: hidden;
  }

  &__bg-login {
    background: url("/img/sign-in/login-bg.jpg") no-repeat center center;
  }

  &__bg-register {
    background: url("/img/sign-in/register-bg.jpg") no-repeat center center;
  }

  &__bg-login,
  &__bg-register {
    width: 100%;
    height: 100%;
    background-size: cover;
    animation-duration: .3s;
    animation-delay: .3s;
  }

  &__login,
  &__register {
    width: rem(470);
    animation-duration: 0.6s;

    @media(max-width: $breakpoint-md) {
      width: 100%;
    }
  }
}
</style>

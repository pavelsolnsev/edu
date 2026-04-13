<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__logo-wrap gt-md">
        <router-link
          to="/"
          class="footer__logo"
        >
          <img
            src="/img/logo.svg"
            alt="logo"
          >
        </router-link>
        <m-social />
        <p class="footer__copyright text-medium-s">
          © Демо-каталог (портфолио)
        </p>
      </div>

      <div class="footer__nav-wrap">
        <div class="footer__logo-wrap lt-lg">
          <router-link
            to="/"
            class="footer__logo"
          >
            <img
              src="/img/logo.svg"
              alt="logo"
            >
          </router-link>
          <div class="footer__phone xs">
            <a
              href="tel:+70000000000"
              class="footer__phone-link text-medium-xl"
            >
              +7 (000) 000-00-00
            </a>
          </div>
          <a
            href="mailto:demo-ads@example.com"
            class="footer__email text-regular-xs xs"
          >
            demo-ads@example.com
          </a>
          <m-social class="footer__social xs" />
        </div>
        <div class="footer__nav">
          <div class="footer__nav-column">
            <p class="footer__nav-caption text-semibold-m">
              Компания
            </p>
            <ul class="footer__nav-list">
              <li class="footer__nav-item text-regular-xs">
                <router-link :to="{name: 'articles'}">
                  Медиа
                </router-link>
              </li>
              <li class="footer__nav-item text-regular-xs">
                <router-link to="/about">
                  О проекте
                </router-link>
              </li>
              <li class="footer__nav-item text-regular-xs">
                <router-link to="/contacts">
                  Контакты
                </router-link>
              </li>
            </ul>
          </div>
          <div class="footer__nav-column">
            <p class="footer__nav-caption text-semibold-m">
              Учебным заведениям
            </p>
            <ul class="footer__nav-list">
              <li class="footer__nav-item text-xs">
                <router-link to="/info">
                  Информация для {{ $hostnames.isVuz ? 'ВУЗов' : 'колледжей' }}
                </router-link>
              </li>
              <li class="footer__nav-item text-xs">
                <router-link to="/ads">
                  Реклама
                </router-link>
              </li>
            </ul>
          </div>
          <div class="footer__nav-column">
            <p class="footer__nav-caption text-semibold-m">
              Абитуриентам
            </p>
            <ul class="footer__nav-list">
              <li class="footer__nav-item text-regular-xs">
                <router-link to="/specs">
                  Специальности {{ $hostnames.isVuz ? 'ВУЗов' : 'колледжей' }}
                </router-link>
              </li>
              <li class="footer__nav-item text-regular-xs">
                <router-link to="#">
                  Профессии
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="footer__aside">
        <div>
          <div class="footer__phone gt-xs">
            <a
              href="tel:+70000000000"
              class="footer__phone-link text-medium-xl"
            >
              +7 (000) 000-00-00
            </a>
          </div>
          <div class="footer__additional">
            <a
              href="mailto:demo-ads@example.com"
              class="footer__email text-xs gt-xs"
            >
              demo-ads@example.com
            </a>
            <router-link
              to="/docs/pdf/privacy_policy.pdf"
              target="_blank"
              class="footer__politics text-xs"
            >
              Политика конфиденциальности
            </router-link>
            <router-link
              to="/docs/pdf/terms_of_use.pdf"
              target="_blank"
              class="footer__agreement text-xs"
            >
              Пользовательское соглашение
            </router-link>
          </div>
        </div>
        <div class="footer__social">
          <m-social class="lt-lg gt-xs" />
          <p class="footer__copyright text-medium-s lt-lg">
            © Демо-каталог (портфолио)
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import MSocial from 'src/components/molecules/MSocial.vue';
</script>

<style lang="scss" scoped>
.footer {
  padding: padding2(64, 0);
  background-color: color(blue-gray);

  @media (max-width: $breakpoint-sm) {
    padding: padding2(48, 0);
  }

  @media (max-width: $breakpoint-xs) {
    padding: padding2(40, 0);
  }

  .container {
    display: flex;
    justify-content: space-between;
    overflow: visible;

    @media (max-width: $breakpoint-sm) {
      flex-direction: column;
      align-items: flex-start;
    }

    @media (max-width: $breakpoint-xs) {
      display: flex;
      flex-direction: column;
      padding: padding2(0, 20);
      gap: rem(32) 0;
    }
  }

  &__nav {
    display: flex;
    flex-wrap: wrap;
    max-width: rem(512);
    gap: rem(20) rem(32);

    @media (max-width: $breakpoint-sm) {
      gap: rem(24) rem(24);
    }

    @media (max-width: $breakpoint-xs) {
      flex-direction: column;
    }
  }

  &__nav-list {
    padding: 0;
    margin: 0;
  }

  &__logo {
    display: block;
    margin-bottom: margin(32);
  }

  &__logo-wrap {
    margin-top: -0.625rem;
  }

  &__nav-caption {
    margin: margin4(0, 0, 16, 0);
  }

  &__nav-item {
    margin-bottom: margin(8);
    list-style: none;

    a {
      text-decoration: none;
      color: color(gray);
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__additional {
    display: flex;
    flex-direction: column;
    text-align: end;

    @media (max-width: $breakpoint-sm) {
      text-align: start;
    }
  }

  &__phone-link {
    display: block;
    margin-bottom: margin(16);
    text-decoration: none;
    color: color(dark);
    white-space: nowrap;
    text-align: end;

    @media (max-width: $breakpoint-sm) {
      text-align: start;
    }

    @media (max-width: $breakpoint-xs) {
      margin-bottom: margin(8);
    }
  }

  &__email {
    display: block;
    margin-bottom: margin(8);
    color: color(primary);
    text-decoration: none;
  }

  &__politics {
    margin-bottom: margin(8);
    color: color(gray);
    text-decoration: none;
  }

  &__agreement {
    color: color(gray);
    text-decoration: none;
  }

  &__copyright {
    margin-top: margin(8);
    margin-bottom: 0;
  }

  &__social {
    margin-top: margin(16);
    text-align: right;

    .socials {
      justify-content: flex-end;
    }

    @media (max-width: $breakpoint-xs) {
      margin-top: 0;
    }
  }

  &__social.xs {
    @media (max-width: $breakpoint-xs) {
      margin-bottom: margin(32);
    }
  }

  &__aside {
    @media (max-width: $breakpoint-sm) {
      width: 100%;
      margin-top: rem(30);
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
    }

    @media (max-width: $breakpoint-xs) {
      margin-top: 0;
      align-items: flex-start;
      flex-direction: column;
    }
  }
}
</style>

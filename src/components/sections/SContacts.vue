<template>
  <section class="s-contacts a-mb-72">
    <h1 class="s-contacts__title a-mb-40">
      Контакты проекта
    </h1>
    <div class="s-contacts__item">
      <h4 class="s-contacts__item-title">
        Техническая поддержка
      </h4>
      <ul class="list-type-minus">
        <li>
          Неисправности в работе проекта
        </li>
        <li>
          Подключение к управлению учебным заведением на проекте
        </li>
      </ul>
      <a
        class="s-contacts__item-mail a-mb-16"
        href="mailto:demo-support@example.com"
      >
        demo-support@example.com
      </a>
      <div class="s-contacts__item-info">
        <p>
          Если вы являетесь представителем учебного заведения,
          то настоятельно рекомендуем вам ознакомиться со
          <a href="#">страницей информации для представителей учебных заведений.</a>
        </p>
      </div>
    </div>
    <div class="s-contacts__item">
      <h4 class="s-contacts__item-title">
        Рекламный отдел
      </h4>
      <p>
        Вопросы размещения всех видов рекламы
        индивидуальных предложений о сотрудничестве
      </p>
      <a
        class="s-contacts__item-mail a-mb-16"
        href="mailto:demo-ads@example.com"
      >
        demo-ads@example.com
      </a>
    </div>
    <div class="s-contacts__item">
      <h4 class="s-contacts__item-title">
        Отдел обновления информации
      </h4>
      <p>
        Для того чтобы актуализировать информацию об учебном
        заведении необходимо прислать запрос с корпоративной почты.
        В письме нужно подробно описать все изменения, которые необходимо внести.
      </p>
      <a
        class="s-contacts__item-mail a-mb-16"
        href="mailto:demo-content@example.com"
      >
        demo-content@example.com
      </a>
    </div>
  </section>
</template>
<script setup>
</script>
<style lang="scss">
.s-contacts {

  &__item {
    margin-bottom: margin(32);
    h4 {
      margin-bottom: margin(24);
    }
    p {
      margin-bottom: margin(16);
      &:last-child {
        margin-bottom: 0;
      }
      a {
        text-decoration: underline;
      }
    }
    &-mail {
      font-weight: 500;
      display: flex;
      align-items: center;
      width: fit-content;
      &:before {
        content: url("data:image/svg+xml,%3Csvg width='20' height='16' viewBox='0 0 20 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V14C20 14.55 19.8042 15.0208 19.4125 15.4125C19.0208 15.8042 18.55 16 18 16H2ZM10 9L2 4V14H18V4L10 9ZM10 7L18 2H2L10 7ZM2 4V2V14V4Z' fill='%234650F1'/%3E%3C/svg%3E%0A");
        margin-right: rem(10);
        line-height: 0;
      }
    }
    &-info {
      padding: rem(10);
      background-color: color(light-blue);
      font-size: rem(12);
      p {
        max-width: rem(675);
        @media(max-width: $breakpoint-sm) {
          max-width: 100%;
        }
      }
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>

<template>
  <section class="s-spec-about a-mb-32">
    <h1 class="s-spec-about__title a-mb-4">
      Математика — бакалавриат (01.03.01)
    </h1>
    <div class="a-mb-48">
      Укрупненная группа: <span class="text-medium">Математика и механика</span>
    </div>
    <div class="s-spec-about__item a-mb-48">
      <h2 class="s-spec-about-title a-mb-24">
        Профили
      </h2>
      <ul class="s-spec-about__list a-mb-24 list-type-minus">
        <li
          v-for="(item, index) in visibleItems"
          :key="index"
        >
          {{ item }}
        </li>
      </ul>
      <div
        v-if="showButton"
        class="s-spec-about__button"
      >
        <AButton
          outline
          label="Показать еще ..."
          class="s-spec-about__button"
          @click="showMoreItems"
        />
      </div>
    </div>
    <div class="s-spec-about__item a-mb-48">
      <h2 class="s-spec-about-title a-mb-24">
        Описание
      </h2>
      <p>
        Студенты математического факультета получат теоретические
        знания по различным математическим предметам, таким как: алгебра,
        матанализ, аналитическая геометрия, математическая логика,
        теория вероятностей, дискретная математика,
        математическое моделирование, дифференциальные уравнения и др.
        Аналитические дисциплины, такие как комплексный и функциональный анализ,
        тоже входят в список теоретического курса.
        Однако одной лишь теорией обучение бакалавров не окончится:
        студентов научат использовать полученные знания на практике,
        к примеру, для построения алгоритмов при разработке компьютерных программ.
        Также они научатся применять математические методы
        в разных жизненных сферах.
      </p>
    </div>
    <div class="s-spec-about__item a-mb-48">
      <h2 class="s-spec-about-title a-mb-24">
        Кем работать
      </h2>
      <p>
        Математика считается престижной и отчасти универсальной
        специальностью, которая открывает выпускникам перспективы
        работы в различных областях. Бакалавр математики может
        преподавать математические дисциплины (информатику в том числе)
        в школах и высших учебных заведениях; сможет найти работу
        в качестве системного или бизнес-аналитика. Помимо этого,
        выпускник математического профиля сможет заняться научной
        работой в тех сферах, где используются компьютерные
        технологии и математические методы. Он также сможет
        принимать участие в разработке методов эффективных
        решений задач в различных областях экономики, управления,
        естествознания и т.д. Однако наиболее популярное и
        востребованное направление, которому следуют
        бакалавры математики – это программирование.
      </p>
    </div>
    <div class="s-spec-about__item a-mb-48">
      <h2 class="s-spec-about-title a-mb-24">
        Где обучаться
      </h2>
      <ul class="list-type-dot">
        <li>
          <router-link to="/">
            <span>Математика в вузах Москвы</span>
          </router-link>
        </li>
        <li>
          <router-link to="/">
            <span>Математика в вузах Санкт-Петербурга</span>
          </router-link>
        </li>
        <li>
          <router-link to="/">
            <span>Математика в вузах дистанционно</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="s-spec-about__item a-mb-48">
      <h2 class="s-spec-about-title a-mb-24">
        Продолжить обучение в магистратуре
      </h2>
      <ul class="list-type-dot">
        <li>
          <router-link to="/">
            <span>Математика (магистратура)</span>
          </router-link>
        </li>
        <li>
          <router-link to="/">
            <span>Механика и математическое моделирование (магистратура)</span>
          </router-link>
        </li>
        <li>
          <router-link to="/">
            <span>Прикладная математика (магистратура)</span>
          </router-link>
        </li>
        <li>
          <router-link to="/">
            <span>Статистика (магистратура)</span>
          </router-link>
        </li>
      </ul>
    </div>
  </section>
</template>
<script setup>
import AButton from 'components/atoms/AButton.vue';
import { ref } from 'vue';

const items = [
  'Алгебра и математическая логика',
  'Дискретная математика',
  'Геометрия и топология',
  'Математическая биология и биоинформатика',
  'Вычислительная математика и информатика',
  'Математический анализ',
  'Теория вероятностей и математическая статистика',
  'Дифференциальные и интегральные уравнения',
  'Математическое моделирование',
  'Математические методы в экономике',
  'скрытый текст',
  'скрытый текст',
  'скрытый текст',
  'скрытый текст',
  'скрытый текст',
  'скрытый текст',
];
const visibleItems = ref(items.slice(0, 10));
const showButton = ref(items.length > 10);
const showMoreItems = () => {
  visibleItems.value = items;
  showButton.value = false;
};
</script>
<style lang="scss">
.s-spec-about {
  &__list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 10px;
    @media (max-width: $breakpoint-xs) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  &__item {
    @media (max-width: $breakpoint-xs) {
      margin-bottom: 32px;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }

  &__button {
    button {
      @media (max-width: $breakpoint-xs) {
        width: 100%;
      }
    }
  }

  &__wrapper {
    display: flex;
    justify-content: space-between;
    @media (max-width: $breakpoint-xs) {
      flex-direction: column-reverse;
    }
  }

  &__step {
    font-size: rem(12);
    @media (max-width: $breakpoint-sm) {
      max-width: rem(212);
    }
    @media (max-width: $breakpoint-xs) {
      margin-top: margin(8);
      margin-bottom: margin(8);
    }
    a {
      display: flex;
      align-items: center;
      font-weight: 500;
      font-size: rem(14);
      @media (max-width: $breakpoint-sm) {
        align-items: flex-end;
      }
    }

    &-prev {
      > span {
        margin-left: rem(23);
      }

      a {
        &:before {
          content: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.99995 11.9999L7.0687 10.9499L2.8687 6.74988H12V5.24988H2.8687L7.0687 1.04988L5.99995 -0.00012207L-4.673e-05 5.99988L5.99995 11.9999Z' fill='%234650F1'/%3E%3C/svg%3E%0A");
          margin-right: rem(11);
          margin-top: rem(2);
          @media (max-width: $breakpoint-sm) {
            margin-top: 0;
          }
        }
      }
    }

    &-next {
      margin-left: auto;

      > span {
        margin-right: rem(23);
      }

      a {
        &:after {
          content: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 11.9999L4.93125 10.9499L9.13125 6.74988H0V5.24988H9.13125L4.93125 1.04988L6 -0.00012207L12 5.99988L6 11.9999Z' fill='%234650F1'/%3E%3C/svg%3E%0A");
          margin-left: rem(11);
          margin-top: rem(2);
          @media (max-width: $breakpoint-sm) {
            margin-top: 0;
          }
        }
      }
    }
  }
}
</style>

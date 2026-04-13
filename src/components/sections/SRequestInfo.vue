<template>
  <div class="s-request-info text-medium-m text-dark">
    <div class="bg-blue-gray a-py-24">
      <div class="container">
        <div class="row items-center q-col-gutter-md">
          <div class="col-xs-12 col-sm-shrink">
            В ВУЗы, отмеченные
            <q-icon
              name="img:/icons/request.svg"
              size="2.5rem"
              class="a-ml-16"
            />
          </div>
          <div class="col-xs-12 col-sm-grow">
            можно подать заявку с&nbsp;демо-портала *
          </div>
          <div class="col-xs-12 col-sm-shrink">
            <div
              class="s-request-info__control text-regular-s text-primary"
              @click="contentCollapsed = !contentCollapsed"
            >
              <span>{{ contentCollapsed ? 'Развернуть' : 'Свернуть' }}</span>
              <q-icon
                name="expand_less"
                size="1.5rem"
                :style="{ transform: contentCollapsed ? 'rotate(180deg)' : 'none' }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="['s-request-info__content-wrapper', { _collapsed: contentCollapsed }]">
      <div class="s-request-info__content">
        <div class="container">
          <h3>
            Заявка в два клика
          </h3>
          <div class="row q-col-gutter-lg s-request-info__steps a-mt-8">
            <div
              v-for="step in reqSteps"
              :key="step.value"
              class="col-xs-12 col-sm-4 s-request-info__step"
            >
              <h4 class="s-request-info__step-value">
                {{ step.value }}
              </h4>
              <div class="s-request-info__step-label text-regular-m text-gray a-mt-16">
                {{ step.label }}
              </div>
            </div>
          </div>
          <h4 class="a-mt-48">
            Почему это удобно?
          </h4>
          <q-list class="a-mt-16">
            <q-item
              v-for="(feature, i) in reqFeatures"
              :key="i"
              class="a-px-0"
            >
              <q-item-section
                avatar
                top
              >
                <q-icon
                  name="check"
                  size="1.5rem"
                  color="primary"
                  class="s-request-info__feature-icon"
                />
              </q-item-section>
              <q-item-section class="text-regular-m text-gray">
                {{ feature }}
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
      <div class="a-mt-24 a-py-16 text-medium-m text-gray bg-light-blue">
        <div class="container">
          * Демо-интерфейс не даёт гарантий поступления или каких-либо иных преимуществ при
          взаимоотношениях с вузами.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const contentCollapsed = ref(false);

const reqSteps = [
  { value: 1, label: 'Перейдите на страницу вуза' },
  { value: 2, label: 'Заполните форму заявки' },
  { value: 3, label: 'Ждите ответа представителя' },
];

const reqFeatures = [
  'Регистрация не требуется все данные вводятся в форме заявки',
  'Заявка отправляется в вуз и обрабатывается официальными представителями',
  'Экономия денег и времени при звонках и ожиданиях ответа',
  'Сомневаетесь в выборе вуза? Оставьте заявку на подбор нашими специалистами',
];
</script>

<style lang="scss">
.s-request-info {
  &__content-wrapper {
    max-height: rem(1000);
    transition: all 0.5s ease;
    overflow: hidden;
    &._collapsed {
      max-height: 0 !important;
    }
  }
  &__content {
    padding: padding4(64, 0, 0, 0);
    @media screen and (max-width: $breakpoint-xs) {
      padding: padding4(32, 0, 0, 0);
    }
    @media screen and (min-width: $breakpoint-sm-min) and (max-width: $breakpoint-sm) {
      padding: padding4(40, 0, 0, 0);
    }
  }

  &__steps {
    @media screen and (min-width: $breakpoint-sm-min) {
      max-width: rem(526);
      margin-top: 0;
    }
  }

  &__step-value {
    @include wh(48, 48);
    font-weight: 600;
    font-size: rem(22);
    line-height: rem(48);
    text-align: center;
    color: color(step-label);
    border: 1px dashed color(light-gray);
    border-radius: bradius(100);
  }

  &__feature-icon {
    padding: padding(4);
    background: color(blue-gray);
    border: 1px solid color(light-blue);
    border-radius: bradius(4);
  }

  &__control {
    white-space: nowrap;
    cursor: pointer;
    .q-icon {
      transition: all 0.5s;
    }
  }
}
</style>

<template>
  <q-dialog
    :maximized="$q.screen.xs"
    class="m-dlg-review"
  >
    <div class="m-dlg-review__wrapper">
      <div class="m-dlg-review__title">
        <p class="a-mb-16 text-semibold-xl">
          Оставить отзыв
        </p>
        <q-icon
          v-close-popup
          name="close"
          size="2rem"
          color="stroke"
          class="m-dlg-review__close"
        />
      </div>
      <p class="a-mb-8 text-medium-l">
        Оцените ВУЗ
      </p>
      <q-rating
        v-model="rating"
        class="a-mb-16 m-dlg-review__rating"
        size="2rem"
        icon="img:/icons/rating-icon-empty.svg"
        icon-selected="img:/icons/rating-icon.svg"
        icon-half="img:/icons/rating-icon-half.svg"
        no-dimming
      />
      <q-input
        v-model="message"
        filled
        type="textarea"
        color="transparent"
        bg-color="light-gray"
        placeholder="Текст комментария"
        class="a-mb-24 m-dlg-review__textarea text-regular-m"
      />
      <AButton
        outline
        type="submit"
        label="Отправить"
        class="a-mb-16 m-dlg-review__btn"
        @click="submit"
      />
      <ACheckbox
        v-model="agree"
        class="a-mb-8 m-dlg-review__checkbox"
      >
        Я ознакомлен и согласен с
        <router-link
          to="/publishing-rules"
          target="_blank"
          @click="$event.stopPropagation()"
        >
          правилами
        </router-link>
        публикации отзывов
      </ACheckbox>
      <ACheckbox
        v-model="anonym"
        label="Опубликовать анонимно"
        class="m-dlg-review__checkbox"
      />
    </div>
  </q-dialog>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { api } from 'src/boot/axios';
import AButton from 'src/components/atoms/AButton';
import ACheckbox from 'src/components/atoms/ACheckbox';
import { useOrganizationStore } from 'src/stores/organization';
import { ref } from 'vue';

defineProps({
  orgId: {
    type: [String, null],
    default: null,
  },
});

const $org = useOrganizationStore();
const { getOrganization: org } = storeToRefs($org);
const rating = ref(0);
const message = ref('');
const agree = ref(true);
const anonym = ref(true);

const submit = async () => {
  const data = {
    data: {
      type: 'reviews',
      attributes: {
        text: message.value,
        score: rating.value,
        // finger: 'string',
        // answer_date: '2020-12-15T15:26:12.000000Z',
        // answer_text: 'Спасибо за отзыв!',
        is_approved: false,
        is_anonym: anonym.value,
        // is_answer_approved: false,
      },
      relationships: {
        // user: {
        //   data: {
        //     type: 'user',
        //     id: '1',
        //   },
        // },
        organization: {
          data: {
            type: 'organizations',
            id: org.value.id,
          },
        },
      },
    },
  };

  if (org.value.id) {
    await api.post('/organization/reviews', data);
  }
};
</script>

<style lang="scss">
.m-dlg-review {
  max-width: 100%;

  &__wrapper {
    display: flex;
    flex-direction: column;
    width: rem(770);
    height: rem(602);
    max-width: 100% !important;
    padding: padding2(48, 40);
    background-color: white;

    @media(max-width: $breakpoint-md) {
      width: rem(623);
    }

    @media(max-width: $breakpoint-sm) {
      width: 100%;
      height: calc(100vh - 12rem);
    }

    @media(max-width: $breakpoint-xs) {
      padding: padding2(32, 20);
    }
  }

  &__title {
    display: flex;
    justify-content: space-between;
  }

  &__textarea {
    flex-grow: 1;
    border-radius: bradius(16);

    .q-field__control {
      height: 100%;
      padding: padding2(0, 16);
      border-radius: bradius(16);

      &:before {
        border-bottom: none;
      }
    }

    .q-field__native {
      padding-top: padding(16);
      resize: none;

      &::placeholder {
        color: color(stroke);
      }
    }
  }

  &__close {
    cursor: pointer;
    transition: all .2s ease;

    &:hover {
      transform: rotate(90deg);
    }
  }

  &__btn {
    align-self: flex-start;

    @media(max-width: $breakpoint-xs) {
      width: 100%;
    }
  }

  .q-dialog__inner {

    & > div {
      border-radius: rem(32);
    }

    @media screen and (min-width: $breakpoint-sm-min) and (max-width: $breakpoint-sm) {
      padding: padding2(0, 28);
    }
  }
}
</style>

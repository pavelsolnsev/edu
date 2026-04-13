<template>
  <div
    v-if="item && specialty && faculty"
    class="m-specialty-college-item"
  >
    <div class="m-specialty-college-item__head">
      <router-link :to="`${url}sv${faculty.code}/s${specialty.code}/`">
        <p class="m-specialty-college-item__title text-semibold-xl text-dark">
          {{ specialty.name }}
        </p>
      </router-link>
      <q-icon
        size="1.5rem"
        class="cursor-pointer"
        :color="item.calculation_data.is_favorite ? 'dark' : 'stroke'"
        :name="item.calculation_data.is_favorite ? 'favorite' : 'favorite_outline'"
        @click="onFavorite(item)"
      />
    </div>
    <p class="a-mt-8 m-specialty-college-item__additional-info text-regular-s">
      ({{ specialty.code_okso }} -
      {{ form.name.toLowerCase() }}, на базе {{ item.base }} класса,
      {{ item.is_accreditation ? 'аккредитовано' : 'не аккредитовано' }})
    </p>
    <div class="a-mb-24 m-specialty-college-item__qualification">
      <p
        v-if="specialty.qualification"
        class="m-specialty-college-item__profiles-title text-medium-l"
      >
        Квалификация: {{ specialty.qualification }}
      </p>
    </div>
    <div class="a-mb-16 m-specialty-college-item__score">
      <ASpecialtyScore
        :title="'Бюджетных'"
        :count="item.budget_places"
      />
    </div>
    <div
      v-if="item.description"
      class="gt-xs a-mb-24 m-specialty-college-item__about"
    >
      <q-icon
        name="o_assistant"
        color="green"
        size="1.5rem"
        class="m-specialty-college-item__about-icon"
      />
      <p class="m-specialty-college-item__about-text text-regular-s">
        {{ item.description }}
      </p>
    </div>
    <p
      v-if="item.calculation_data?.exams"
      class="m-specialty-college-item__exams-list text-regular-m"
    >
      <span class="text-semibold-m">Вступительные испытания:</span>
      {{ item.calculation_data.exams }}
    </p>
    <MSpecialtyNumbersCard
      :price="price"
      :time="duration"
      :time-stamp="actualYear"
    />
  </div>
</template>

<script setup>
import ASpecialtyScore from 'components/atoms/ASpecialtyScore';
import MSpecialtyNumbersCard from 'components/molecules/MSpecialtyNumbersCard';
import { formatDuration, formatPrice } from 'src/lib/functions';
import { useOrganizationStore } from 'src/stores/organization';
import { computed } from 'vue';

const props = defineProps({
  item: {
    type: [Object, null],
    default: null,
  },
  specialty: {
    type: [Object, null],
    default: null,
  },
  faculty: {
    type: [Object, null],
    default: null,
  },
  form: {
    type: [Object, null],
    default: null,
  },
  url: {
    type: String,
    default: '/',
  },
  showFaculty: {
    type: Boolean,
    default: false,
  },
});

const $org = useOrganizationStore();

const price = computed(() => `${formatPrice(props.item.cost)}₽ в год`);
const duration = computed(() => formatDuration(props.item.duration));
const actualYear = computed(() => String(new Date(props.item.updated_at).getFullYear()));

const onFavorite = async (item) => {
  item.calculation_data.is_favorite = !item.calculation_data.is_favorite;
  const r = await $org.setSpecialtyFavorite(item.id, item.calculation_data.is_favorite);
  if (!r) item.calculation_data.is_favorite = !item.calculation_data.is_favorite;
};
</script>

<style lang="scss">
.m-specialty-college-item {
  padding: rem(32) 0;
  border-top: 1px solid color(stroke);

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    border-bottom: none;
  }

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    margin: 0;
  }

  &__additional-info {
    color: color(gray);
  }

  &__profiles-title {
    margin-bottom: rem(4);
  }

  &__profiles {
    width: rem(658);

    @media(max-width: $breakpoint-sm) {
      width: 100%;
    }
  }

  &__profiles-list {
    @media(max-width: $breakpoint-sm) {
      display: flex;
      flex-direction: column;
      gap: rem(8) 0;
    }
  }

  &__score {
    display: flex;
    flex-direction: column;
    gap: rem(16);
  }

  &__about {
    display: flex;
  }

  &__about-text {
    margin-bottom: 0;
  }

  &__about-icon {
    margin-right: rem(12);
    transform: rotate(-90deg);
  }
}
</style>

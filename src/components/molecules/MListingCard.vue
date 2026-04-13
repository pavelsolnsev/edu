<template>
  <div class="m-listing-card">
    <MListingCardLogo
      :src="item.logo ?? null"
      :to="url"
      :esi="item.esi ?? null"
      class="gt-xs"
    />
    <div
      class="m-listing-card__content"
    >
      <div class="m-listing-card__title-wrapper">
        <MListingCardLogo
          :src="item.logo ?? null"
          :to="url"
          :esi="item.esi ?? null"
          class="xs"
        />
        <router-link
          :to="url"
          class="text-dark"
        >
          <h4 class="m-listing-card__title">
            {{ item.name }}
          </h4>
        </router-link>
      </div>
      <MVuzTags
        v-if="tags && tags.length > 0"
        :tags="tags"
        class="a-mt-12"
      />
      <div
        v-if="item.short_seo && item.short_seo.length > 0"
        class="m-listing-card__description a-mt-20 text-regular-m text-dark"
      >
        {{ item.short_seo }}
      </div>
      <div class="row q-col-gutter-md a-my-0 m-listing-card__info">
        <div
          v-for="(col, i) in info"
          :key="i"
          class="col-xs-12 col-sm-6"
        >
          <div class="text-medium-l a-mb-8">
            {{ col.title }}
          </div>
          <div class="row no-wrap q-col-gutter-x-md">
            <div class="row wrap q-col-gutter-x-sm">
              <div class="text-regular-m">
                Бюджет:
              </div>
              <div class="text-medium-m text-primary">
                {{ col.budget }}
              </div>
            </div>
            <div class="row wrap q-col-gutter-x-sm">
              <div class="text-regular-m">
                Платные:
              </div>
              <div class="text-medium-m text-primary">
                {{ col.commercial }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="metro"
        class="row no-wrap items-end a-mt-24"
      >
        <q-icon
          name="img:/icons/metro.svg"
          size="1.5rem"
        />
        <div class="a-ml-8 text-medium-m">
          {{ metro.name }}
        </div>
      </div>
      <div
        v-if="isVuzRecommendation"
        class="row wrap q-col-gutter-md a-mt-16 m-listing-card__actions"
      >
        <div class="col-12">
          <AButton
            class="a-button--card a-button--wide"
            to="/"
            label="Подать заявку"
          />
        </div>
      </div>
      <div
        v-else
        class="row wrap q-col-gutter-md a-mt-16 m-listing-card__actions"
      >
        <div class="col-xs-12 col-sm-6">
          <AButton
            class="a-button--card a-button--wide"
            :to="`${url}specs/`"
            :label="`Специальности: ${item.calculation_data.specialties_count}`"
          />
        </div>
        <div class="col-xs-12 col-sm-6">
          <AButton
            outline
            class="a-button--card a-button--wide"
            :to="`${url}opinions/`"
            :label="`Отзывы: ${item.calculation_data.reviews_count}`"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import AButton from 'src/components/atoms/AButton.vue';
import MListingCardLogo from 'src/components/molecules/MListingCardLogo';
import MVuzTags from 'src/components/molecules/MVuzTags.vue';
import { makeOrgItemUrl } from 'src/lib/functions';
import { computed } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
  metro: {
    type: [Object, null],
    default: null,
  },
  tags: {
    type: [Array, null],
    default: null,
  },
  isVuzRecommendation: {
    type: Boolean,
    default: false,
  },
});

const url = computed(() => makeOrgItemUrl(props.item));

// const tags = computed(() => getOrganizationTags(props.item, props.items));
// const tags = [];

const formatInfoValue = (value) => (value > 0 ? value : '-');
const formatInfoValueBool = (value) => (value > 0 ? 'Есть' : '-');
const info = computed(() => [
  {
    title: 'Места:',
    budget: formatInfoValue(props.item.calculation_data.budget_places),
    commercial: formatInfoValueBool(props.item.calculation_data.commercial_places),
  },
  {
    title: 'Средний балл ЕГЭ:',
    budget: formatInfoValue(props.item.calculation_data.budget_score),
    commercial: formatInfoValue(props.item.calculation_data.commercial_score),
  },
]);
</script>
<style lang="scss">
.m-listing-card {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: padding4(40, 0, 48, 0);
  border-bottom: 1px solid color(stroke);

  & > .m-listing-cardlogo {
    flex: 0;
  }

  &__content {
    flex: 1;
  }

  &__title-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

    & > .m-listing-cardlogo {
      flex: 0;
    }
  }

  &__title {
    flex: 1;
  }

  &:last-child {
    padding-bottom: 0;
    border: none;
  }

  &__info {
    max-width: rem(514);
  }

  &__description {
    @media screen and (max-width: $breakpoint-xs) {
      margin-top: margin(12);
    }
  }

  &__actions {
    @media screen and (max-width: $breakpoint-xs) {
      margin-top: margin(8);
    }
  }
}
</style>

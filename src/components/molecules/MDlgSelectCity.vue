<template>
  <q-dialog
    class="m-dlg-selectcity"
    :maximized="$q.screen.xs"
  >
    <q-card class="m-dlg-selectcity__card">
      <q-card-section class="m-dlg-selectcity__search">
        <q-input
          v-model="cityFilter"
          outlined
          dense
          clearable
          clear-icon="close"
          placeholder="Поиск"
          input-class="text-regular-l"
        >
          <template #append>
            <q-icon name="search" />
          </template>
        </q-input>
      </q-card-section>
      <q-card-section class="m-dlg-selectcity__card-content scroll">
        <div class="m-dlg-selectcity__cities">
          <div
            v-for="(city, i) in citiesFiltered"
            :key="i"
          >
            <router-link
              :to="city.url"
              class="m-dlg-selectcity__city text-medium-m text-dark"
            >
              {{ city.name }}
            </router-link>
            <q-icon
              v-if="city.url === '/77/'"
              name="star"
              class="a-ml-8 text-red"
              size="1.25rem"
            />
          </div>
        </div>
      </q-card-section>
      <q-separator class="m-dlg-selectcity__separator" />
      <q-card-actions class="m-dlg-selectcity__actions">
        <router-link
          class="m-dlg-selectcity__all text-l text-medium"
          to="/cities/"
        >
          <h4>Все города</h4>
          <q-icon
            name="trending_flat"
            class="material-symbols-outlined"
            size="2rem"
            right
          />
        </router-link>
        <button
          v-close-popup
          class="m-dlg-selectcity__close text-semibold-m text-stroke"
        >
          Закрыть
        </button>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { getCitiesFiltered, getCitiesTop } from 'src/api/cities';
import { onMounted, ref, watch } from 'vue';

const citiesFiltered = ref([]);
const cityFilter = ref(null);

watch(cityFilter, async () => {
  citiesFiltered.value = (cityFilter.value && cityFilter.value.length > 1)
    ? await getCitiesFiltered(cityFilter.value)
    : await getCitiesTop();
});

onMounted(async () => {
  citiesFiltered.value = await getCitiesTop();
});
</script>

<style lang="scss">
.m-dlg-selectcity {
  &__card {
    width: 100%;
    max-width: 100% !important;
    height: rem(569);
    padding: padding2(64, 56);
    display: flex;
    flex-direction: column;

    @media(max-width: $breakpoint-sm) {
      height: calc(100vh - 12rem);
      padding: padding2(40, 32);
    }

    @media screen and (max-width: $breakpoint-xs) {
      padding: padding2(32, 20);
    }

    & > div {
      flex: 0 1 auto;
    }
  }

  &__search {
    margin-bottom: margin(32);
    color: color(dark-bluer);

    @media(max-width: $breakpoint-xs) {
      margin-bottom: margin(24);
    }
  }

  &__card-content {
    flex: 1 1 auto !important;
  }

  &__cities {
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: flex-start;
    gap: 0 rem(30);

    @media(max-width: $breakpoint-xs) {
      flex-wrap: nowrap;
    }

    & > * {
      display: flex;
      align-items: center;
      width: rem(170);

      @media(max-width: $breakpoint-xs) {
        width: 100%;
      }
    }
  }

  &__city {
    padding: rem(8) 0;
  }

  &__actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;

    @media(max-width: $breakpoint-xs) {
      flex-direction: column;
      align-items: flex-start;
      gap: rem(16) 0;
    }
  }

  &__close {
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
  }

  &__separator {
    margin: margin4(32, 0, 40, 0);

    @media(max-width: $breakpoint-xs) {
      margin: rem(10) 0;
    }
  }

  &__all {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  a,
  a:visited {
    text-decoration: none;
  }

  .q-card__actions a {
    color: color(dark);
  }

  .q-card__section {
    padding: 0;
  }

  .q-dialog__inner {
    align-items: flex-start;
    min-width: rem(280);
    max-width: rem(1250);
    margin: 0 auto;
    margin-top: rem(154);
    padding: 0 rem(40);

    @media screen and (min-width: $breakpoint-sm-min) and (max-width: $breakpoint-sm) {
      padding: padding2(0, 28);
      margin-top: rem(96);
    }

    @media(max-width: $breakpoint-xs) {
      padding: 0;
      margin-top: 0;
    }
  }

  .q-field__control {
    align-items: center;
    padding: padding2(0, 24);
    border-radius: bradius(16);

    &:before {
      border-color: color(light-blue);
    }
  }

  .q-field__native {
    &::placeholder {
      opacity: 1;
      color: color(dark-bluer);
    }
  }
}
</style>

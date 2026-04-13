<template>
  <div class="m-favorites-card">
    <router-link :to="urlOrg">
      <q-img
        :src="spec.logo"
        class="m-favorites-card__logo a-mb-24"
        fit="contain"
      />
    </router-link>
    <p class="m-favorites-card__name text-semibold-l a-mb-16">
      <router-link :to="urlSpec">
        {{ spec.name }}
      </router-link>
    </p>
    <div class="m-favorites-card__wrapper">
      <table class="m-favorites-card__table">
        <tbody>
          <tr>
            <td class="text-regular-s">
              Уровень
            </td>
            <td class="text-medium-s">
              {{ spec.educationLevel }}
            </td>
          </tr>
          <tr>
            <td class="text-regular-s">
              Форма
            </td>
            <td class="text-medium-s">
              {{ spec.educationForm }}
            </td>
          </tr>
          <tr>
            <td class="text-regular-s">
              Срок
            </td>
            <td class="text-medium-s">
              {{ spec.period }}
            </td>
          </tr>
          <tr>
            <td class="text-regular-s">
              Бюджетных мест
            </td>
            <td class="text-medium-s">
              {{ spec.budgetPlaces }}
            </td>
          </tr>
          <tr v-if="spec.budgetPoints">
            <td class="text-regular-s">
              Проходной балл (бюджет)
            </td>
            <td class="text-medium-s">
              {{ spec.budgetPoints }}
            </td>
          </tr>
          <tr v-if="spec.outBudgetPoints">
            <td class="text-regular-s">
              Проходной балл (платное)
            </td>
            <td class="text-medium-s">
              {{ spec.outBudgetPoints }}
            </td>
          </tr>
          <tr v-if="spec.exams">
            <td class="text-regular-s">
              Экзамены
            </td>
            <td class="text-medium-s">
              {{ spec.exams }}
            </td>
          </tr>
          <tr v-if="spec.additional">
            <td class="text-regular-s">
              Дополнительно:
            </td>
            <td class="text-medium-s">
              {{ spec.additional }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="m-favorites-card__actions a-mt-24 a-mb-0">
      <a
        class="text-stroke cursor-pointer"
        @click="removeItem(spec)"
      >Удалить</a>
    </p>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { makeOrgUrl } from 'src/lib/functions';
import { useDefaultStore } from 'src/stores/default';
import { useOrganizationStore } from 'src/stores/organization';
import { computed } from 'vue';

const $org = useOrganizationStore();
const $store = useDefaultStore();
const $q = useQuasar();

const props = defineProps({
  spec: {
    type: Object,
    default: () => {},
  },
});

const urlOrg = computed(() => makeOrgUrl(
  props.spec.organization.calculation_data.subject_id,
  props.spec.organization.calculation_data.city_id,
  props.spec.organization.code,
));

const urlSpec = computed(() => (api.hostnames.isVuz
  ? `${urlOrg.value}sv${props.spec.faculty.code}/s${props.spec.specialty.code}/`
  : urlOrg.value));

async function removeItem(item) {
  if (item?.id) {
    $q.dialog({
      title: 'Удаление специальности',
      message: `Вы действительно хотите удалить специальность "${item.name}" из избранного?`,
      cancel: true,
      class: 'a-pa-32',
      persistent: true,
    }).onOk(async () => {
      await $org.setSpecialtyFavorite(item.id, false);
      await $store.loadFavoriteSpecialties();
      return true;
    });
  }
}
</script>

<style lang="scss">
.m-favorites-card {
  padding: padding(8);
  border: 1px solid color(light-blue);
  border-radius: bradius(8);
  display: flex;
  flex-direction: column;

  &__logo {
    width: 100%;
    height: rem(100);
    flex: 0 1 auto;
  }

  &__wrapper {
    flex: 1 1 auto;
  }

  &__name {
    flex: 0 1 auto;
  }

  &__actions {
    flex: 0 1 auto;
  }

  &__table {
    width: 100%;
    border-collapse: collapse;

    tr {
      border-bottom: 1px solid color(stroke);
      vertical-align: top;

      &:last-child {
        border-bottom: none;
      }
    }

    td {
      padding: padding2(8, 0);

      &:first-child {
        width: rem(136);
        text-align: start;
      }

      &:last-child {
        text-align: end;
      }
    }
  }
}

.a-button {
  &--link {
    > * {
      background-color: white !important;
    }
  }
}
</style>

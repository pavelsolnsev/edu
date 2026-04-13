<template>
  <section class="s-vuz-info container">
    <h2 class="s-vuz-info__title">
      Общая информация
    </h2>
    <p
      v-if="info.full_name"
      class="s-vuz-info__description text-regular-m"
    >
      {{ info.full_name }}
    </p>
    <MVuzContacts
      v-if="contacts"
      :contacts="contacts"
      class="s-vuz-info__contacts"
    />
    <div
      v-if="affiliations && affiliations.length > 0"
      class="s-vuz-info__item"
    >
      <h4 class="s-vuz-info__subtitle">
        Филиалы {{ title }}
      </h4>
      <div class="s-vuz-info__branches">
        <router-link
          v-for="item in affiliations"
          :key="item.id"
          :to="makeOrgItemUrl(item)"
          class="s-vuz-info__branch-link text-medium-m"
        >
          {{ item.calculation_data.city_name }}
        </router-link>
      </div>
    </div>
    <div
      v-if="info.$parentCollege"
      class="s-vuz-info__item"
    >
      <h4 class="s-vuz-info__subtitle">
        Головной вуз
      </h4>
      <router-link
        :to="makeOrgItemUrl(info.$parentCollege)"
        class="s-vuz-info__link text-medium-m"
      >
        {{ info.$parentCollege.name }}
      </router-link>
    </div>
    <div
      v-if="info.$parent"
      class="s-vuz-info__item"
    >
      <h4 class="s-vuz-info__subtitle">
        <template v-if="$hostnames.isVuz">
          Головная организация
        </template>
        <template v-else>
          Головной Колледж
        </template>
      </h4>
      <router-link
        :to="makeOrgItemUrl(info.$parent)"
        class="s-vuz-info__link text-medium-m"
      >
        {{ info.$parent.name }}
      </router-link>
    </div>
    <div
      v-if="colleges && colleges.length > 0"
      class="s-vuz-info__item"
    >
      <h4 class="s-vuz-info__subtitle">
        Колледжи {{ title }}
      </h4>
      <div class="s-vuz-info__colleges">
        <router-link
          v-for="item in colleges"
          :key="item.id"
          :to="makeOrgItemUrl(item)"
          class="s-vuz-info__link text-medium-m"
        >
          {{ item.name }}
        </router-link>
      </div>
    </div>
    <div
      v-if="licenceData && licenceData.licence_num && licenceData.licence_date"
      class="s-vuz-info__item"
    >
      <h4 class="s-vuz-info__subtitle">
        Лицензия
      </h4>
      <p class="s-vuz-info__text text-medium-m">
        № {{ licenceData.licence_num }} действует Бессрочно
        с {{ formatDate(licenceData.licence_date) }}
      </p>
    </div>
    <div
      v-if="licenceData"
      class="s-vuz-info__item"
    >
      <h4 class="s-vuz-info__subtitle">
        Аккредитация
      </h4>
      <p
        v-if="licenceData.accreditation_number && licenceData.accreditation_date"
        class="s-vuz-info__text text-medium-m"
      >
        № {{ licenceData.accreditation_number }}
        действует с {{ formatDate(licenceData.accreditation_date) }}
      </p>
      <p
        v-else
        class="s-vuz-info__text text-medium-m"
      >
        нет данных
      </p>
    </div>
    <div
      v-if="info.old_names && info.old_names.length"
      class="s-vuz-info__item"
    >
      <h4 class="s-vuz-info__subtitle">
        Предыдущие названия {{ info.short_name }}
      </h4>
      <p
        v-for="name in info.old_names"
        :key="name"
        class="s-vuz-info__text text-medium-m"
      >
        {{ name }}
      </p>
    </div>
  </section>
</template>

<script setup>
import { api } from 'src/boot/axios';
import MVuzContacts from 'src/components/molecules/MVuzContacts';
import { formatDate, makeOrgItemUrl } from 'src/lib/functions';
import { computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  info: {
    type: [Object, null],
    default: () => null,
  },
  contacts: {
    type: [Object, null],
    default: () => null,
  },
  affiliations: {
    type: [Array, null],
    default: () => null,
  },
  colleges: {
    type: [Array, null],
    default: () => null,
  },
});

const licenceData = computed(() => {
  let targetObj = null;
  if (props.info.licence_num && props.info.licence_date) {
    targetObj = props.info;
  } else if (api.hostnames.isCollege && props.info.$parentCollege) {
    targetObj = props.info.$parentCollege;
  } else if (props.info.$parent) {
    targetObj = props.info.$parent;
  }
  return targetObj;
});

</script>

<style lang="scss">
.s-vuz-info {
  &__title {
    margin-bottom: margin(8);
  }

  &__text {
    margin-bottom: margin(8);

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__item,
  &__description,
  &__contacts {
    margin-bottom: margin(40);
  }

  &__item:last-child {
    margin-bottom: 0;
  }

  &__subtitle {
    margin-bottom: margin(16);
  }

  &__branch-link {
    margin-right: margin(8);
    text-decoration: none;
    color: color(blue-button);

    &:last-child {
      margin-bottom: 0;
    }

    @media(max-width: $breakpoint-xs) {
      display: block;
      margin-right: 0;
      margin-bottom: margin(8);
    }
  }

  &__link {
    display: block;
    margin-bottom: margin(8);
    text-decoration: none;
    color: color(blue-button);
  }

  &__branches,
  &__colleges {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>

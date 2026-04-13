<template>
  <div
    class="m-vuz-contacts"
  >
    <div class="m-vuz-contacts__column">
      <p
        v-if="contacts.address"
        class="m-vuz-contacts__item text-regular-m"
      >
        <q-icon
          :name="'img:' + require('/public/icons/map.svg')"
          size="1.5rem"
          class="m-vuz-contacts__icon"
        />
        {{ contacts.address }}
      </p>
      <p
        v-if="contacts.commiteeSchedule"
        class="m-vuz-contacts__item text-regular-m"
      >
        <q-icon
          :name="'img:' + require('/public/icons/refresh.svg')"
          size="1.5rem"
          class="m-vuz-contacts__icon"
        />
        {{ contacts.commiteeSchedule }}
      </p>
      <a
        v-if="contacts.website"
        :href="website"
        target="_blank"
        class="m-vuz-contacts__item text-regular-m"
      >
        <q-icon
          :name="'img:' + require('/public/icons/globe.svg')"
          size="1.5rem"
          class="m-vuz-contacts__icon"
        />
        {{ contacts.website }}
      </a>
      <a
        v-if="contacts.email"
        :href="`mailto:${contacts.email}`"
        class="m-vuz-contacts__item text-regular-m"
      >
        <q-icon
          name="o_mail"
          size="1.5rem"
          color="orange"
          class="m-vuz-contacts__icon"
        />
        {{ contacts.email }}
      </a>
      <p
        v-if="contacts.schedule"
        class="m-vuz-contacts__item text-regular-m"
      >
        <q-icon
          name="o_calendar_today"
          size="1.5rem"
          color="orange"
          class="m-vuz-contacts__icon"
        />
        <span>
          <span class="text-medium-m">Режим работы:&nbsp;</span>
          {{ contacts.schedule }}
        </span>
      </p>
    </div>
    <div class="m-vuz-contacts__column">
      <q-icon
        :name="'img:' + require('/public/icons/smartphone.svg')"
        class="m-vuz-contacts__icon m-vuz-contacts--smartphone"
      />
      <div
        v-if="contacts.phones"
        class="m-vuz-contacts__phones"
      >
        <template
          v-for="phone in contacts.phones"
          :key="phone.phone"
        >
          <a
            :href="`tel:${phone.phone}`"
            class="m-vuz-contacts__phone text-semibold-xl"
          >
            {{ phone.phone }}
          </a>
          <p v-if="phone.suffix">
            {{ phone.suffix }}
          </p>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  contacts: {
    type: Object,
    default: () => ({}),
  },
});
const website = computed(
  () => (props.contacts.website.indexOf('http') === 0
    ? props.contacts.website : `https://${props.contacts.website}`),
);
</script>

<style lang="scss">
.m-vuz-contacts {
  display: flex;
  justify-content: space-between;

  @media(max-width: $breakpoint-sm) {
    flex-direction: column;
  }

  &__column {
    &:first-child {
      width: rem(567);

      @media(max-width: $breakpoint-sm) {
        width: 100%;
        margin-bottom: margin(32);
      }
    }

    &:last-child {
      display: flex;
      justify-content: flex-end;
      width: rem(312);
      text-align: end;

      @media(max-width: $breakpoint-sm) {
        width: 100%;
        justify-content: flex-start;
        text-align: start;
      }
    }
  }

  &__item {
    display: flex;
    align-items: flex-start;
    width: fit-content;
    margin-bottom: margin(16);
    text-decoration: none;
    color: color(dark);

    &:last-child {
      margin-bottom: 0;
    }

    &:visited {
      color: color(dark);
    }
  }

  &__icon {
    margin-right: margin(16);

    &.m-vuz-contacts--smartphone {
      @include wh(32, 32);

      @media(max-width: $breakpoint-xs) {
        @include wh(22, 22);
      }
    }
  }

  &__phone {
    display: block;
    margin-bottom: margin(8);
    color: color(dark);
    text-decoration: none;
  }
}
</style>

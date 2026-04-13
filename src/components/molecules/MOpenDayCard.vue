<template>
  <div class="m-open-day-card">
    <div class="m-open-day-card__img">
      <q-img
        :ratio="1"
        fit="contain"
        :src="openDay.organization.logo"
        alt="Лого вуза"
      />
    </div>
    <div class="m-open-day-card__main">
      <router-link
        :to="{
          name: 'orgDefault',
          hash: '#openDays',
          params: {
            rid: routeParams.rid,
            cid: routeParams.cid,
            vid: openDay.organization.code.slice(1),
            u: $hostnames.isVuz ? 'v' : 'c',
          },
        }"
        class="m-open-day-card__name"
      >
        <h4>
          {{ openDay.organization.name }}
        </h4>
      </router-link>
      <p
        v-if="openDay.title"
        class="m-open-day-card__title text-medium-l"
      >
        {{ openDay.title }}
      </p>
      <p
        v-if="openDay.faculty"
        class="m-open-day-card__faculty text-regular-m"
      >
        <q-icon
          name="school"
          size="1rem"
          color="gray"
        />
        {{ openDay.faculty.name }}
      </p>
      <p class="m-open-day-card__address text-regular-m">
        <span
          v-if="openDay.is_online"
          class="m-open-day-card__address-online"
        >
          <q-icon
            :name="'img:' + require('/public/icons/remote-event.svg')"
            size="1rem"
            color="gray"
          />
          Онлайн-мероприятие
        </span>
        <span
          v-if="openDay.address"
          class="m-open-day-card__address-place"
        >
          <q-icon
            :name="'img:' + require('/public/icons/address.svg')"
            size="1rem"
            color="gray"
          />
          {{ openDay.address }}
        </span>
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  openDay: {
    type: Object,
    default: () => {},
  },
  routeParams: {
    type: Object,
    default: () => {},
  },
});
</script>

<style lang="scss">
.m-open-day-card {
  display: flex;
  padding: rem(30) 0;
  gap: rem(14) rem(32);
  border-bottom: 1px solid color(stroke);

  @media(max-width: $breakpoint-xs) {
    flex-direction: column;
  }

  &__img {
    @include wh(128, 128);
    padding: padding(8);
    flex-shrink: 0;
    border: 1px solid color(light-blue);
    border-radius: bradius(8);

    @media(max-width: $breakpoint-md) {
      @include wh(140, 140);
    }

    @media(max-width: $breakpoint-sm) {
      @include wh(80, 80);
    }
  }

  &__name {
    display: block;
    margin-bottom: margin(24);
    color: color(dark);
    cursor: pointer;

    &:visited {
      color: color(dark);
    }

    @media(max-width: $breakpoint-xs) {
      margin-bottom: margin(14);
    }
  }

  &__title {
    margin-bottom: margin(16);
  }

  &__faculty {
    margin-bottom: margin(8);
  }

  &__address {
    margin-bottom: 0;

    span {
      margin-bottom: margin(8);
    }

    span:last-child {
      margin-bottom: 0;
    }
  }

  &__faculty,
  &__address-place,
  &__address-online  {
    display: flex;
    align-items: center;
    gap: 0 rem(8);
  }
}
</style>

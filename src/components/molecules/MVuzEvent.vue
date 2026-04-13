<template>
  <div class="m-vuz-event__event">
    <h6 class="m-vuz-event__date">
      {{ event.date }}
    </h6>
    <p class="text-medium-l">
      {{ event.title ?? 'День открытых дверей' }}
    </p>
    <p
      v-if="event.faculty"
      class="m-vuz-event__faculty text-regular-m"
    >
      <q-icon
        class="m-vuz-event__icon"
        name="school"
        size="1rem"
        color="gray"
      />
      {{ event.faculty.name }}
    </p>
    <p class="m-vuz-event__address text-regular-m">
      <span
        v-if="event.is_online"
        class="m-open-day-card__address-online"
      >
        <q-icon
          class="m-vuz-event__icon"
          :name="'img:' + require('/public/icons/remote-event.svg')"
          size="1rem"
          color="gray"
        />
        Онлайн-мероприятие
      </span>
      <span
        v-if="event.address"
        class="m-vuz-event__address-place"
      >
        <q-icon
          class="m-vuz-event__icon"
          :name="'img:' + require('/public/icons/address.svg')"
          size="1rem"
          color="gray"
        />
        {{ event.address }}
      </span>
    </p>
    <p
      v-if="event.time"
      class="m-vuz-event__time text-regular-m"
    >
      <q-icon
        class="m-vuz-event__icon"
        name="schedule"
        size="1rem"
        color="gray"
      />
      {{ event.time }}
    </p>
    <a
      v-if="event.url"
      :href="event.url"
      target="_blank"
    >
      <q-icon
        class="m-vuz-event__icon"
        :name="'img:' + require('/public/icons/remote-event.svg')"
        size="1rem"
        color="gray"
      />
      Ссылка на мероприятие
    </a>
  </div>
</template>

<script setup>
defineProps({
  event: {
    type: Object,
    default: () => {},
  },
});
</script>

<style lang="scss">
.m-vuz-event {
  &__event {
    margin-bottom: margin(24);
  }

  &__date {
    margin-bottom: margin(16);
  }

  &__faculty {
    margin-bottom: margin(16);
  }

  &__address,
  &__url,
  &__time {
    margin-bottom: margin(8);
  }

  &__icon {
    margin-right: margin(8);
  }
}
</style>

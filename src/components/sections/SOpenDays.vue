<template>
  <section class="s-open-days">
    <div
      v-if="openDays.length"
      class="s-open-days__list"
    >
      <div
        v-for="(openDayGroup, groupName) in openDaysGrouped"
        :key="groupName"
      >
        <h5 class="s-open-days__date">
          {{ groupName }}
        </h5>
        <MOpenDayCard
          v-for="openDay in openDayGroup"
          :key="openDay.name"
          :open-day="openDay"
          :route-params="routeParams"
        />
      </div>
    </div>
    <p
      v-else
      class="text-medium-m"
    >
      Мероприятий пока не запланировано
    </p>
    <MPagination
      :meta="paging"
      class="a-mt-40"
    />
    <p class="s-open-days__caption text-regular-m">
      Только актуальная информация! Дни открытых дверей в
      {{ $hostnames.isVuz ? 'вузах' : 'колледжах и техникумах' }}
      {{ placeName }} {{ new Date().getFullYear() }}
      (университетах и институтах) добавляются в календарь непосредственно
      официальными представителями вузов на проекте и редакцией портала.
    </p>
  </section>
</template>

<script setup>
import MOpenDayCard from 'src/components/molecules/MOpenDayCard';
import MPagination from 'src/components/molecules/MPagination';
import { formatTxtDate } from 'src/lib/functions';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const $route = useRoute();
const routeParams = $route.params;

const props = defineProps({
  openDays: {
    type: Object,
    default: () => {},
  },
  paging: {
    type: Object,
    default: () => {},
  },
  placeName: {
    type: String,
    default: '',
  },
});

const openDaysGrouped = computed(() => props.openDays.slice().reduce((result, openDay) => {
  const dateKey = formatTxtDate(openDay.start_date.split('T')[0]);
  if (!result[dateKey]) result[dateKey] = [];
  result[dateKey].push(openDay);
  return result;
}, {}));
</script>

<style lang="scss">
.s-open-days {
  padding-bottom: padding(72);

  &__add-event {
    display: flex;
    align-items: flex-start;
    gap: 0 rem(8);
    color: color(primary);
    border: none;
    background-color: transparent;
    box-shadow: none;
    cursor: pointer;
    text-align: left;
  }

  &__date {
    margin-top: margin(40);
  }

  &__caption {
    margin-top: margin(24);

    @media(max-width: $breakpoint-sm) {
      margin-top: margin(8);
    }
  }
}
</style>

<template>
  <section
    v-if="events"
    id="openDays"
    class="s-vuz-events container"
  >
    <h4 class="s-vuz-events__title a-mb-24">
      Дни открытых дверей {{ title }}
    </h4>
    <MVuzEvent :event="firstEvent" />
    <AButton
      v-if="!expanded && eventExceptFirst.length"
      label="Показать еще..."
      outline
      @click="expanded = !expanded"
    />
    <q-expansion-item v-model="expanded">
      <MVuzEvent
        v-for="event in eventExceptFirst"
        :key="event.id"
        :event="event"
      />
      <AButton
        v-if="expanded"
        label="Показать меньше"
        outline
        @click="expanded = !expanded"
      />
    </q-expansion-item>
  </section>
</template>

<script setup>
import AButton from 'src/components/atoms/AButton';
import MVuzEvent from 'src/components/molecules/MVuzEvent';
import { computed, ref } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Дни открытых дверей',
  },
  events: {
    type: Array,
    default: () => [],
  },
});

const firstEvent = computed(() => (props.events[0]));
const eventExceptFirst = computed(() => props.events.slice(1));

const expanded = ref(false);
</script>

<style lang="scss">
.s-vuz-events {
  margin-bottom: margin(40);

  .q-expansion-item__container .q-item {
    display: none;
  }
}
</style>

<template>
  <section class="s-vuz-monitoring container">
    <div class="s-vuz-monitoring__wrapper">
      <h2
        v-if="title"
        class="s-vuz-monitoring__title"
      >
        Результаты мониторинга Минобрнауки для {{ title }}
      </h2>
      <p
        v-for="message in data.messages"
        :key="message.id"
        class="s-vuz-monitoring__msg"
      >
        <q-icon
          class="s-vuz-monitoring__msg-icon"
          name="error_outline"
          color="red"
          size="1.5rem"
        />
        <b>Результат {{ message.year }} года:</b> данные для проведения мониторинга или их часть, не
        предоставлены или не соответствуют требованиям Межведомственной комиссии
      </p>
      <MExtendableTable
        :headings="data.headings"
        :items="data.data"
        :limit="$hostnames.isVuz ? 2 : 3"
        :button-text="'Показать больше данных ...'"
        class="m-extendable-table--monitoring"
      />
    </div>
  </section>
</template>

<script setup>
import MExtendableTable from 'src/components/molecules/MExtendableTable';

defineProps({
  title: {
    type: String,
    default: '',
  },
  data: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style lang="scss">
.s-vuz-monitoring {
  &.container {
    @media(max-width: $breakpoint-sm) {
      padding: 0;
    }
  }

  &__wrapper {
    padding: padding(40);
    border: 1px solid color(light-gray);
    border-radius: rem(32);
    overflow-x: auto;

    @media(max-width: $breakpoint-xs) {
      padding: rem(40) rem(20);
    }
  }

  &__title {
    margin-bottom: margin(24);
  }

  &__msg-icon {
    margin-right: margin(8);
  }
}
</style>

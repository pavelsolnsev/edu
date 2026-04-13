<template>
  <div class="s-ads-advantages">
    <MAdsAdvantage
      icon="sym_o_history_edu"
      title="Учебные заведения"
      text="Более 2000 вузов России"
      class="s-ads-advantages__item"
    />
    <MAdsAdvantage
      icon="sym_o_route"
      title="Трафик"
      text="Более 90% из поисковых систем"
      class="s-ads-advantages__item"
    />
    <MAdsAdvantage
      icon="sym_o_account_circle"
      title="Пользователи"
      text="Более 500 000 пользователей в месяц"
      class="s-ads-advantages__item"
    />
    <MAdsAdvantage
      icon="sym_o_school"
      title="Только вузы"
      text="Вузы и статьи о высшем образовании"
      class="s-ads-advantages__item"
    />
    <MAdsAdvantage
      icon="sym_o_ads_click"
      title="Таргетинг"
      text="Полный таргетинг рекламы по субъектам"
      class="s-ads-advantages__item"
    />
    <MAdsAdvantage
      icon="sym_o_track_changes"
      title="Статистика"
      text="Статистика всех рекламных кампаний"
      class="s-ads-advantages__item"
    />
  </div>
</template>

<script setup>
import MAdsAdvantage from 'components/molecules/MAdsAdvantage';
</script>

<style lang="scss">
.s-ads-advantages {
  display: flex;
  flex-wrap: wrap;
  max-width: rem(870);
  gap: rem(34) rem(30);
  margin-bottom: margin(64);

  @media(max-width: $breakpoint-sm) {
    margin-bottom: margin(48);
  }

  &__item {
    width: rem(270);

    @media(max-width: $breakpoint-sm) {
      width: rem(250);
    }

    @media(max-width: $breakpoint-xs) {
      width: 100%;
    }
  }

  .material-symbols-outlined {
    font-variation-settings:
      'FILL' 0,
      'wght' 500,
      'GRAD' 0,
      'opsz' 48
  }
}
</style>

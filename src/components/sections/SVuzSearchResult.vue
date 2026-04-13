<template>
  <section class="s-vuz-search-result">
    <MCheckVuzIntro v-if="!org" />
    <div
      v-else
      class="s-vuz-search-result__result"
    >
      <p class="s-vuz-search-result__subject text-medium-xs a-mb-8">
        {{ org.calculation_data.city_name }}
      </p>
      <p class="s-vuz-search-result__name text-semibold-xl a-mb-8">
        {{ org.name }}
      </p>
      <p class="s-vuz-search-result__full-name text-regular-xs">
        {{ org.full_name }}
      </p>
      <div class="s-vuz-search-result__esi">
        <div class="s-vuz-search-result__mark">
          <span class="s-vuz-search-result__mark-icon">{{ esi.letter }}</span>
          <span class="text-medium-xs text-stroke">{{ esi.text }} 2022 год</span>
        </div>
        <p class="s-vuz-search-result__esi-text text-regular-m a-mb-24">
          ESI (индекс стабильности, демо) — условная метка для портфолио, рассчитывается
          из формальных показателей при наличии данных API. Шкала от А — «Надежный» до С —
          «Негативный».
        </p>
      </div>
      <div class="s-vuz-search-result__additional">
        <p
          v-for="(item, i) in items"
          :key="i"
          class="s-vuz-search-result__additional-item a-mb-8"
        >
          <q-icon
            :name="icons[item.icon].name"
            :color="icons[item.icon].color"
            size="1.5rem"
            class="a-mr-8"
          />
          {{ item.text }}
        </p>
      </div>
      <h3 class="s-vuz-search-result__leadform_title a-mb-24">
        Подобрать программу обучения
      </h3>
      <MLeadForm class="s-vuz-search-result__leadform" />
    </div>
  </section>
</template>

<script setup>
import MLeadForm from 'components/molecules/MLeadForm';
import { useMeta } from 'quasar';
import MCheckVuzIntro from 'src/components/molecules/MCheckVuzIntro';
import { formatDate, plural } from 'src/lib/functions';
import { computed } from 'vue';

const props = defineProps({
  org: {
    type: Object || null,
    default: null,
  },
});

const icons = {
  ok: { name: 'done', color: 'green' },
  info: { name: 'error_outline', color: 'light-blue-table' },
  avg: { name: 'sym_o_exposure', color: 'orange' },
  bad: { name: 'sym_o_exclamation', color: 'red' },
};
const mapIcons = {
  0: 'bad',
  1: 'avg',
  2: 'ok',
};

const esi = computed(() => (props.org?.esi
  ? props.org.esi > 7
    ? { letter: 'A', text: 'Надежный' } : props.org.esi > 3
      ? { letter: 'B', text: 'Средний' } : { letter: 'C', text: 'Негативный' } : { }));

const items = computed(() => {
  if (!props.org) return [];
  const r = [];
  const d = props.org;
  const c = d.calculation_data;
  const info = d.$rating;

  // Лицензия
  if (d.licence_num && d.licence_date) {
    r.push({
      icon: 'ok',
      text: `Лицензия действительна. Номер лицензии ${d.licence_num} от ${formatDate(d.licence_date)} действительна Бессрочно`,
    });
  } else {
    r.push({
      icon: 'bad',
      text: 'Нет данных действующей лицензии',
    });
  }
  // Аккредитация
  if (d.accreditation_number && d.accreditation_date) {
    r.push({
      icon: 'ok',
      text: `Аккредитация действительна. Номер аккредитации  ${d.accreditation_number} от ${formatDate(d.accreditation_date)}`,
    });
  } else {
    r.push({
      icon: 'bad',
      text: 'Нет данных действующей аккредитации',
    });
  }
  // Запреты приема
  r.push({
    icon: 'ok',
    text: 'Действующих запретов приема не обнаружено',
  });
  if (d.is_departmental) {
    r.push({
      icon: 'info',
      text: 'Ведомственные вузы не проходят процедуру мониторинга',
    });
  } else {
    r.push({
      icon: mapIcons[info.average_score_ede] ?? 'info',
      text: 'Средний балл ЕГЭ студентов, принятых на обучение по очной форме',
    });
    r.push({
      icon: mapIcons[info.research] ?? 'info',
      text: 'Научно-исследовательская деятельность',
    });
    r.push({
      icon: mapIcons[info.foreign_students] ?? 'info',
      text: 'Удельный вес численности иностранных студентов',
    });
    r.push({
      icon: mapIcons[info.income] ?? 'info',
      text: 'Доходы образовательной организации',
    });
    r.push({
      icon: mapIcons[info.salary_region] ?? 'info',
      text: 'Отношение заработной платы профессорско-преподавательского состава к средней заработной плате региона',
    });
    r.push({
      icon: mapIcons[info.number_teachers] ?? 'info',
      text: 'Численность преподавателей, имеющих ученые степени кандидата или доктора наук, на 100 студентов',
    });
    if (d.esi_marks % 10) {
      r.push({
        icon: 'bad',
        text: 'Сокращение численности студентов более чем на 20% за 2 года',
      });
    } else if (d.esi_marks / 10 >= 1) {
      r.push({
        icon: 'bad',
        text: 'Более 80% студентов учатся заочно и дистанционно',
      });
    }
  }
  r.push({
    icon: d.is_state ? 'ok' : 'info',
    text: d.is_state ? 'Государственный вуз' : 'Негосударственный вуз',
  });
  r.push({
    icon: d.is_hostel ? 'ok' : 'info',
    text: d.is_hostel ? 'Общежитие' : 'Нет общежития',
  });
  r.push({
    icon: d.is_military ? 'ok' : 'info',
    text: d.is_military ? 'Военная кафедра' : 'Нет военной кафедры',
  });
  r.push({
    icon: 'ok',
    text: `Оценка ${c.avg_score} из 5, исходя из ${c.reviews_count} ${plural(c.reviews_count, ['отзыва', 'отзывов', 'отзывов'])}`,
  });
  r.push({
    icon: c.percent_of_hyped_reviews > 30
      ? 'bad' : c.percent_of_hyped_reviews > 10
        ? 'avg' : 'ok',
    text: c.percent_of_hyped_reviews > 30
      ? 'Зафиксированы массовые попытки накрутки положительных отзывов' : c.percent_of_hyped_reviews > 10
        ? 'Зафиксированы попытки накрутки положительных отзывов' : 'Не зафиксировано попыток накрутки положительных отзывов',
  });
  return r;
});

useMeta(() => ({
  title: 'Проверка вуза онлайн',
  meta: {
    description: {
      name: 'description',
      content: 'Демо: проверка карточки вуза по показателям (портфолио)',
    },
  },
}));
</script>

<style lang="scss">
.s-vuz-search-result {

  &__subject {
    color: color(stroke);
  }

  &__name {
    color: color(dark);
  }

  &__full-name {
    margin-bottom: margin(40);
    color: color(stroke);

    @media(max-width: $breakpoint-xs) {
      margin-bottom: margin(48);
    }
  }

  &__additional {
    margin-bottom: margin(72);

    @media(max-width: $breakpoint-sm) {
      margin-bottom: margin(48);
    }
  }

  &__additional-item {
    display: flex;
  }

  &__esi {
    display: flex;
    gap: rem(16) rem(24);

    @media(max-width: $breakpoint-xs) {
      flex-direction: column;
    }
  }

  &__mark {
    width: rem(70);
  }

  &__mark-icon {
    @include wh(32, 32);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: rem(4);
    border-radius: 50%;
    background-color: color(green);
    font-size: rem(24);
    line-height: rem(32);
    font-weight: 500;
    color: white;
  }

  &__list {
    margin-top: 0;
    padding: 0;
  }

  &__list-item {
    display: flex;
    align-items: center;
    margin-bottom: margin(8);

    &:last-child {
      margin: 0;
    }

    &::before {
      content: "done";
      margin-right: margin(8);
      font-family: "Material Icons", "serif";
      color: color(green);
    }
  }

  &__leadform {
    margin-bottom: rem(122);

    @media(max-width: $breakpoint-sm) {
      margin-bottom: rem(72);
    }
  }
}
</style>

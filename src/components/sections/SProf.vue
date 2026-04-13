<template>
  <div class="prof">
    <div class="container">
      <transition
        name="fade"
        mode="out-in"
      >
        <m-prof-intro
          v-if="activeQuestion === null"
          key="intro"
          @next="nextQuestion"
        />

        <m-prof-result
          v-else-if="activeQuestion > questions.length"
          key="lastQuestion"
          @on-end="successScreen = true"
          @to-start="backToStart"
          @show-to-vuz="showToVuz"
        />

        <m-prof-question
          v-else
          :key="activeQuestion"
          :show-back="activeQuestion - 1 !== 0"
          :answer="answers[activeQuestion - 1]"
          :options="options"
          :questions="questions"
          :question="questions[activeQuestion - 1]"
          @next="nextQuestion"
          @back="previousQuestion"
        />
      </transition>
    </div>
  </div>
  <div
    v-if="isShowVuz"
  >
    <SListingChips
      :title="$listing.getMeta.h1"
      :items="$listing.getTopDirections"
      :active="$listing.getActiveDirectionCode"
    />
    <main class="s-vuz-wrapper container">
      <SVuzFilter />
      <section class="s-vuz-brief">
        <MListingCard
          v-for="(item, i) in $listing.getOrganizations"
          :key="i"
          :item="item"
          :metro="$listing.getMetro(item)"
          :tags="$listing.getTags(item)"
          :is-vuz-recommendation="true"
        />
      </section>
    </main>
    <AButton
      class="s-vuz-btn-more"
      to="/"
      label="Показать еще"
    />
    <MPagination
      :meta="$listing.getPaging"
      class="a-mb-72"
    />
  </div>
</template>

<script>
import { useListingStore } from 'src/stores/listing';

export default {
  async preFetch({ store, currentRoute }) {
    const $listing = useListingStore(store);
    await $listing.loadOrganizations(currentRoute);
    return true;
  },
};
</script>

<script setup>
import AButton from 'components/atoms/AButton.vue';
import MListingCard from 'components/molecules/MListingCard.vue';
import MPagination from 'components/molecules/MPagination.vue';
import MProfResult from 'components/molecules/MProfResult.vue';
import SListingChips from 'components/sections/SListingChips.vue';
import SVuzFilter from 'components/sections/SVuzFilter.vue';
import { useMeta } from 'quasar';
import MProfIntro from 'src/components/molecules/MProfIntro.vue';
import MProfQuestion from 'src/components/molecules/MProfQuestion.vue';
import { ref } from 'vue';

const $listing = useListingStore();
useMeta(() => $listing.getMeta);

const activeQuestion = ref(null);
const successScreen = ref(false);
const answers = ref([]);
const isShowVuz = ref(false);

function nextQuestion(selectedIndex) {
  if (activeQuestion.value !== null) {
    answers.value[activeQuestion.value - 1] = selectedIndex;
  }
  activeQuestion.value += 1;
}

function previousQuestion() {
  activeQuestion.value -= 1;
}

function backToStart() {
  activeQuestion.value = null;
  answers.value = [];
  successScreen.value = false;
  isShowVuz.value = false;
}
function showToVuz() {
  isShowVuz.value = true;
}

const options = [
  { option: 'Да, всегда', caption: '' },
  { option: 'Иногда', caption: '' },
  { option: 'Нет', caption: '' },
];

const questions = [
  {
    question: 'Мне близко выражение «Хочешь сделать что-то хорошо – сделай это сам»\t',
  },
  {
    question: 'Я люблю читать',
  },
  {
    question: 'Меня завораживает искусство, в частности живопись, скульптура, архитектура',
  },
  {
    question: 'Я всегда довожу до перфекционизма все, за что берусь',
  },
  {
    question: 'Я лучше понимаю, если мне объясняют на предметах или рисунках',
  },
  {
    question: 'Я люблю играть в компьютерные игры и/или игровую приставку',
  },
  {
    question: 'Я легко излагаю свои мысли как в устной, так и в письменной форме',
  },
  {
    question: 'У меня хорошо развито воображение',
  },
  {
    question: 'Я предпочитаю все планировать',
  },
  {
    question: 'Мне нравится все делать своими руками',
  },
  {
    question: 'Я могу слушать один и тот же трек или альбом на повторе',
  },
  {
    question: 'Многочисленные хобби говорят о разнонаправленности человека',
  },
  {
    question: 'Мне знакомо выражение «Не ошибается только тот, кто ничего не делает»',
  },
  {
    question: 'Я легко разбираюсь в природе физических явлений',
  },
  {
    question: 'Мне хотелось бы поработать на радио или телевидении',
  },
  {
    question: 'Я считаю, что главное процесс, а не результат',
  },
  {
    question: 'Лучшим подарком для меня, в любом возрасте, является набор Lego',
  },
  {
    question: 'В моем приоритете всегда были точные науки, такие как математика, физика,  химия ',
  },
  {
    question: 'Меня восхищают отдельные формулировки в тексте и как изложен материал',
  },
  {
    question: 'Знакомые духи или запахи поднимают волну воспоминаний',
  },
  {
    question: 'Я не хотел(а) бы подчинять свою жизнь определенной системе',
  },
  {
    question: 'Я всегда подпеваю или пританцовываю, когда слушаю музыку',
  },
  {
    question: 'Я понимаю красоту математических формул',
  },
  {
    question: 'Я люблю ходить в театр и на музыкальные концерты',
  },
  {
    question: 'Мне интересно было бы заниматься расшифровкой древних письменностей',
  },
  {
    question: 'У меня хороший словарный запас',
  },
  {
    question: 'Форма для меня важнее, чем содержание',
  },
  {
    question: 'Мне нравится строить разные маршруты домой, даже если это занимает больше времен',
  },
  {
    question: 'У меня хорошая зрительная память',
  },
  {
    question: 'Многие говорят, что я могу попробовать себя в стендапе',
  },
];
</script>

<style lang="scss">
.prof {
  display: flex;
  align-items: center;
  min-height: rem(462);
  padding: rem(152) 0;
  background: color(light-gray);
  @media (max-width: $breakpoint-sm) {
    padding: padding2(72, 0);
  }

  .container {
    flex-grow: 1;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
}
.s-vuz-wrapper {
  display: grid;
  grid-template-columns: rem(370) 1fr;
  grid-column-gap: rem(30);
  @media screen and (max-width: $breakpoint-md) {
    grid-template-columns: rem(302) 1fr;
    grid-column-gap: rem(20);
  }
  @media screen and (max-width: $breakpoint-sm) {
    grid-template-columns: 1fr;
  }
}
.s-vuz-btn-more {
  max-width: 302px;
  width: 100%;
  margin: 40px auto 0 auto;
  display: block;
}
</style>

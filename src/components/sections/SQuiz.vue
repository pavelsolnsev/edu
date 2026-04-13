<template>
  <div class="quiz">
    <div class="container">
      <transition
        name="fade"
        mode="out-in"
      >
        <m-quiz-success
          v-if="successScreen"
          key="success"
          @to-start="backToStart"
        />

        <m-quiz-intro
          v-else-if="activeQuestion === null"
          key="intro"
          @next="nextQuestion"
        />

        <m-quiz-send
          v-else-if="activeQuestion > questions.length"
          key="lastQuestion"
          @on-end="successScreen = true"
        />

        <m-quiz-question
          v-else
          :key="activeQuestion"
          :show-back="activeQuestion - 1 !== 0"
          :answer="answers[activeQuestion - 1]"
          :question="questions[activeQuestion - 1]"
          @next="nextQuestion"
          @back="previousQuestion"
        />
      </transition>
    </div>
  </div>
</template>

<script setup>
import MQuizIntro from 'src/components/molecules/MQuizIntro.vue';
import MQuizQuestion from 'src/components/molecules/MQuizQuestion.vue';
import MQuizSend from 'src/components/molecules/MQuizSend.vue';
import MQuizSuccess from 'src/components/molecules/MQuizSuccess';
import { ref } from 'vue';

const activeQuestion = ref(null);
const successScreen = ref(false);
const answers = ref([]);

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
}

const questions = [
  {
    question: 'К каким профессиям вы больше склонны?',
    options: [
      {
        option: 'Гуманитарным',
        caption: '',
      },
      {
        option: 'Техническим',
        caption: '',
      },
      {
        option: 'Творческим',
        caption: '',
      },
      {
        option: 'Медицинским',
        caption: '',
      },
    ],
  },
  {
    question: 'Какое у вас законченное образование?',
    options: [
      {
        option: '9 классов',
        caption: '(Учусь / Закончил)',
      },
      {
        option: '11 классов',
        caption: '(Учусь / Закончил)',
      },
      {
        option: 'Среднее профессиональное / Техническое',
        caption: '',
      },
      {
        option: 'Высшее образование',
        caption: '',
      },
      {
        option: 'Магистратура',
        caption: '',
      },
    ],
  },
  {
    question: 'Куда вы планируете поступать?',
    options: [
      {
        option: 'Колледж',
        caption: '(Техникум)',
      },
      {
        option: 'Высшее образование',
        caption: '(Университет / Институт / Академия)',
      },
      {
        option: 'Второе высшее',
        caption: '',
      },
      {
        option: 'Магистратура',
        caption: '',
      },
      {
        option: 'Аспирантура',
        caption: '',
      },
    ],
  },
  {
    question: 'Какой формат обучения вам подходит?',
    options: [
      {
        option: 'Очно',
        caption: '',
      },
      {
        option: 'Заочно',
        caption: '',
      },
      {
        option: 'Вечернее обучение',
        caption: '',
      },
      {
        option: 'Выходного дня',
        caption: '',
      },
      {
        option: 'Дистанционно',
        caption: '',
      },
    ],
  },
  {
    question: 'Какие варианты поступления вы рассматриваете?',
    options: [
      {
        option: 'Бюджет',
        caption: '',
      },
      {
        option: 'Бюджет и платно',
        caption: '',
      },
      {
        option: 'Платно',
        caption: '',
      },
      {
        option: 'Целевое обучение',
        caption: '',
      },
    ],
  },
];
</script>

<style lang="scss">
.quiz {
  display: flex;
  align-items: center;
  min-height: rem(462);
  padding: padding2(76, 0);
  background-color: color(blue-bg);

  @media (max-width: $breakpoint-sm) {
    padding: padding2(64, 0);
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
</style>

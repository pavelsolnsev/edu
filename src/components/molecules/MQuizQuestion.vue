<template>
  <div class="quiz-questions">
    <div class="quiz-questions__question font--32-40 font-mobile--24-32 font--600">
      <button
        v-if="showBack"
        class="quiz-questions__back font--16-24 font--500"
        @click="emit('back')"
      >
        <q-icon name="arrow_back_ios" />
        К предыдущему вопросу
      </button>
      <p class="quiz-questions__question-text">
        {{ question.question }}
      </p>
    </div>
    <div class="quiz-questions__options">
      <button
        v-for="(option, i) in question.options"
        :key="option"
        :class="['quiz-questions__option', { _selected: answer === i }]"
        @click="nextQuestion(i)"
      >
        <span class="quiz-questions__radio" />
        <div class="quiz-questions__option-container">
          <p class="quiz-questions__option-text font--16-24 font--500">
            {{ option.option }}
          </p>
          <p
            v-if="option.caption"
            class="quiz-questions__caption font--11-16 font--500"
          >
            {{ option.caption }}
          </p>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { toRefs } from 'vue';

const props = defineProps({
  question: {
    type: Object,
    default() {
      return {};
    },
  },
  answer: {
    type: Number || null,
    default: null,
  },
  showBack: {
    type: Boolean,
    default: true,
  },
});

const { question } = toRefs(props);

const emit = defineEmits(['next', 'back']);

function nextQuestion(optionSelectedIndex) {
  emit('next', optionSelectedIndex);
}
</script>

<style lang="scss">
.quiz-questions {
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: $breakpoint-sm) {
    flex-direction: column;
  }

  &__back {
    margin-bottom: margin(32);
    padding: 0;
    color: color(gray);
    border: none;
    background-color: transparent;
    cursor: pointer;
  }

  &__options {
    display: flex;
    width: rem(570);
    flex-wrap: wrap;
    gap: rem(24) rem(32);
    align-items: stretch;
    flex-shrink: 0;

    @media (max-width: $breakpoint-sm) {
      width: 100%;
    }

    @media (max-width: 780px) {
      gap: rem(24) rem(20);
    }

    @media (max-width: $breakpoint-xs) {
      gap: rem(16);
    }
  }

  &__option {
    display: flex;
    align-items: center;
    width: calc(50% - 1rem);
    padding: padding4(32, 4, 32, 16);
    border-radius: bradius(8);
    background-color: white;
    cursor: pointer;
    border: none;

    &:last-child {
      flex-grow: 1;
    }

    &:hover .quiz-questions__radio:after,
    &._selected .quiz-questions__radio:after {
      transform: translate(-50%, -50%) scale(1);
    }

    @media (max-width: 780px) {
      width: calc(50% - 0.625rem);
    }

    @media (max-width: $breakpoint-xs) {
      width: 100%;
    }
  }

  &__option-text {
    margin-bottom: 0;
    text-align: left;
    color: color(dark);
  }

  &__caption {
    margin-bottom: 0;
    color: color(stroke);
    text-align: left;
  }

  &__questions {
    display: flex;
    justify-content: space-between;
  }

  &__question {
    width: rem(470);
    padding-right: rem(12);
    color: color(dark);
    text-align: left;

    @media (max-width: $breakpoint-sm) {
      width: 100%;
      margin-bottom: margin(32);
      padding-right: 0;
    }
  }

  &__radio {
    position: relative;
    width: rem(18);
    height: rem(18);
    margin-right: margin(8);
    flex-shrink: 0;
    border: rem(3) solid color(primary);
    border-radius: 50%;

    &:after {
      content: '';
      position: absolute;
      width: rem(8);
      height: rem(8);
      top: 50%;
      left: 50%;
      border-radius: 50%;
      background-color: color(primary);
      transform: translate(-50%, -50%) scale(0);
      transition: all 0.2s ease;
    }
  }
}
</style>

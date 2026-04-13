<template>
  <div class="prof-questions">
    <div class="prof-questions__question font--32-40 font-mobile--24-32 font--600">
      <div class="prof-questions__question-score font--16-24 font--500 a-mb-24">
        {{ questionIndex + 1 }} / {{ questions.length }}
      </div>
      <p class="prof-questions__question-text">
        {{ question.question }}
      </p>
      <button
        v-if="showBack"
        class="prof-questions__back font--16-24 font--500"
        @click="emit('back')"
      >
        <q-icon name="arrow_back_ios" />
        К предыдущему вопросу
      </button>
    </div>
    <div class="prof-questions__options">
      <button
        v-for="(option, i) in options"
        :key="option.option"
        :class="['prof-questions__option', { _selected: answer === i }]"
        @click="nextQuestion(i)"
      >
        <span class="prof-questions__radio" />
        <div class="prof-questions__option-container">
          <p class="prof-questions__option-text font--16-24 font--500">
            {{ option.option }}
          </p>
          <p
            v-if="option.caption"
            class="prof-questions__caption font--11-16 font--500"
          >
            {{ option.caption }}
          </p>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, toRefs } from 'vue';

const props = defineProps({
  questions: {
    type: Array,
    default() {
      return [];
    },
  },
  options: {
    type: Array,
    default() {
      return [];
    },
  },
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

const { question, questions } = toRefs(props);
const emit = defineEmits(['next', 'back']);

const questionIndex = computed(() => questions.value.findIndex((item) => item.question
  === question.value.question));
function nextQuestion(optionSelectedIndex) {
  emit('next', optionSelectedIndex);
}
</script>

<style lang="scss">
.prof-questions {
  display: grid;
  justify-content: space-between;
  grid-template-columns: 1fr rem(670);
  grid-column-gap: rem(30);
  align-items: center;
  @media (max-width: $breakpoint-md) {
    grid-template-columns: 1fr rem(463);
  }
  @media (max-width: $breakpoint-sm) {
    grid-template-columns: 1fr;
  }

  &__back {
    padding: 0;
    color: color(gray);
    border: none;
    background-color: transparent;
    cursor: pointer;
  }

  &__options {
    display: flex;
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
    //padding: 32px 4px 32px 16px;
    border-radius: bradius(8);
    background-color: white;
    cursor: pointer;
    border: none;

    &:last-child {
      flex-grow: 1;
    }

    &:hover .prof-questions__radio:after,
    &._selected .prof-questions__radio:after {
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
    color: color(dark);
    text-align: left;

    @media (max-width: $breakpoint-sm) {
      margin-bottom: margin(56);
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

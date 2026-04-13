<template>
  <div class="m-extendable-table">
    <table class="m-extendable-table__table">
      <thead>
        <tr>
          <th
            v-for="heading in headings"
            :key="heading"
            :class="[thClass]"
          >
            {{ heading }}
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-if="items">
          <tr
            v-for="(item, index) in itemsByLimit"
            :key="index"
            title=""
          >
            <td
              v-for="(value, i) in item"
              :key="i"
              :class="[value?.class, tdClass]"
            >
              <span :class="[{'m-extendable-table--has-link': value?.notAccreditation}]">
                {{ value?.data ?? value }}

                <span
                  v-if="value?.notAccreditation"
                  class="m-extendable-table__info text-orange text-medium-xs"
                >
                  не аккредитовано
                  <router-link
                    class="m-extendable-table__info-link"
                    to="/faq-f/8#no-accr"
                  >
                    <q-icon
                      name="help_outline"
                      color="ornage"
                      size="1rem"
                      title="к справке об аккредитации"
                    />
                  </router-link>
                </span>
              </span>
            </td>
          </tr>
        </template>
        <template v-if="addItems && showAddRows">
          <tr
            v-for="(item, index) in addItems"
            :key="index"
            class="m-extendable-table__add-row"
          >
            <td
              v-for="(value, i) in item"
              :key="i"
              :class="[ value?.class, tdClass ]"
            >
              {{ value?.data ?? value }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <q-btn
      v-if="showExpandBtn"
      class="m-extendable-table__btn text-semibold-m"
      @click="expandTable"
    >
      {{ buttonText }}
    </q-btn>
    <q-btn
      v-if="addItems && !showExpandBtn && !showAddRows"
      class="m-extendable-table__btn text-semibold-m"
      @click="showAddRows = true"
    >
      {{ addButtonText }}
    </q-btn>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  headings: {
    type: Array,
    required: true,
  },
  items: {
    type: [Array, null],
    default: null,
  },
  addItems: {
    type: [Array, null],
    default: null,
  },
  limit: {
    type: Number,
    default: 10,
  },
  thClass: {
    type: String,
    default: 'text-medium-l',
  },
  tdClass: {
    type: String,
    default: 'text-regular-m',
  },
  buttonText: {
    type: String,
    default: 'Показать еще ...',
  },
  addButtonText: {
    type: String,
    default: 'Показать еще ...',
  },
});

const showLimit = ref(props.limit);
const itemsByLimit = computed(() => props.items.slice(0, showLimit.value));
const showExpandBtn = computed(() => showLimit.value < props.items.length);
const showAddRows = ref(false);

function expandTable() {
  showLimit.value = props.items.length;
}
</script>

<style lang="scss">
.m-extendable-table {
  &__table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
  }

  tr {
    border-bottom: 1px solid color(stroke);

    &:last-child {
      border-bottom: none;
    }
  }

  th {
    padding-bottom: padding(16);
    padding-right: rem(30);
  }

  &__add-row {
    text-decoration: line-through;
  }

  &__btn {
    margin-top: margin(40);
    padding: padding2(16, 24);
    border: 1px solid color(blue-button);
    text-transform: unset;
    color: color(blue-button);
    white-space: nowrap;

    &:before {
      box-shadow: none !important;
    }

    @media(max-width: $breakpoint-xs) {
      width: 100%;
    }
  }

  &--has-link {
    position: relative;
    display: block;
    padding-top: padding(20);
  }

  &__info {
    position: absolute;
    top: 0;
    left: 0;
  }

  &__info-link, &__info-link:visited {
    color: color(orange);
  }

  &.m-extendable-table--specialties {
    td {
      padding: rem(16) rem(30) rem(16) 0;

      &:nth-child(1) {
        min-width: rem(158);
      }

      &:nth-child(2) {
        min-width: rem(400);
      }

      &:nth-child(3) {
        min-width: rem(220);
      }
    }
  }

  &.m-extendable-table--monitoring {
    td,
    th {
      min-width: rem(50);
      padding: rem(16) rem(20);
      text-align: center;
      color: color(dark);

      &:first-child {
        min-width: rem(330);
        padding-left: 0;
        padding-right: rem(40);
        text-align: left;
      }
    }

    td:first-child {
      color: color(gray);
    }

    td:not(:first-child) {
      font-weight: 500;
      white-space: nowrap;
    }

    td.arrow-up:after,
    td.arrow-down:after {
      content: "";
      display: inline-block;
      vertical-align: middle;
      width: 0;
      height: 0;
      border-style: solid;
    }

    td.arrow-up:after {
      border-width: 0 rem(4) rem(4) rem(4);
      border-color: transparent transparent color(green) transparent;
    }

    td.arrow-down:after {
      border-width: rem(4) rem(4) 0 rem(4);
      border-color: color(red) transparent transparent transparent;
    }
  }

  &.m-extendable-table--faculty-key-values {
    th {
      padding-bottom: padding(24);
      padding-right: rem(20);
      white-space: nowrap;
      text-align: center;

      &:last-child {
        padding-right: 0;
      }
    }

    td {
      padding: padding2(16, 0);
      text-align: center;
    }
  }
}
</style>

<template>
  <div class="s-vuz-search row">
    <q-select
      :model-value="model"
      :options="options"
      :value="model"
      :loading="loading"
      filled
      use-input
      fill-input
      hide-selected
      hide-dropdown-icon
      input-debounce="300"
      bg-color="blue-gray"
      color="stroke"
      placeholder="Введите название вуза"
      input-class="text-medium-m"
      class="s-vuz-search__search"
      popup-content-class="s-vuz-search__search-popup"
      @filter="filterFn"
      @input-value="setModel"
      @update:model-value="setVuzId"
    >
      <template #option="scope">
        <q-item
          :class="[
            scope.opt.group
              ? 's-vuz-search__item-group text-semibold-l'
              : 's-vuz-search__item text-medium-s text-gray',
          ]"
          v-bind="scope.itemProps"
        >
          <q-item-section v-if="scope.opt.group">
            {{ scope.opt.group }}
          </q-item-section>
          <q-item-section v-else>
            {{ scope.opt.name }}
            <template v-if="scope.opt.short_name">
              ({{ scope.opt.short_name }})
            </template>
          </q-item-section>
        </q-item>
      </template>
    </q-select>
    <AButton
      label="Проверить"
      icon="search"
      class="s-vuz-search__btn"
      no-wrap
      :disabled="!vuzId"
      @click="getVuz"
    />
  </div>
</template>

<script setup>
import AButton from 'components/atoms/AButton';
import { getOrganizationEsiRating, getOrganizationsByName } from 'src/api/organizations';
import { ref } from 'vue';

const emit = defineEmits(['get-vuz']);
const model = ref(null);
const options = ref([]);
const vuzId = ref('');
const loading = ref(false);

function createGroupedOptions(opt) {
  let vuz = [{
    group: 'ВУЗ',
    disable: true,
  }];
  let branch = [{
    group: 'Филиал',
    disable: true,
  }];

  opt.forEach((item) => (item.rel?.parentOrganization ? branch.push(item) : vuz.push(item)));
  if (vuz.length === 1) vuz = [];
  if (branch.length === 1) branch = [];

  return [...vuz, ...branch];
}

function filterFn(val, update, abort) {
  if (val.length < 2) {
    abort();
    return;
  }

  update(async () => {
    loading.value = true;
    const orgs = await getOrganizationsByName(val);
    options.value = createGroupedOptions(orgs.data);
    loading.value = false;
  });
  vuzId.value = null;
}

function setModel(val) {
  model.value = val?.name || val;
}

function setVuzId(val) {
  vuzId.value = val.id;
}

async function getVuz() {
  const vuz = await getOrganizationEsiRating(vuzId.value);
  emit('get-vuz', vuz);
}
</script>

<style lang="scss">
.s-vuz-search {
  margin-bottom: margin(72);

  @media(max-width: $breakpoint-sm) {
    margin-bottom: margin(48);
    flex-direction: column;
    gap: rem(24);
  }

  &__btn {
    width: rem(179);
    margin-left: margin(24);
    flex: 0 0 auto;

    @media(max-width: $breakpoint-sm) {
      width: 100%;
      margin-left: 0;
    }
  }

  &__search {
    flex: 1 0 auto;

    input::placeholder {
      color: color(stroke);
    }

    @media(max-width: $breakpoint-md) {
      flex: 0 0 auto;
      width: rem(421);
    }

    @media(max-width: $breakpoint-sm) {
      flex: 1 0 auto;
      width: auto;
    }
  }

  &__search-popup {
    padding: padding2(24, 0);
    border-radius: 0 0 rem(8) rem(8);
    background-color: color(blue-gray);
    box-shadow: none;

    &.q-menu {
      width: min-content;
    }
  }

  &__item-group {
    padding: padding2(16, 16);

    &:first-of-type {
      padding-top: 0;
    }
  }

  &__item {
    padding: padding2(8, 16);
    cursor: pointer;
  }

  &__item-group {
    opacity: 1 !important;
  }

  .q-field__control {
    border-radius: bradius(8);
  }

  .q-field--focused {
    .q-field__control {
      border-radius: rem(8) rem(8) 0 0;

      &:before {
        background-color: transparent;
      }
    }
  }

  .q-btn__content {
    font-weight: 600;

    .q-icon {
      @include wh(16, 16);
    }
  }
}
</style>

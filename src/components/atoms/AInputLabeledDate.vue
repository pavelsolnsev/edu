<template>
  <AInputLabeled
    v-bind="$attrs"
  >
    <template #append>
      <q-icon
        name="event"
        color="gray"
        class="cursor-pointer"
      >
        <q-popup-proxy
          cover
          transition-show="scale"
          transition-hide="scale"
        >
          <q-date
            v-bind="$attrs"
            mask="DD.MM.YYYY"
          >
            <div class="row items-center justify-end">
              <q-btn
                v-close-popup
                label="Закрыть"
                color="primary"
                flat
              />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </AInputLabeled>
</template>

<script setup>
import AInputLabeled from 'src/components/atoms/AInputLabeled';
</script>

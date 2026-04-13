<template>
  <div class="s-map">
    <div id="map" />
  </div>
</template>

<script setup>
import { rel } from 'src/lib/api';
import { makeOrgItemUrl } from 'src/lib/functions';
import { computed, onMounted } from 'vue';

const props = defineProps({
  items: {
    type: Object,
    default: () => ({}),
  },
});

const mm = computed(() => (props.items?.data ? props.items.data.reduce((acc, item) => {
  if (item.longitude_latitude) {
    acc.push([
      item.short_name,
      item.name,
      item.longitude_latitude.split(','),
      rel(item, props.items, 'contacts')?.address ?? '',
      makeOrgItemUrl(item),
      item.calculation_data.budget_places > 0 && item.calculation_data.commercial_places > 0,
    ]);
  }
  return acc;
}, []) : []));

let yMap = {};

const mapApiKey = process.env.YANDEX_MAP_API_KEY || '';

const settings = {
  zoom: 12,
  center: [55.76, 37.64],
};

function createMarkers() {
  const { ymaps } = window;
  const vuzGeoObjects = [];

  mm.value.forEach((item) => {
    const [
      shortName, fullName, coords, address, link, enabled,
    ] = item;
    const myPlacemark = new ymaps.Placemark(coords, {
      iconContent: shortName,
      clusterCaption: shortName,
      balloonContent: `
        <p class="s-map__vuz-title text-s text-bold">${fullName}</p>
        <p class="s-map__vuz-address text-s">${address}</p>
        <a class="s-map__vuz-link" href="${link}" target="_blank">Перейти на страницу вуза</a>
      `,
    }, {
      preset: enabled ? 'islands#blueStretchyIcon' : 'islands#redStretchyIcon',
    });
    vuzGeoObjects.push(myPlacemark);
  });

  const clusterer = new ymaps.Clusterer({
    preset: 'islands#invertedBlueClusterIcons',
    clusterDisableClickZoom: true,
    clusterBalloonContentLayout: 'cluster#balloonAccordion',
  });
  clusterer.add(vuzGeoObjects);
  yMap.geoObjects.add(clusterer);
}

function initMap() {
  if (!window.ymaps) return;
  const { ymaps } = window;

  yMap = new ymaps.Map('map', {
    center: props.items.data[0].longitude_latitude
      ? props.items.data[0].longitude_latitude.split(',') : settings.center,
    zoom: settings.zoom,
    controls: ['zoomControl'],
  });
  createMarkers();
  yMap.events.add('click', () => yMap.balloon.close());
  const bounds = yMap.geoObjects.getBounds();
  yMap.setBounds(bounds);
}

function addScript() {
  return new Promise((res, rej) => {
    if (window.ymaps) {
      res();
      return;
    }

    const yandexMapScript = document.createElement('SCRIPT');
    if (yandexMapScript) {
      yandexMapScript.setAttribute('src', `https://api-maps.yandex.ru/2.1/?apikey=${mapApiKey}&lang=ru_RU`);
      document.head.appendChild(yandexMapScript);
      yandexMapScript.onload = () => {
        window.ymaps.ready(() => res());
      };
      yandexMapScript.onerror = rej;
    }
  });
}

onMounted(async () => {
  if (!mapApiKey || !props.items?.data?.length) return;
  try {
    await addScript();
    initMap();
  } catch {
    /* демо: карта опциональна без ключа и без данных */
  }
});
</script>

<style lang="scss">
#map {
  width: 100%;
  height: rem(576);

  & > ymaps {
    border-radius: rem(32);
    overflow: hidden;

    @media(max-width: $breakpoint-sm) {
      border-radius: rem(16);
    }
  }

  @media(max-width: $breakpoint-sm) {
    height: rem(466);
  }

  @media(max-width: $breakpoint-sm) {
    height: rem(256);
  }

  @media(max-width: $breakpoint-xs) {
    height: rem(500);
  }
}

.s-map {
  margin-bottom: margin(24);

  @media(max-width: $breakpoint-xs) {
    margin-bottom: margin(16);
  }

  &__vuz-title {
    margin-bottom: rem(5);
  }

  &__vuz-address {
    margin-bottom: rem(5);
  }

  &__vuz-link {
    text-decoration: none;
  }
}
</style>

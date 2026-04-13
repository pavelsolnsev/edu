<template>
  <section class="s-handbook">
    <h1 class="s-handbook__title container">
      Справочник абитуриента
    </h1>
    <MTabs
      v-model="tab"
      :tabs="tabs"
      class="s-handbook__tabs"
      text-class="text-medium-l"
      @update:model-value="resetTopics"
    />
    <div class="s-handbook__main">
      <q-tab-panels
        v-model="tab"
        animated
      >
        <q-tab-panel
          v-for="(educationType, key) in handbookData"
          :key="key"
          :name="key"
        >
          <MTabs
            v-if="subtopics.length"
            v-model="activeSubtopic"
            :tabs="subtopics"
            class="s-handbook__subtopics m-tabs--pills"
            text-class="text-medium-s"
            @update:model-value="toggleFirstTopic"
          />
          <div class="s-handbook__content container">
            <div
              v-if="topics.length"
              class="s-handbook__topics text-medium-m"
            >
              <h4 class="s-handbook__active-subtopic">
                {{ activeSubtopic }}
              </h4>
              <p
                v-for="topic in topics"
                :key="topic"
                :class="['s-handbook__topic', {
                  's-handbook__topic--active': activeTopic.topic === topic.topic
                }]"
                @click="toggleTopic(topic)"
              >
                {{ topic.topic }}
              </p>
            </div>
            <div class="s-handbook__article">
              <!-- eslint-disable vue/no-v-html -->
              <p
                v-if="activeTopic"
                class="text=regular-l"
                v-html="activeTopic.html"
              />
              <p
                v-if="!activeSubtopic && !activeTopic"
                class="text=regular-l"
                v-html="handbookData[tab].defaultText"
              />
              <!--eslint-enable-->
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </section>
</template>

<script setup>
import handbookData from 'src/api/handbook';
import MTabs from 'src/components/molecules/MTabs';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const $router = useRouter();
const $route = useRoute();

const tab = ref('');
const activeSubtopic = ref('');
const activeTopic = ref('');

onMounted(() => {
  const {
    tabKey,
    topicId,
  } = $route.params;
  tab.value = tabKey;
  if (topicId && handbookData[tabKey].topics[topicId]) {
    activeSubtopic.value = handbookData[tabKey].topics[topicId].subtopic;
    activeTopic.value = handbookData[tabKey].topics[topicId];
  }
});

const tabs = computed(() => Object.keys(handbookData)
  .map((item) => ({
    name: item,
    label: handbookData[item].title,
  })));

const subtopics = computed(() => {
  const parentTopics = Object.values(handbookData[tab.value].topics)
    .map((topic) => topic.subtopic);

  return [...new Set(parentTopics)].map((subtopic) => ({
    name: subtopic,
    label: subtopic,
  }));
});

const topics = computed(() => Object.keys(handbookData[tab.value].topics)
  .filter((topicId) => handbookData[tab.value].topics[topicId].subtopic === activeSubtopic.value)
  .map((topicId) => ({ id: topicId, ...handbookData[tab.value].topics[topicId] })));

function updateRoute(topicId) {
  const params = {
    tabKey: tab.value,
  };
  if (topicId) params.topicId = topicId;
  $router.push({
    name: 'faq',
    params,
  });
}

function resetTopics() {
  activeSubtopic.value = '';
  activeTopic.value = '';
  updateRoute();
}

function toggleTopic(topic) {
  activeTopic.value = topic;
  updateRoute(activeTopic.value.id);
}

function toggleFirstTopic() {
  toggleTopic(topics.value[0]);
}
</script>

<style lang="scss">
.s-handbook {
  margin-bottom: rem(75);

  &__title {
    margin-bottom: margin(40);

    @media(max-width: $breakpoint-md) {
      margin-bottom: margin(32);
    }
  }

  &__tabs {
    margin-bottom: margin(32);
  }

  &__active-subtopic {
    margin-bottom: margin(16);
  }

  &__subtopics {
    margin-bottom: margin(40);

    @media(max-width: $breakpoint-md) {
      margin-bottom: margin(32);
    }
  }

  &__content {
    display: flex;

    @media(max-width: $breakpoint-sm) {
      flex-direction: column;
    }
  }

  &__topics {
    width: rem(270);
    margin-right: rem(30);
    flex-shrink: 0;
  }

  &__topic {
    margin-bottom: margin(8);
    cursor: pointer;

    &:last-child {
      margin-bottom: margin(16);
    }
  }

  &__topic--active {
    color: color(purple);
  }

  &__article {
    width: 100%;
    padding: padding(16);
    background-color: color(blue-gray);
    border-radius: bradius(8);

    h4 {
      margin-bottom: margin(16);
    }

    h5 {
      margin-bottom: margin(8);
    }
  }

  ul {
    padding: 0;
  }

  li {
    display: flex;
    list-style: none;
    margin-bottom: margin(8);

    &:last-child {
      margin-bottom: 0;
    }

    &::before {
      content: "done";
      margin-right: margin(8);
      font-family: "Material Icons", "serif";
      color: color(green);
      font-size: rem(18);
    }
  }

  .q-tab-panel {
    padding: 0;
  }
}
</style>

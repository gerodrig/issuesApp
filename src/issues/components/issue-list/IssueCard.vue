<script setup lang="ts">
import { computed, toRef } from 'vue';
import VueMarkdown from 'vue-markdown-render';

import { Issue, State } from 'src/issues/interfaces/issue';
import { timeSince } from 'src/helpers/time-since';
import useIssue from 'src/issues/composables/useIssue';

interface Props {
  issue?: Issue;
}

const props = defineProps<Props>();
const issue = toRef(props, 'issue');
const time = computed<string>(() => timeSince(issue.value?.created_at || ''));

// prefetchIssue is a function that will prefetch the issue data
//setIssueCacheData is a function that will set the issue data in the cache manually
const { setIssueCacheData } = useIssue(issue.value?.number || 0, {
  autoLoad: false,
});

const onMouseEnter = () => {
  if (issue.value?.number) setIssueCacheData(issue?.value);
};
</script>

<template>
  <q-card
    @mouseenter="onMouseEnter()"
    class="text-black col-12 q-mb-md"
    flat
    bordered
  >
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img
            :src="issue?.user.avatar_url"
            :alt="issue?.user.avatar_url || 'User Avatar'"
          />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>
          <router-link :to="`/issue/${issue?.number}`">{{
            issue?.title
          }}</router-link>
        </q-item-label>
        <q-item-label caption> {{ time }} ago </q-item-label>
      </q-item-section>

      <q-item-section>
        <q-item-label class="row items-center justify-end">
          <q-item-label class="q-mr-md">
            <q-icon name="question_answer" />
            {{ issue?.comments }}
          </q-item-label>
          <q-chip
            v-if="issue?.state === State.Closed"
            color="positive"
            text-color="white"
            icon="check"
          >
            Closed
          </q-chip>
          <q-chip v-else color="negative" text-color="white" icon="bug_report">
            Open
          </q-chip>
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <q-item-section class="q-pa-md markdown-css">
      <vue-markdown :source="issue?.body || ''" />
    </q-item-section>

    <q-separator />

    <q-item-section class="q-pa-xs q-gutter-xs">
      <div v-if="issue?.labels" class="bg-dark shadow-5 q-pa-xs q">
        <q-chip
          v-for="label of issue.labels"
          :key="label.id"
          :style="{
            color: `#${label.color}`,
          }"
          outline
          >{{ label.name }}</q-chip
        >
      </div>
    </q-item-section>
  </q-card>
</template>

<style>
.markdown-css img {
  max-width: 250px !important;
  height: auto;
}
</style>

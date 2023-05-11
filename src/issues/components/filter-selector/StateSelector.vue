<script setup lang="ts">
import { ref } from 'vue';
import { useIssuesStore } from 'src/stores/issues';

const options = ref([
  { label: 'All', value: 'all' },
  { label: 'Open', value: 'open' },
  { label: 'Closed', value: 'closed' },
]);

const issuesStore = useIssuesStore();
</script>

<template>
  <q-btn-toggle
    v-model="issuesStore.state"
    toggle-color="primary"
    push
    spread
    :options="options"
  />
</template>

<style lang="scss" scoped></style>

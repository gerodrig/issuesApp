<script setup lang="ts">
import { ref } from 'vue';

import useIssues from 'src/issues/composables/useIssues';
import useLabels from 'src/issues/composables/useLabels';

import FloatingButtons, {
  FabButton,
} from 'src/issues/components/FloatingButtons.vue';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import FilterSelector from 'src/issues/components/filter-selector/FilterSelector.vue';
import IssueList from 'src/issues/components/issue-list/IssueList.vue';
import NewIssueDialog from 'src/issues/components/NewIssueDialog.vue';

const { issues, isLoading } = useIssues();
const { labels } = useLabels();

const isOpen = ref<boolean>(false);

const openDialog = () => {
  isOpen.value = true;
};

const buttons = [
  {
    icon: 'add',
    color: 'primary',
    size: 'lg',
    action: openDialog,
  },
] as FabButton[];
</script>

<template>
  <div class="row q-mb-md">
    <div class="col-12">
      <span class="text-h2">Github Issues</span>
    </div>
  </div>

  <div class="row">
    <div class="col-xs-12 col-md-4">
      <!--TODO: Filters -->

      <!-- FilterSelector -->
      <FilterSelector />
    </div>
    <div class="col-xs-12 col-md-8">
      <LoaderSpinner v-if="isLoading" color="yellow" />

      <!-- TODO: IssuesList (IssueCard) Array -->
      <IssueList v-else :issues="issues" />
    </div>
  </div>

  <!-- floating buttons -->
  <FloatingButtons :buttons="buttons" />

  <!-- New Issue Dialog -->
  <NewIssueDialog
    v-if="labels"
    :is-open="isOpen"
    :labels="labels?.map((label) => label.name) || []"
    @on-close="isOpen = false"
  />
</template>

<style scoped></style>

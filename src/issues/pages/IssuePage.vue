<script setup lang="ts">
import { useRoute } from 'vue-router';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import IssueCard from 'src/issues/components/issue-list/IssueCard.vue';
import useIssue from '../composables/useIssue';

const { id = '' } = useRoute().params;

const {
  issue,
  isLoadingIssue,
  hasErrorIssue,
  comments,
  hasErrorComments,
  isLoadingComments,
} = useIssue(+id);
</script>

<template>
  <div>
    <p v-if="hasErrorIssue" class="error">Something went wrong</p>
    <router-link class="text-white" to="/">Go Back</router-link>

    <!-- Header -->
    <LoaderSpinner
      v-if="isLoadingIssue"
      color="red"
      :thickness="1"
      size="1rem"
      :show-text="false"
    />
    <IssueCard v-else-if="issue" :issue="issue" />

    <!-- Comments -->
    <LoaderSpinner
      v-if="isLoadingComments"
      color="white"
      :thickness="1"
      size="1rem"
      :show-text="false"
    />

    <p v-else-if="hasErrorComments" class="error">Something went wrong</p>
    <div v-else class="column">
      <span class="text-h3 q-mb-md">Comments ({{ comments?.length }})</span>
      <IssueCard
        v-for="comment of comments"
        :key="comment.id"
        :issue="comment"
      />
    </div>
  </div>
</template>

<style scoped>
.error {
  color: red;
}
</style>

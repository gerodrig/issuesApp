<script setup lang="ts">
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import useLabels from 'src/issues/composables/useLabels';

const { labels, isLoading, toggleLabel, selectedLabels } = useLabels();
</script>

<template>
  <div class="q-mt-md">
    <LoaderSpinner
      v-if="isLoading"
      class="q-mt-sm q-mb-md"
      size="50px"
      :thickness="1"
      :show-text="false"
    />

    <q-chip
      v-else
      v-for="label of labels"
      :key="label.id"
      :style="{
        color: `#${label.color}`,
      }"
      :outline="!selectedLabels.includes(label.name)"
      clickable
      @click="toggleLabel(label.name)"
      >{{ label.name }}</q-chip
    >
  </div>
</template>

<style lang="scss" scoped></style>

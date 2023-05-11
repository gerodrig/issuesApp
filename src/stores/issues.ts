import { ref } from 'vue';
import { defineStore } from 'pinia';
import { State } from 'src/issues/interfaces/issue';

export const useIssuesStore = defineStore('issues', () => {
  const state = ref<State>(State.All);
  const labels = ref<string[]>([]);

  return {
    // state
    state,
    labels,

    // Getters

    // Actions
    toggleLabel(label: string) {
      if (labels.value.includes(label)) {
        labels.value = labels.value.filter((l) => l !== label);
        return;
      }

      labels.value.push(label);
    },
  };
});

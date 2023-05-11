import { storeToRefs } from 'pinia';
import { useIssuesStore } from 'src/stores/issues';

export default function useStore() {
  const issuesStore = useIssuesStore();
  const { labels, state } = storeToRefs(issuesStore);

  return {
    // Reactive Properties
    labels,
    state,

    //Getters (computed)

    //Actions Methods
  };
}

import { useQuery } from '@tanstack/vue-query';
import { storeToRefs } from 'pinia';
import { githubApi } from 'src/api/githubApi';

import { Label } from 'src/issues/interfaces/label';
import { useIssuesStore } from 'src/stores/issues';

const getLabels = async (): Promise<Label[]> => {
  const { data } = await githubApi.get<Label[]>('/labels?per_page=100');

  return data;
};

export default function useLabels() {
  const issuesStore = useIssuesStore();
  const { labels: selectedLabels } = storeToRefs(issuesStore);
  const { toggleLabel } = issuesStore;

  const { data: labels, isLoading } = useQuery(['labels'], getLabels, {
    //staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  return {
    labels,
    isLoading,

    //Getters,
    selectedLabels,

    //Methods
    toggleLabel,
  };
}

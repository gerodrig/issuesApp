import { useQuery } from '@tanstack/vue-query';
import { Issue, State } from 'src/issues/interfaces/issue';
import { githubApi } from 'src/api/githubApi';
import useStore from './useStore';

const getIssues = async (labels: string[], state: State): Promise<Issue[]> => {
  const params = new URLSearchParams();

  if (state) params.append('state', state);
  if (labels.length > 0) params.append('labels', labels.join(','));
  params.append('per_page', '10');

  const { data } = await githubApi.get<Issue[]>('/issues', {
    params,
  });
  return data;
};

export default function useIssues() {
  const { labels, state } = useStore();

  const { data: issues, isLoading } = useQuery(
    ['issues', { labels, state }],
    () => getIssues(labels.value, state.value)
  );

  return {
    // Return your composable data and methods here
    issues,
    isLoading,
  };
}

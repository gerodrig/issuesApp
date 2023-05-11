import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { githubApi } from 'src/api/githubApi';
import { Issue } from 'src/issues/interfaces/issue';

interface Args {
  title: string;
  labels?: string[];
  body?: string;
}

const addIssue = async ({
  title,
  body = '',
  labels = [],
}: Args): Promise<Issue> => {
  const mewIssueData = {
    title,
    body,
    labels,
  };

  const { data } = await githubApi.post<Issue>('/issues', mewIssueData);

  return data;
};

export default function useIssueMutation() {
  const queryClient = useQueryClient();

  const issueMutation = useMutation(addIssue, {
    onSuccess: (issue) => {
      //purge all issues
      queryClient.invalidateQueries({
        queryKey: ['issues'],
        exact: false,
      });

      //reload all issues
      queryClient.refetchQueries(['issues'], { exact: false });

      //set new issue in cache
      queryClient.setQueryData(['issue', issue.number], issue);
    },
    onSettled: () => {
      console.log('Settled');
    },
  });

  return {
    // Return your composable data and methods here
    issueMutation,
  };
}

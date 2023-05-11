import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { githubApi } from 'src/api/githubApi';
import { Issue } from 'src/issues/interfaces/issue';

const getIssue = async (issueNumber: number): Promise<Issue> => {
  const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`);

  return data;
};

const getIssuecomments = async (issueNumber: number): Promise<Issue[]> => {
  const { data } = await githubApi.get<Issue[]>(
    `/issues/${issueNumber}/comments`
  );

  return data || [];
};

interface Options {
  //Autoload issue and comments
  autoLoad?: boolean;
}

export default function useIssue(issueNumber: number, options?: Options) {
  const { autoLoad = true } = options || {};

  const queryClient = useQueryClient();

  const {
    data: issue,
    isLoading: isLoadingIssue,
    isError: hasErrorIssue,
  } = useQuery<Issue>(['issue', issueNumber], () => getIssue(issueNumber), {
    staleTime: 1000 * 60, // 1 minute
    enabled: autoLoad,
  });

  const {
    data: comments,
    isLoading: isLoadingComments,
    isError: hasErrorComments,
  } = useQuery<Issue[]>(
    ['issue', issueNumber, 'comments'],
    () => getIssuecomments(issueNumber),
    {
      staleTime: 1000 * 60, // 1 minute
      enabled: autoLoad,
    }
  );

  const prefetchIssue = (issueNumber: number) => {
    //load issue
    queryClient.prefetchQuery(
      ['issue', issueNumber],
      () => getIssue(issueNumber),
      {
        staleTime: 1000 * 60, // 1 minute
      }
    );

    //load comments
    queryClient.prefetchQuery(
      ['issue', issueNumber, 'comments'],
      () => getIssuecomments(issueNumber),
      {
        staleTime: 1000 * 60, // 1 minute
      }
    );
  };

  const setIssueCacheData = (issue: Issue) => {
    queryClient.setQueryData(['issue', issue.number], issue);
  };

  return {
    issue,
    isLoadingIssue,
    hasErrorIssue,
    comments,
    isLoadingComments,
    hasErrorComments,
    prefetchIssue,
    setIssueCacheData,
  };
}

import { useQuery } from '@tanstack/react-query';
import { Issue } from '../issues/interfaces';
import { githubApi } from '../api/githubApi';
import { sleep } from '../helpers/sleep';

export const getIssueInfo = async (issueNumber: number): Promise<Issue> => {
    // await sleep(2000)
    const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`)
    return data

}

export const getIssueComments = async (issueNumber: number): Promise<Issue[]> => {
    // await sleep(2000)
    const { data } = await githubApi.get<Issue[]>(`/issues/${issueNumber}/comments`)
    return data
}

export const useIssue = (issueNumber: number) => {

    const issueQuery = useQuery(['issue', issueNumber],
        () => getIssueInfo(issueNumber),
    )

    const issueCommentsQuery = useQuery(['issue', issueNumber, 'comments'],
        () => getIssueComments(issueNumber),
        {
            enabled: !!issueQuery.data,
            staleTime: 0,
            cacheTime: 0
        }
    )

    return {
        issueQuery,
        issueCommentsQuery
    }
}

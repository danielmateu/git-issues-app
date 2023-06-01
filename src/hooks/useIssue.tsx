import { useQuery } from '@tanstack/react-query';
import { Issue } from '../issues/interfaces';
import { githubApi } from '../api/githubApi';
import { sleep } from '../helpers/sleep';

const getIssueInfo = async (issueNumber: number): Promise<Issue> => {
    await sleep(2000)
    const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`)
    return data

}

export const useIssue = (issueNumber: number) => {

    const issueQuery = useQuery(['issue', issueNumber],
        () => getIssueInfo(issueNumber),
        // { enabled: false }
    )

    return {
        issueQuery,

    }
}

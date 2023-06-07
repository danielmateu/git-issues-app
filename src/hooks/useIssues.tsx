import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../api/githubApi";
import { Issue, State } from "../issues/interfaces";
import { sleep } from "../helpers/sleep";
import { useEffect, useState } from "react";

interface Props {
    state?: State;
    labels: string[];
    page?: number;
}

const getIssues = async ({ labels, state, page = 1 }: Props): Promise<Issue[]> => {
    // await sleep(2000)

    const params = new URLSearchParams()

    if (state) params.append('state', state)

    if (labels.length > 0) params.append('labels', labels.join(','))

    params.append('page', page.toString())
    params.append('per_page', '5')

    const { data } = await githubApi.get('/issues', { params });
    return data;
}

export const useIssues = ({ state, labels }: Props) => {

    const [page, setPage] = useState(1)

    useEffect(() => {
        setPage(1)
    }, [labels, state])


    const issuesQuery = useQuery(
        ['issues', { state, labels, page }],
        () => getIssues({ labels, state, page }),
    );

    const nextPage = () => {
        if (issuesQuery.data?.length === 0) return;

        setPage((prev) => prev + 1)
    }

    const prevPage = () => {
        if (page === 1) return;

        setPage((prev) => prev - 1)
    }

    return {
        // Properties
        issuesQuery,

        // Getters
        page: issuesQuery.isFetching ? 'Loading...' : page,

        // Methods
        nextPage,
        prevPage,
    }
}

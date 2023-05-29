import { useQuery } from '@tanstack/react-query';
import { githubApi } from '../api/githubApi';
import { Label } from '../issues/interfaces/label';
import { sleep } from '../helpers/sleep';

export const useLabels = () => {


    const getLabels = async (): Promise<Label[]> => {
        await sleep(2000)
        const { data } = await githubApi.get<Label[]>('/labels')
        return data
    }
    const labelsQuery = useQuery(['labels'], getLabels,
        {
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 60, // 1 hour
            
        }
    )

    return {
        labelsQuery,

    }
}

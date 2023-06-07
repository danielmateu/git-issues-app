import { useIssues } from '../../hooks';
import { LoadingIcon } from '../../shared/components/LoadingIcon';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useState } from 'react';
import { State } from '../interfaces';
import { useIssuesInfinite } from '../../hooks/useIssuesInfinite';



export const ListViewInfinite = () => {

  const [selectedLabels, setSelectedLabels] = useState<string[]>([])
  const [state, setState] = useState<State>()
  const { issuesQuery } = useIssuesInfinite({ state, labels: selectedLabels })

  const onStateChange = (newState: State) => {
    setState(newState)
  }

  const onLabelChanged = (labelName: string) => {
    selectedLabels.includes(labelName)
      ? setSelectedLabels(selectedLabels.filter((label) => label !== labelName))
      : setSelectedLabels([...selectedLabels, labelName])
  }



  return (
    <div className="row mt-5">

      <div className="col-8">
        {
          issuesQuery.isLoading
            ? <LoadingIcon />
            : <IssueList
              state={state}
              onStateChange={(newState) => setState(newState)}
              // issues={issuesQuery.data || []}
              issues={issuesQuery.data?.pages.flatMap((page) => page) || []}
            />
        }

        <button
          disabled={!issuesQuery.hasNextPage || issuesQuery.isFetchingNextPage}
          onClick={() => issuesQuery.fetchNextPage()}
          className='btn btn-outline-primary mt-2'>
          {issuesQuery.isFetching ? 'Loading...' : 'Load More...'}
        </button>

        {/* <div className='d-flex mt-2 justify-content-around align-items-center'>
          <button
            disabled={issuesQuery.isFetching}
            onClick={prevPage}
            className='btn btn-outline-primary'>Prev</button>
          <span>{page}</span>
          <button
            disabled={issuesQuery.isFetching}
            onClick={nextPage}
            className='btn btn-outline-primary'>Next</button>
        </div> */}

      </div>

      <div className="col-4">
        <LabelPicker
          selectedLabels={selectedLabels}
          onChange={(labelName) => onLabelChanged(labelName)}
        />
      </div>
    </div>
  )
}

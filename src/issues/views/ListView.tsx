import { useIssues } from '../../hooks';
import { LoadingIcon } from '../../shared/components/LoadingIcon';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useState } from 'react';
import { State } from '../interfaces';



export const ListView = () => {

  const [selectedLabels, setSelectedLabels] = useState<string[]>([])
  const [state, setState] = useState<State>()
  const { issuesQuery } = useIssues({state, labels: selectedLabels})

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
            // : <IssueList
            //   issues={issuesQuery.data?.filter((issue) => selectedLabels.length === 0 || issue.labels.some((label) => selectedLabels.includes(label.name))) || []}
            // />
            : <IssueList
              state={state}
              onStateChange={(newState) => setState(newState)}
              issues={issuesQuery.data || []}
            />
        }

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

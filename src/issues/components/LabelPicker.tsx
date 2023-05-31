
import { useState, FC } from 'react';
import { useLabels } from '../../hooks/useLabels'
import { LoadingIcon } from '../../shared/components/LoadingIcon'

interface Props {
  selectedLabels: string[],
  onChange: (labelName: string) => void,

}

export const LabelPicker: FC<Props> = ({ selectedLabels, onChange }) => {

  // const [selectedLabels, setSelectedLabels] = useState<string[]>([])

  const { labelsQuery } = useLabels()

  if (labelsQuery.isLoading) { // isLoading se carga la data por primera vez. isFetching se refresca la data
    return <LoadingIcon />
  }

  return (
    <div>
      {
        labelsQuery.data?.map((label) => (
          <span
            key={label.id}
            className={`badge rounded-pill m-1 label-picker ${selectedLabels.includes(label.name) ? 'label-active' : ''}`}
            style={{
              border: `1px solid #${label.color}`,
              // backgroundColor: `#${label.color}`, 
              color: `${label.color}`
            }}
            onClick={() => onChange(label.name)}
          >
            {label.name}
          </span>
        ))
      }
    </div>
  )
}

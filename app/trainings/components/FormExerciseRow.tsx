import React, { ChangeEvent, useEffect } from 'react'
import { createRoot } from 'react-dom/client';
import Set from './Set';
import { Exercise } from '@/types'


type Training = {
  _id: string
  username: string
  title: string
  exercises: Exercise[]
}

type Set = {
  setPos: number
  reps: number
  weight: number
}

type Props = {
  id: number
  onCreateSet: (data: Set, id: number) => void
  setExerciseName: (e: ChangeEvent<HTMLInputElement>) => void
  setReps: (e: ChangeEvent<HTMLInputElement>) => void
  setCount: number
  setSingleTraining?: React.Dispatch<React.SetStateAction<Training>>
}

const FormExerciseRow: React.FC<Props> = ({ id, onCreateSet, setExerciseName, setReps, setCount, setSingleTraining }) => {
  let position = 0

  useEffect(() => {
    console.log('Exercise Row Use Effect')
    console.log('setCount: ', setCount)
    if (setCount > 0) {
      for (let i = 0; i < setCount; i++) {
        addSet(true)
      }
    }
  }, [setCount])



  function addSet (isFromUpdateInit = false): void {
    console.log('Add Set')
    const exerciseRow = document.getElementById(`${id}-exercise-name`)
    if (exerciseRow !== null) {
      // const child = document.createElement('div')
      // exerciseRow.appendChild(child)
      const setsContainer = document.getElementById(`${id}-sets`)
      if (setsContainer !== null) {
        const child = document.createElement('div')
        setsContainer.appendChild(child)
        const root = createRoot(child)
        root.render(<Set id={id} position={position} setReps={setReps} />)
        position++
      }

      const blankSet = {
        setPos: position,
        reps: 0,
        weight: 0,
      }
      if (!isFromUpdateInit) {
        onCreateSet(blankSet, id)
      }
    }
  }

  function deleteSet (): void {
    console.log('Delete Set')
    const exerciseRow = document.getElementById(`${id}-exercise-name`)
    if (exerciseRow !== null) {
      // const child = document.createElement('div')
      // exerciseRow.appendChild(child)
      const setsContainer = document.getElementById(`${id}-sets`)
      if (setsContainer !== null) {
        const itemToDelete = setsContainer.lastChild
        const allItems = setsContainer.childElementCount
        itemToDelete?.remove()
        position--

        setSingleTraining?.((prevState) => {
          console.log('Setting ')
          const copy = { ...prevState }
          console.log(copy.exercises[id - 1])
          copy.exercises[id - 1].sets.splice(allItems - 1, 1)
          return copy
        })
      }
    }
  }

  return (
    <div>
      <div className='flex gap-2 mt-2 items-center justify-between border bg-slate-400'>
        <div id={`${id}-exercise-name`}>
          <label htmlFor={`${id}-name`}>{id}</label>
          <input type="text" id={`${id}-name`} onChange={setExerciseName} name={`${id}-name`} className='border bg-slate-100' />
        </div>

        <div id={`${id}-sets`} className="flex flex-row flex-wrap gap-2 max-w-md border bg-slate-400'">
        </div>

        <div id={`${id}-add-button`} className='w-1/4 flex items-center justify-center text-center'>
          <button onClick={() => addSet(false)} className="w-1/2 flex bg-blue-500 hover:bg-blue-700 text-xs text-center text-white font-bold rounded px-1">
            Add Set
          </button>
          <button onClick={deleteSet} className="w-1/2 flex bg-red-500 hover:bg-red-700 text-xs text-center text-white font-bold rounded px-1">
            Delete Set
          </button>
        </div>
      </div>
    </div>
  )
}

export default FormExerciseRow
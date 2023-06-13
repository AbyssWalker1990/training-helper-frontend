import React from 'react'
import { createRoot } from 'react-dom/client';
import Set from './Set';


type Props = {
  id: number
}

const FormExerciseRow: React.FC<Props> = ({ id }) => {
  let position = 1
  const addSet = () => {
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
        root.render(<Set id={id} position={position}/>)
        ++position
      }

  }
}

  return (
    <div>
      <div className='flex gap-2 mt-2 items-center justify-between border bg-slate-400'>
        <div id={`${id}-exercise-name`}>
          <label htmlFor={`${id}-name`}>{id}</label>
          <input type="text" id={`${id}-name`} name={`${id}-name`} className='border bg-slate-100'/>
        </div>

        <div id={`${id}-sets`} className="flex flex-row flex-wrap gap-2 max-w-md border bg-slate-400'">
         
        </div>

        <div id={`${id}-add-button`} className='w-1/4 flex items-center justify-center text-center'>
          <button onClick={addSet} className="w-1/2 flex bg-blue-500 hover:bg-blue-700 text-xs text-center text-white font-bold rounded px-1">
            Add Set
          </button>
        </div>


      </div>
    </div>
  )
}


export default FormExerciseRow
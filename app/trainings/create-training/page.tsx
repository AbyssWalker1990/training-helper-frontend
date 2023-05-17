'use client'
import React from 'react'
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { useSession } from 'next-auth/react'
import FormExerciseRow from '../components/FormExerciseRow';

function CreateTrainingPage() {
  const { data: session } = useSession()

  const addExercise = () => {
    console.log('Hello')
    const form = document.getElementById("exercise-form")
    if (form !== null) {
      const child = document.createElement('div')
      form.appendChild(child)
      const root = createRoot(child)
      root.render(<FormExerciseRow />)
    }
    
    
  }

  return (
    <div className='flex flex-wrap w-full' id='training-form-container'>
      <div className='p-4 w-full border border-gray-300 shadow-md rounded-lg p-4' >
        <div id='exercise-form' className='w-full flex-column'>

        </div>
        <button onClick={addExercise} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-2">
          Add Exercise
        </button>
      </div>
    </div>
  )
}

export default CreateTrainingPage
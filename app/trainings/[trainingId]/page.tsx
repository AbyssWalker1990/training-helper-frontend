'use client'
import React, { ChangeEvent, useState, useEffect } from 'react'
import { Exercise } from '@/types'
import ExerciseRow from '../components/ExerciseRow'

type Params = {
  params: {
    trainingId: string
  }
}

type Set = {
  setPos: number
  reps: number
  weight: number
}

type Training = {
  username: string
  title: string
  exercises: Exercise[]
}

const TrainingPage = async ({ params: { trainingId } }: Params) => {

  const [training, setTraining] = useState<Training>({
    username: '',
    title: '',
    exercises: []
  })

  useEffect(() => {
    console.log('USEEFFECT')
  }, [])

  const getTrainingById = async (trainingId: string) => {
    const response = await fetch(`http://localhost:3500/trainings/${trainingId}`)
    if (!response.ok) throw new Error('Failed to fetch Training')
    const trainingData = await response.json()
    setInitialTrainingData(trainingData)
    return trainingData
  }

  const onEdit = () => {
    const trainingInfo = document.getElementById('single-training')
    if (trainingInfo !== null) trainingInfo.classList.add('hidden')
    setTraining((prevState) => ({
      ...prevState,
      title: 'New'
    }))
    console.log(training)
  }

  const setInitialTrainingData = (trainingData: Training): void => {
    console.log('Started setting func')

  }

  const trainingData = await getTrainingById(trainingId)
  console.log(trainingData)


  return (
    <div id='single-training'>

      {/* <h4>{trainingData.title}</h4>
      <div>{trainingData.exercises.map((exercise: Exercise) => (
        <ExerciseRow key={exercise.position} exercise={exercise} />))}
      </div> */}

      <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-2"><a href={`http://localhost:3000/trainings/${trainingData._id}/update`}>Edit</a></button>
      </div>
    </div>
  )
}

export default TrainingPage


// {/* <div className='flex flex-wrap w-full bg-slate-500 h-screen' id='training-form-container'>
//       <div className='p-4 w-full border border-gray-300 shadow-md rounded-lg p-4' >
//         <div id='exercise-form' className='w-full flex-column'>

//           <label htmlFor='training-name'>Training Name:</label>
//           <input type="text" id='training-name' onChange={setTrainingName} name='training-name' className='border bg-slate-100' />


//         </div>
//         <div className='flex justify-between'>
//           <button onClick={addExercise} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-2">
//             Add Exercise
//           </button>
//           <button onClick={saveTraining} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-2">
//             Save
//           </button>
//         </div>
//       </div>

//     </div> */}
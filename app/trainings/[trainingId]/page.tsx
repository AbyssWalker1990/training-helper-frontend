'use client'
import React from 'react'
import { Exercise } from '@/types'
import ExerciseRow from '../components/ExerciseRow'

type Params = {
  params: {
    trainingId: string
  }
}

const getTrainingById = async (trainingId: string) => {

  const response = await fetch(`http://localhost:3500/trainings/${trainingId}`)
  if (!response.ok) throw new Error('Failed to fetch Training')
  return await response.json()
}



const TrainingPage = async ({ params: { trainingId } }: Params) => {

  const onEdit = () => {
    const trainingInfo = document.getElementById('single-training')
    if (trainingInfo !== null) trainingInfo.classList.add('hidden')
  }

  const trainingData = await getTrainingById(trainingId)
  console.log(trainingData)
  return (
    <div id='single-training'>

      <h4>{trainingData.title}</h4>
      <div>{trainingData.exercises.map((exercise: Exercise) => (
        <ExerciseRow key={exercise.position} exercise={exercise} />))}
      </div>

      <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-2" onClick={onEdit}>Edit</button>
      </div>
    </div>
  )
}

export default TrainingPage
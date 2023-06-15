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

  const trainingData = await getTrainingById(trainingId)
  console.log(trainingData)
  return (
    <div>

      <h4>{trainingData.title}</h4>
      <div>{trainingData.exercises.map((exercise: Exercise) => (
        <ExerciseRow key={exercise.position} exercise={exercise} />))}
      </div>
    </div>
  )
}

export default TrainingPage
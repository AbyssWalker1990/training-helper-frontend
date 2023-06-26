'use client'

import { Training } from '@/types'
import React from 'react'
import ExerciseRow from './ExerciseRow'

type Props = {
  training: Training
}

const SingleTraining: React.FC<Props> = ({ training }) => {
  const { exercises } = training
  return (
    <div key={training._id} className='w-full md:w-1/2 border border-gray-300 shadow-md rounded-lg p-4'>
      <h4>{typeof training._id}</h4>
      <h4><a href={`${process.env.NEXT_PUBLIC_HOST}/trainings/${training._id}`}>{training.title}</a></h4>
      <div>{training.exercises.map((exercise) => (
        <ExerciseRow key={exercise.position} exercise={exercise} />))}
      </div>
    </div>
  )
}

export default SingleTraining
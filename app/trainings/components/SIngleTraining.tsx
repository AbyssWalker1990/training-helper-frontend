import { Training } from '@/types'
import React from 'react'

type Props = {
  training: Training;
}

const  SingleTraining: React.FC<Props> = ({training}) => {
  return (
    <div key={training._id} className='w-full md:w-1/2 lg:w-1/4 border border-gray-300 shadow-md rounded-lg p-4'>
      <h4>{training.title}</h4>
      <div>{training.exercises.map((exercise) => (
        <p key={exercise.position}>{exercise.position} {exercise.name}</p>))}
      </div>
    </div>
  )
}

export default SingleTraining
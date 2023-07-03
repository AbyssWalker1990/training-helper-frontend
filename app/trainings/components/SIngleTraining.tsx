'use client'

import { Training } from '@/types'
import React from 'react'
import ExerciseRow from './ExerciseRow'

type Props = {
  training: Training
}

const SingleTraining: React.FC<Props> = ({ training }) => {
  const { exercises } = training

  const deleteTraining = async (id: string) => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/trainings/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    console.log(response.status)
    const trainingElement = document.getElementById(id)
    trainingElement?.remove()

  }

  return (
    <div key={training._id} id={training._id} className='relative w-full h-[400px] md:w-2/5 xl:w-1/4 border border-gray-300 shadow-md rounded-lg overflow-hidden'>

      <div className="training-card-header bg-gray-400 rounded-t-lg">
        <h2><a href={`${process.env.NEXT_PUBLIC_HOST}/trainings/${training._id}`}>{training.title}</a></h2>
        <h3>{training.date.toString().slice(0, 10)}</h3>
      </div>

      <div className='h-auto'>{training.exercises.map((exercise) => (
        <ExerciseRow key={exercise.position} exercise={exercise} />))}
      </div>

      <div onClick={() => { deleteTraining(training._id) }} id='training-link' className='px-5 pb-2 bg-gray-400 rounded-b-lg h-12 absolute bottom-0 w-full flex justify-between items-center'>
        <button className="bg-red-400 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mt-2">
          Delete
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-2">
          <a href={`${process.env.NEXT_PUBLIC_HOST}/trainings/${training._id}`}>Edit</a>
        </button>
      </div>
    </div>
  )
}

export default SingleTraining
'use client'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { setCookie } from 'cookies-next';
import { Training } from '@/types';

function Trainings() {
  const [trainings, setTrainings] = useState([])
  const { data: session } = useSession()

  useEffect(() => {
    setCookie('jwt', session?.user.accessToken)
  })

  const getTrainings = async () => {
    const dataTrainings = await fetch(`http://localhost:3500/trainings/user`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Cookie: `jwt=${session?.user.accessToken}`,
        Authorization: `Bearer ${session?.user.accessToken}`
      }
    })
    console.log('dataTrainings: ', dataTrainings)
    const trainingsData = await dataTrainings.json()
    setTrainings(trainingsData)
  }
  

  return (
    <div className='flex flex-wrap'>
      <button onClick={getTrainings}>Get Trainings</button>
      <div id='trainings' className='flex flex-wrap justify-center items-center p-5 gap-5'>
        {trainings.map((training: Training) => (
          <div key={training._id} className='w-full md:w-1/2 lg:w-1/4 border border-gray-300 shadow-md rounded-lg p-4'>
            <h4>{training.title}</h4>
            <div>{training.exercises.map((exercise) => (
              <p key={exercise.position}>{exercise.position} {exercise.name}</p>
            ))}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Trainings
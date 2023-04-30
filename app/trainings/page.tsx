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
      <div id='trainings' className='flex justify-content-between gap-6 bg-gray-400 h-12'>
        {trainings.map((training: Training) => (
          <div key={training._id}>
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
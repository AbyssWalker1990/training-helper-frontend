'use client'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { Training } from '@/types';

function Trainings() {
  const [trainings, setTrainings] = useState([])
  
  const { data: session } = useSession()

  useEffect(() => {
    if (session !== undefined) {
      const token = session?.user.accessToken as string
      const getTrainings = async () => {
        // const token = data?.user.accessToken as string
        const dataTrainings = await fetch(`http://localhost:3500/trainings/user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            token
          })
        })
        console.log('dataTrainings: ', dataTrainings)
        const trainingsData = await dataTrainings.json()
        setTrainings(trainingsData)
      }
      getTrainings()
      console.log(session?.user.accessToken)
    }
  }, [session])

  
  
  if (trainings.length >= 1) {
    return (
      <div className='flex flex-wrap'>
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
  } else {
      return (
        <div className='flex flex-wrap'>
          <div id='trainings' className='flex flex-wrap justify-center items-center p-5 gap-5'>
            <h1>You Have not trainings yet!!!</h1>
          </div>
        </div>
      )
  }
}

export default Trainings
'use client'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { Training } from '@/types';
import SingleTraining from './components/SIngleTraining';


const Trainings: React.FC = () => {
  const [trainings, setTrainings] = useState([])

  const { data: session } = useSession()



  useEffect(() => {

    if (session !== undefined) {
      const token = session?.user.accessToken as string
      console.log('session: ', session)
      const getTrainings = async () => {
        // const token = data?.user.accessToken as string
        const dataTrainings = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/trainings/user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            token
          })
        })

        let dataTrainingsRefetched: Response
        if (dataTrainings.status === 401) {
          const refreshToken = session?.user.refreshToken as string
          const newToken = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/auth/refresh/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              refreshToken
            })
          })
          const newAccessToken = await newToken.json()
          console.log('newAccessToken: ', newAccessToken)
          if (session) session.user.accessToken = newAccessToken.accessToken

          dataTrainingsRefetched = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/trainings/user`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              token
            })
          })
        }

        let trainingsData
        if (dataTrainings.status === 401) {
          trainingsData = await dataTrainingsRefetched!.json()
          setTrainings(trainingsData)
        } else {
          trainingsData = await dataTrainings!.json()
          setTrainings(trainingsData)
        }
      }
      getTrainings()
      console.log(session?.user.accessToken)
    }
  }, [session])



  if (trainings.length >= 1) {
    return (
      <div className='flex flex-wrap h-screen'>
        <div id='trainings' className='flex flex-wrap justify-center items-center p-5 gap-5'>
          {trainings.map((training: Training) => (
            <SingleTraining key={training._id} training={training} />
          ))}
        </div>
      </div>
    )
  } else {
    return (
      <div className='flex flex-wrap h-screen'>
        <div id='trainings' className='flex flex-wrap justify-center items-center p-5 gap-5'>
          <h1>You Have not trainings yet!!!</h1>
        </div>
      </div>
    )
  }
}

export default Trainings
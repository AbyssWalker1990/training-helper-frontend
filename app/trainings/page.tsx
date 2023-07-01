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

        const dataTrainings = await fetchTrainings(token, 'token')

        let trainingsData
        let dataTrainingsRefetched: Response
        if (dataTrainings.status === 401 || dataTrainings.status === 500) {
          const refreshToken = session?.user.refreshToken as string
          const newToken = await fetchTrainings(refreshToken, 'refreshToken')
          const newAccessToken = await newToken.json()
          console.log('newAccessToken: ', newAccessToken)
          console.log('newAccessToken type: ', typeof newAccessToken)

          if (session) session.user.accessToken = newAccessToken.accessToken
          console.log('session.user.accessToken :', session?.user.accessToken)

          dataTrainingsRefetched = await fetchTrainings(newAccessToken.accessToken, 'token')
          trainingsData = await dataTrainingsRefetched!.json()
          setTrainings(trainingsData)
        } else {
          trainingsData = await dataTrainings!.json()
          setTrainings(trainingsData)
        }
      }
      getTrainings().catch((err) => console.log('Error from Useeffect: ', err))
      console.log(session?.user.accessToken)
    }
  }, [session])

  async function fetchTrainings (token: string, type: string) {
    let route
    type === 'token' ? route = 'trainings/user' : route = 'auth/refresh/'
    const trainings = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/${route}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        [type]: token
      })
    })
    return trainings
  }


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
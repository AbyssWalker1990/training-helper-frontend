'use client'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { setCookie } from 'cookies-next';

function Trainings() {
  const [trainings, setTrainings] = useState()
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
    console.log(trainingsData)
  }
  

  return (
    <div>
      <button onClick={getTrainings}>Get Trainings</button>
      {trainings}
    </div>
  )
}

export default Trainings
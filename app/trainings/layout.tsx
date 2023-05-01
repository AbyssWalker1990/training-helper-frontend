'use client'

import { SessionProvider } from 'next-auth/react'
import Trainings from './page'


function ProvidersTraining() {
  return (
    <SessionProvider >
      <Trainings />
    
    </SessionProvider>
  )
}

export default ProvidersTraining
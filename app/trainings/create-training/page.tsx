import React from 'react'
import { useSession } from 'next-auth/react'

function CreateTrainingPage() {
  const { data: session } = useSession()


  return (
    <div>CreateTrainingPage</div>
  )
}

export default CreateTrainingPage
'use client'
import React from 'react'
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { useSession } from 'next-auth/react'
import FormExerciseRow from '../components/FormExerciseRow';

type Set = {
  setPos: number
  reps: number
  weight: number
}

type Exercise = {
  position: number
  name: string
  set: Set[]
}

type Training = {
  user: string
  title: string
  exercises: Exercise[]
}

let exerciseId = 1

const CreateTrainingPage = () => {

  const { data: session } = useSession()
  const [training, setTraining] = useState<Training>({
    user: session?.user?.username as string,
    title: '',
    exercises: []
  })



  const addExercise = () => {

    const form = document.getElementById("exercise-form")
    if (form !== null) {
      const child = document.createElement('div')
      form.appendChild(child)
      const root = createRoot(child)
      root.render(<FormExerciseRow id={exerciseId} onCreateSet={createSet} />)

      const blankExercise = {
        position: exerciseId,
        name: '',
        set: [
          {
            setPos: 1,
            reps: 0,
            weight: 0,
          }
        ]
      }

      setTraining((prevState) => ({
        ...prevState,
        exercises: [...prevState.exercises, blankExercise]
      }))

      console.log('exerciseId: ', exerciseId)
      exerciseId++
    }
  }

  const createSet = (data: Set, id: number) => {
    setTraining((prevState) => {
      const copy = { ...prevState }
      copy.exercises[id - 1].set.push(data)
      return copy
    })
  }

  return (
    <div className='flex flex-wrap w-full bg-slate-500 h-screen' id='training-form-container'>
      <div className='p-4 w-full border border-gray-300 shadow-md rounded-lg p-4' >
        <div id='exercise-form' className='w-full flex-column'>

        </div>
        <button onClick={addExercise} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-2">
          Add Exercise
        </button>
      </div>
    </div>
  )
}

const trainingExample = {
  "_id": "645009a8b091a26619836a6b",
  "username": "Vova",
  "title": "Test training",
  "exercises": [
    {
      "position": "1",
      "name": "Dumbbell Curl",
      "set": [
        {
          "setPos": 1,
          "reps": 20,
          "weight": 23,
          "_id": "645009a8b091a26619836a6d"
        },
        {
          "setPos": 2,
          "reps": 14,
          "weight": 180,
          "_id": "645009a8b091a26619836a6e"
        },
        {
          "setPos": 3,
          "reps": 9,
          "weight": 83,
          "_id": "645009a8b091a26619836a6f"
        },
        {
          "setPos": 4,
          "reps": 7,
          "weight": 36,
          "_id": "645009a8b091a26619836a70"
        },
        {
          "setPos": 5,
          "reps": 17,
          "weight": 54,
          "_id": "645009a8b091a26619836a71"
        },
        {
          "setPos": 6,
          "reps": 14,
          "weight": 198,
          "_id": "645009a8b091a26619836a72"
        }
      ],
      "_id": "645009a8b091a26619836a6c"
    },
  ],
  "date": "2023-05-01T18:49:12.750Z",
  "__v": 0
}

export default CreateTrainingPage
'use client'
import React, { ChangeEvent, useState, useEffect } from 'react'
import { Exercise } from '@/types'
import ExerciseRow from '../components/ExerciseRow'
import FormExerciseRow from '../../components/FormExerciseRow'
import { createRoot } from 'react-dom/client'

type Params = {
  params: {
    trainingId: string
  }
}

type Set = {
  setPos: number
  reps: number
  weight: number
}

type Training = {
  username: string
  title: string
  exercises: Exercise[]
}

let exerciseId = 1


const TrainingPageUpdate = ({ params: { trainingId } }: Params) => {
  const [singleTraining, setSingleTraining] = useState<Training>({
    username: '',
    title: '',
    exercises: []
  })
  const [test, setTest] = useState('')


  useEffect(() => {
    const setInitialState = async () => {
      const data = await getTrainingById(trainingId)
      setSingleTraining(data)
      console.log('Training data: ', data)
      const exerciseCount = getExerciseCount(data)
      console.log('exerciseCount: ', exerciseCount)
      createExerciseRows(exerciseCount)
    }
    setInitialState()




  }, [trainingId])

  function getExerciseCount(training: Training): number {
    console.log('singleTraining.exercises.length: ', singleTraining.exercises.length)
    return training.exercises.length
  }

  function createExerciseRows(exerciseCount: number): void {
    for (let i = 0; i < exerciseCount; i++) {
      addExercise()
    }
  }

  async function getTrainingById(trainingId: string) {
    const response = await fetch(`http://localhost:3500/trainings/${trainingId}`)
    if (!response.ok) throw new Error('Failed to fetch Training')
    const trainingData = await response.json()
    return trainingData
  }

  const onEdit = () => {
    const trainingInfo = document.getElementById('single-training')
    if (trainingInfo !== null) trainingInfo.classList.add('hidden')
    setSingleTraining((prevState) => ({
      ...prevState,
      title: 'New'
    }))
    console.log(singleTraining)
  }


  const createSet = (data: Set, id: number): void => {
    setSingleTraining((prevState) => {
      const copy = { ...prevState }
      copy.exercises[id - 1].sets.push(data)
      return copy
    })
  }

  const setTrainingName = (e: ChangeEvent<HTMLInputElement>): void => {
    setSingleTraining((prevState) => ({
      ...prevState,
      title: e.target.value
    }))
  }

  const setExerciseName = (e: ChangeEvent<HTMLInputElement>): void => {
    setSingleTraining((prevState) => {
      const copy = { ...prevState }
      const index = Number(e.target.id.split('-')[0]) - 1
      copy.exercises[index].name = e.target.value
      return copy
    })
  }

  // ID Example = 3-0-set-rep
  const setReps = (e: ChangeEvent<HTMLInputElement>): void => {
    const idData = e.target.id.split('-')
    const exerciseId = Number(idData[0]) - 1
    const setPos = Number(idData[1])
    const type = idData[3]
    console.log(
      `idData: ${idData}\nexerciseId: ${exerciseId}\nsetPos: ${setPos}\ntype: ${type}`
    )

    setSingleTraining((prevState) => {
      const copy = { ...prevState }
      copy.exercises.forEach(exercise => {
        exercise.sets = prevState.exercises[exercise.position - 1].sets
      })
      console.log(copy)
      if (type === 'rep') {
        copy.exercises[exerciseId].sets[setPos].reps = Number(e.target.value)
      }
      if (type === 'weight') {
        copy.exercises[exerciseId].sets[setPos].weight = Number(e.target.value)

      }
      return copy
    })
  }

  function addExercise() {

    const form = document.getElementById("exercise-form")
    if (form !== null) {
      const child = document.createElement('div')
      form.appendChild(child)
      const root = createRoot(child)
      root.render(
        <FormExerciseRow
          id={exerciseId}
          onCreateSet={createSet}
          setExerciseName={setExerciseName}
          setReps={setReps}
        />
      )

      const blankExercise = {
        position: exerciseId,
        name: '',
        sets: []
      }



      setSingleTraining((prevState) => ({
        ...prevState,
        exercises: [...prevState.exercises, blankExercise]
      }))

      console.log('exerciseId: ', exerciseId)
      exerciseId++
    }
  }

  const saveTraining = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(singleTraining)
    }

    const response = await fetch('http://localhost:3500/trainings/', requestOptions)
    const data = await response.json()
    console.log(data)
  }


  return (
    <>
      <div className='flex flex-wrap w-full bg-slate-500 h-screen' id='training-form-container'>
        <div className='p-4 w-full border border-gray-300 shadow-md rounded-lg p-4' >
          <div id='exercise-form' className='w-full flex-column'>

            <label htmlFor='training-name'>Training Name:</label>
            <input type="text" id='training-name' value='1' onChange={setTrainingName} name='training-name' className='border bg-slate-100' />


          </div>
          <div className='flex justify-between'>
            <button onClick={addExercise} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-2">
              Add Exercise
            </button>
            <button onClick={saveTraining} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-2">
              Save
            </button>
          </div>
        </div>

      </div>
    </>
  )
}

export default TrainingPageUpdate


// {/* <div className='flex flex-wrap w-full bg-slate-500 h-screen' id='training-form-container'>
//       <div className='p-4 w-full border border-gray-300 shadow-md rounded-lg p-4' >
//         <div id='exercise-form' className='w-full flex-column'>

//           <label htmlFor='training-name'>Training Name:</label>
//           <input type="text" id='training-name' onChange={setTrainingName} name='training-name' className='border bg-slate-100' />


//         </div>
//         <div className='flex justify-between'>
//           <button onClick={addExercise} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-2">
//             Add Exercise
//           </button>
//           <button onClick={saveTraining} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-2">
//             Save
//           </button>
//         </div>
//       </div>

//     </div> */}
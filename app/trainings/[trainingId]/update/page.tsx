'use client'
import React, { ChangeEvent, useState, useEffect } from 'react'
import { Exercise } from '@/types'
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

  useEffect(() => {
    console.log('i fire once')
    const setInitialState = async () => {
      const data = await getTrainingById(trainingId) as Training
      setSingleTraining(data)
      console.log('Training data: ', data)
      const exerciseCount = getExerciseCount(data)

      console.log('exerciseCount: ', exerciseCount)
      console.log('singleTraining: ', singleTraining)
      createExerciseRows(exerciseCount, data)
      exerciseId = exerciseCount + 1
      setTimeout(() => initTrainingName(data), 100)
      setTimeout(() => initExercises(data), 1000)
    }
    setInitialState()
  }, [trainingId])

  function initTrainingName (trainingData: Training): void {
    const trainingTitle = trainingData.title
    const titleInput = document.getElementById('training-name') as HTMLInputElement
    console.log(titleInput)
    console.log(trainingTitle)
    titleInput.setAttribute('value', trainingTitle)
  }

  function initExercises (trainingData: Training): void {
    const exercises = trainingData.exercises
    console.table(exercises)
    for (const exercise of exercises) {
      const exerciseNameInput = document.getElementById(`${exercise.position}-name`) as HTMLInputElement
      exerciseNameInput.setAttribute('value', exercise.name)
      for (const set of exercise.sets) {
        console.table(set)
        const setPosition = Number(set.setPos) - 1
        const repInput = document.getElementById(`${exercise.position}-${setPosition}-set-rep`) as HTMLInputElement
        const weightInput = document.getElementById(`${exercise.position}-${setPosition}-set-weight`) as HTMLInputElement
        console.log(`${exercise.position}-${setPosition}-set-rep`)
        console.log(`Set Inputs: ${repInput} ${weightInput}`)
        repInput.setAttribute('value', String(set.reps))
        weightInput.setAttribute('value', String(set.weight))
      }
    }
  }

  function getExerciseCount (training: Training): number {
    console.log('singleTraining.exercises.length: ', singleTraining.exercises.length)
    return training.exercises.length
  }

  function createExerciseRows (exerciseCount: number, data: Training): void {
    for (let i = 0; i < exerciseCount; i++) {
      const setsNumber = data.exercises[i].sets.length
      console.log('setsNumber: ', setsNumber)
      addExercise(setsNumber, true)
    }
  }

  async function getTrainingById (trainingId: string) {
    const response = await fetch(`http://localhost:3500/trainings/${trainingId}`)
    if (!response.ok) throw new Error('Failed to fetch Training')
    const trainingData = await response.json()
    return trainingData
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

  function addExercise (setCount = 0, isInitUpdate = false) {
    console.log('addExercise triggered')

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
          setCount={setCount}
        />
      )

      const blankExercise = {
        position: exerciseId,
        name: '',
        sets: []
      }

      if (!isInitUpdate) {
        setSingleTraining((prevState) => ({
          ...prevState,
          exercises: [...prevState.exercises, blankExercise]
        }))
      }

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
            <input type="text" id='training-name' value='' onChange={setTrainingName} name='training-name' className='border bg-slate-100' />


          </div>
          <div className='flex justify-between'>
            <button onClick={() => addExercise()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-2">
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
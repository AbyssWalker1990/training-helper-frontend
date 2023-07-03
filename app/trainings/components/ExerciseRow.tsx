'use client'

import { Exercise } from '@/types'
import React, { useState, useEffect } from 'react'

type Props = {
  exercise: Exercise;
}


const ExerciseRow: React.FC<Props> = ({ exercise }) => {
  const [sets, setSets] = useState<number[][]>([])


  useEffect(() => {
    const setList: number[][] = []
    if (exercise !== undefined) {
      exercise.sets.forEach(el => {
        const singleSet = [el.reps, el.weight]
        setList.push(singleSet)
      })
      setSets(setList)
    }
  }, [exercise])

  if (sets.length > 0) {
    return (
      <div className='p-1 justify-content-left flex flex-wrap bg-slate-100'>
        <div className='w-full h-full'>
          <h1>{exercise.position}. {exercise.name}</h1>
        </div>
        <div className='w-full flex flex-wrap gap-3 overflow-hidden border'>
          {sets.map((set) => (
            <div key={sets.indexOf(set)}>
              <span className='border'>{set[0]}x{set[1]}</span>
            </div>
          ))}
        </div>

      </div>
    )
  }
  else {
    return (
      <h1>Nothing</h1>
    )
  }

}

export default ExerciseRow
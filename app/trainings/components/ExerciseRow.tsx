import { Exercise } from '@/types'
import React, { useState, useEffect } from 'react'

type Props = {
  exercise: Exercise;
}


const ExerciseRow: React.FC<Props> = ( {exercise} ) => {
  const [sets, setSets] = useState<number[][]>([])
  

  useEffect(() => {
    const setList: number[][] = []
    if (exercise !== undefined) {
      exercise.set.forEach(el => {
        const singleSet = [el.reps, el.weight]
        setList.push(singleSet)
      })
      setSets(setList)
    }
  }, [exercise])
  
  if (sets.length > 0) {
    return (
      <div className='flex-column justify-content-left'>
        <div className='w-full'>
          <h1>{exercise.position}. {exercise.name}</h1>
        </div>
        <div className='w-full flex gap-3 overflow-hidden'>
        {sets.map((set) => (
          <div key={sets.indexOf(set)}>
            <span className='border'>{set[0]}x{set[1]}</span>
          </div>
        ))}
        </div>

      </div>
    )
  }

}

export default ExerciseRow
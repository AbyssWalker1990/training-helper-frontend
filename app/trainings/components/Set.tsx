import React, { ChangeEvent } from 'react'

type Props = {
  id: number
  position: number
  setReps: (e: ChangeEvent<HTMLInputElement>) => void
}

const Set: React.FC<Props> = ({ id, position, setReps }) => {
  return (<>
    <div className="flex flex-row">
      <input type="text" onChange={setReps} id={`${id}-${position}-set-rep`} name={`${id}-set-rep`} className='border w-9 h-5' />
      <p>*</p>
      <input type="text" onChange={setReps} id={`${id}-${position}-set-weight`} name={`${id}-set-weight`} className='border w-9 h-5' />
    </div>
  </>
  )
}

export default Set
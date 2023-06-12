import React from 'react'

type Props = {
  id: number
}

const Set: React.FC<Props> = ({ id }) => {
  return (
    <input type="text" id={`${id}-set`} name={`${1}-set`} className='border'/>
  )
}

export default Set
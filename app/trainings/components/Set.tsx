import React from 'react'

type Props = {
  id: number
}

const Set: React.FC<Props> = ({ id }) => {
  return (<>
      <div className="flex flex-row">
        <input type="text" id={`${id}-set-rep`} name={`${1}-set-rep`} className='border w-9 h-5'/>
        <p>*</p>
        <input type="text" id={`${id}-set-weight`} name={`${1}-set-weight`} className='border w-9 h-5'/>   
      </div>
    </>
  )
}

export default Set
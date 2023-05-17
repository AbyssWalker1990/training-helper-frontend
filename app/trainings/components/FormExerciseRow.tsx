import React from 'react'

const FormExerciseRow = () => {
  return (
    <div>
      <div className='flex gap-2 mt-2 items-center justify-between border'>
        <div id='exercise-name'>
          <label htmlFor="name">1</label>
          <input type="text" id="name" name="name" className='border'/>
        </div>

        <div id="sets">

        </div>

        <div id='add-button' className='w-1/4 flex items-center justify-center text-center'>
          <button className="w-1/2 flex bg-blue-500 hover:bg-blue-700 text-xs text-center text-white font-bold rounded px-1">
            Add Set
          </button>
        </div>


      </div>
    </div>
  )
}

export default FormExerciseRow
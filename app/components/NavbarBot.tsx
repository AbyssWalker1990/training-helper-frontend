'use client'
import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


export default function NavbarBot () {
  const { data: session } = useSession()

  const createTestTrainings = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/test/create`)
    if (response.status === 201) {
      toast.success('Test Trainings Created!!', {
        position: toast.POSITION.TOP_RIGHT
      })
    } else {
      toast.error('Something went wrong', {
        position: toast.POSITION.TOP_RIGHT
      })
    }
  }

  const deleteTestTrainings = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/test/delete-all`)
    if (response.status === 204) {
      toast.warning('Test Trainings Deleted!!', {
        position: toast.POSITION.TOP_RIGHT
      })
    } else {
      toast.error('Something went wrong', {
        position: toast.POSITION.TOP_RIGHT
      })
    }
  }

  return (
    <nav className="bg-slate-600 pt-1 px-4 w-full fixed bottom-0 drop-shadow-xl h-14">
      <div className='mx-auto flex justify-between flex-row'>
        <Link href='/trainings' className="text-white/90 no-underline pt-3 hover:text-white">Trainings</Link>
        {session && (
          <div id="test-buttons" className='flex gap-4'>
            <button onClick={createTestTrainings} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-2">
              Add Test Trainings
            </button>
            <button onClick={deleteTestTrainings} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-2">
              Delete Test Trainings
            </button>
          </div>
        )}
        <Link href='/trainings/create-training' className="text-white/90 no-underline pt-3 hover:text-white">Create</Link>
      </div>
    </nav>
  )
}

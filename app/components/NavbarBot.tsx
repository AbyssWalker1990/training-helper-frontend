'use client'
import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'


export default function NavbarBot () {
  const { data: session } = useSession()

  return (
    <nav className="bg-slate-600 pt-1 px-4 w-full fixed bottom-0 drop-shadow-xl h-14">
      <div className='mx-auto flex justify-between flex-row'>
        <Link href='/trainings' className="text-white/90 no-underline pt-3 hover:text-white">Trainings</Link>
        {session && (
          <div id="test-buttons" className='flex gap-4'>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-2">
              Add Test Trainings
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-2">
              Delete Test Trainings
            </button>
          </div>
        )}
        <Link href='/trainings/create-training' className="text-white/90 no-underline pt-3 hover:text-white">Create</Link>
      </div>
    </nav>
  )
}

import React from 'react'
import Link from 'next/link'

export default function NavbarBot() {
  return (
    <nav className="bg-slate-600 p-4 w-full fixed bottom-0 drop-shadow-xl">
      <div className='mx-auto flex justify-between flex-col sm:flex-row'>
        <Link href='/trainings' className="text-white/90 no-underline hover:text-white">Trainings</Link>
        <Link href='/trainings/create-training' className="text-white/90 no-underline hover:text-white">Create</Link>
      </div>
    </nav>
  )
}

'use client'
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'
import Link from 'next/link'

export default function NavbarTop() {

  const { data: session } = useSession()

  return (
    <nav className="bg-slate-600 p-4 sticky top-0 drop-shadow-xl z-10">
      <div className='w-full mx-auto flex justify-left gap-3 flex-col sm:flex-row'>
        <Link href='/' className="text-white/90 no-underline hover:text-white">Home</Link>
        <Link href='/admin' className="text-white/90 no-underline hover:text-white">Admin</Link>
        <div className="w-full text-white/90hover:text-white">
          {session?.user ? (
            <div className='flex justify-between w-full text-white/90 hover:text-white'>
              <button onClick={() => { signOut({ callbackUrl: '/' }) }}>Sign out</button>
              <p className='justify-right sm:align-middle'>{session?.user?.username}</p>
            </div>
          ) : (
            <div>
              <button className="text-white/90 hover:text-white" onClick={() => { signIn() }}>Sign In</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}



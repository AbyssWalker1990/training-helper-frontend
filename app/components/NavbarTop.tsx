'use client'
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'
import Link from 'next/link'

export default function NavbarTop () {

  const { data: session } = useSession()

  return (
    <header className='bg-slate-600 w-full fixed top-0 z-10'>
      <section className="header-title-line align-center">
        <h1 className='text-2xl pt-2'>Training Helper</h1>
        <button className="hidden menu-button">
          <div className="menu-icon"></div>
        </button>
      </section>

      <nav className='top'>
        <ul>
          <li className='bg-slate-600'><Link href='/' className="text-white/90 no-underline hover:text-white">Home</Link></li>
          <li className='bg-slate-600'><Link href='/admin' className="text-white/90 no-underline hover:text-white">Admin</Link></li>
          {session?.user ? (
            <li className='bg-slate-600' onClick={() => { signOut({ callbackUrl: '/' }) }}><a className="text-white/90 no-underline font-bold cursor-pointer hover:text-white">Log out, {session?.user?.username}</a></li>
          ) : (
            <li className='bg-slate-600' onClick={() => { signIn() }}><a className="text-white/90 no-underline font-bold cursor-pointer hover:text-white">Log in</a></li>
          )}
        </ul>
      </nav>
    </header>
  )
}





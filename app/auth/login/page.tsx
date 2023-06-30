'use client'
import { useState, ChangeEvent, MouseEvent } from 'react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'


function Auth () {
  const [formData, setFormData] = useState({
    user: '',
    password: ''
  })

  const { user, password } = formData

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    console.log(user)
    const result = await signIn('credentials', {
      username: user,
      password: password,
      redirect: true,
      callbackUrl: '/'
    })
    console.log("SignIn result: ", result)
  }

  return (
    <form className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="user">
          Username
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="user" type="text" placeholder="Enter your username"
          onChange={onChange} />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password" type="password" placeholder="Enter your password"
          onChange={onChange} />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button" onClick={onSubmit}>
          Sign In
        </button>
        <div className='flex justify-left gap-2'>
          <p className='text-sm'>Haven&apos;t account? </p>
          <Link className='font-bold text-sm text-blue-500 hover:text-blue-800' href='/auth/sign'>Sign Up</Link>
        </div>
        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          href="/">
          Forgot Password?
        </a>
      </div>
    </form>
  )
}

export default Auth
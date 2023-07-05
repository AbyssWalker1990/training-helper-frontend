'use client'
import { useState, ChangeEvent, MouseEvent } from 'react'
import { signIn } from 'next-auth/react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Sign () {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  })


  const { username, password, confirmPassword } = formData

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (password !== confirmPassword) return console.log('Passwords does not match!')
    const createdUser = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/auth/register`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password
      })
    })
    console.log(createdUser)

    if (createdUser.status === 201) {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
        callbackUrl: '/'
      })
      if (result?.ok && !result?.error) {
        console.log('LOGGED')
        toast.success('User Created !', {
          position: toast.POSITION.TOP_RIGHT
        })
        const loginForm = document.getElementById('sign-form')
        loginForm?.classList.add('hidden')
      } else {
        toast.error('Something went Wrong! ', {
          position: toast.POSITION.TOP_RIGHT
        })
      }
    }
  }



  return (
    <form id='sign-form' className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
          Username
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username" type="text" placeholder="Enter your username"
          onChange={onChange} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password" type="password" placeholder="Enter your password"
          onChange={onChange} />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="confirmPassword" type="password" placeholder="Confirm your password"
          onChange={onChange} />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit" onClick={onSubmit}>
          Sign Up
        </button>
      </div>
    </form>
  )
}

export default Sign
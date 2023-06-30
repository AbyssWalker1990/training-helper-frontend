import NextAuth from "next-auth/next"

declare module 'next-auth' {
  interface Session {
    user: {
      username: string
      accessToken: string
      refreshToken: string
    }
  }
}

type Exercise = {
  position: number
  name: string
  sets: {
    setPos: number
    reps: number
    weight: number
  }[]
}

type Training = {
  username: string
  title: string
  date: Date
  exercises: Exercise[],
  _id: string
}


import NextAuth from "next-auth/next"

declare module 'next-auth' {
  interface Session {
    user: {
      username: string
      accessToken: string
    }
  }
}

type Training = {
  username: string
  title: string
  date: Date
  exercises: [{
    position: number
    name: string
    set: {
      setPos: number
      reps: number
      weight: number
    }
  }]
}


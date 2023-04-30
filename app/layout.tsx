'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import NavbarTop from './components/NavbarTop'
import NavbarBot from './components/NavbarBot'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'


const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Training Helper',
//   description: 'Diary for planning fitness trainings schema',
// }

interface IProps {
  children: ReactNode
}

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
        <SessionProvider>
          <NavbarTop />
          {children}
          <NavbarBot />
        </SessionProvider>
      </body>
    </html>
  )
}

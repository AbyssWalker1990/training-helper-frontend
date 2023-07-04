import './globals.css'
import { Inter } from 'next/font/google'
import NavbarTop from './components/NavbarTop'
import NavbarBot from './components/NavbarBot'
import { ReactNode } from 'react'
import Providers from './components/Providers'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Training Helper',
  description: 'Diary for planning fitness trainings schema',
}

interface IProps {
  children: ReactNode
}

export default function RootLayout ({ children }: IProps) {
  return (
    <html lang="en">

      <body className={inter.className}>
        <Providers>
          <NavbarTop />
          <main className='py-14'>
            {children}
          </main>
          <NavbarBot />
          <ToastContainer />
        </Providers>
      </body>
    </html>
  )
}

import './globals.css'
import { Inter } from 'next/font/google'
import NavbarTop from './components/NavbarTop'
import NavbarBot from './components/NavbarBot'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Training Helper',
  description: 'Diary for planning fitness trainings schema',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavbarTop />
        {children}
        <NavbarBot />
      </body>
    </html>
  )
}

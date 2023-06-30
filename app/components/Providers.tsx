'use client'

import { SessionProvider } from 'next-auth/react'
import { CookiesProvider } from 'react-cookie';
import { ReactNode } from 'react'

interface IProps {
  children: ReactNode
}

function Providers ({ children }: IProps) {
  return (
    <SessionProvider>
      <CookiesProvider>
        {children}
      </CookiesProvider>
    </SessionProvider>
  )
}

export default Providers
import './globals.css'
import { Inter } from 'next/font/google'
import ClientProvider from './components/ClientProvider'
import {Navigation} from './components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Fitness Tracker',
  description: 'Track your fitness journey',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProvider>
          <Navigation />
          {children}
        </ClientProvider>
      </body>
    </html>
  )
}
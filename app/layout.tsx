import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'DevOps Portfolio',
  description: 'Terminal + Dashboard Hybrid portfolio'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-background text-white">{children}</main>
      </body>
    </html>
  )
}

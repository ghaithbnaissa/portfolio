import './globals.css'
import { ReactNode } from 'react'

import { SiteShell } from '../components/site-shell'

export const metadata = {
  title: 'Ghaith Ben Aissa — Networks, Systems & DevSecOps',
  description:
    'Operator terminal portfolio of Ghaith Ben Aissa: networks, Linux systems, DevSecOps pipelines and observability.',
}

export const viewport = {
  themeColor: '#000000',
  colorScheme: 'dark' as const,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="matrix" suppressHydrationWarning>
      <body className="min-h-screen bg-mx-deep font-sans text-mx-text antialiased">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  )
}

import './globals.css'
import { ReactNode } from 'react'

import { SiteShell } from '../components/site-shell'

export const metadata = {
  title: 'Ghaith Ben Aissa | Networks, Systems & DevSecOps Engineer',
  description:
    'Professional portfolio of Ghaith Ben Aissa: Cisco CCNA certified, Enterprise Networks, Linux Systems, DevSecOps CI/CD pipelines, and Observability.',
}

export const viewport = {
  themeColor: '#070b14',
  colorScheme: 'dark' as const,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-mx-deep font-sans text-mx-text antialiased selection:bg-mx-primary/20 selection:text-mx-bright">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  )
}

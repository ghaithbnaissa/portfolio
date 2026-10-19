'use client'

import * as React from 'react'
import { ThemeProvider } from 'next-themes'

import MatrixBackground from './matrix/matrix-background'

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="matrix"
      themes={['matrix', 'recruiter']}
      enableSystem={false}
      disableTransitionOnChange
    >
      {/* `mx-screen` lays the fixed CRT scanlines + vignette over everything. */}
      <div className="mx-screen relative min-h-screen">
        <MatrixBackground />
        <div className="relative z-10">{children}</div>
      </div>
    </ThemeProvider>
  )
}

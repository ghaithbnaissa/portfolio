'use client'

import * as React from 'react'
import MatrixBackground from './matrix/matrix-background'

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-mx-deep text-mx-text antialiased">
      <MatrixBackground />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

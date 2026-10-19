'use client'

import * as React from 'react'
import AmbientBackground from './ambient-background'
import PageLoader from './page-loader'

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-mx-deep text-mx-text antialiased">
      <PageLoader />
      <AmbientBackground />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

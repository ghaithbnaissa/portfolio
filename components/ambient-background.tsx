'use client'

import * as React from 'react'

/**
 * Modern Ambient Background
 * Sleek, high-contrast dark palette with subtle floating gradient orbs and fine grid.
 */
export default function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base deep dark blue background */}
      <div className="absolute inset-0 bg-mx-deep" />

      {/* Floating ambient glow orbs */}
      <div className="absolute -left-[10%] -top-[12%] h-[600px] w-[600px] rounded-full bg-blue-600/12 blur-[140px] animate-pulse" />
      <div className="absolute -right-[8%] top-[20%] h-[550px] w-[550px] rounded-full bg-indigo-600/10 blur-[150px]" />
      <div className="absolute bottom-[15%] left-[20%] h-[480px] w-[480px] rounded-full bg-sky-500/8 blur-[130px]" />
      <div className="absolute right-[25%] bottom-[5%] h-[400px] w-[400px] rounded-full bg-blue-500/6 blur-[120px]" />

      {/* Subtle executive geometric grid */}
      <div className="mx-grid-bg absolute inset-0 opacity-[0.14]" />

      {/* Radial vignette mask for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(100%_60%_at_50%_0%,transparent_40%,rgb(var(--mx-deep))_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mx-primary/30 to-transparent" />
    </div>
  )
}

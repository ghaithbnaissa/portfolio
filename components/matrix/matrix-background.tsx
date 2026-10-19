'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

import { onRainBurst } from './rain-bus'
import DigitalRain from './digital-rain'

/**
 * Backdrop system:
 * - Matrix Mode: digital rain, engineering grid, CRT sweep bar.
 * - Recruiter Mode: pristine, modern ambient aura with subtle glowing mesh for zero distraction.
 */
export default function MatrixBackground() {
  const [burst, setBurst] = useState(false)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    let timer: number | undefined

    const unsubscribe = onRainBurst((durationMs) => {
      setBurst(true)
      window.clearTimeout(timer)
      timer = window.setTimeout(() => setBurst(false), durationMs)
    })

    return () => {
      window.clearTimeout(timer)
      unsubscribe()
    }
  }, [])

  const isRecruiter = mounted && theme === 'recruiter'

  if (isRecruiter) {
    return (
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-mx-deep" />
        {/* Soft, modern ambient light orbs for HR/Recruiter view */}
        <div className="absolute -left-[12%] -top-[15%] h-[560px] w-[560px] rounded-full bg-blue-500/12 blur-[130px]" />
        <div className="absolute -right-[10%] top-[25%] h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[140px]" />
        <div className="absolute bottom-[10%] left-[25%] h-[450px] w-[450px] rounded-full bg-sky-500/8 blur-[120px]" />
        {/* Subtle executive grid */}
        <div className="mx-grid-bg absolute inset-0 opacity-15" />
      </div>
    )
  }

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-mx-deep" />

      <div className="absolute inset-0">
        <DigitalRain
          fontSize={burst ? 14 : 16}
          speed={burst ? 16 : 8}
          density={burst ? 1 : 0.72}
          fade={burst ? 0.05 : 0.068}
          opacity={burst ? 0.82 : 0.5}
        />
      </div>

      <div className="mx-grid-bg absolute inset-0 opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-mx-deep/70 via-mx-deep/75 to-mx-deep/95" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_75%_at_50%_0%,rgb(var(--mx-primary)/0.10),transparent_60%)]" />

      <div className="absolute inset-x-0 top-0 h-px bg-mx-primary/25" />
      <div className="animate-scan-sweep absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-mx-primary/[0.07] to-transparent" />
    </div>
  )
}

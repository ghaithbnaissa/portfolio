'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { dispatchRainBurst } from './rain-bus'

const DEFAULT_BURST_MS = 6000

/**
 * Temporarily intensifies the digital rain, locally and page-wide.
 * Returns the live flag plus a `trigger` you can call from anywhere.
 */
export function useRainBurst() {
  const [burst, setBurst] = useState(false)
  const timerRef = useRef<number | undefined>(undefined)

  const trigger = useCallback((durationMs: number = DEFAULT_BURST_MS) => {
    setBurst(true)
    dispatchRainBurst(durationMs)
    window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => setBurst(false), durationMs)
  }, [])

  useEffect(() => () => window.clearTimeout(timerRef.current), [])

  return { burst, trigger }
}

'use client'

import { useEffect, useRef, useState } from 'react'

export function AnimatedNumber({ value }: { value: number | string }) {
  const numeric = typeof value === 'number' ? value : parseInt(value, 10)
  const [displayValue, setDisplayValue] = useState(isNaN(numeric) ? 0 : 0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (isNaN(numeric)) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let current = 0
          const duration = 1200
          const steps = 30
          const increment = numeric / steps
          const stepTime = duration / steps

          const timer = setInterval(() => {
            current += increment
            if (current >= numeric) {
              setDisplayValue(numeric)
              clearInterval(timer)
            } else {
              setDisplayValue(Math.floor(current))
            }
          }, stepTime)
        }
      },
      { threshold: 0.1 },
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [numeric, hasAnimated])

  if (isNaN(numeric)) {
    return <span>{value}</span>
  }

  return <span ref={elementRef}>{hasAnimated ? displayValue : 0}</span>
}

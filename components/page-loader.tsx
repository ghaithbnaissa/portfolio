'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Terminal, Cpu } from 'lucide-react'

export default function PageLoader() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Only run on fresh page loads (sessionStorage)
    const hasLoaded = sessionStorage.getItem('portfolio_visited')
    if (hasLoaded) {
      setLoading(false)
      return
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setLoading(false)
            sessionStorage.setItem('portfolio_visited', 'true')
          }, 350)
          return 100
        }
        const increment = Math.floor(Math.random() * 18) + 12
        return Math.min(100, prev + increment)
      })
    }, 90)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-mx-deep text-mx-bright select-none"
        >
          {/* Subtle ambient blur in preloader */}
          <div className="absolute h-96 w-96 rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />

          <div className="relative flex flex-col items-center gap-6 px-4 text-center z-10 max-w-sm">
            {/* Monogram Box with Rotating Ring */}
            <div className="relative flex h-16 w-16 items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-2xl border-2 border-dashed border-mx-primary/40"
              />
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-mx-primary/60 bg-mx-panel font-mono text-base font-extrabold text-mx-bright shadow-lg shadow-blue-500/20">
                <span>GB</span>
              </div>
            </div>

            {/* Engineer Title */}
            <div className="space-y-1">
              <h2 className="font-sans text-base sm:text-lg font-bold tracking-tight text-mx-bright">
                Ghaith Ben Aissa
              </h2>
              <p className="font-mono text-xs text-mx-textDim">
                Networks · DevSecOps · Systems
              </p>
            </div>

            {/* Loading Progress Bar */}
            <div className="w-48 space-y-2">
              <div className="h-1 w-full overflow-hidden rounded-full bg-mx-panel2 border border-mx-line/50">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-sky-400 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut' }}
                />
              </div>

              <div className="flex items-center justify-between font-mono text-2xs text-mx-textFaint">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>INITIALIZING...</span>
                </span>
                <span className="text-mx-primary font-semibold">{progress}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

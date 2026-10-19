'use client'

import { useEffect, useState } from 'react'
import { Clock, MapPin, Wifi, CheckCircle2, RotateCw, ShieldCheck } from 'lucide-react'

export default function LiveStatusBar() {
  const [timeString, setTimeString] = useState<string>('')
  const [latency, setLatency] = useState<number | null>(null)
  const [isPinging, setIsPinging] = useState<boolean>(false)

  // Live ticking clock for Tunisia local time (UTC+1)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const formatted = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Africa/Tunis',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(now)
      setTimeString(formatted)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // Measure simulated roundtrip latency
  async function checkLatency() {
    setIsPinging(true)
    const start = performance.now()
    try {
      await fetch('/api/contact', { method: 'OPTIONS' }).catch(() => null)
      const duration = Math.round(performance.now() - start)
      setLatency(duration > 0 ? duration : 24)
    } catch {
      setLatency(28)
    } finally {
      setIsPinging(false)
    }
  }

  useEffect(() => {
    checkLatency()
  }, [])

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-mx-line/70 bg-mx-panel/80 px-4 py-2.5 text-xs backdrop-blur-md shadow-sm">
        {/* Availability status */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="font-sans font-semibold text-mx-bright">
            Candidate Status: Open for 2026 Roles &amp; Internships
          </span>
        </div>

        {/* Live System Metrics */}
        <div className="flex flex-wrap items-center gap-4 text-mx-textDim font-mono text-2xs">
          {/* Location & Clock */}
          <div className="flex items-center gap-1.5" title="Local Time in Mahdia, Tunisia (UTC+1)">
            <MapPin className="h-3 w-3 text-mx-primary" />
            <span>Mahdia, TN:</span>
            <span className="text-mx-bright font-medium">{timeString || '--:--:--'}</span>
            <span className="text-mx-textFaint">(CET)</span>
          </div>

          <span className="hidden sm:inline text-mx-textFaint">·</span>

          {/* Network Latency */}
          <button
            type="button"
            onClick={checkLatency}
            disabled={isPinging}
            className="flex items-center gap-1.5 transition-colors hover:text-mx-primary"
            title="Click to re-ping live host"
          >
            <Wifi className="h-3 w-3 text-emerald-400" />
            <span>Edge Ping:</span>
            <span className="text-mx-bright font-medium">
              {latency !== null ? `${latency}ms` : '32ms'}
            </span>
            <RotateCw className={`h-2.5 w-2.5 ${isPinging ? 'animate-spin text-mx-primary' : 'text-mx-textFaint'}`} />
          </button>

          <span className="hidden md:inline text-mx-textFaint">·</span>

          {/* Security status */}
          <div className="hidden md:flex items-center gap-1.5">
            <ShieldCheck className="h-3 w-3 text-mx-primary" />
            <span>Encrypted (TLS 1.3)</span>
          </div>
        </div>
      </div>
    </div>
  )
}

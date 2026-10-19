'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import {
  INPUT_PACE,
  OUTPUT_PACE,
  segmentsLength,
  type TerminalEntry,
  type TerminalSegment,
  type TerminalStep,
} from './terminal-types'

/** Upper bound on queue items consumed in a single frame, so `instant` bursts stay responsive. */
const MAX_STEPS_PER_FRAME = 24

type ActivePrint = {
  id: number
  charsPerSecond: number
  carry: number
}

export function useTerminalWriter() {
  const [entries, setEntries] = useState<TerminalEntry[]>([])
  const [isTyping, setIsTyping] = useState(false)

  const entriesRef = useRef<TerminalEntry[]>([])
  const queueRef = useRef<TerminalStep[]>([])
  const activeRef = useRef<ActivePrint | null>(null)
  const pauseUntilRef = useRef(0)
  const nextIdRef = useRef(1)
  const frameRef = useRef(0)
  const lastFrameRef = useRef(0)
  const runningRef = useRef(false)
  const mountedRef = useRef(true)

  const commit = useCallback((next: TerminalEntry[]) => {
    entriesRef.current = next
    if (mountedRef.current) setEntries(next)
  }, [])

  const tick = useCallback(
    (now: number) => {
      frameRef.current = requestAnimationFrame(tick)

      const delta = lastFrameRef.current ? Math.min(0.05, (now - lastFrameRef.current) / 1000) : 0.016
      lastFrameRef.current = now

      const stop = () => {
        cancelAnimationFrame(frameRef.current)
        runningRef.current = false
        lastFrameRef.current = 0
        if (mountedRef.current) setIsTyping(false)
      }

      let steps = 0
      while (steps < MAX_STEPS_PER_FRAME) {
        steps += 1
        const active = activeRef.current

        if (active) {
          const entry = entriesRef.current.find((item) => item.id === active.id)
          if (!entry || entry.complete) {
            activeRef.current = null
            continue
          }

          active.carry += active.charsPerSecond * delta
          const whole = Math.floor(active.carry)
          if (whole < 1) return
          active.carry -= whole

          const revealed = Math.min(entry.length, entry.revealed + whole)
          const complete = revealed >= entry.length
          commit(
            entriesRef.current.map((item) =>
              item.id === entry.id ? { ...item, revealed, complete } : item,
            ),
          )

          if (!complete) return
          activeRef.current = null
          continue
        }

        if (pauseUntilRef.current > now) return

        const step = queueRef.current.shift()
        if (!step) {
          stop()
          return
        }

        if (step.kind === 'clear') {
          commit([])
          continue
        }

        if (step.kind === 'pause') {
          pauseUntilRef.current = now + step.ms
          return
        }

        const id = nextIdRef.current
        nextIdRef.current += 1
        const length = segmentsLength(step.segments)
        const complete = Boolean(step.instant) || length === 0

        commit([
          ...entriesRef.current,
          { id, kind: step.entryKind, segments: step.segments, revealed: complete ? length : 0, length, complete },
        ])

        if (!complete) {
          activeRef.current = {
            id,
            charsPerSecond: step.charsPerSecond ?? (step.entryKind === 'input' ? INPUT_PACE : OUTPUT_PACE),
            carry: 0,
          }
          return
        }
      }
    },
    [commit],
  )

  const start = useCallback(() => {
    if (runningRef.current) return
    runningRef.current = true
    lastFrameRef.current = 0
    setIsTyping(true)
    frameRef.current = requestAnimationFrame(tick)
  }, [tick])

  useEffect(() => {
    mountedRef.current = true

    // React StrictMode mounts, unmounts and remounts in development. The
    // cleanup below cancels the animation frame, so if work was queued during
    // the first mount the loop has to be restarted here.
    if ((queueRef.current.length > 0 || activeRef.current) && !runningRef.current) {
      start()
    }

    return () => {
      mountedRef.current = false
      cancelAnimationFrame(frameRef.current)
      runningRef.current = false
    }
  }, [start])

  /** Queue one or more writer steps; the loop starts itself as needed. */
  const write = useCallback(
    (steps: TerminalStep | TerminalStep[]) => {
      const list = Array.isArray(steps) ? steps : [steps]
      if (list.length === 0) return
      queueRef.current.push(...list)
      start()
    },
    [start],
  )

  /** Queue output lines that print one character at a time. */
  const print = useCallback(
    (lines: TerminalSegment[][], charsPerSecond: number = OUTPUT_PACE) => {
      write(
        lines.map((segments) => ({
          kind: 'print' as const,
          entryKind: 'output' as const,
          segments,
          charsPerSecond,
        })),
      )
    },
    [write],
  )

  /** Queue output lines that appear immediately (banners, art, redraws). */
  const printInstant = useCallback(
    (lines: TerminalSegment[][]) => {
      write(lines.map((segments) => ({ kind: 'print' as const, entryKind: 'output' as const, segments, instant: true })))
    },
    [write],
  )

  const pause = useCallback((ms: number) => write({ kind: 'pause', ms }), [write])
  const clear = useCallback(() => write({ kind: 'clear' }), [write])

  /** Reveal everything pending and empty the queue (Esc / Ctrl+C behaviour). */
  const flush = useCallback(() => {
    queueRef.current = []
    activeRef.current = null
    pauseUntilRef.current = 0
    cancelAnimationFrame(frameRef.current)
    runningRef.current = false
    lastFrameRef.current = 0
    setIsTyping(false)
    commit(entriesRef.current.map((entry) => ({ ...entry, revealed: entry.length, complete: true })))
  }, [commit])

  return { entries, isTyping, write, print, printInstant, pause, clear, flush }
}

export type TerminalWriter = ReturnType<typeof useTerminalWriter>

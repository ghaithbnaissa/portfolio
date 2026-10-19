'use client'

import { useEffect, useRef } from 'react'

/** Half-width katakana + latin + digits — the classic Matrix glyph soup. */
const GLYPHS =
  'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍｦｲｸｺｿﾁﾄﾉﾌﾔﾖﾙﾚﾛﾝ' +
  '0123456789' +
  'Z:・."=*+-<>¦｜╌'

type Channel = [number, number, number]

function parseChannels(value: string, fallback: Channel): Channel {
  const parts = value.trim().split(/[\s,/]+/).map(Number)
  if (parts.length < 3 || parts.some((part) => Number.isNaN(part))) return fallback
  return [parts[0], parts[1], parts[2]]
}

function rgba(channel: Channel, alpha: number) {
  return `rgba(${channel[0]}, ${channel[1]}, ${channel[2]}, ${alpha})`
}

function readThemeColors() {
  const style = getComputedStyle(document.documentElement)
  return {
    tail: parseChannels(style.getPropertyValue('--mx-primary'), [0, 255, 65]),
    head: parseChannels(style.getPropertyValue('--mx-rain-head'), [214, 255, 224]),
  }
}

type Drop = {
  row: number
  lastRow: number
  speed: number
  idleFor: number
}

export type DigitalRainProps = {
  className?: string
  /** Glyph cell size in CSS pixels. */
  fontSize?: number
  /** Baseline fall speed in rows per second. */
  speed?: number
  /** 0–1, share of columns that are streaming at any moment. */
  density?: number
  /** Trail decay per 60fps frame. Lower keeps longer trails. */
  fade?: number
  /** Canvas opacity, independent of the trail. */
  opacity?: number
}

export default function DigitalRain({
  className = '',
  fontSize = 15,
  speed = 9,
  density = 0.75,
  fade = 0.075,
  opacity = 0.55,
}: DigitalRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const colors = readThemeColors()
    const rowHeight = fontSize

    let width = 0
    let height = 0
    let columns = 0
    let drops: Drop[] = []
    let frame = 0
    let lastTime = 0
    let visible = true

    function makeDrop(startOffset: number): Drop {
      const row = -startOffset
      return { row, lastRow: Math.floor(row), speed: speed * (0.45 + Math.random()), idleFor: 0 }
    }

    function layout() {
      const rect = canvas!.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75)
      width = Math.max(1, Math.floor(rect.width))
      height = Math.max(1, Math.floor(rect.height))
      canvas!.width = Math.floor(width * dpr)
      canvas!.height = Math.floor(height * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx!.font = `${fontSize}px "JetBrains Mono", ui-monospace, monospace`
      ctx!.textBaseline = 'top'

      const nextColumns = Math.max(1, Math.ceil(width / fontSize))
      if (nextColumns !== columns) {
        columns = nextColumns
        drops = Array.from({ length: columns }, (_, index) =>
          makeDrop((index / Math.max(1, columns)) * (height / rowHeight) * 0.9 + Math.random() * 12),
        )
        ctx!.clearRect(0, 0, width, height)
      }
    }

    function drawGlyph(column: number, row: number) {
      const glyph = GLYPHS[(Math.random() * GLYPHS.length) | 0]
      const x = column * fontSize
      const y = row * rowHeight
      ctx!.fillStyle = rgba(colors.tail, 0.92)
      ctx!.fillText(glyph, x, y)
      ctx!.fillStyle = rgba(colors.head, 1)
      ctx!.fillText(glyph, x, y)
    }

    function step(now: number) {
      frame = requestAnimationFrame(step)
      if (!visible || document.hidden) {
        lastTime = now
        return
      }

      const delta = Math.min(0.06, lastTime ? (now - lastTime) / 1000 : 0.016)
      lastTime = now

      // Phosphor decay: erase a slice of alpha instead of painting black, so
      // the canvas keeps its transparency and trails fade to nothing.
      ctx!.globalCompositeOperation = 'destination-out'
      ctx!.fillStyle = `rgba(0, 0, 0, ${Math.min(0.6, fade * delta * 60)})`
      ctx!.fillRect(0, 0, width, height)
      ctx!.globalCompositeOperation = 'source-over'

      for (let column = 0; column < columns; column += 1) {
        const drop = drops[column]
        if (!drop) continue

        if (drop.idleFor > 0) {
          drop.idleFor -= delta
          if (drop.idleFor <= 0 && Math.random() < density) {
            drop.row = -Math.random() * 8
            drop.lastRow = Math.floor(drop.row)
            drop.speed = speed * (0.45 + Math.random())
          }
          continue
        }

        drop.row += drop.speed * delta
        const row = Math.floor(drop.row)
        if (row !== drop.lastRow) {
          drop.lastRow = row
          if (row >= 0) drawGlyph(column, row)
        }

        if (drop.row * rowHeight > height + rowHeight * 4) {
          const restartsSoon = Math.random() < density
          drop.idleFor = restartsSoon ? Math.random() * 2.2 : 0
          if (!restartsSoon) {
            drop.row = -Math.random() * 10
            drop.lastRow = Math.floor(drop.row)
            drop.speed = speed * (0.45 + Math.random())
          }
        }
      }
    }

    layout()
    const resizeObserver = new ResizeObserver(layout)
    resizeObserver.observe(canvas)

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
      },
      { threshold: 0 },
    )
    intersectionObserver.observe(canvas)

    // Re-tint the rain when the pill is switched at runtime.
    const themeObserver = new MutationObserver(() => {
      const next = readThemeColors()
      colors.tail = next.tail
      colors.head = next.head
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    if (reduceMotion) {
      // Draw a single static frame instead of animating.
      ctx.clearRect(0, 0, width, height)
      for (let column = 0; column < columns; column += 1) {
        for (let row = 0; row < height / rowHeight; row += 1) {
          if (Math.random() < 0.12) drawGlyph(column, row)
        }
      }
    } else {
      frame = requestAnimationFrame(step)
    }

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      themeObserver.disconnect()
    }
  }, [fontSize, speed, density, fade])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none block h-full w-full ${className}`}
      style={{ opacity }}
    />
  )
}

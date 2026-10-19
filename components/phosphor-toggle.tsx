'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Briefcase, Terminal } from 'lucide-react'

import { cn } from '../lib/utils'

const OPTIONS = [
  {
    id: 'matrix',
    label: 'MATRIX',
    shortLabel: 'Matrix',
    pill: 'bg-[#00ff88]',
    icon: Terminal,
    title: 'Matrix Mode — Developer terminal, digital rain, and cyberpunk aesthetic',
  },
  {
    id: 'recruiter',
    label: 'RECRUITER / HR',
    shortLabel: 'HR',
    pill: 'bg-[#3b82f6]',
    icon: Briefcase,
    title: 'Recruiter View — Clean, distraction-free executive overview for HR and hiring managers',
  },
] as const

/** Two-mode switcher: Matrix (Tech/Hacker) and Recruiter (Clean/HR). */
export function PhosphorToggle({
  className,
  compact = false,
}: {
  className?: string
  compact?: boolean
}) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const active = mounted ? (theme === 'recruiter' ? 'recruiter' : 'matrix') : 'matrix'

  return (
    <div
      role="radiogroup"
      aria-label="View mode toggle"
      className={cn(
        'flex items-center gap-1 rounded-full border border-mx-line bg-mx-panel/90 p-1 shadow-sm backdrop-blur-md',
        className,
      )}
    >
      {OPTIONS.map((option) => {
        const selected = active === option.id
        const Icon = option.icon
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={selected}
            title={option.title}
            onClick={() => setTheme(option.id)}
            className={cn(
              'flex items-center gap-1.5 rounded-full font-mono text-2xs uppercase tracking-[0.14em] transition-all duration-200',
              compact ? 'px-2 py-0.5 text-[11px]' : 'px-3 py-1',
              selected
                ? 'bg-mx-primary/20 text-mx-bright font-semibold shadow-sm'
                : 'text-mx-textDim hover:bg-mx-primary/10 hover:text-mx-bright',
            )}
          >
            <Icon className={cn('h-3 w-3', selected ? 'text-mx-primary' : 'text-mx-textFaint')} />
            <span
              aria-hidden="true"
              className={cn('h-1.5 w-1.5 rounded-full', option.pill, selected ? 'opacity-100 ring-2 ring-mx-primary/30' : 'opacity-40')}
            />
            <span>{compact ? option.shortLabel : option.label}</span>
          </button>
        )
      })}
    </div>
  )
}

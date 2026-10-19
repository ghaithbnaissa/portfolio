'use client'

import { memo } from 'react'

import { cn } from '../../lib/utils'
import { SHELL_PROMPT } from './terminal-config'
import { revealSegments, type TerminalEntry, type TerminalTone } from './terminal-types'

const TONE_CLASS: Record<TerminalTone, string> = {
  default: 'text-mx-text',
  primary: 'text-mx-primary',
  muted: 'text-mx-textDim',
  dim: 'text-mx-textFaint',
  bright: 'text-mx-bright',
  warn: 'text-mx-warn',
  danger: 'text-mx-danger',
  success: 'text-mx-primary-dim',
}

/** Solid blinking block, exactly like a hardware terminal caret. */
export function TerminalCaret({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn('ml-0.5 inline-block h-[0.92em] w-[0.5em] translate-y-[0.14em] animate-blink bg-mx-primary align-baseline', className)}
    />
  )
}

const TerminalLine = memo(function TerminalLine({ entry }: { entry: TerminalEntry }) {
  const visible = revealSegments(entry.segments, entry.revealed)
  const hasText = visible.some((segment) => segment.text.length > 0)
  const isTyping = !entry.complete && entry.kind !== 'input'

  return (
    <div className={cn('whitespace-pre-wrap break-words', entry.kind === 'input' && 'mt-3.5')}>
      {entry.kind === 'input' ? (
        <>
          <span className="text-mx-primary-dim">{SHELL_PROMPT}</span>
          <span className="text-mx-primary">$ </span>
        </>
      ) : null}

      {visible.map((segment, index) => (
        <span key={index} className={TONE_CLASS[segment.tone ?? 'default']}>
          {segment.text}
        </span>
      ))}

      {isTyping ? <TerminalCaret /> : null}
      {!hasText && !isTyping && entry.kind !== 'input' ? '\u00a0' : null}
    </div>
  )
})

export default function TerminalOutput({ entries }: { entries: TerminalEntry[] }) {
  return (
    <div className="space-y-0">
      {entries.map((entry) => (
        <TerminalLine key={entry.id} entry={entry} />
      ))}
    </div>
  )
}

import * as React from 'react'
import { cn } from '../../lib/utils'

type GlitchTextProps = {
  text: string
  className?: string
}

/**
 * Clean text component (formerly glitch text) providing pristine, crisp typography.
 */
export default function GlitchText({ text, className }: GlitchTextProps) {
  return <span className={cn('tracking-tight font-display', className)}>{text}</span>
}

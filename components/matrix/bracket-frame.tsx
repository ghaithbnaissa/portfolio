import type { CSSProperties, ReactNode } from 'react'

import { cn } from '../../lib/utils'

const CORNERS = [
  'left-0 top-0 border-l-2 border-t-2',
  'right-0 top-0 border-r-2 border-t-2',
  'bottom-0 left-0 border-b-2 border-l-2',
  'bottom-0 right-0 border-b-2 border-r-2',
]

type BracketFrameProps = {
  children: ReactNode
  className?: string
  /** Length of each bracket arm in pixels. */
  size?: number
  /** Fade the brackets in on hover of the nearest `.group` ancestor. */
  onHover?: boolean
}

/** Targets the four corners of a panel with square "targeting" brackets. */
export default function BracketFrame({ children, className, size = 14, onHover = false }: BracketFrameProps) {
  const armStyle: CSSProperties = { width: size, height: size }

  return (
    <div className={cn('relative', className)}>
      {CORNERS.map((corner) => (
        <span
          key={corner}
          aria-hidden="true"
          style={armStyle}
          className={cn(
            'pointer-events-none absolute border-mx-primary/70 transition-opacity duration-300',
            corner,
            onHover ? 'opacity-0 group-hover:opacity-100' : 'opacity-100',
          )}
        />
      ))}
      {children}
    </div>
  )
}

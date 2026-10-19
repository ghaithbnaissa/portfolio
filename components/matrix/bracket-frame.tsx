import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

type BracketFrameProps = {
  children: ReactNode
  className?: string
  size?: number
  onHover?: boolean
}

/**
 * Modern card container wrapper providing smooth hover depth and subtle edge refinement.
 */
export default function BracketFrame({ children, className, onHover = false }: BracketFrameProps) {
  return (
    <div
      className={cn(
        'group relative transition-all duration-300',
        onHover && 'hover:-translate-y-0.5',
        className,
      )}
    >
      {children}
    </div>
  )
}

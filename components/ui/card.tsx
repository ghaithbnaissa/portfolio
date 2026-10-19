'use client'

import * as React from 'react'
import { cn } from '../../lib/utils'

function Card({ className, onMouseMove, ...props }: React.ComponentProps<'div'>) {
  const cardRef = React.useRef<HTMLDivElement>(null)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      cardRef.current.style.setProperty('--mouse-x', `${x}px`)
      cardRef.current.style.setProperty('--mouse-y', `${y}px`)
    }
    onMouseMove?.(e)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={cn(
        'group relative overflow-hidden rounded-xl border border-mx-line/70 bg-mx-panel shadow-sm transition-all duration-300 hover:border-mx-primary/50 hover:shadow-xl hover:shadow-blue-500/5',
        'before:pointer-events-none before:absolute before:-inset-px before:rounded-xl before:opacity-0 before:transition-opacity before:duration-300 group-hover:before:opacity-100 before:bg-[radial-gradient(400px_circle_at_var(--mouse-x,0px)_var(--mouse-y,0px),rgba(59,130,246,0.12),transparent_40%)]',
        className,
      )}
      {...props}
    />
  )
}

/** Subtle header strip pinned to the top of a card */
function CardCommand({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'relative z-10 flex items-center gap-2 rounded-t-xl border-b border-mx-line/60 bg-mx-panel2/50 px-4 py-2 font-mono text-2xs text-mx-textDim',
        className,
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('relative z-10 flex flex-col gap-1.5 p-5 sm:p-6', className)} {...props} />
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('font-sans font-bold text-base sm:text-lg tracking-tight text-mx-bright', className)} {...props} />
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('text-sm leading-6 text-mx-textDim', className)} {...props} />
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('relative z-10 p-5 pt-0 sm:p-6 sm:pt-0', className)} {...props} />
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('relative z-10 flex items-center p-5 pt-0 sm:p-6 sm:pt-0', className)} {...props} />
}

export { Card, CardCommand, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

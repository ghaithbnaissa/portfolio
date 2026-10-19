import type { ComponentType, ReactNode } from 'react'

import { cn } from '../../lib/utils'

type SectionHeadingProps = {
  /** Display index, e.g. "02 / ABOUT". */
  index: string
  title: string
  /** Subtitle or kicker rendered beside or below the title. */
  kicker?: string
  icon?: ComponentType<{ className?: string }>
  /** Optional right-aligned slot (counters, badges, links). */
  meta?: ReactNode
  className?: string
}

export default function SectionHeading({
  index,
  title,
  kicker,
  icon: Icon,
  meta,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('mb-8', className)}>
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-mx-line bg-mx-panel px-2.5 py-0.5 font-mono text-2xs uppercase tracking-wider text-mx-primary font-medium">
          <span className="h-1.5 w-1.5 rounded-full bg-mx-primary animate-pulse" />
          {index}
        </span>
        <span className="mx-hairline flex-1" />
        {meta ? <div className="shrink-0">{meta}</div> : null}
      </div>

      <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
        <h2 className="flex items-center gap-3 font-display text-2xl font-bold tracking-tight text-mx-bright sm:text-3xl">
          {Icon ? <Icon className="h-6 w-6 shrink-0 text-mx-primary" /> : null}
          <span>{title}</span>
        </h2>
        {kicker ? <p className="font-sans text-xs sm:text-sm text-mx-textDim font-normal">{kicker}</p> : null}
      </div>
    </div>
  )
}

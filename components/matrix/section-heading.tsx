import type { ComponentType, ReactNode } from 'react'

import { cn } from '../../lib/utils'
import GlitchText from './glitch-text'

type SectionHeadingProps = {
  /** Display index, e.g. "02". */
  index: string
  title: string
  /** Short `// comment` style kicker rendered above the title. */
  kicker?: string
  icon?: ComponentType<{ className?: string }>
  /** Optional right-aligned slot (counters, badges, links). */
  meta?: ReactNode
  className?: string
}

export default function SectionHeading({ index, title, kicker, icon: Icon, meta, className }: SectionHeadingProps) {
  return (
    <div className={cn('mb-7', className)}>
      <div className="flex items-center gap-3">
        <span className="mx-label shrink-0 text-mx-primary/80">{index}</span>
        <span className="mx-hairline flex-1" />
        {meta ? <div className="shrink-0">{meta}</div> : null}
      </div>

      <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
        <h2 className="flex items-baseline gap-3 font-display text-2xl tracking-[0.06em] text-mx-bright sm:text-3xl">
          {Icon ? <Icon className="mx-glow relative top-[2px] h-5 w-5 shrink-0 text-mx-primary sm:h-6 sm:w-6" /> : null}
          <GlitchText text={title} />
        </h2>
        {kicker ? <p className="font-mono text-xs text-mx-textDim">{kicker}</p> : null}
      </div>
    </div>
  )
}

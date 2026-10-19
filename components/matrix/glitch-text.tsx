import { cn } from '../../lib/utils'

type GlitchTextProps = {
  text: string
  className?: string
}

/**
 * Renders text with two offset, screen-blended duplicates clipped to random
 * slices — the CRT chromatic-aberration flicker from the Matrix interfaces.
 */
export default function GlitchText({ text, className }: GlitchTextProps) {
  return (
    <span className={cn('mx-glitch', className)}>
      {text}
      <span aria-hidden="true" className="mx-glitch__layer mx-glitch__layer--a">
        {text}
      </span>
      <span aria-hidden="true" className="mx-glitch__layer mx-glitch__layer--b">
        {text}
      </span>
    </span>
  )
}

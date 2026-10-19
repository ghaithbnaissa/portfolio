export type TerminalTone =
  | 'default'
  | 'primary'
  | 'muted'
  | 'dim'
  | 'bright'
  | 'warn'
  | 'danger'
  | 'success'

export type TerminalSegment = {
  text: string
  tone?: TerminalTone
}

export type EntryKind = 'input' | 'output' | 'banner'

export type TerminalEntry = {
  id: number
  kind: EntryKind
  segments: TerminalSegment[]
  /** Characters revealed so far while the typewriter is running. */
  revealed: number
  /** Characters in the entry once fully printed. */
  length: number
  complete: boolean
}

/** One unit of work for the typewriter queue. */
export type TerminalStep =
  | { kind: 'print'; entryKind: EntryKind; segments: TerminalSegment[]; charsPerSecond?: number; instant?: boolean }
  | { kind: 'pause'; ms: number }
  | { kind: 'clear' }

export function segmentsLength(segments: TerminalSegment[]): number {
  return segments.reduce((total, segment) => total + segment.text.length, 0)
}

/** Slice a segment list down to the first `revealed` characters. */
export function revealSegments(segments: TerminalSegment[], revealed: number): TerminalSegment[] {
  const visible: TerminalSegment[] = []
  let remaining = revealed

  for (const segment of segments) {
    if (remaining <= 0) break
    const take = Math.min(segment.text.length, remaining)
    visible.push({ text: segment.text.slice(0, take), tone: segment.tone })
    remaining -= take
  }

  return visible
}

/** Shorthand for a single unstyled-or-toned line of console output. */
export function line(text: string, tone: TerminalTone = 'default'): TerminalSegment[] {
  return [{ text, tone }]
}

/** A multi-tone line, e.g. a prompt glyph followed by bright command text. */
export function parts(...segments: Array<[string, TerminalTone?]>): TerminalSegment[] {
  return segments.map(([text, tone]) => ({ text, tone }))
}

export function blank(): TerminalSegment[] {
  return []
}

export const OUTPUT_PACE = 900
export const INPUT_PACE = 34

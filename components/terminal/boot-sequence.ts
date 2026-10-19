import { line, parts, type TerminalSegment, type TerminalStep } from './terminal-types'
import { bannerLines } from './ascii-art'

const typed = (segments: TerminalSegment[], charsPerSecond: number): TerminalStep => ({
  kind: 'print',
  entryKind: 'banner',
  segments,
  charsPerSecond,
})

/**
 * Lightweight, instant boot sequence.
 * Straightforward: types `whoami` and prints the clean 3-line card.
 */
export function buildBootSequence(): TerminalStep[] {
  return [
    typed(
      parts(
        ['ghaith@workstation:~$ ', 'primary'],
        ['whoami', 'bright'],
      ),
      60,
    ),
    { kind: 'pause', ms: 120 },

    ...bannerLines().map<TerminalStep>((segments) => ({
      kind: 'print',
      entryKind: 'banner',
      segments,
      instant: true,
    })),

    typed(
      parts(
        ['💡 Try: ', 'muted'],
        ['about', 'primary'],
        [' · ', 'muted'],
        ['skills', 'primary'],
        [' · ', 'muted'],
        ['projects', 'primary'],
        [' · ', 'muted'],
        ['help', 'primary'],
      ),
      120,
    ),
    typed(line('', 'default'), 1),
  ]
}

import type { TerminalSegment } from './terminal-types'

/** Side effects a command can ask the terminal shell to perform. */
export type CommandEffect =
  | { type: 'clear' }
  | { type: 'theme'; value: 'matrix' | 'recruiter' }
  | { type: 'burst' }
  | { type: 'navigate'; target: string }

export type CommandContext = {
  history: string[]
  theme: 'matrix' | 'recruiter'
}

export type CommandOutcome = {
  lines: TerminalSegment[][]
  effect?: CommandEffect
  /** Print immediately instead of one character at a time (art, tables). */
  instant?: boolean
  /** Marks the outcome as a failure so it renders in the danger tone. */
  error?: boolean
}

export type CommandGroup = 'profile' | 'files' | 'system' | 'easter'

export type CommandDefinition = {
  name: string
  /** Shown by `man <name>` and `help <name>`. */
  usage?: string
  summary: string
  group: CommandGroup
  /** Kept out of the `help` listing. */
  hidden?: boolean
  run: (args: string[], context: CommandContext) => CommandOutcome
}

export function ok(lines: TerminalSegment[][], extra: Omit<CommandOutcome, 'lines'> = {}): CommandOutcome {
  return { lines, ...extra }
}

export function instant(lines: TerminalSegment[][]): CommandOutcome {
  return { lines, instant: true }
}

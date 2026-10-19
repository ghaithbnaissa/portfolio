import {
  ok,
  type CommandContext,
  type CommandDefinition,
  type CommandGroup,
  type CommandOutcome,
} from './command-types'
import { easterCommands } from './commands-easter'
import { profileCommands } from './commands-profile'
import { systemCommands } from './commands-system'
import { blank, line, parts, type TerminalSegment } from './terminal-types'

/** Shorthand aliases so the shell forgives muscle memory from real terminals. */
export const ALIASES: Record<string, string> = {
  '?': 'help',
  certs: 'certifications',
  cert: 'certifications',
  stack: 'skills',
  bio: 'about',
  whoami: 'about',
  work: 'projects',
  timeline: 'experience',
  education: 'experience',
  email: 'contact',
  phone: 'contact',
  github: 'contact',
  cv: 'resume',
  ll: 'ls',
  dir: 'ls',
  cls: 'clear',
}

function helpLines(): TerminalSegment[][] {
  const visible = allCommands.filter((command) => !command.hidden)

  return [
    line('AVAILABLE COMMANDS', 'bright'),
    line('─'.repeat(52), 'dim'),
    ...visible.map((cmd) =>
      parts(
        ['  ', 'dim'],
        [cmd.name.padEnd(16, ' '), 'primary'],
        [cmd.summary, 'default'],
      ),
    ),
    line('─'.repeat(52), 'dim'),
    line('Tip: Type any command above to explore.', 'muted'),
  ]
}

function notFound(name: string): CommandOutcome {
  return {
    error: true,
    lines: [
      line(`command not found: ${name}`, 'danger'),
      line('type `help` to list every available command.', 'muted'),
    ],
  }
}

const coreCommands: CommandDefinition[] = [
  {
    name: 'clear',
    usage: 'clear',
    summary: 'clear the console screen',
    group: 'system',
    run: () => ({ lines: [], effect: { type: 'clear' } }),
  },
  {
    name: 'help',
    usage: 'help',
    summary: 'list available commands',
    group: 'system',
    hidden: true,
    run: () => ok(helpLines()),
  },
  {
    name: 'man',
    usage: 'man <command>',
    summary: 'describe a single command',
    group: 'system',
    hidden: true,
    run: (args) => {
      const requested = (args[0] ?? '').toLowerCase()
      if (!requested) return { error: true, lines: [line('man: what manual page do you want?', 'danger')] }

      const resolved = ALIASES[requested] ?? requested
      const command = allCommands.find((candidate) => candidate.name === resolved)
      if (!command) return notFound(requested)

      return ok([
        line(command.name.toUpperCase(), 'bright'),
        line('─'.repeat(Math.min(48, command.name.length + 10)), 'dim'),
        parts(['usage    ', 'muted'], [command.usage ?? command.name, 'primary']),
        parts(['summary  ', 'muted'], [command.summary, 'default']),
        parts(['group    ', 'muted'], [command.group, 'default']),
      ])
    },
  },
]

export const allCommands: CommandDefinition[] = [
  ...profileCommands,
  ...systemCommands,
  ...coreCommands,
  ...easterCommands,
]

export const commandNames: string[] = allCommands.map((command) => command.name).sort()

export const visibleCommandNames: string[] = allCommands
  .filter((command) => !command.hidden)
  .map((command) => command.name)
  .sort()

/** Split raw input into a resolved command and its arguments, then run it. */
export function runCommand(input: string, context: CommandContext): CommandOutcome {
  const trimmed = input.trim()
  if (!trimmed) return { lines: [] }

  const [rawName, ...args] = trimmed.split(/\s+/)
  const requested = rawName.toLowerCase()
  const resolved = ALIASES[requested] ?? requested
  const command = allCommands.find((candidate) => candidate.name === resolved)

  if (!command) return notFound(requested)
  return command.run(args, context)
}

/** Longest-prefix match used by Tab completion in the prompt. */
export function completeCommand(prefix: string): string | null {
  const value = prefix.trim().toLowerCase()
  if (!value) return null
  return visibleCommandNames.find((name) => name.startsWith(value)) ?? null
}

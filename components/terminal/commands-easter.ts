import { ok, type CommandDefinition } from './command-types'
import { blank, line, parts } from './terminal-types'

const RAIN = ['▓▓▒░░', '░▓▓▒░', '░░▓▓▒']

const rainStreak = [
  ...RAIN.map((row, index) => parts(['   ', 'dim'], [row, index === 1 ? 'primary' : 'muted'])),
  blank(),
]

export const easterCommands: CommandDefinition[] = [
  {
    name: 'matrix',
    summary: 'raise the rain',
    group: 'easter',
    hidden: true,
    run: (args) => {
      const seconds = Number(args[0])
      const duration = Number.isFinite(seconds) && seconds > 0 ? Math.min(20, seconds) : 6
      return ok(
        [
          ...rainStreak,
          line('"Unfortunately, no one can be told what the Matrix is.', 'bright'),
          line(' You have to see it for yourself."', 'bright'),
          line('                                     — Morpheus', 'muted'),
          blank(),
          parts(['rain intensity raised for ', 'muted'], [`${duration}`, 'primary'], [' seconds.', 'muted']),
        ],
        { effect: { type: 'burst' } },
      )
    },
  },
  {
    name: 'spoon',
    summary: 'the spoon is not real',
    group: 'easter',
    hidden: true,
    run: () =>
      ok([
        line('Do not try and bend the spoon. That is impossible.', 'default'),
        line('Instead, only try to realise the truth: there is no spoon.', 'bright'),
        blank(),
        line('Then you will see that it is not the spoon that bends,', 'muted'),
        line('it is only yourself.', 'muted'),
      ]),
  },
  {
    name: 'neo',
    summary: 'wake up',
    group: 'easter',
    hidden: true,
    run: () =>
      ok(
        [...rainStreak, line('Wake up, Neo...', 'bright'), line('The Matrix has you.', 'primary')],
        { effect: { type: 'burst' } },
      ),
  },
  {
    name: 'wake',
    summary: 'wake up',
    group: 'easter',
    hidden: true,
    run: () =>
      ok(
        [...rainStreak, line('Follow the white rabbit.', 'primary'), line('Knock, knock, Neo.', 'bright')],
        { effect: { type: 'burst' } },
      ),
  },
  {
    name: 'recruiter',
    summary: 'clean executive candidate summary for HR, recruiters & CEOs',
    group: 'profile',
    hidden: true,
    run: () =>
      ok(
        [
          line('EXECUTIVE CANDIDATE SUMMARY // HR & RECRUITER VIEW', 'bright'),
          line('─'.repeat(54), 'dim'),
          parts(['Name:       ', 'muted'], ['Ghaith Ben Aissa', 'bright']),
          parts(['Role:       ', 'muted'], ['Computer Engineering Student — Network Expert', 'primary']),
          parts(['Target:     ', 'muted'], ['DevSecOps Engineer | Network Admin | Cloud Infra', 'default']),
          parts(['Degrees:    ', 'muted'], ['Master\'s (2026-2028), Bachelor\'s (2023-2026)', 'default']),
          parts(['Certs:      ', 'muted'], ['Cisco CCNA, Cybersecurity, Network Troubleshooting', 'default']),
          parts(['Clearance:  ', 'muted'], ['DevSecOps Shift-Left Security & Automation', 'default']),
          parts(['Status:     ', 'muted'], ['Open for 2026 Internships & Graduate Positions', 'success']),
          blank(),
          line('Switched to clean, distraction-free Recruiter mode.', 'muted'),
        ],
        { effect: { type: 'theme', value: 'recruiter' } },
      ),
  },
  {
    name: 'redpill',
    summary: 'switch to clean recruiter mode',
    group: 'easter',
    hidden: true,
    run: () =>
      ok(
        [
          line('You take the red pill.', 'danger'),
          line('See the clean truth — candidate credentials, zero distraction.', 'default'),
          blank(),
          parts(['mode engaged: ', 'muted'], ['RECRUITER / HR', 'warn'], [' — executive clarity.', 'muted']),
        ],
        { effect: { type: 'theme', value: 'recruiter' } },
      ),
  },
  {
    name: 'bluepill',
    summary: 'stay in the construct',
    group: 'easter',
    hidden: true,
    run: () =>
      ok(
        [
          line('You take the blue pill.', 'primary'),
          line('Welcome back to the Matrix construct.', 'default'),
          blank(),
          parts(['mode engaged: ', 'muted'], ['MATRIX', 'success'], [' — green phosphor & rain restored.', 'muted']),
        ],
        { effect: { type: 'theme', value: 'matrix' } },
      ),
  },
  {
    name: 'theme',
    usage: 'theme [matrix|recruiter]',
    summary: 'switch between Matrix (Tech) and Recruiter (Clean) modes',
    group: 'easter',
    hidden: true,
    run: (args, context) => {
      const target = (args[0] ?? '').toLowerCase()
      if (target !== 'matrix' && target !== 'recruiter') {
        return ok([
          parts(['current mode  ', 'muted'], [context.theme.toUpperCase(), 'primary']),
          line('switch with `theme matrix` or `theme recruiter`.', 'muted'),
        ])
      }
      return ok([parts(['mode -> ', 'muted'], [target.toUpperCase(), 'primary'])], {
        effect: { type: 'theme', value: target as 'matrix' | 'recruiter' },
      })
    },
  },
]

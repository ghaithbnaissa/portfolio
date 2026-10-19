import { blank, line, parts, type TerminalSegment } from './terminal-types'

/**
 * Lightweight, minimalist developer profile banner.
 * Crisp, readable, zero visual clutter.
 */
export function bannerLines(): TerminalSegment[][] {
  return [
    blank(),
    parts(
      ['● ', 'success'],
      ['Ghaith Ben Aissa ', 'bright'],
      ['— Networks & DevSecOps Engineer', 'primary'],
    ),
    parts(
      ['  Master\'s in Computer Engineering (Network Expert) · Cisco CCNA', 'muted'],
    ),
    parts(
      ['  Mahdia, Tunisia · ', 'muted'],
      ['🟢 Open for 2026 roles & internships', 'success'],
    ),
    blank(),
  ]
}

const MARK = ['│  ▓▓▒░░', '│  ░▓▓▒░', '│  ░░▓▓▒']

const FACTS: Array<[string, string]> = [
  ['engineer', 'Ghaith Ben Aissa'],
  ['focus', 'Networks, Linux, DevSecOps & Observability'],
  ['education', 'Master\'s Network Expert (2026-2028)'],
  ['certs', 'Cisco CCNA Certified (5 credentials)'],
  ['stack', 'Docker · Jenkins · k3s · Prometheus · Proxmox'],
]

/** Minimalist Fastfetch style system readout */
export function neofetchLines(): TerminalSegment[][] {
  const markRows: TerminalSegment[][] = MARK.map((row, index) => parts([row, index === 1 ? 'primary' : 'muted']))
  const factRows: TerminalSegment[][] = FACTS.map(([key, value]) =>
    key === 'engineer'
      ? parts([key.padEnd(11, ' '), 'primary'], [value, 'bright'])
      : parts([key.padEnd(11, ' '), 'muted'], [value, 'default']),
  )

  const height = Math.max(markRows.length, factRows.length)
  const rows: TerminalSegment[][] = []

  for (let index = 0; index < height; index += 1) {
    rows.push([...(markRows[index] ?? line('│', 'muted')), ...(factRows[index] ?? [])])
  }

  return [blank(), ...rows, blank()]
}

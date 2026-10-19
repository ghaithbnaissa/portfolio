import { bannerLines, neofetchLines } from './ascii-art'
import { instant, ok, type CommandDefinition } from './command-types'
import { fileNames, findFile, virtualFiles } from './file-system'
import { line, parts, type TerminalSegment } from './terminal-types'

const usageError = (message: string, hint: string): TerminalSegment[][] => [line(message, 'danger'), line(hint, 'muted')]

const pingLines = (host: string): TerminalSegment[][] => {
  const lines: TerminalSegment[][] = [line(`PING ${host} (140.82.121.4) 56(84) bytes of data.`, 'muted')]
  for (let sequence = 1; sequence <= 4; sequence += 1) {
    const time = (28 + Math.random() * 8).toFixed(1)
    lines.push(
      parts(
        [`64 bytes from ${host}: `, 'default'],
        [`icmp_seq=${sequence} `, 'muted'],
        [`ttl=56 `, 'muted'],
        [`time=${time} ms`, 'primary'],
      ),
    )
  }
  lines.push(
    line(`--- ${host} ping statistics ---`, 'muted'),
    parts(['4 packets transmitted, ', 'default'], ['4 received', 'success'], [', 0% packet loss', 'default']),
  )
  return lines
}

const ROUTES: Array<[string, string, string]> = [
  ['0.0.0.0', '192.168.1.1', 'eth0 (WAN Gateway)'],
  ['10.10.0.0', '0.0.0.0', 'docker0 (Bridge)'],
  ['172.17.0.0', '0.0.0.0', 'br-devsecops (Virtual)'],
  ['10.43.0.0', '0.0.0.0', 'cni0 (k3s Kubernetes)'],
]

export const systemCommands: CommandDefinition[] = [
  {
    name: 'ls',
    usage: 'ls',
    summary: 'list system files and dossiers',
    group: 'files',
    hidden: true,
    run: () =>
      instant([
        line('total 7  ·  /home/ghaith/portfolio', 'bright'),
        line('─'.repeat(54), 'dim'),
        ...virtualFiles.map((file) =>
          parts(
            ['-rw-r--r--  ', 'dim'],
            [file.name.padEnd(24, ' '), file.name.endsWith('.yaml') ? 'primary' : 'default'],
            [file.summary, 'muted'],
          ),
        ),
        line('─'.repeat(54), 'dim'),
        line('Tip: Read any file with `cat <filename>`', 'muted'),
      ]),
  },
  {
    name: 'cat',
    usage: 'cat <file>',
    summary: 'inspect contents of a system file',
    group: 'files',
    hidden: true,
    run: (args) => {
      const name = args.join(' ')
      if (!name) return { error: true, lines: usageError('cat: missing operand', 'try: ' + fileNames.join(', ')) }

      const file = findFile(name)
      if (!file) {
        return {
          error: true,
          lines: usageError(`cat: ${name}: No such file or directory`, 'available: ' + fileNames.join(', ')),
        }
      }
      return ok(file.read())
    },
  },
  {
    name: 'pwd',
    summary: 'print working directory',
    group: 'files',
    hidden: true,
    run: () => ok([line('/home/ghaith/portfolio', 'primary')]),
  },
  {
    name: 'neofetch',
    summary: 'system architecture and engineer telemetry',
    group: 'system',
    hidden: true,
    run: () => instant(neofetchLines()),
  },
  {
    name: 'banner',
    summary: 'print engineer nameplate',
    group: 'system',
    hidden: true,
    run: () => instant(bannerLines()),
  },
  {
    name: 'uptime',
    summary: 'system uptime and load telemetry',
    group: 'system',
    hidden: true,
    run: () => {
      const seconds = Math.round(performance.now() / 1000)
      const minutes = Math.floor(seconds / 60)
      return ok([
        parts([`${new Date().toTimeString().slice(0, 8)} `, 'muted'], ['up ', 'default'], ['production grade', 'primary']),
        line(`session time: ${minutes}m ${seconds % 60}s`, 'muted'),
        parts(['load average: ', 'muted'], ['0.14 0.08 0.05', 'default']),
        parts(['system status: ', 'muted'], ['100% operational', 'success']),
      ])
    },
  },
  {
    name: 'date',
    summary: 'current system and local time',
    group: 'system',
    hidden: true,
    run: () => ok([line(new Date().toString(), 'primary')]),
  },
  {
    name: 'echo',
    usage: 'echo <text>',
    summary: 'print text to the terminal',
    group: 'system',
    hidden: true,
    run: (args) => ok([line(args.join(' '), 'default')]),
  },
  {
    name: 'sudo',
    usage: 'sudo <command>',
    summary: 'privilege check',
    group: 'system',
    hidden: true,
    run: (args) => {
      const target = args.join(' ')
      return ok([
        line(`[SECURITY AUDIT] ${target || 'sudo'}: User 'ghaith' is in sudoers group.`, 'warn'),
        line('Production safety controls active. Read-only demonstration mode.', 'muted'),
      ])
    },
  },
  {
    name: 'ping',
    usage: 'ping <host>',
    summary: 'test gateway and host reachability',
    group: 'system',
    hidden: true,
    run: (args) => {
      const host = args[0] ?? 'github.com'
      return ok(pingLines(host))
    },
  },
  {
    name: 'routing',
    summary: 'kernel network routing table',
    group: 'system',
    hidden: true,
    run: () =>
      instant([
        line('Kernel IP Routing Table (Enterprise Topology)', 'bright'),
        line('Destination     Gateway         Interface', 'muted'),
        line('─'.repeat(54), 'dim'),
        ...ROUTES.map(([destination, gateway, iface]) =>
          parts(
            [destination.padEnd(16, ' '), 'default'],
            [gateway.padEnd(16, ' '), 'default'],
            [iface, 'primary'],
          ),
        ),
        line('─'.repeat(54), 'dim'),
        line('Static and dynamic routing managed via Cisco enterprise conventions.', 'muted'),
      ]),
  },
  {
    name: 'history',
    summary: 'list commands issued in this session',
    group: 'system',
    hidden: true,
    run: (_args, context) => {
      if (context.history.length === 0) return ok([line('no history recorded yet.', 'muted')])
      return ok(
        context.history.map((entry, index) => parts([`${String(index + 1).padStart(3, ' ')}  `, 'muted'], [entry, 'default'])),
      )
    },
  },
  {
    name: 'exit',
    summary: 'close console session',
    group: 'system',
    hidden: true,
    run: () =>
      ok([
        line('Session active. You can continue browsing the portfolio below.', 'primary'),
      ]),
  },
]

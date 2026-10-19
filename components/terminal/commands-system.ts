import { bannerLines, neofetchLines } from './ascii-art'
import { instant, ok, type CommandDefinition } from './command-types'
import { fileNames, findFile, virtualFiles } from './file-system'
import { line, parts, type TerminalSegment } from './terminal-types'

const usageError = (message: string, hint: string): TerminalSegment[][] => [line(message, 'danger'), line(hint, 'muted')]

const pingLines = (host: string): TerminalSegment[][] => {
  const lines: TerminalSegment[][] = [line(`PING ${host} (140.82.121.4) 56(84) bytes of data.`, 'muted')]
  for (let sequence = 1; sequence <= 4; sequence += 1) {
    const time = (34 + Math.random() * 12).toFixed(1)
    lines.push(
      parts(
        [`64 bytes from ${host}: `, 'default'],
        [`icmp_seq=${sequence} `, 'muted'],
        [`ttl=54 `, 'muted'],
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
  ['0.0.0.0', '192.168.1.1', 'eth0'],
  ['10.10.0.0', '0.0.0.0', 'docker0'],
  ['172.17.0.0', '0.0.0.0', 'br-1a2b3c'],
  ['10.43.0.0', '0.0.0.0', 'cni0'],
]

export const systemCommands: CommandDefinition[] = [
  {
    name: 'ls',
    usage: 'ls',
    summary: 'list the construct filesystem',
    group: 'files',
    hidden: true,
    run: () =>
      instant([
        line('total 7  ·  /construct/ghaith', 'bright'),
        line('─'.repeat(52), 'dim'),
        ...virtualFiles.map((file) =>
          parts(
            ['-rw-r--r--  ', 'dim'],
            [file.name.padEnd(24, ' '), file.name.startsWith('secrets') ? 'danger' : 'primary'],
            [file.summary, 'muted'],
          ),
        ),
        line('─'.repeat(52), 'dim'),
        line('read one with `cat <file>`', 'muted'),
      ]),
  },
  {
    name: 'cat',
    usage: 'cat <file>',
    summary: 'print a file from the construct filesystem',
    group: 'files',
    hidden: true,
    run: (args) => {
      const name = args.join(' ')
      if (!name) return { error: true, lines: usageError('cat: missing operand', 'try: ' + fileNames.join(', ')) }

      const file = findFile(name)
      if (!file) {
        return {
          error: true,
          lines: usageError(`cat: ${name}: No such file or directory`, 'try: ' + fileNames.join(', ')),
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
    run: () => ok([line('/construct/ghaith', 'primary')]),
  },
  {
    name: 'neofetch',
    summary: 'system readout for the operator',
    group: 'system',
    hidden: true,
    run: () => instant(neofetchLines()),
  },
  {
    name: 'banner',
    summary: 'redraw the operator nameplate',
    group: 'system',
    hidden: true,
    run: () => instant(bannerLines()),
  },
  {
    name: 'uptime',
    summary: 'how long this session has been live',
    group: 'system',
    hidden: true,
    run: () => {
      const seconds = Math.round(performance.now() / 1000)
      const minutes = Math.floor(seconds / 60)
      return ok([
        parts([`${new Date().toTimeString().slice(0, 8)} `, 'muted'], ['up ', 'default'], ['19 years, 3 months', 'primary']),
        line(`this browser session: ${minutes}m ${seconds % 60}s`, 'muted'),
        parts(['load average: ', 'muted'], ['0.42 0.31 0.27', 'default']),
        parts(['operators online: ', 'muted'], ['1', 'success']),
      ])
    },
  },
  {
    name: 'date',
    summary: 'current system time',
    group: 'system',
    hidden: true,
    run: () => ok([line(new Date().toString(), 'primary')]),
  },
  {
    name: 'echo',
    usage: 'echo <text>',
    summary: 'write text back to the console',
    group: 'system',
    hidden: true,
    run: (args) => ok([line(args.join(' '), 'default')]),
  },
  {
    name: 'sudo',
    usage: 'sudo <command>',
    summary: 'attempt privilege escalation',
    group: 'system',
    hidden: true,
    run: (args) => {
      const target = args.join(' ')
      if (target.startsWith('rm -rf /')) {
        return { error: true, lines: [line('nice try. the construct is read-only.', 'danger')] }
      }
      return ok([
        line(`${target || 'sudo'}: you are not in this story, Neo.`, 'warn'),
        line('root access is earned, not typed.', 'muted'),
      ])
    },
  },
  {
    name: 'ping',
    usage: 'ping <host>',
    summary: 'check reachability of a host',
    group: 'system',
    hidden: true,
    run: (args) => {
      const host = args[0] ?? 'github.com'
      return ok(pingLines(host))
    },
  },
  {
    name: 'routing',
    summary: 'kernel routing table',
    group: 'system',
    hidden: true,
    run: () =>
      instant([
        line('Kernel IP routing table', 'bright'),
        line('Destination     Gateway         Iface', 'muted'),
        line('─'.repeat(48), 'dim'),
        ...ROUTES.map(([destination, gateway, iface]) =>
          parts(
            [destination.padEnd(16, ' '), 'default'],
            [gateway.padEnd(16, ' '), 'default'],
            [iface, 'primary'],
          ),
        ),
        line('─'.repeat(48), 'dim'),
        line('routing between the world that is and the world that could be.', 'muted'),
      ]),
  },
  {
    name: 'history',
    summary: 'commands issued in this session',
    group: 'system',
    hidden: true,
    run: (_args, context) => {
      if (context.history.length === 0) return ok([line('no history yet.', 'muted')])
      return ok(
        context.history.map((entry, index) => parts([`${String(index + 1).padStart(3, ' ')}  `, 'muted'], [entry, 'default'])),
      )
    },
  },
  {
    name: 'exit',
    summary: 'leave the construct',
    group: 'system',
    hidden: true,
    run: () =>
      ok([
        line('logout: connection to the construct stays open.', 'warn'),
        line('you can check out any time you like, but you can never leave.', 'muted'),
      ]),
  },
]

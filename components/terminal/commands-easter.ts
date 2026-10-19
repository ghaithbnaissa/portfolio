import { ok, type CommandDefinition } from './command-types'
import { blank, line, parts } from './terminal-types'

export const easterCommands: CommandDefinition[] = [
  {
    name: 'recruiter',
    summary: 'executive candidate summary for HR, recruiters & engineering managers',
    group: 'profile',
    run: () =>
      ok([
        line('EXECUTIVE CANDIDATE SUMMARY // HR & RECRUITER VIEW', 'bright'),
        line('─'.repeat(54), 'dim'),
        parts(['Name:       ', 'muted'], ['Ghaith Ben Aissa', 'bright']),
        parts(['Role:       ', 'muted'], ['Computer Engineering Student — Network Expert', 'primary']),
        parts(['Target:     ', 'muted'], ['DevSecOps Engineer | Network Admin | Cloud Infra', 'default']),
        parts(['Degrees:    ', 'muted'], ["Master's in Network Engineering (2026-2028)", 'default']),
        parts(['Certs:      ', 'muted'], ['Cisco CCNA Certified, Cybersecurity, Troubleshooting', 'default']),
        parts(['Experience: ', 'muted'], ['Montblanc DevSecOps CI/CD Platform, Proxmox virtualization', 'default']),
        parts(['Status:     ', 'muted'], ['Open for 2026 Internships & Graduate Positions', 'success']),
        line('─'.repeat(54), 'dim'),
        line('Tip: Download the full CV directly with `resume` or the header button.', 'muted'),
      ]),
  },
  {
    name: 'spoon',
    summary: 'philosophical reminder',
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
    name: 'theme',
    summary: 'theme status',
    group: 'easter',
    hidden: true,
    run: () =>
      ok([
        parts(['Active Theme: ', 'muted'], ['Professional Dark Navy (Unified)', 'primary']),
        line('Clean, distraction-free view designed for recruiters and engineering leads.', 'default'),
      ]),
  },
]

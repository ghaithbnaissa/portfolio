import { certifications } from '../../data/certifications'
import { experience } from '../../data/experience'
import { projects } from '../../data/projects'
import profile from '../../data/profile'

import { blank, line, parts, type TerminalSegment } from './terminal-types'

export type VirtualFile = {
  name: string
  /** One-line description shown by `ls -l`. */
  summary: string
  /** Rendered lazily so the module stays cheap to load. */
  read: () => TerminalSegment[][]
}

export const virtualFiles: VirtualFile[] = [
  {
    name: 'about.md',
    summary: 'operator profile',
    read: () => [
      line('# ' + profile.name, 'bright'),
      line(profile.role, 'primary'),
      blank(),
      line('I build and secure the plumbing that software runs on: networks, Linux', 'default'),
      line('hosts, containers, pipelines and the telemetry that watches over them.', 'default'),
      blank(),
      parts(['location  ', 'muted'], [profile.location, 'default']),
      parts(['education ', 'muted'], [profile.education, 'default']),
      parts(['languages ', 'muted'], [profile.languages.join(' / '), 'default']),
    ],
  },
  {
    name: 'skills.txt',
    summary: 'technical stack, grouped',
    read: () => {
      const groups: Array<[string, string[]]> = [
        ['support', ['Incident Diagnostics', 'Troubleshooting', 'Maintenance', 'User Support']],
        ['networking', ['TCP/IP', 'Routing', 'Switching', 'VLAN', 'DHCP', 'DNS', 'Cisco CCNA']],
        ['systems', ['Linux', 'Windows Server', 'SSH', 'Proxmox VE', 'VMware', 'VirtualBox', 'LXC']],
        ['delivery', ['Docker', 'Docker Compose', 'Jenkins', 'Git', 'CI/CD', 'k3s']],
        ['observability', ['Prometheus', 'Grafana', 'Loki', 'Promtail', 'cAdvisor']],
        ['security', ['SonarQube', 'Trivy', 'OWASP ZAP', 'IDS/IPS', 'Firewalls']],
        ['tooling', ['Python', 'Bash']],
      ]

      return groups.flatMap(([group, items]) => [
        parts([(group + ' ').padEnd(15, '.'), 'muted'], [' ' + items.join(', '), 'default']),
      ])
    },
  },
  {
    name: 'projects.md',
    summary: 'featured builds',
    read: () =>
      projects.flatMap((project, index) => [
        parts([`${String(index + 1).padStart(2, '0')} `, 'primary'], [project.name, 'bright']),
        line('   ' + project.summary, 'default'),
        line('   stack: ' + project.stack.join(' · '), 'muted'),
        line('   route: /projects/' + project.slug, 'muted'),
        blank(),
      ]),
  },
  {
    name: 'experience.log',
    summary: 'timeline dump',
    read: () =>
      experience.flatMap((item) => [
        parts([`[${item.year}] `, 'primary'], [item.title, 'bright']),
        line('    ' + item.organization, 'muted'),
        line('    ' + item.description, 'default'),
        blank(),
      ]),
  },
  {
    name: 'certifications.txt',
    summary: 'training records',
    read: () =>
      certifications.map((cert) =>
        parts(
          ['  ', 'muted'],
          ['OK  ', 'success'],
          [cert.name, 'default'],
          ['  —  ' + cert.issuer, 'muted'],
        ),
      ),
  },
  {
    name: 'contact.vcf',
    summary: 'reach me',
    read: () => [
      line('BEGIN:VCARD', 'muted'),
      parts(['FN:', 'muted'], [profile.name, 'bright']),
      parts(['TEL:', 'muted'], [profile.phone, 'default']),
      parts(['EMAIL:', 'muted'], [profile.email, 'primary']),
      parts(['GITHUB:', 'muted'], [profile.githubUrl, 'primary']),
      line('END:VCARD', 'muted'),
    ],
  },
  {
    name: 'secrets/.redpill',
    summary: 'restricted',
    read: () => [
      line('[ ACCESS GRANTED — you took the red pill ]', 'danger'),
      blank(),
      line('There is no spoon.', 'bright'),
      line('The site you are reading is only a rendering of the data behind it.', 'default'),
      line('Try: `neofetch`, `matrix`, `routing`, or `bluepill`.', 'muted'),
    ],
  },
]

export function findFile(name: string): VirtualFile | undefined {
  const target = name.trim().toLowerCase()
  return virtualFiles.find((file) => file.name.toLowerCase() === target || file.name.toLowerCase() === target + '.md')
}

export const fileNames = virtualFiles.map((file) => file.name)

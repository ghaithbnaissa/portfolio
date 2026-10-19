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
    summary: 'engineer profile & bio',
    read: () => [
      line('# ' + profile.name, 'bright'),
      line(profile.role, 'primary'),
      blank(),
      line('Computer Engineering student specializing in enterprise routing/switching,', 'default'),
      line('Linux host administration, container orchestration (Docker/k3s), and automated', 'default'),
      line('CI/CD security pipelines (SonarQube, Trivy, OWASP ZAP).', 'default'),
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
    summary: 'featured systems & builds',
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
    summary: 'career timeline & internships',
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
    summary: 'verified Cisco credentials',
    read: () =>
      certifications.map((cert) =>
        parts(
          ['  ', 'muted'],
          ['VERIFIED  ', 'success'],
          [cert.name, 'default'],
          ['  —  ' + cert.issuer, 'muted'],
        ),
      ),
  },
  {
    name: 'contact.vcf',
    summary: 'vCard & communication channels',
    read: () => [
      line('BEGIN:VCARD', 'muted'),
      parts(['FN:', 'muted'], [profile.name, 'bright']),
      parts(['TEL:', 'muted'], [profile.phone, 'default']),
      parts(['EMAIL:', 'muted'], [profile.email, 'primary']),
      parts(['GITHUB:', 'muted'], [profile.githubUrl, 'primary']),
      parts(['CREDLY:', 'muted'], [profile.credlyUrl, 'primary']),
      line('END:VCARD', 'muted'),
    ],
  },
  {
    name: 'infrastructure.yaml',
    summary: 'DevSecOps & cluster specification',
    read: () => [
      line('# DevSecOps Platform Specification (Montblanc Project)', 'primary'),
      line('ci_cd:', 'bright'),
      line('  engine: Jenkins Multi-branch Pipeline', 'default'),
      line('  code_quality: SonarQube Quality Gate (A rating)', 'default'),
      line('  containerization: Docker Engine + Multistage Builds', 'default'),
      line('  security_scanning:', 'default'),
      line('    sast: SonarQube', 'muted'),
      line('    vulnerability: Trivy (High/Critical CVE blocker)', 'muted'),
      line('    dast: OWASP ZAP Automated Scan', 'muted'),
      line('orchestration:', 'bright'),
      line('  runtime: k3s Lightweight Kubernetes', 'default'),
      line('  observability: Prometheus Node Exporter + Grafana + Loki', 'default'),
    ],
  },
]

export function findFile(name: string): VirtualFile | undefined {
  const target = name.trim().toLowerCase()
  return virtualFiles.find((file) => file.name.toLowerCase() === target || file.name.toLowerCase() === target + '.md')
}

export const fileNames = virtualFiles.map((file) => file.name)

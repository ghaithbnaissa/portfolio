import { experience } from '../../data/experience'
import { projects } from '../../data/projects'
import profile from '../../data/profile'

import { ok, type CommandDefinition } from './command-types'
import { findFile } from './file-system'
import { blank, line, parts, type TerminalSegment, type TerminalTone } from './terminal-types'

const field = (label: string, value: string, tone: TerminalTone = 'default'): TerminalSegment[] =>
  parts([label.padEnd(14, ' '), 'muted'], [value, tone])

const fileLines = (name: string): TerminalSegment[][] => findFile(name)?.read() ?? []

const SECTIONS: Record<string, string> = {
  about: '#about',
  skills: '#career',
  stack: '#career',
  career: '#career',
  projects: '#projects',
  work: '#projects',
  experience: '#career',
  education: '#about',
  certifications: '#certifications',
  github: '#contact',
  code: '#contact',
  contact: '#contact',
}

export const profileCommands: CommandDefinition[] = [
  {
    name: 'whoami',
    summary: 'identity of the current operator',
    group: 'profile',
    hidden: true,
    run: () =>
      ok([
        line(profile.name, 'bright'),
        line(profile.role, 'default'),
        line('uid=1000(ghaith) gid=1000(netops) groups=1000(netops),27(sudo),999(docker)', 'dim'),
      ]),
  },
  {
    name: 'about',
    summary: 'who I am & engineering background',
    group: 'profile',
    run: () => ok(fileLines('about.md')),
  },
  {
    name: 'skills',
    summary: 'technical stack & competencies',
    group: 'profile',
    run: () => {
      const groups = fileLines('skills.txt')
      return ok([line('TECHNICAL STACK', 'bright'), line('───────────────', 'dim'), ...groups])
    },
  },
  {
    name: 'projects',
    usage: 'projects [slug]',
    summary: 'featured systems & architecture',
    group: 'profile',
    run: (args) => {
      const slug = args[0]
      if (!slug) return ok(fileLines('projects.md'))

      const project = projects.find((item) => item.slug === slug)
      if (!project) {
        return {
          error: true,
          lines: [
            line(`no project matches "${slug}"`, 'danger'),
            line('available: ' + projects.map((item) => item.slug).join(', '), 'muted'),
          ],
        }
      }

      return ok([
        line(project.name.toUpperCase(), 'bright'),
        line('─'.repeat(Math.min(46, project.name.length + 12)), 'dim'),
        field('problem', project.problem),
        field('solution', project.solution),
        field('architecture', project.architecture),
        field('ci/cd', project.ciCd),
        field('lessons', project.lessons, 'primary'),
        blank(),
        field('stack', project.stack.join(' · '), 'primary'),
        field('source', project.repoUrl, 'primary'),
        field('route', '/projects/' + project.slug, 'muted'),
      ])
    },
  },
  {
    name: 'experience',
    summary: 'career & academic timeline',
    group: 'profile',
    run: () => ok([line('TIMELINE', 'bright'), ...fileLines('experience.log')]),
  },
  {
    name: 'education',
    summary: 'academic record',
    group: 'profile',
    hidden: true,
    run: () =>
      ok([
        field('current', profile.education, 'bright'),
        field('previous', experience[experience.length - 1]?.title ?? 'B.Eng. Computer Engineering'),
        field('institute', 'Institut Supérieur d\'Informatique de Mahdia'),
      ]),
  },
  {
    name: 'certifications',
    summary: 'verified Cisco credentials',
    group: 'profile',
    run: () => ok([line('CERTIFICATIONS', 'bright'), ...fileLines('certifications.txt')]),
  },
  {
    name: 'contact',
    summary: 'get in touch (email, phone, github)',
    group: 'profile',
    run: () => ok(fileLines('contact.vcf')),
  },
  {
    name: 'github',
    summary: 'open the GitHub profile',
    group: 'profile',
    hidden: true,
    run: () =>
      ok(
        [
          field('profile', profile.githubUrl, 'primary'),
          field('handle', '@' + profile.githubUsername),
          line('the shell will open it in a new tab.', 'muted'),
        ],
        { effect: { type: 'navigate', target: profile.githubUrl } },
      ),
  },
  {
    name: 'email',
    summary: 'send mail',
    group: 'profile',
    hidden: true,
    run: () =>
      ok(
        [field('address', profile.email, 'primary'), line('the shell will open your mail client.', 'muted')],
        { effect: { type: 'navigate', target: `mailto:${profile.email}` } },
      ),
  },
  {
    name: 'phone',
    summary: 'phone number',
    group: 'profile',
    hidden: true,
    run: () => ok([field('tel', profile.phone, 'primary')]),
  },
  {
    name: 'location',
    summary: 'where the operator sits',
    group: 'profile',
    hidden: true,
    run: () => ok([field('coordinates', profile.location, 'primary')]),
  },
  {
    name: 'languages',
    summary: 'spoken languages',
    group: 'profile',
    hidden: true,
    run: () => ok([field('locales', profile.languages.join(' · '))]),
  },
  {
    name: 'status',
    summary: 'availability right now',
    group: 'profile',
    hidden: true,
    run: () =>
      ok([
        line('STATUS', 'bright'),
        line('───────────────', 'dim'),
        parts(['availability  ', 'muted'], ['OPEN', 'success']),
        field('looking for', 'DevOps, networks, systems and security roles or internships'),
        field('response', 'usually within 24 hours'),
        field('uptime', 'building since 2023'),
      ]),
  },
  {
    name: 'resume',
    usage: 'resume',
    summary: 'download CV (PDF)',
    group: 'profile',
    run: () =>
      ok([
        line('reading /resume.pdf ...', 'muted'),
        line('CV available for direct download at /resume.pdf', 'primary'),
      ], { effect: { type: 'navigate', target: '/resume.pdf' } }),
  },
  {
    name: 'open',
    usage: 'open <section>',
    summary: 'jump to a section of the page',
    group: 'profile',
    hidden: true,
    run: (args) => {
      const key = (args[0] ?? '').toLowerCase()
      const target = SECTIONS[key]
      if (!target) {
        return {
          error: true,
          lines: [
            line(`unknown section "${key || ''}"`, 'danger'),
            line('try: ' + Object.keys(SECTIONS).slice(0, 8).join(', '), 'muted'),
          ],
        }
      }
      return ok([line('navigating to ' + target.replace('#', '/'), 'primary')], {
        effect: { type: 'navigate', target },
      })
    },
  },
]

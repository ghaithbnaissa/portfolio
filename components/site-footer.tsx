'use client'

import Link from 'next/link'

import profile from '../data/profile'
import { dispatchTerminalCommand } from './terminal/command-bus'

const LINKS = [
  { label: 'github', href: profile.githubUrl, external: true },
  { label: 'email', href: `mailto:${profile.email}`, external: false },
  { label: 'certifications', href: '/#certifications', external: false },
]

export default function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-16 border-t border-mx-line/70 bg-mx-deep/75">
      <div className="mx-auto max-w-6xl px-4 py-7 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-2xs uppercase tracking-[0.18em] text-mx-textFaint">
          <span className="flex items-center gap-2 text-mx-primary-dim">
            <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-mx-primary" />
            <span>system online</span>
          </span>
          <span className="hidden sm:inline">construct v2.0</span>
          <span>{profile.location}</span>
          <span className="ml-auto">
            © {year} {profile.name}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-2xs text-mx-textFaint">
          {LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
              className="mx-underline-link uppercase tracking-[0.18em]"
            >
              {link.label}
            </Link>
          ))}

          <button
            type="button"
            onClick={() => dispatchTerminalCommand('matrix')}
            className="mx-underline-link uppercase tracking-[0.18em]"
          >
            raise the rain
          </button>

          <span className="ml-auto normal-case tracking-normal text-mx-textFaint/80">there is no spoon.</span>
        </div>
      </div>
    </footer>
  )
}

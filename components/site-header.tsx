import Link from 'next/link'

import { Github } from 'lucide-react'

import profile from '../data/profile'
import { PhosphorToggle } from './phosphor-toggle'

const NAV_ITEMS = [
  { label: 'About', href: '/#about' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Career', href: '/#career' },
  { label: 'Certifications', href: '/#certifications' },
  { label: 'Contact', href: '/#contact' },
]

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-mx-line/70 bg-mx-deep/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:gap-5 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <span className="mx-glow flex h-8 w-8 items-center justify-center border border-mx-primary/60 bg-mx-primary/10 font-mono text-xs text-mx-primary transition-colors group-hover:bg-mx-primary/20">
            GB
          </span>
          <span className="hidden leading-tight lg:block">
            <span className="block font-display text-sm tracking-[0.14em] text-mx-bright">{profile.name}</span>
            <span className="block font-mono text-2xs uppercase tracking-[0.22em] text-mx-textFaint">
              networks · systems · security
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="mx-scrollbar-none -mx-1 min-w-0 flex-1 overflow-x-auto px-1">
          <ul className="flex w-max items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex items-center rounded-sm px-2.5 py-1.5 font-mono text-2xs uppercase tracking-[0.18em] text-mx-textDim transition-colors hover:bg-mx-primary/8 hover:text-mx-primary"
                >
                  <span
                    aria-hidden="true"
                    className="w-0 text-mx-primary opacity-0 transition-all duration-200 group-hover:w-3 group-hover:opacity-100"
                  >
                    ▸
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-sm border border-mx-line/70 bg-mx-panel/60 text-mx-textDim transition-colors hover:border-mx-primary/60 hover:text-mx-primary"
            aria-label="GitHub Profile"
            title="GitHub Profile"
          >
            <Github className="h-4 w-4" />
          </a>
          <PhosphorToggle />
        </div>
      </div>
    </header>
  )
}

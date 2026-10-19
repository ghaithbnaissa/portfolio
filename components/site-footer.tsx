'use client'

import Link from 'next/link'
import { Award, FileDown, Github, Mail, ShieldCheck } from 'lucide-react'

import profile from '../data/profile'

const LINKS = [
  { label: 'GitHub', href: profile.githubUrl, external: true, icon: Github },
  { label: 'Credly', href: profile.credlyUrl, external: true, icon: Award },
  { label: 'Email', href: `mailto:${profile.email}`, external: false, icon: Mail },
  { label: 'Certifications', href: '/#certifications', external: false, icon: ShieldCheck },
  { label: 'Resume CV', href: '/resume.pdf', external: false, icon: FileDown },
]

export default function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-20 border-t border-mx-line/70 bg-mx-deep/90 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-sans text-xs font-semibold text-mx-bright">
                Available for Engineering Opportunities
              </span>
              <span className="text-mx-textFaint">·</span>
              <span className="text-xs text-mx-textDim">{profile.location}</span>
            </div>
            <p className="text-xs text-mx-textDim">
              Enterprise Networks · DevSecOps Automation · Linux Infrastructure &amp; Observability
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-mx-textDim">
            {LINKS.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-mx-primary"
                >
                  <Icon className="h-3.5 w-3.5 text-mx-primary/70" />
                  <span>{link.label}</span>
                </Link>
              )
            })}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-mx-line/40 pt-4 text-2xs text-mx-textFaint">
          <span>
            © {year} {profile.name}. All rights reserved.
          </span>
          <span className="font-mono">
            Designed for performance, security &amp; reliability
          </span>
        </div>
      </div>
    </footer>
  )
}

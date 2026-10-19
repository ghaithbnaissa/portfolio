'use client'

import { FileDown, Github, GraduationCap, Mail, MapPin, ShieldCheck, Award } from 'lucide-react'

import profile from '../../data/profile'
import { Button } from '../ui/button'

const FACTS = [
  { icon: MapPin, label: 'Location', value: profile.location },
  { icon: GraduationCap, label: 'Education', value: "Master's in Network Engineering" },
  { icon: ShieldCheck, label: 'Credentials', value: 'Cisco CCNA Certified' },
]

export default function OperatorDossier({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="mx-panel flex h-full flex-col justify-between rounded-xl p-6 sm:p-7 shadow-lg border border-mx-line/80 bg-gradient-to-br from-mx-panel via-mx-panel to-mx-panel2/60">
        <div className="space-y-4">
          {/* Status Badge */}
          <div className="flex items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-2xs font-semibold text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Hire 2026</span>
            </span>
            <span className="text-mx-textFaint">·</span>
            <span className="text-mx-textDim font-sans text-xs">{profile.location}</span>
          </div>

          {/* Name & Title */}
          <div>
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-mx-bright sm:text-4xl">
              {profile.name}
            </h1>
            <p className="mt-1.5 font-sans text-sm sm:text-base font-semibold text-mx-primary">
              Networks &amp; DevSecOps Engineer
            </p>
          </div>

          {/* Bio Description */}
          <p className="text-sm leading-relaxed text-mx-textDim">
            Computer Engineering student specializing in enterprise routing &amp; switching, Linux systems administration, container orchestration (Docker/k3s), and automated CI/CD security pipelines.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <Button asChild variant="solid" size="sm">
              <a href="/resume.pdf" download>
                <FileDown className="h-3.5 w-3.5" />
                <span>Download CV</span>
              </a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <a href="#contact">
                <Mail className="h-3.5 w-3.5" />
                <span>Contact</span>
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild className="h-8 w-8">
              <a href={profile.githubUrl} target="_blank" rel="noreferrer" aria-label="Open GitHub">
                <Github className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild className="h-8 w-8" title="Verified Cisco Badges">
              <a href={profile.credlyUrl} target="_blank" rel="noreferrer" aria-label="Open Credly">
                <Award className="h-4 w-4 text-mx-primary" />
              </a>
            </Button>
          </div>
        </div>

        {/* Highlights List */}
        <div className="border-t border-mx-line/60 pt-4 mt-6">
          <dl className="grid gap-3 sm:grid-cols-3">
            {FACTS.map((fact) => {
              const Icon = fact.icon
              return (
                <div key={fact.label} className="space-y-0.5">
                  <dt className="flex items-center gap-1.5 font-mono text-2xs uppercase tracking-wider text-mx-textFaint">
                    <Icon className="h-3.5 w-3.5 text-mx-primary" />
                    <span>{fact.label}</span>
                  </dt>
                  <dd className="text-xs text-mx-bright font-sans font-medium truncate" title={fact.value}>
                    {fact.value}
                  </dd>
                </div>
              )
            })}
          </dl>
        </div>
      </div>
    </div>
  )
}

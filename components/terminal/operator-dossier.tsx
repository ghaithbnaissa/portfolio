'use client'

import { FileDown, Github, GraduationCap, Linkedin, Mail, MapPin, ShieldCheck } from 'lucide-react'

import profile from '../../data/profile'
import BracketFrame from '../matrix/bracket-frame'
import GlitchText from '../matrix/glitch-text'
import { Button } from '../ui/button'

const FACTS = [
  { icon: MapPin, label: 'Location', value: profile.location },
  { icon: GraduationCap, label: 'Education', value: "Master's in Network Engineering" },
  { icon: ShieldCheck, label: 'Credentials', value: 'Cisco CCNA Certified' },
]

export default function OperatorDossier({ className }: { className?: string }) {
  return (
    <BracketFrame className={className} size={14}>
      <div className="mx-panel flex h-full flex-col justify-between rounded-xl p-6 sm:p-7">
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-mx-primary">
            <span aria-hidden="true" className="h-2 w-2 animate-pulse-glow rounded-full bg-mx-primary" />
            <span>Open for Hire</span>
            <span className="text-mx-textFaint">·</span>
            <span className="text-mx-textDim">Mahdia, Tunisia</span>
          </div>

          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-mx-bright sm:text-4xl">
              <GlitchText text={profile.name} />
            </h1>
            <p className="mt-1.5 font-sans text-sm font-medium text-mx-primary">
              Networks & DevSecOps Engineer
            </p>
          </div>

          <p className="text-sm leading-relaxed text-mx-textDim">
            Specializing in enterprise routing/switching, Linux host administration, container orchestration (Docker/k3s), and automated CI/CD security pipelines.
          </p>

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
            {profile.linkedinUrl ? (
              <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" aria-label="Open LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
            ) : null}
          </div>
        </div>

        <div className="border-t border-mx-line/50 pt-4 mt-6">
          <dl className="grid gap-2 sm:grid-cols-3">
            {FACTS.map((fact) => {
              const Icon = fact.icon
              return (
                <div key={fact.label} className="space-y-0.5">
                  <dt className="flex items-center gap-1.5 font-mono text-2xs uppercase tracking-wider text-mx-textFaint">
                    <Icon className="h-3 w-3 text-mx-primary" />
                    <span>{fact.label}</span>
                  </dt>
                  <dd className="text-xs text-mx-bright truncate font-sans" title={fact.value}>
                    {fact.value}
                  </dd>
                </div>
              )
            })}
          </dl>
        </div>
      </div>
    </BracketFrame>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Briefcase, Download, Mail, Phone, CheckCircle } from 'lucide-react'
import Link from 'next/link'

import profile from '../data/profile'
import { Button } from './ui/button'

export default function RecruiterBanner() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted || theme !== 'recruiter') {
    return null
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-4">
      <div className="relative overflow-hidden rounded-xl border border-mx-lineStrong/40 bg-gradient-to-r from-mx-panel via-mx-panel2 to-mx-panel p-5 shadow-lg backdrop-blur-md">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-mx-primary/15 text-mx-primary">
                <Briefcase className="h-3.5 w-3.5" />
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-mx-primary font-semibold">
                Recruiter &amp; HR View — Simplified Mode
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-mx-primary/10 px-2 py-0.5 text-2xs font-medium text-mx-primary">
                <CheckCircle className="h-2.5 w-2.5" />
                Open for Hire 2026
              </span>
            </div>
            <h2 className="text-lg font-semibold text-mx-bright sm:text-xl">
              Looking for a Network Expert or DevSecOps Engineer?
            </h2>
            <p className="max-w-2xl text-xs sm:text-sm text-mx-textDim leading-relaxed">
              This simplified view highlights Ghaith Ben Aissa&apos;s educational background, Cisco CCNA credentials, and key project achievements — without the technical jargon.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Button asChild variant="solid" size="sm">
              <a href="/resume.pdf" download>
                <Download className="h-3.5 w-3.5" />
                <span>Download CV (PDF)</span>
              </a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href={`mailto:${profile.email}`}>
                <Mail className="h-3.5 w-3.5" />
                <span>Email Candidate</span>
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href={`tel:${profile.phone.replace(/\s+/g, '')}`}>
                <Phone className="h-3.5 w-3.5" />
                <span>Call Directly</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

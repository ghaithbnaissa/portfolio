'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  FileDown,
  Github,
  Menu,
  Terminal,
  X,
  Award,
  Mail,
} from 'lucide-react'

import profile from '../data/profile'
import { dispatchTerminalCommand } from './terminal/command-bus'
import { cn } from '../lib/utils'

const NAV_ITEMS = [
  { label: 'About', href: '#about', id: 'about', index: '02' },
  { label: 'Projects', href: '#projects', id: 'projects', index: '03' },
  { label: 'Skills & Timeline', href: '#career', id: 'career', index: '04' },
  { label: 'Certifications', href: '#certifications', id: 'certifications', index: '05' },
  { label: 'Contact', href: '#contact', id: 'contact', index: '06' },
]

export default function SiteHeader() {
  const [activeSection, setActiveSection] = useState<string>('')
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Track scroll position for dynamic glassmorphic elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Interactive Scroll-Spy to highlight current section
  useEffect(() => {
    const sectionIds = ['about', 'projects', 'career', 'certifications', 'contact']
    const handleSectionSpy = () => {
      const scrollPosition = window.scrollY + 180

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i]
        const element = document.getElementById(id)
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(id)
          return
        }
      }

      if (window.scrollY < 200) {
        setActiveSection('')
      }
    }

    handleSectionSpy()
    window.addEventListener('scroll', handleSectionSpy, { passive: true })
    return () => window.removeEventListener('scroll', handleSectionSpy)
  }, [])

  // Close mobile drawer on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, targetId: string) {
    e.preventDefault()
    setMobileMenuOpen(false)

    const element = document.getElementById(targetId)
    if (element) {
      const yOffset = -80
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  function launchTerminal() {
    setMobileMenuOpen(false)
    const hero = document.getElementById('hero') || document.getElementById('main-content')
    if (hero) {
      hero.scrollIntoView({ behavior: 'smooth' })
    }
    dispatchTerminalCommand('help')
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        isScrolled
          ? 'border-b border-mx-line/80 bg-mx-deep/95 shadow-xl shadow-black/40 backdrop-blur-xl py-2.5 sm:py-3'
          : 'border-b border-mx-line/40 bg-mx-deep/80 backdrop-blur-md py-3 sm:py-3.5',
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 sm:gap-6 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <Link
          href="/#hero"
          onClick={(e) => {
            if (window.location.pathname === '/') {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}
          className="group flex shrink-0 items-center gap-3 transition-opacity hover:opacity-95"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-mx-primary/40 bg-mx-panel font-mono text-xs font-bold text-mx-bright shadow-sm transition-all group-hover:border-mx-primary group-hover:shadow-[0_0_15px_rgba(59,130,246,0.25)]">
            <span>GB</span>
            <span
              aria-hidden="true"
              className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full border-2 border-mx-deep bg-emerald-400 animate-pulse"
            />
          </div>

          <div className="leading-tight">
            <span className="block font-sans text-sm sm:text-base font-bold tracking-tight text-mx-bright group-hover:text-mx-primary transition-colors">
              {profile.name}
            </span>
            <span className="flex items-center gap-1.5 font-sans text-[11px] text-mx-textDim">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Networks · DevSecOps · Systems</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.id)}
                className={cn(
                  'relative rounded-md px-3 py-1.5 text-xs lg:text-[13px] font-sans font-medium transition-all duration-200',
                  isActive
                    ? 'bg-mx-primary/15 text-mx-bright font-semibold shadow-sm'
                    : 'text-mx-textDim hover:bg-mx-primary/10 hover:text-mx-bright',
                )}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-3 -bottom-2 h-0.5 rounded-full bg-mx-primary shadow-[0_0_8px_rgb(var(--mx-primary))]"
                  />
                )}
              </a>
            )
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Quick Terminal Launcher */}
          <button
            type="button"
            onClick={launchTerminal}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-md border border-mx-line bg-mx-panel/80 px-2.5 py-1.5 font-mono text-xs text-mx-textDim transition-colors hover:border-mx-primary/50 hover:bg-mx-primary/10 hover:text-mx-bright"
            title="Launch interactive CLI console"
          >
            <Terminal className="h-3.5 w-3.5 text-mx-primary" />
            <span className="font-medium">CLI</span>
          </button>

          {/* Quick Resume Download */}
          <a
            href="/resume.pdf"
            download
            className="hidden sm:inline-flex items-center gap-1.5 rounded-md border border-mx-primary/40 bg-mx-primary/10 px-3 py-1.5 font-sans text-xs font-semibold text-mx-bright transition-all hover:border-mx-primary hover:bg-mx-primary/20 hover:shadow-[0_0_12px_rgba(59,130,246,0.25)]"
            title="Download Ghaith's CV (PDF)"
          >
            <FileDown className="h-3.5 w-3.5 text-mx-primary" />
            <span>CV</span>
          </a>

          {/* Credly Verified Link */}
          <a
            href={profile.credlyUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden lg:inline-flex h-8 items-center gap-1.5 rounded-md border border-mx-line bg-mx-panel/80 px-2 text-mx-textDim transition-colors hover:border-mx-primary/60 hover:bg-mx-primary/10 hover:text-mx-bright text-xs"
            aria-label="Verified Cisco Credly Badges"
            title="View Cisco Verified Credentials on Credly"
          >
            <Award className="h-3.5 w-3.5 text-mx-primary" />
            <span className="font-mono text-2xs">Cisco CCNA</span>
          </a>

          {/* GitHub Icon Link */}
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-mx-line bg-mx-panel/80 text-mx-textDim transition-colors hover:border-mx-primary/60 hover:bg-mx-primary/10 hover:text-mx-bright"
            aria-label="GitHub Profile"
            title="Visit GitHub Profile"
          >
            <Github className="h-4 w-4" />
          </a>

          {/* Direct Email Link */}
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-mx-line bg-mx-panel/80 text-mx-textDim transition-colors hover:border-mx-primary/60 hover:bg-mx-primary/10 hover:text-mx-bright"
            aria-label="Email Ghaith"
            title="Send Email"
          >
            <Mail className="h-4 w-4" />
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex md:hidden h-8 w-8 items-center justify-center rounded-md border border-mx-line bg-mx-panel/80 text-mx-textDim transition-colors hover:border-mx-primary/50 hover:text-mx-bright"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden animate-rise-in border-t border-mx-line/70 bg-mx-deep/98 px-4 py-4 shadow-2xl backdrop-blur-2xl">
          <nav className="space-y-1 pb-3">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={cn(
                    'flex items-center justify-between rounded-lg px-3.5 py-2.5 text-sm font-sans transition-all',
                    isActive
                      ? 'bg-mx-primary/20 text-mx-bright font-semibold'
                      : 'text-mx-textDim hover:bg-mx-primary/10 hover:text-mx-bright',
                  )}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="font-mono text-2xs text-mx-primary font-semibold">{item.index}</span>
                    <span>{item.label}</span>
                  </span>
                  {isActive && <span className="h-1.5 w-1.5 rounded-full bg-mx-primary" />}
                </a>
              )
            })}
          </nav>

          {/* Mobile Quick Action Buttons */}
          <div className="space-y-2.5 border-t border-mx-line/60 pt-3">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={launchTerminal}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-mx-line bg-mx-panel p-2 font-mono text-xs text-mx-bright hover:border-mx-primary/50"
              >
                <Terminal className="h-3.5 w-3.5 text-mx-primary" />
                <span>Launch CLI</span>
              </button>

              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center justify-center gap-2 rounded-md border border-mx-primary/50 bg-mx-primary/10 p-2 font-sans text-xs font-semibold text-mx-bright hover:bg-mx-primary/20"
              >
                <FileDown className="h-3.5 w-3.5 text-mx-primary" />
                <span>Download CV</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

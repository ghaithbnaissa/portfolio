'use client'

import { useEffect, useState } from 'react'
import {
  Search,
  Command,
  FileDown,
  Mail,
  Phone,
  Github,
  Award,
  Terminal,
  Activity,
  Layers,
  ShieldCheck,
  X,
  ArrowRight,
} from 'lucide-react'
import Link from 'next/link'

import profile from '../data/profile'
import { dispatchTerminalCommand } from './terminal/command-bus'

interface PaletteItem {
  id: string
  label: string
  category: 'Navigation' | 'Actions' | 'Terminal'
  icon: typeof Search
  action: () => void
  meta?: string
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')

  // Toggle on Cmd+K or Ctrl+K or Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  function navigateTo(id: string) {
    setIsOpen(false)
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -80
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  function runCLI(cmd: string) {
    setIsOpen(false)
    const hero = document.getElementById('hero') || document.getElementById('main-content')
    if (hero) hero.scrollIntoView({ behavior: 'smooth' })
    dispatchTerminalCommand(cmd)
  }

  const ITEMS: PaletteItem[] = [
    {
      id: 'about',
      label: 'About Engineering Background',
      category: 'Navigation',
      icon: Activity,
      action: () => navigateTo('about'),
      meta: '02 · About',
    },
    {
      id: 'architecture',
      label: 'Interactive DevSecOps Pipeline',
      category: 'Navigation',
      icon: Layers,
      action: () => navigateTo('architecture'),
      meta: '03 · Pipeline',
    },
    {
      id: 'projects',
      label: 'Featured Engineering Projects',
      category: 'Navigation',
      icon: ShieldCheck,
      action: () => navigateTo('projects'),
      meta: '04 · Projects',
    },
    {
      id: 'career',
      label: 'Technical Arsenal & Timeline',
      category: 'Navigation',
      icon: Layers,
      action: () => navigateTo('career'),
      meta: '05 · Career',
    },
    {
      id: 'certifications',
      label: 'Cisco CCNA & Certifications',
      category: 'Navigation',
      icon: Award,
      action: () => navigateTo('certifications'),
      meta: '06 · Certs',
    },
    {
      id: 'contact',
      label: 'Contact Ghaith directly',
      category: 'Navigation',
      icon: Mail,
      action: () => navigateTo('contact'),
      meta: '07 · Contact',
    },
    {
      id: 'cv',
      label: 'Download Curriculum Vitae (PDF)',
      category: 'Actions',
      icon: FileDown,
      action: () => {
        setIsOpen(false)
        window.open('/resume.pdf', '_blank')
      },
      meta: 'Resume',
    },
    {
      id: 'email',
      label: `Email: ${profile.email}`,
      category: 'Actions',
      icon: Mail,
      action: () => {
        setIsOpen(false)
        window.location.href = `mailto:${profile.email}`
      },
    },
    {
      id: 'credly',
      label: 'Verify Cisco Badges on Credly',
      category: 'Actions',
      icon: Award,
      action: () => {
        setIsOpen(false)
        window.open(profile.credlyUrl, '_blank')
      },
    },
    {
      id: 'cli-whoami',
      label: 'Run Terminal: $ whoami',
      category: 'Terminal',
      icon: Terminal,
      action: () => runCLI('whoami'),
    },
    {
      id: 'cli-skills',
      label: 'Run Terminal: $ skills',
      category: 'Terminal',
      icon: Terminal,
      action: () => runCLI('skills'),
    },
    {
      id: 'cli-neofetch',
      label: 'Run Terminal: $ neofetch',
      category: 'Terminal',
      icon: Terminal,
      action: () => runCLI('neofetch'),
    },
  ]

  const filtered = query.trim()
    ? ITEMS.filter(
        (item) =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase()),
      )
    : ITEMS

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[110] flex items-start justify-center p-4 sm:p-6 sm:pt-24 bg-black/70 backdrop-blur-md animate-fade-in"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-mx-line/80 bg-mx-panel shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-mx-line px-4 py-3 bg-mx-panel2/60">
          <Search className="h-4 w-4 text-mx-primary shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Search sections, actions, or terminal commands..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent font-sans text-sm text-mx-bright placeholder-mx-textFaint outline-none"
          />
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded p-1 text-mx-textFaint hover:text-mx-bright"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs text-mx-textDim">
              No results found for &quot;{query}&quot;.
            </div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={item.action}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs text-mx-textDim transition-colors hover:bg-mx-primary/15 hover:text-mx-bright group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg border border-mx-line bg-mx-panel2 text-mx-primary group-hover:border-mx-primary/50">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <span className="font-sans font-medium text-mx-bright">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.meta && (
                      <span className="font-mono text-2xs text-mx-textFaint">{item.meta}</span>
                    )}
                    <ArrowRight className="h-3 w-3 text-mx-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              )
            })
          )}
        </div>

        {/* Command palette footer */}
        <div className="flex items-center justify-between border-t border-mx-line/60 bg-mx-panel2/80 px-4 py-2 font-mono text-2xs text-mx-textFaint">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>·</span>
            <span>↵ Select</span>
            <span>·</span>
            <span>Esc Close</span>
          </div>
          <span className="text-mx-primary font-semibold">Ctrl + K</span>
        </div>
      </div>
    </div>
  )
}

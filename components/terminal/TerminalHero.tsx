'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Terminal, Sparkles } from 'lucide-react'

import MatrixTerminal from './matrix-terminal'
import OperatorDossier from './operator-dossier'

export default function TerminalHero() {
  const prefersReducedMotion = useReducedMotion()
  const entrance = prefersReducedMotion
    ? {}
    : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 } }

  return (
    <section id="hero" className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8 scroll-mt-28">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-mx-line bg-mx-panel px-3 py-1 font-mono text-2xs uppercase tracking-wider text-mx-primary font-medium">
            <Terminal className="h-3.5 w-3.5 text-mx-primary" />
            <span>Executive Profile &amp; Interactive Console</span>
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-2xs text-mx-textFaint">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Interactive Session · Type &apos;help&apos; to explore</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)] items-stretch">
        <motion.div
          {...entrance}
          transition={prefersReducedMotion ? undefined : { duration: 0.5, ease: 'easeOut' }}
          className="min-w-0"
        >
          <OperatorDossier className="h-full" />
        </motion.div>

        <motion.div
          {...entrance}
          transition={prefersReducedMotion ? undefined : { duration: 0.5, ease: 'easeOut', delay: 0.12 }}
          className="min-w-0"
        >
          <MatrixTerminal className="h-full" />
        </motion.div>
      </div>

      {/* Competency highlights ticker */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-y border-mx-line/50 py-3 mt-6 font-mono text-2xs text-mx-textDim">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-mx-primary" />
          <span className="font-semibold text-mx-bright">Cisco CCNA Certified</span>
        </span>
        <span className="hidden sm:inline text-mx-textFaint">·</span>
        <span>Linux &amp; Proxmox Hypervisors</span>
        <span className="hidden sm:inline text-mx-textFaint">·</span>
        <span>Docker &amp; k3s Kubernetes</span>
        <span className="hidden sm:inline text-mx-textFaint">·</span>
        <span>Jenkins DevSecOps CI/CD</span>
        <span className="hidden md:inline text-mx-textFaint">·</span>
        <span className="hidden md:inline">Prometheus &amp; Grafana</span>
      </div>
    </section>
  )
}

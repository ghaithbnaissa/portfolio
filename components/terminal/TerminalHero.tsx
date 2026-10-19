'use client'

import { motion, useReducedMotion } from 'framer-motion'

import MatrixTerminal from './matrix-terminal'
import OperatorDossier from './operator-dossier'

const TICKER = [
  'tcp/ip',
  'vlan',
  'cisco ccna',
  'linux',
  'proxmox',
  'docker',
  'jenkins',
  'k3s',
  'prometheus',
  'grafana',
  'trivy',
  'owasp zap',
]

export default function TerminalHero() {
  const prefersReducedMotion = useReducedMotion()
  const entrance = prefersReducedMotion
    ? {}
    : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 } }

  return (
    <section id="hero" className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-8 scroll-mt-28">
      <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="mx-label">01 / operator terminal</p>
        <span className="mx-hairline hidden flex-1 sm:block" />
        <p className="font-mono text-2xs uppercase tracking-[0.2em] text-mx-textFaint">
          construct&nbsp;v2.0 · session live
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] items-stretch">
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
        >
          <MatrixTerminal className="h-full" />
        </motion.div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-y border-mx-line/50 py-3 mt-6 font-mono text-2xs text-mx-textDim">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-mx-primary" />
          <span>Cisco CCNA Certified</span>
        </span>
        <span className="hidden sm:inline text-mx-textFaint">·</span>
        <span>Linux & Proxmox Hypervisors</span>
        <span className="hidden sm:inline text-mx-textFaint">·</span>
        <span>Docker & k3s Kubernetes</span>
        <span className="hidden sm:inline text-mx-textFaint">·</span>
        <span>Jenkins DevSecOps CI/CD</span>
        <span className="hidden md:inline text-mx-textFaint">·</span>
        <span className="hidden md:inline">Prometheus & Grafana</span>
      </div>
    </section>
  )
}

'use client'

import { useState, useRef, useEffect } from 'react'
import {
  GitBranch,
  Cpu,
  ShieldCheck,
  Box,
  ShieldAlert,
  Server,
  Activity,
  Play,
  Square,
  CheckCircle2,
  Loader2,
  Terminal,
} from 'lucide-react'

import { Card, CardCommand, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { cn } from '../lib/utils'

interface PipelineStage {
  id: string
  name: string
  tool: string
  category: string
  icon: typeof GitBranch
  metric: string
  description: string
  details: string[]
  logs: string[]
}

const STAGES: PipelineStage[] = [
  {
    id: 'git',
    name: 'Version Control',
    tool: 'Git / GitHub',
    category: 'Source Control',
    icon: GitBranch,
    metric: 'Commit: 8f2a1c · GPG Signed',
    description: 'Enforces branch protection rules, cryptographically signed commits, and automated webhook triggers into Jenkins.',
    details: [
      'Webhook payload triggers Jenkins multi-branch job',
      'Branch protection rules with mandatory PR reviews',
      'Signed commits verification via GPG keys',
    ],
    logs: [
      '[git] Verifying GPG signature for commit 8f2a1c2...',
      '[git] Signature valid: Key ID 4B892F01 (Ghaith Ben Aissa)',
      '[git] Synchronizing origin/main with production upstream',
      '[webhook] Dispatched POST event -> http://jenkins.local:8080/github-webhook/',
      '[git] Trigger accepted: build job #142 queued',
    ],
  },
  {
    id: 'ci',
    name: 'CI Orchestration',
    tool: 'Jenkins Pipeline',
    category: 'Automation',
    icon: Cpu,
    metric: 'Duration: 1m 42s · 0 Errors',
    description: 'Declarative Pipeline-as-Code executing multi-stage build matrix on isolated containerized runners.',
    details: [
      'Jenkinsfile versioned directly in repository',
      'Automated dependency caching between stages',
      'Parallelized linting and unit testing suites',
    ],
    logs: [
      '[jenkins] Ephemeral agent node-01 provisioned',
      '[jenkins] Pulling base workspace environment...',
      '[jenkins] Stage [Dependencies]: Cache hit. 482 packages resolved in 4.2s',
      '[jenkins] Stage [Unit Tests]: 48/48 test suites passed (0 failures, 100% assertions)',
      '[jenkins] Artifact workspace prepared for static security analysis',
    ],
  },
  {
    id: 'sast',
    name: 'Code Quality & SAST',
    tool: 'SonarQube',
    category: 'Security Gate',
    icon: ShieldCheck,
    metric: 'Quality Gate: PASSED (Grade A)',
    description: 'Static application security testing verifying code coverage, security hotspots, and cyclomatic complexity.',
    details: [
      'Zero blocker and critical vulnerabilities quality gate',
      'Technical debt ratio < 1.2%',
      'Automated quality gate webhook validation',
    ],
    logs: [
      '[sonarqube] Initializing SonarScanner v5.0.1 engine...',
      '[sonarqube] Analyzing 14,200 lines of source code...',
      '[sonarqube] Security Hotspots: 0 unreviewed',
      '[sonarqube] Vulnerabilities: 0 Blocker, 0 Critical, 0 Major',
      '[sonarqube] QUALITY GATE RESULT: PASSED (Grade A certified)',
    ],
  },
  {
    id: 'docker',
    name: 'Containerization',
    tool: 'Docker Engine',
    category: 'Artifact Build',
    icon: Box,
    metric: 'Image: 42MB (Alpine Multi-Stage)',
    description: 'Multi-stage Docker build producing hardened, minimal production container images.',
    details: [
      'Multi-stage build discarding development artifacts',
      'Non-root execution (UID 10001)',
      'Immutable image tagging with git commit SHA',
    ],
    logs: [
      '[docker] Step 1/8: FROM alpine:3.19 AS production-base',
      '[docker] Step 2/8: COPY --from=builder /app/bin /app/bin',
      '[docker] Step 3/8: Creating dedicated unprivileged user (UID 10001)',
      '[docker] Step 4/8: USER 10001',
      '[docker] Image built: registry.local/montblanc:8f2a1c (Digest: sha256:7c9e...)',
    ],
  },
  {
    id: 'trivy',
    name: 'CVE & Misconfig Scan',
    tool: 'Aqua Trivy',
    category: 'Vulnerability Audit',
    icon: ShieldAlert,
    metric: '0 Crit / 0 High CVEs Detected',
    description: 'Deep container vulnerability scanner inspecting OS packages, app dependencies, and SBOM.',
    details: [
      'Fails CI build if any CRITICAL or HIGH CVE exists',
      'Software Bill of Materials (SBOM) generation',
      'Dockerfile security misconfiguration compliance',
    ],
    logs: [
      '[trivy] Updating Aqua vulnerability database...',
      '[trivy] Target image: registry.local/montblanc:8f2a1c',
      '[trivy] Scanning OS dependencies (Alpine 3.19)... 0 vulnerabilities',
      '[trivy] Scanning application manifest packages... 0 vulnerabilities',
      '[trivy] SBOM cyclonedx-json exported. AUDIT PASSED: 0 Critical / 0 High',
    ],
  },
  {
    id: 'k3s',
    name: 'Cluster Deployment',
    tool: 'k3s Kubernetes',
    category: 'Orchestration',
    icon: Server,
    metric: 'Replicas: 3/3 Healthy (Rolling)',
    description: 'Lightweight Kubernetes cluster managing rolling deployments, ingress routing, and pod health.',
    details: [
      'Rolling update strategy with zero downtime',
      'ConfigMaps & Secrets decoupled',
      'Liveness and readiness probes configured',
    ],
    logs: [
      '[k3s] Authenticated to cluster control plane (k3s v1.28.4)',
      '[k3s] Applying deployment spec: montblanc-api (RollingUpdate)',
      '[k3s] Pod montblanc-api-79b8f-1 ready (1/1)',
      '[k3s] Pod montblanc-api-79b8f-2 ready (1/1)',
      '[k3s] Ingress Traefik route updated -> https://montblanc.prod.local (HTTP 200 OK)',
    ],
  },
  {
    id: 'monitoring',
    name: 'Telemetry & Logs',
    tool: 'Prometheus & Grafana',
    category: 'Observability',
    icon: Activity,
    metric: 'P99: 14ms · 100% Up · Loki Logs',
    description: 'Centralized observability scraping cluster metrics, container health, and Loki logs.',
    details: [
      'Prometheus custom metrics & threshold alerts',
      'Grafana executive latency and throughput dashboard',
      'Promtail log shipping to Grafana Loki',
    ],
    logs: [
      '[prometheus] ServiceMonitor discovery: montblanc-api:8080/metrics registered',
      '[prometheus] Scrape completed in 1.4ms: up{job="montblanc"} = 1',
      '[loki] Promtail stream connected. Ingesting container log streams',
      '[grafana] Dashboard #28 alert state: OK (Latency P99 < 15ms)',
      '[pipeline] Execution complete. Production infrastructure fully verified.',
    ],
  },
]

export default function InteractivePipeline() {
  const [activeStageId, setActiveStageId] = useState<string>('sast')
  const [isSimulating, setIsSimulating] = useState<boolean>(false)
  const [simulatedStageIndex, setSimulatedStageIndex] = useState<number>(-1)
  const [simulationLogs, setSimulationLogs] = useState<string[]>([])
  const cancelRef = useRef<boolean>(false)
  const logContainerRef = useRef<HTMLDivElement>(null)

  const activeStage = STAGES.find((s) => s.id === activeStageId) || STAGES[0]

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight
    }
  }, [simulationLogs])

  async function handleSimulate() {
    if (isSimulating) {
      // Cancel simulation
      cancelRef.current = true
      setIsSimulating(false)
      setSimulatedStageIndex(-1)
      return
    }

    cancelRef.current = false
    setIsSimulating(true)
    setSimulationLogs(['[pipeline] Starting simulated DevSecOps automated pipeline run...'])

    // Slower, deliberate execution: ~1.8 seconds per stage so visitor can follow
    for (let i = 0; i < STAGES.length; i++) {
      if (cancelRef.current) break

      const currentStage = STAGES[i]
      setSimulatedStageIndex(i)
      setActiveStageId(currentStage.id)

      // Stream log lines smoothly with delay
      for (const logLine of currentStage.logs) {
        if (cancelRef.current) break
        setSimulationLogs((prev) => [...prev, logLine])
        await new Promise((res) => setTimeout(res, 320))
      }

      await new Promise((res) => setTimeout(res, 400))
    }

    if (!cancelRef.current) {
      setSimulationLogs((prev) => [
        ...prev,
        '────────────────────────────────────────────────────────────',
        '✔ SUCCESS: All 7 DevSecOps pipeline stages passed successfully!',
      ])
    }

    setSimulatedStageIndex(-1)
    setIsSimulating(false)
  }

  const progressPercent = isSimulating && simulatedStageIndex >= 0
    ? Math.round(((simulatedStageIndex + 1) / STAGES.length) * 100)
    : 100

  return (
    <div className="space-y-6">
      {/* Top action header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-mx-line/60 pb-4">
        <div>
          <h3 className="text-lg font-bold text-mx-bright flex items-center gap-2">
            <span>DevSecOps &amp; Cloud Infrastructure Architecture</span>
            <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 bg-emerald-500/10 text-2xs">
              Production Verified
            </Badge>
          </h3>
          <p className="text-xs sm:text-sm text-mx-textDim">
            Interactive pipeline representation of the DevSecOps platform built for Montblanc. Click any node to inspect telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-auto">
          {isSimulating && (
            <span className="font-mono text-xs text-mx-primary font-semibold animate-pulse">
              {progressPercent}% Complete
            </span>
          )}

          <Button
            type="button"
            onClick={handleSimulate}
            variant={isSimulating ? 'outline' : 'solid'}
            size="sm"
            className="gap-2"
          >
            {isSimulating ? (
              <>
                <Square className="h-3.5 w-3.5 fill-current text-red-400" />
                <span>Stop Simulation</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Simulate Pipeline Run</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Progress Bar Track during simulation */}
      {isSimulating && (
        <div className="w-full bg-mx-panel2 rounded-full h-1.5 overflow-hidden border border-mx-line">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}

      {/* Interactive Step Navigator */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
        {STAGES.map((stage, idx) => {
          const Icon = stage.icon
          const isSelected = activeStage.id === stage.id
          const isCurrentlySimulating = isSimulating && simulatedStageIndex === idx
          const isPastSimulating = isSimulating && simulatedStageIndex > idx

          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => {
                if (!isSimulating) setActiveStageId(stage.id)
              }}
              className={cn(
                'group relative flex flex-col justify-between rounded-xl border p-3.5 text-left transition-all duration-300',
                isSelected
                  ? 'border-mx-primary bg-mx-primary/10 shadow-lg shadow-blue-500/10 ring-1 ring-mx-primary'
                  : 'border-mx-line bg-mx-panel/80 hover:border-mx-primary/50 hover:bg-mx-panel2/60',
                isCurrentlySimulating && 'ring-2 ring-emerald-400 bg-emerald-500/15 border-emerald-400 scale-[1.02]',
              )}
            >
              <div className="flex items-center justify-between w-full">
                <span
                  className={cn(
                    'flex h-7 w-7 items-center justify-center rounded-lg border text-xs transition-colors',
                    isSelected
                      ? 'border-mx-primary bg-mx-primary text-white'
                      : 'border-mx-line bg-mx-panel2 text-mx-primary',
                    isCurrentlySimulating && 'border-emerald-400 bg-emerald-400 text-slate-950 font-bold',
                  )}
                >
                  {isCurrentlySimulating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : isPastSimulating ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Icon className="h-3.5 w-3.5" />
                  )}
                </span>
                <span className="font-mono text-2xs text-mx-textFaint">0{idx + 1}</span>
              </div>

              <div className="mt-3">
                <p className="font-sans text-xs font-bold text-mx-bright truncate">{stage.tool}</p>
                <p className="text-[11px] text-mx-textDim truncate">{stage.name}</p>
              </div>

              {isSelected && (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-2 -bottom-1 h-0.5 rounded-full bg-mx-primary"
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Selected Stage Detail Panel */}
      <Card className="border border-mx-line/80 bg-gradient-to-br from-mx-panel via-mx-panel to-mx-panel2/50 shadow-xl">
        <CardCommand className="justify-between">
          <div className="flex items-center gap-2">
            <activeStage.icon className="h-3.5 w-3.5 text-mx-primary" />
            <span className="font-semibold text-mx-bright">{activeStage.tool}</span>
            <span className="text-mx-textFaint">·</span>
            <span>{activeStage.category}</span>
          </div>
          <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 bg-emerald-500/10 font-mono text-2xs">
            {activeStage.metric}
          </Badge>
        </CardCommand>

        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <CardTitle className="text-xl sm:text-2xl text-mx-bright">{activeStage.name}</CardTitle>
              <p className="text-sm text-mx-textDim mt-1 leading-relaxed">{activeStage.description}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 pt-1">
          <div className="grid gap-4 md:grid-cols-2 items-start">
            {/* Architectural Highlights */}
            <div className="space-y-2.5">
              <p className="font-mono text-2xs uppercase tracking-wider text-mx-primary font-semibold">
                Architectural Implementation
              </p>
              <ul className="space-y-2 text-xs text-mx-textDim">
                {activeStage.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Terminal Live Output Simulation */}
            <div className="rounded-lg border border-mx-line bg-black/60 p-3.5 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-mx-line/50 pb-2 mb-2 text-2xs text-mx-textFaint">
                <div className="flex items-center gap-1.5">
                  <Terminal className="h-3 w-3 text-mx-primary" />
                  <span>runtime.log</span>
                </div>
                <span className="text-emerald-400 font-semibold">
                  {isSimulating ? 'STREAMING EXECUTION' : 'STATUS: VERIFIED'}
                </span>
              </div>
              <div
                ref={logContainerRef}
                className="max-h-40 overflow-y-auto space-y-1 text-mx-textDim text-[11.5px] leading-relaxed scrollbar-thin"
              >
                {(isSimulating && simulationLogs.length > 0 ? simulationLogs : activeStage.logs).map((log, i) => (
                  <div key={i} className={cn(log.startsWith('✔') ? 'text-emerald-400 font-semibold' : '')}>
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

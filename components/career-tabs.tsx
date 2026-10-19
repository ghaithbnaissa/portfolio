'use client'

import { useState } from 'react'
import {
  Activity,
  Briefcase,
  Layers,
  Monitor,
  Network,
  Server,
  ShieldCheck,
} from 'lucide-react'

import { Badge } from './ui/badge'
import { Card, CardCommand, CardContent, CardHeader, CardTitle } from './ui/card'
import BracketFrame from './matrix/bracket-frame'
import { experience } from '../data/experience'

const SKILL_CATEGORIES = [
  {
    name: 'IT Support & Systems Administration',
    icon: Monitor,
    badge: 'Diagnostics & Systems',
    skills: [
      'Incident Diagnostics',
      'Hardware & Software Troubleshooting',
      'Windows Maintenance',
      'User Support',
      'Linux (Ubuntu)',
      'Windows Server',
      'SSH',
      'Proxmox VE',
      'VMware',
      'VirtualBox',
      'LXC',
    ],
  },
  {
    name: 'Networking & Cisco Architecture',
    icon: Network,
    badge: 'Cisco CCNA & Infrastructure',
    skills: [
      'Cisco CCNA',
      'TCP/IP',
      'Routing & Switching',
      'VLAN',
      'DHCP & DNS',
      'Network Troubleshooting',
      'Firewalls',
      'IDS/IPS',
    ],
  },
  {
    name: 'DevSecOps & Security Automation',
    icon: ShieldCheck,
    badge: 'CI/CD & Security Gates',
    skills: [
      'Jenkins CI/CD',
      'Docker & Compose',
      'k3s Kubernetes',
      'SonarQube',
      'Trivy',
      'OWASP ZAP',
      'Python',
      'Bash',
      'Git',
    ],
  },
  {
    name: 'Observability & Infrastructure Monitoring',
    icon: Activity,
    badge: 'Telemetry & Logs',
    skills: ['Prometheus', 'Grafana', 'Loki', 'Promtail', 'cAdvisor', 'Resource Tracking'],
  },
]

type TabKey = 'skills' | 'experience'

export default function CareerTabs() {
  const [activeTab, setActiveTab] = useState<TabKey>('skills')

  return (
    <div className="space-y-6">
      {/* Tab Navigation Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-mx-line/60 pb-3">
        <div className="flex items-center gap-1.5 rounded-lg border border-mx-line bg-mx-panel/80 p-1 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setActiveTab('skills')}
            className={`flex items-center gap-2 rounded-md px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider transition-all duration-200 ${
              activeTab === 'skills'
                ? 'bg-mx-primary/20 text-mx-bright font-semibold shadow-sm'
                : 'text-mx-textDim hover:bg-mx-primary/10 hover:text-mx-bright'
            }`}
          >
            <Layers className="h-3.5 w-3.5 text-mx-primary" />
            <span>Technical Stack</span>
            <span className="hidden sm:inline-block rounded-full bg-mx-panel2 px-1.5 py-0.2 text-2xs text-mx-textFaint">
              4 domains
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('experience')}
            className={`flex items-center gap-2 rounded-md px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider transition-all duration-200 ${
              activeTab === 'experience'
                ? 'bg-mx-primary/20 text-mx-bright font-semibold shadow-sm'
                : 'text-mx-textDim hover:bg-mx-primary/10 hover:text-mx-bright'
            }`}
          >
            <Briefcase className="h-3.5 w-3.5 text-mx-primary" />
            <span>Timeline</span>
            <span className="hidden sm:inline-block rounded-full bg-mx-panel2 px-1.5 py-0.2 text-2xs text-mx-textFaint">
              5 entries
            </span>
          </button>
        </div>

        <p className="hidden md:block font-mono text-2xs text-mx-textFaint">
          Click tabs to switch between technical stack and career timeline
        </p>
      </div>

      {/* TAB 1: TECHNICAL ARSENAL */}
      {activeTab === 'skills' && (
        <div className="grid gap-5 md:grid-cols-2 animate-rise-in">
          {SKILL_CATEGORIES.map((category) => {
            const CategoryIcon = category.icon
            return (
              <BracketFrame key={category.name} onHover size={12}>
                <Card className="mx-panel-hover flex h-full flex-col justify-between">
                  <div>
                    <CardCommand>
                      <CategoryIcon className="h-3.5 w-3.5 text-mx-primary" />
                      <span>{category.badge}</span>
                    </CardCommand>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base text-mx-bright flex items-center justify-between">
                        <span>{category.name}</span>
                        <span className="font-mono text-xs font-normal text-mx-textFaint">
                          {category.skills.length} skills
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="outline"
                            className="px-2.5 py-1 text-xs font-mono transition-all hover:scale-105"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </BracketFrame>
            )
          })}
        </div>
      )}

      {/* TAB 2: EXPERIENCE & EDUCATION TIMELINE */}
      {activeTab === 'experience' && (
        <div className="relative space-y-5 animate-rise-in before:absolute before:bottom-0 before:left-[17px] before:top-2 before:w-px before:bg-gradient-to-b before:from-mx-primary/60 before:via-mx-line before:to-transparent">
          {experience.map((item, index) => (
            <div key={`${item.year}-${item.title}`} className="relative flex items-start gap-4 sm:gap-5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-mx-primary/60 bg-mx-panel text-mx-primary font-mono text-xs shadow-glow">
                {String(index + 1).padStart(2, '0')}
              </div>
              <div className="flex-1">
                <BracketFrame onHover size={12}>
                  <Card className="mx-panel-hover">
                    <CardCommand>
                      <span>record://{item.year.toLowerCase().replace(/[^a-z0-9]/g, '_')}</span>
                    </CardCommand>
                    <CardHeader className="pb-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <CardTitle className="text-base text-mx-bright">{item.title}</CardTitle>
                        <Badge variant="outline" className="border-mx-primary/40 text-mx-primary">
                          {item.year}
                        </Badge>
                      </div>
                      <p className="font-mono text-xs text-mx-primary-dim">{item.organization}</p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm leading-relaxed text-mx-textDim">{item.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {item.technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-2xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </BracketFrame>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

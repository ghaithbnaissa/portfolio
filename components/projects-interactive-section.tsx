'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ArrowRight, ExternalLink, ShieldCheck, Filter, Layers } from 'lucide-react'

import { projects } from '../data/projects'
import { Card, CardCommand, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import SectionHeading from './section-heading'

const CATEGORIES = [
  { id: 'all', label: 'All Architectures' },
  { id: 'devsecops', label: 'DevSecOps & CI/CD' },
  { id: 'networking', label: 'Enterprise Networks' },
  { id: 'observability', label: 'Observability & Monitoring' },
]

export default function ProjectsInteractiveSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') return projects

    return projects.filter((project) => {
      const combined = (project.stack.join(' ') + ' ' + project.architecture + ' ' + project.shortDescription).toLowerCase()
      if (selectedCategory === 'devsecops') {
        return combined.includes('jenkins') || combined.includes('devsecops') || combined.includes('ci/cd') || combined.includes('trivy')
      }
      if (selectedCategory === 'networking') {
        return combined.includes('cisco') || combined.includes('network') || combined.includes('routing') || combined.includes('packet') || combined.includes('terraform')
      }
      if (selectedCategory === 'observability') {
        return combined.includes('prometheus') || combined.includes('grafana') || combined.includes('monitoring') || combined.includes('loki')
      }
      return true
    })
  }, [selectedCategory])

  return (
    <div className="space-y-6">
      <SectionHeading
        index="03 · PROJECTS"
        title="Featured Engineering Projects"
        kicker="Production-grade systems, automated pipelines and network architectures"
        icon={ShieldCheck}
        meta={
          <div className="flex items-center gap-1.5 rounded-lg border border-mx-line bg-mx-panel/90 p-1">
            <Filter className="h-3 w-3 text-mx-primary ml-1" />
            <div className="flex items-center gap-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`rounded-md px-2.5 py-1 text-2xs font-sans transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-mx-primary/20 text-mx-bright font-semibold shadow-sm'
                      : 'text-mx-textDim hover:text-mx-bright'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        }
      />

      <div className="grid gap-6 md:grid-cols-3">
        {filteredProjects.map((project) => (
          <Card key={project.slug} className="mx-panel-hover flex h-full flex-col justify-between">
            <div>
              <CardCommand>
                <ShieldCheck className="h-3.5 w-3.5 text-mx-primary" />
                <span className="font-sans font-medium">{project.name}</span>
              </CardCommand>
              <CardHeader>
                <CardTitle className="text-xl">{project.name}</CardTitle>
                <p className="mt-2 text-sm leading-relaxed text-mx-textDim">
                  {project.shortDescription}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-md border border-mx-line/60 bg-mx-panel2/40 p-3 text-xs leading-relaxed text-mx-textDim">
                  <p className="font-mono text-2xs uppercase tracking-[0.16em] text-mx-primary font-medium">Architecture</p>
                  <p className="mt-1 font-mono text-2xs text-mx-bright">{project.architecture}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-2xs font-mono">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </div>
            <div className="border-t border-mx-line/50 p-5 pt-4">
              <div className="flex items-center justify-between">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 font-sans font-medium text-xs text-mx-primary transition-colors hover:text-mx-bright hover:underline"
                >
                  <span>Deep Dive Architecture</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-sans text-xs text-mx-textFaint hover:text-mx-bright transition-colors"
                >
                  <span>Source</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

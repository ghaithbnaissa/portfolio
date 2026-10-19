import Link from 'next/link'
import { ArrowLeft, ArrowRight, ExternalLink, ShieldCheck } from 'lucide-react'

import { projects } from '../../data/projects'
import { Card, CardCommand, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import SiteHeader from '../../components/site-header'
import SiteFooter from '../../components/site-footer'
import SectionHeading from '../../components/section-heading'

export const metadata = {
  title: 'System Projects | Ghaith Ben Aissa',
  description: 'DevSecOps, Network Engineering, and Cloud Automation Projects by Ghaith Ben Aissa.',
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen text-mx-text">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-sans text-xs font-semibold text-mx-primary hover:text-mx-bright hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Portfolio</span>
          </Link>
        </div>

        <SectionHeading
          index="03 · ARCHIVE"
          title="System Architecture Projects"
          kicker="Production pipelines, virtualization &amp; observability architectures"
          icon={ShieldCheck}
        />

        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((project) => (
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
                    <p className="font-mono text-2xs uppercase tracking-[0.16em] text-mx-primary">Architecture</p>
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
                    className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-mx-primary transition-colors hover:text-mx-bright hover:underline"
                  >
                    <span>Deep Dive</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-sans text-xs text-mx-textFaint hover:text-mx-bright"
                  >
                    <span>Repository</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink, Github, Layers, Terminal } from 'lucide-react'

import { projects } from '../../../data/projects'
import { Badge } from '../../../components/ui/badge'
import { Card, CardCommand, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import SiteHeader from '../../../components/site-header'
import SiteFooter from '../../../components/site-footer'
import BracketFrame from '../../../components/matrix/bracket-frame'

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects.find((item) => item.slug === slug)

  if (!project) {
    return { title: 'Project Not Found | Ghaith Ben Aissa' }
  }

  return {
    title: `${project.name} | Ghaith Ben Aissa`,
    description: project.shortDescription,
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects.find((item) => item.slug === slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen text-mx-text">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-mono text-xs text-mx-primary hover:text-mx-bright hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to All Projects</span>
          </Link>
        </div>

        <div className="mb-8 space-y-2">
          <div className="flex items-center gap-3">
            <span className="font-mono text-2xs uppercase tracking-[0.22em] text-mx-primary">
              DEPLOYMENT SPECIFICATION
            </span>
            <span className="mx-hairline flex-1" />
          </div>
          <h1 className="font-display text-3xl font-bold tracking-[0.04em] text-mx-bright sm:text-4xl">
            {project.name}
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-mx-textDim">
            {project.shortDescription}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <BracketFrame>
            <Card className="h-full">
              <CardCommand>
                <Terminal className="h-3.5 w-3.5 text-mx-primary" />
                <span>manifest://{project.slug}/overview</span>
              </CardCommand>
              <CardHeader>
                <CardTitle className="text-xl">System Architectural Brief</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-sm leading-relaxed text-mx-textDim">
                <div className="space-y-1.5 rounded-md border border-mx-line/70 bg-mx-panel2/50 p-4">
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-mx-primary">The Engineering Problem</p>
                  <p className="text-mx-bright">{project.problem}</p>
                </div>

                <div className="space-y-1.5 rounded-md border border-mx-line/70 bg-mx-panel2/50 p-4">
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-mx-primary">Architectural Solution</p>
                  <p className="text-mx-bright">{project.solution}</p>
                </div>

                <div className="space-y-1.5 rounded-md border border-mx-line/70 bg-mx-panel2/50 p-4">
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-mx-primary">Topology & Dataflow</p>
                  <p className="font-mono text-xs text-mx-bright">{project.architecture}</p>
                </div>

                <div className="space-y-1.5 rounded-md border border-mx-line/70 bg-mx-panel2/50 p-4">
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-mx-primary">Delivery & CI/CD Pipeline</p>
                  <p className="text-mx-bright">{project.ciCd}</p>
                </div>

                <div className="space-y-1.5 rounded-md border border-mx-line/70 bg-mx-panel2/50 p-4">
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-mx-primary">Lessons Learned & Key Takeaways</p>
                  <p className="text-mx-bright">{project.lessons}</p>
                </div>
              </CardContent>
            </Card>
          </BracketFrame>

          <div className="space-y-6">
            <Card className="mx-panel-hover">
              <CardCommand>
                <Layers className="h-3.5 w-3.5 text-mx-primary" />
                <span>stack://technologies</span>
              </CardCommand>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Target Stack & Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <Badge key={tech} variant="outline" className="px-2.5 py-1 text-xs font-mono">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mx-panel-hover">
              <CardCommand>
                <ExternalLink className="h-3.5 w-3.5 text-mx-primary" />
                <span>endpoints://links</span>
              </CardCommand>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Source & Deployment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild variant="outline" className="w-full justify-start">
                  <a href={project.repoUrl} target="_blank" rel="noreferrer">
                    <Github className="h-4 w-4" />
                    <span>View Repository on GitHub</span>
                  </a>
                </Button>
                {project.liveUrl ? (
                  <Button asChild variant="solid" className="w-full justify-start">
                    <a href={project.liveUrl} target="_blank" rel="noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      <span>Live Environment</span>
                    </a>
                  </Button>
                ) : (
                  <p className="rounded-md border border-mx-line/50 bg-mx-panel2/30 p-3 font-mono text-2xs text-mx-textFaint">
                    Live demo hosted in private lab / on-premise cluster.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

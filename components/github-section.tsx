import Link from 'next/link'
import { GitFork, GitPullRequest, Github, Star, FolderGit2, ArrowUpRight } from 'lucide-react'

import { getGitHubOverview } from '../lib/github'
import { Badge } from './ui/badge'
import { Card, CardCommand, CardContent, CardHeader, CardTitle } from './ui/card'
import SectionHeading from './matrix/section-heading'
import BracketFrame from './matrix/bracket-frame'

type GitHubSectionProps = {
  username: string
}

export default async function GitHubSection({ username }: GitHubSectionProps) {
  const github = await getGitHubOverview(username)

  return (
    <section id="github" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        index="06 / CODE"
        title="GitHub Activity"
        kicker="Open source repositories and coding activity"
        icon={Github}
        meta={
          <Badge variant="outline" className="gap-1.5 border-mx-line bg-mx-panel/60">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                github.source === 'live' ? 'animate-pulse-glow bg-mx-primary' : 'bg-mx-warn'
              }`}
            />
            <span>{github.source === 'live' ? 'LIVE SYNC' : 'OFFLINE SNAPSHOT'}</span>
          </Badge>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="mx-panel-hover">
          <CardCommand>
            <FolderGit2 className="h-3.5 w-3.5 text-mx-primary" />
            <span>git://repos/count</span>
          </CardCommand>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-mono uppercase tracking-[0.18em] text-mx-textDim">
              Public Repositories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-display text-3xl font-bold tracking-tight text-mx-bright">
              {github.public_repos}
            </div>
            <p className="mt-1 font-mono text-2xs text-mx-textFaint">Active source projects</p>
          </CardContent>
        </Card>

        <Card className="mx-panel-hover">
          <CardCommand>
            <GitPullRequest className="h-3.5 w-3.5 text-mx-primary" />
            <span>git://activity/pushes</span>
          </CardCommand>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-mono uppercase tracking-[0.18em] text-mx-textDim">
              Recent Commits & Pushes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-display text-3xl font-bold tracking-tight text-mx-bright">
              {github.recent_pushes}
            </div>
            <p className="mt-1 font-mono text-2xs text-mx-textFaint">Recorded in telemetry</p>
          </CardContent>
        </Card>

        <Card className="mx-panel-hover">
          <CardCommand>
            <Github className="h-3.5 w-3.5 text-mx-primary" />
            <span>net://network/followers</span>
          </CardCommand>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-mono uppercase tracking-[0.18em] text-mx-textDim">
              Followers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-display text-3xl font-bold tracking-tight text-mx-bright">
              {github.followers}
            </div>
            <p className="mt-1 font-mono text-2xs text-mx-textFaint">Developer network</p>
          </CardContent>
        </Card>

        <Card className="mx-panel-hover">
          <CardCommand>
            <Github className="h-3.5 w-3.5 text-mx-primary" />
            <span>net://network/following</span>
          </CardCommand>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-mono uppercase tracking-[0.18em] text-mx-textDim">
              Following
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-display text-3xl font-bold tracking-tight text-mx-bright">
              {github.following}
            </div>
            <p className="mt-1 font-mono text-2xs text-mx-textFaint">Open-source peers</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {github.repos.map((repo) => (
          <BracketFrame key={repo.html_url} onHover size={12}>
            <Card className="mx-panel-hover flex h-full flex-col justify-between">
              <CardCommand>
                <span className="text-mx-primary font-mono">repo://{repo.name}</span>
              </CardCommand>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg font-medium tracking-normal text-mx-bright">
                      {repo.name}
                    </CardTitle>
                    <p className="mt-2 text-sm leading-relaxed text-mx-textDim">
                      {repo.description ?? 'DevSecOps, networking infrastructure, and automation code.'}
                    </p>
                  </div>
                  {repo.language ? (
                    <Badge variant="outline" className="shrink-0 border-mx-line bg-mx-panel2/60">
                      {repo.language}
                    </Badge>
                  ) : null}
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                <div className="flex items-center gap-4 font-mono text-xs text-mx-textFaint">
                  <span className="flex items-center gap-1.5 hover:text-mx-textDim">
                    <Star className="h-3.5 w-3.5 text-mx-primary/70" />
                    <span>{repo.stargazers_count} stars</span>
                  </span>
                  <span className="flex items-center gap-1.5 hover:text-mx-textDim">
                    <GitFork className="h-3.5 w-3.5 text-mx-primary/70" />
                    <span>{repo.forks_count} forks</span>
                  </span>
                </div>
                <div className="border-t border-mx-line/50 pt-3">
                  <Link
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-mx-primary transition-colors hover:text-mx-bright hover:underline"
                  >
                    <span>Inspect repository</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </BracketFrame>
        ))}
      </div>
    </section>
  )
}

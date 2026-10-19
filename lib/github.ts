export type GitHubRepo = {
  name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
}

export type GitHubOverview = {
  login: string
  name: string | null
  public_repos: number
  followers: number
  following: number
  recent_pushes: number
  repos: GitHubRepo[]
  source: 'live' | 'fallback'
}

const fallbackOverview: GitHubOverview = {
  login: 'ghaithbnaissa',
  name: 'Ghaith Ben Aissa',
  public_repos: 12,
  followers: 0,
  following: 0,
  recent_pushes: 0,
  repos: [
    {
      name: 'devsecops-pipeline',
      html_url: 'https://github.com/ghaithbnaissa',
      description: 'DevSecOps pipeline with security gates.',
      language: 'TypeScript',
      stargazers_count: 0,
      forks_count: 0,
      updated_at: new Date().toISOString(),
    },
  ],
  source: 'fallback',
}

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'ghaithbnaissa-portfolio',
      },
      next: { revalidate: 1800 },
    })

    if (!response.ok) {
      return null
    }

    return (await response.json()) as T
  } catch {
    return null
  }
}

export async function getGitHubOverview(username: string): Promise<GitHubOverview> {
  const profile = await fetchJson<{ login: string; name: string | null; public_repos: number; followers: number; following: number }>(
    `https://api.github.com/users/${username}`
  )

  const repos = await fetchJson<GitHubRepo[]>(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=4&type=owner`
  )

  const events = await fetchJson<Array<{ type: string }>>(
    `https://api.github.com/users/${username}/events/public?per_page=30`
  )

  if (!profile || !repos) {
    return fallbackOverview
  }

  const recentPushes = events?.filter((event) => event.type === 'PushEvent').length ?? 0

  return {
    login: profile.login,
    name: profile.name,
    public_repos: profile.public_repos,
    followers: profile.followers,
    following: profile.following,
    recent_pushes: recentPushes,
    repos,
    source: 'live',
  }
}

export { fallbackOverview }

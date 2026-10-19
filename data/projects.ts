export const projects = [
  {
    slug: 'devsecops-pipeline',
    name: 'DevSecOps Pipeline',
    stack: ['Docker', 'Jenkins', 'Trivy'],
    summary: 'Secure CI/CD flow with scanning and deployment gates.',
    shortDescription:
      'A production-style pipeline that automates build, security scanning, and release gates for containerized applications.',
    problem:
      'Manual releases made deployments slow and risky, with no security checks before shipping.',
    solution:
      'Built a Jenkins-driven pipeline with Docker image builds, Trivy scanning, and environment promotion gates.',
    architecture:
      'Git push -> Jenkins -> build/test -> scan -> package -> deploy -> observe.',
    ciCd:
      'Jenkins orchestrates the pipeline, with artifact promotion and rollback-ready release steps.',
    lessons:
      'Security checks must live inside the pipeline, not after deployment.',
    repoUrl: 'https://github.com/ghaithbnaissa',
    liveUrl: '',
  },
  {
    slug: 'terraform-aws-platform',
    name: 'Terraform AWS Platform',
    stack: ['AWS', 'Terraform', 'GitHub Actions'],
    summary: 'Infrastructure as code for repeatable cloud environments.',
    shortDescription:
      'Reusable Terraform modules that provision secure AWS primitives for repeatable environments and automated delivery.',
    problem:
      'Ad hoc cloud resources were hard to audit, reproduce, and secure across environments.',
    solution:
      'Defined modular Terraform stacks, remote state handling, and GitHub Actions validation for each change.',
    architecture:
      'Repo -> Terraform plan -> approval -> apply -> AWS resources -> monitoring.',
    ciCd:
      'GitHub Actions validates formatting, plans infrastructure, and only applies approved changes.',
    lessons:
      'Infrastructure should be versioned and reviewed like application code.',
    repoUrl: 'https://github.com/ghaithbnaissa',
    liveUrl: '',
  },
  {
    slug: 'monitoring-stack',
    name: 'Monitoring Stack',
      stack: ['Docker Compose', 'Prometheus', 'Grafana', 'Loki', 'Promtail', 'cAdvisor'],
    summary: 'Operational visibility with dashboards and alerts.',
    shortDescription:
        'Docker Compose-based monitoring infrastructure for application and service metrics, logs, and Grafana dashboards.',
    problem:
      'Without telemetry, failures were discovered too late and root causes were hard to trace.',
    solution:
      'Added Prometheus scraping, Grafana dashboards, and actionable alerts for key service signals.',
    architecture:
      'Apps -> exporters -> Prometheus -> Grafana/alerts -> incident response.',
    ciCd:
      'Dashboard and config changes are stored as code and deployed through a tracked release flow.',
    lessons:
      'Good observability shortens both detection time and recovery time.',
    repoUrl: 'https://github.com/ghaithbnaissa',
    liveUrl: '',
  },
]

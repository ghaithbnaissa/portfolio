# DevOps Portfolio Sprint Plan (Terminal + Dashboard Hybrid)

## Project Vision

Build a production-grade portfolio that looks and behaves like a real DevOps workspace: Linux terminal hero, engineering dashboard, deep technical project pages, live GitHub data, and a fully automated DevOps deployment pipeline.

## Mandatory Technology Stack

### Core Frameworks and Languages

- Frontend framework: Next.js 15 (App Router)
- Language: TypeScript (strict mode)
- Styling: Tailwind CSS
- UI components: shadcn/ui
- Animations: Framer Motion
- Charts: Recharts
- Icons: Lucide React + Simple Icons
- Terminal: Custom React terminal component (no external terminal emulator)

### Backend/Server Features

- Contact handling: Next.js Server Actions
- Email delivery: Resend
- API integrations: GitHub REST API

### DevOps, Tooling, and Deployment

- Version control: Git + GitHub
- CI/CD: GitHub Actions
- Containerization: Docker (multi-stage build)
- Hosting/Deployment: Vercel
- Package manager/runtime: Node.js LTS + npm (or pnpm, if standardized at setup)

### Quality and Engineering Standards

- Type checking: TypeScript
- Linting: ESLint (Next.js defaults + project rules)
- Formatting: Prettier (recommended)
- Accessibility target: WCAG AA baseline
- Performance target: High Lighthouse scores (Performance, Accessibility, SEO, Best Practices)

---

## Sprint 0 - Foundation Lock

### Goal

Set up the project correctly so all later work is fast, consistent, and maintainable.

### Deliverables

- Next.js 15 + TypeScript + Tailwind CSS project initialized
- shadcn/ui configured with base components
- Framer Motion, Lucide, Simple Icons, Recharts, and utility packages installed
- Project structure finalized (components, app routes, data, lib, styles)
- Environment variable strategy drafted for GitHub and Resend

### Acceptance Criteria

- Project runs locally with no setup errors
- TypeScript strict mode enabled
- Base theme tokens compile and render
- CI can run lint + typecheck + build successfully

---

## Sprint 1 - Global Design System

### Goal

Create a coherent visual system inspired by Linux terminals and cloud dashboards.

### Design Direction

- Background: #0F172A
- Surface cards: #1E293B
- Accent blue: #2563EB
- Success green: #22C55E
- Warning: orange
- Error: red
- UI font: Inter
- Terminal/code font: JetBrains Mono

### Deliverables

- Global color, spacing, radius, shadow, and typography tokens
- Light/dark theme architecture
- Fixed top navigation layout (Home, About, Projects, Skills, Experience, Certifications, GitHub, Contact)
- Shared motion presets in Framer Motion

### Acceptance Criteria

- UI is consistent across sections
- Navigation is responsive and sticky
- Reduced motion preferences are respected

---

## Sprint 2 - Hero Section (Interactive Linux Terminal)

### Goal

Make the first screen memorable and technically authentic with a custom-built terminal.

### Required Commands

- whoami
- role
- skills
- education
- location
- status
- uptime
- contact

### Deliverables

- Custom React terminal with typing animation and blinking cursor
- Command history and realistic Linux-style output blocks
- CTA actions: View Projects, Download CV, GitHub, LinkedIn
- Framer Motion entrance and transition animations

### Acceptance Criteria

- Command sequence runs in correct order
- Terminal is keyboard accessible
- Reduced motion mode provides a non-animated alternative

---

## Sprint 3 - Dashboard Overview

### Goal

Present technical profile immediately after terminal sequence.

### Deliverables

- Responsive dashboard card grid using shadcn/ui
- Animated counters for:
  - Completed projects
  - GitHub repositories
  - Technologies mastered
  - Docker containers deployed
  - CI/CD pipelines created
  - Certifications earned
  - Years of learning
- Recharts visualizations for selected engineering metrics

### Acceptance Criteria

- Counters animate once on viewport entry
- Charts remain readable on mobile and desktop
- Dashboard transition from terminal feels smooth

---

## Sprint 4 - About Me

### Goal

Communicate professional identity clearly and concisely.

### Deliverables

- About cards covering:
  - DevOps/Cloud/Cybersecurity focus
  - Interests in automation, Linux, cloud, CI/CD, monitoring
  - Location and education details
  - Expected graduation date
  - Languages
  - Career objective

### Acceptance Criteria

- Content is concise and recruiter-friendly
- Typography and spacing maximize readability

---

## Sprint 5 - Technology Stack

### Goal

Show practical skills in a structured, visual grid.

### Required Categories

- Cloud
- Containers
- Infrastructure as Code
- CI/CD
- Monitoring
- Security
- Programming Languages
- Networking
- Operating Systems
- Databases
- Version Control

### Deliverables

- Responsive skill grid with Simple Icons logos
- Category grouping and consistent badge style
- Subtle hover animations via Framer Motion

### Acceptance Criteria

- Only practical/used technologies are listed
- Icons and labels are visually consistent

---

## Sprint 6 - Featured Projects

### Goal

Highlight engineering work with strong, scannable project cards.

### Deliverables

- Project cards (shadcn/ui) including:
  - Thumbnail
  - Short description
  - Technology badges
  - GitHub link
  - Optional live demo link
  - View Details button
- Viewport-based reveal animations

### Acceptance Criteria

- Cards are readable and consistent across breakpoints
- Missing live demo links do not break layout

---

## Sprint 7 - Project Detail Pages

### Goal

Demonstrate technical depth per flagship project.

### Required Content Blocks

- Project overview and purpose
- Problem statement
- Solution and architecture
- CI/CD and deployment workflow
- Technologies used
- Engineering decisions
- Lessons learned

### Technical Artifacts to Include (as applicable)

- Architecture diagrams
- Jenkins pipeline visuals
- Docker Compose snippets
- Kubernetes manifests
- Grafana dashboards
- Prometheus metrics
- SonarQube reports
- Trivy scan results
- OWASP ZAP reports
- Screenshots and deployment diagrams

### Deliverables

- Dynamic project routes with Next.js App Router
- SEO metadata per project page
- Collapsible sections with shadcn/ui (Accordion/Tabs)

### Acceptance Criteria

- Each flagship project has a complete, structured page
- Technical artifacts are organized and easy to navigate

---

## Sprint 8 - Professional Experience & Education

### Goal

Show growth and practical exposure through a clean timeline.

### Deliverables

- Reusable vertical timeline component
- Entries for education, internships, academic work, and experience
- Fields for dates, organization, responsibilities, tech used, achievements

### Acceptance Criteria

- Timeline remains readable on mobile
- Motion effects are subtle and professional

---

## Sprint 9 - Certifications

### Goal

Show validation of skills with consistent and trusted presentation.

### Deliverables

- Certification cards containing:
  - Certification logo
  - Issuer
  - Completion date
  - Verification link (if available)
- Sorted order: completed first, in-progress after

### Acceptance Criteria

- Cards follow global design language
- Sorting and verification links work correctly

---

## Sprint 10 - GitHub Integration

### Goal

Keep portfolio automatically updated with real GitHub activity.

### Deliverables

- GitHub REST API integration for:
  - Latest repositories
  - Stars and forks
  - Languages
  - Recent commits (where feasible)
  - Contribution-related summary data from public sources
- Fallback strategy:
  - Live API response
  - Cached response
  - Local static snapshot

### Acceptance Criteria

- Rate limits and API failures degrade gracefully
- UI never breaks when live data is unavailable

---

## Sprint 11 - Contact Section

### Goal

Enable professional outreach with secure and reliable form handling.

### Deliverables

- Contact details: email, GitHub, LinkedIn, phone, location
- Contact form using Next.js Server Actions + Resend
- Validation and anti-spam protections (honeypot + server-side guards)
- Strong CTAs for CV download and profile links

### Acceptance Criteria

- Form submits successfully and handles errors clearly
- No sensitive keys exposed in client-side code

---

## Sprint 12 - DevOps & Deployment Showcase

### Goal

Turn the portfolio itself into a live DevOps case study.

### Deliverables

- Dockerized application with production-ready multi-stage Dockerfile
- GitHub Actions pipeline for:
  - Install
  - Lint
  - Typecheck
  - Test (if present)
  - Build
  - Optional image build/push
  - Deploy workflow trigger
- Vercel deployment configuration
- Dedicated page documenting architecture, branching strategy, CI/CD flow, and automation

### Acceptance Criteria

- Container builds and runs locally
- CI pipeline passes on pull requests and main branch
- Vercel deployment is stable and reproducible

---

## Sprint 13 - Extra Features & Performance

### Goal

Finalize polish, accessibility, and speed for recruiter-grade delivery.

### Deliverables

- Dark/light mode toggle
- Smooth scrolling and page transitions
- Keyboard-accessible command palette
- Linux boot-sequence style loading animation
- Scroll progress indicator
- Responsive nav polish and edge-case handling
- Next.js optimization pass:
  - Image optimization
  - Lazy loading
  - Code splitting
  - Metadata generation

### Acceptance Criteria

- Strong Lighthouse scores across major categories
- No major accessibility blockers
- Fast first load and smooth interactions on mobile and desktop

---

## Suggested Repository Structure

```text
portfolio/
  app/
    page.tsx
    layout.tsx
    projects/[slug]/page.tsx
    devops-showcase/page.tsx
    api/
  components/
    terminal/
    dashboard/
    projects/
    timeline/
    github/
    ui/
  data/
    profile.ts
    projects.ts
    skills.ts
    certifications.ts
    experience.ts
  lib/
    github.ts
    actions/
    validations/
  public/
    assets/
    cv/
  .github/workflows/
  Dockerfile
  docker-compose.yml (optional for local tooling)
```

## Definition of Done (Project-Level)

- All mandatory stack requirements are implemented
- All sprint deliverables are shipped and validated
- Portfolio is deployed on Vercel
- CI/CD is active via GitHub Actions
- Docker build is documented and reproducible
- GitHub integration is live with graceful fallback
- Contact flow works securely with Resend
- Performance, accessibility, and SEO are production-ready

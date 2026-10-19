import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  GitBranch,
  Layers,
  ShieldCheck,
  Terminal,
} from 'lucide-react'
import Link from 'next/link'

import TerminalHero from '../components/terminal/TerminalHero'
import SiteFooter from '../components/site-footer'
import SiteHeader from '../components/site-header'
import { Badge } from '../components/ui/badge'
import { Card, CardCommand, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import profile from '../data/profile'
import ContactSection from '../components/contact-section'
import GitHubSection from '../components/github-section'
import SectionReveal from '../components/section-reveal'
import SectionHeading from '../components/section-heading'
import RecruiterBanner from '../components/recruiter-banner'
import LiveStatusBar from '../components/live-status-bar'
import InteractivePipeline from '../components/interactive-pipeline'
import ProjectsInteractiveSection from '../components/projects-interactive-section'
import CertificationsSection from '../components/certifications-section'
import CareerTabs from '../components/career-tabs'

export default function Home() {
  return (
    <div className="min-h-screen text-mx-text">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:border focus:border-mx-primary focus:bg-mx-panel focus:px-4 focus:py-2 focus:text-mx-bright focus:outline-none focus:ring-2 focus:ring-mx-primary"
      >
        Skip to main content
      </a>

      <SiteHeader />
      <div className="space-y-4 pt-4">
        <RecruiterBanner />
        <LiveStatusBar />
      </div>

      <main id="main-content" className="space-y-24 pb-24">
        {/* 01: HERO & INTERACTIVE CONSOLE */}
        <TerminalHero />

        {/* 02: ABOUT & ENGINEERING BACKGROUND */}
        <SectionReveal id="about" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 scroll-mt-28">
          <SectionHeading
            index="02 · ABOUT"
            title="Engineering Background"
            kicker="Networks · DevSecOps · Cloud Infrastructure"
            icon={Activity}
          />

          <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr] items-start">
            {/* Left: Narrative Bio */}
            <Card className="h-full">
              <CardCommand>
                <Activity className="h-3.5 w-3.5 text-mx-primary" />
                <span>Executive Summary</span>
              </CardCommand>
              <CardHeader>
                <CardTitle className="text-xl">Who I Am</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 leading-relaxed text-sm text-mx-textDim">
                <p>
                  Computer Engineering student specializing in <strong className="text-mx-bright font-medium">Network Systems and DevSecOps</strong>.
                  I design and operate the infrastructure software depends on — from enterprise routing and switching to containerized applications and automated security pipelines.
                </p>
                <p>
                  At <strong className="text-mx-bright font-medium">Montblanc</strong> (final-year project), I built a production-grade DevSecOps platform: Jenkins CI/CD, k3s Kubernetes, and automated security gates with SonarQube, Trivy, and OWASP ZAP.
                </p>

                <div className="pt-2 border-t border-mx-line/50 flex flex-wrap gap-2 items-center">
                  <span className="font-mono text-2xs uppercase tracking-wider text-mx-textFaint">Languages:</span>
                  {profile.languages.map((lang) => (
                    <Badge key={lang} variant="outline" className="text-2xs font-sans">
                      {lang}
                    </Badge>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Button asChild variant="outline" size="sm">
                    <a href="#projects">
                      <span>View Projects</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                  <Button asChild variant="solid" size="sm">
                    <a href="#contact">
                      <span>Contact Me</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Right: 2 Highlights */}
            <div className="grid gap-4">
              <Card className="mx-panel-hover">
                <CardCommand>
                  <span className="h-1.5 w-1.5 rounded-full bg-mx-primary" />
                  <span>Education &amp; Credentials</span>
                </CardCommand>
                <CardHeader className="pb-1.5">
                  <p className="font-mono text-2xs uppercase tracking-[0.2em] text-mx-textFaint">EDUCATION</p>
                  <CardTitle className="text-base text-mx-bright">Master&apos;s — Network Engineering</CardTitle>
                </CardHeader>
                <CardContent className="text-xs leading-relaxed text-mx-textDim">
                  Specializing in enterprise networks, routing, switching, and cybersecurity. CCNA Certified with 5+ verified Cisco badges.
                </CardContent>
              </Card>

              <Card className="mx-panel-hover">
                <CardCommand>
                  <span className="h-1.5 w-1.5 rounded-full bg-mx-primary" />
                  <span>Featured Engineering Project</span>
                </CardCommand>
                <CardHeader className="pb-1.5">
                  <p className="font-mono text-2xs uppercase tracking-[0.2em] text-mx-textFaint">FLAGSHIP WORK</p>
                  <CardTitle className="text-base text-mx-bright">DevSecOps Platform</CardTitle>
                </CardHeader>
                <CardContent className="text-xs leading-relaxed text-mx-textDim">
                  Production CI/CD with Jenkins, k3s Kubernetes, Docker, and automated security scanning — built for Montblanc.
                </CardContent>
              </Card>
            </div>
          </div>
        </SectionReveal>

        {/* INTERACTIVE ARCHITECTURE PIPELINE */}
        <SectionReveal id="architecture" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 scroll-mt-28">
          <InteractivePipeline />
        </SectionReveal>

        {/* 03: FEATURED PROJECTS (INTERACTIVE CATEGORY FILTER) */}
        <SectionReveal id="projects" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 scroll-mt-28">
          <ProjectsInteractiveSection />
        </SectionReveal>

        {/* 04: SKILLS & TIMELINE */}
        <SectionReveal id="career" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 scroll-mt-28">
          <SectionHeading
            index="04 · CAREER"
            title="Skills &amp; Experience"
            kicker="Technical competencies and professional timeline"
            icon={Layers}
          />
          <CareerTabs />
        </SectionReveal>

        {/* 05: CERTIFICATIONS */}
        <SectionReveal id="certifications" className="scroll-mt-28">
          <CertificationsSection />
        </SectionReveal>

        {/* 06: GITHUB */}
        <SectionReveal id="code" className="scroll-mt-28">
          <GitHubSection username={profile.githubUsername} />
        </SectionReveal>

        {/* 07: CONTACT */}
        <SectionReveal id="contact" className="scroll-mt-28">
          <ContactSection />
        </SectionReveal>
      </main>

      <SiteFooter />
    </div>
  )
}

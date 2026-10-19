'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Mail,
  Linkedin,
  Github,
  Send,
  Check,
  Copy,
  Phone,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RotateCcw,
} from 'lucide-react'

import profile from '../data/profile'
import { Button } from './ui/button'
import { Card, CardCommand, CardContent, CardHeader, CardTitle } from './ui/card'
import SectionHeading from './section-heading'

export default function ContactSection() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('DevSecOps / Network Engineering Inquiry')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'transmitting' | 'delivered' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [transmissionId, setTransmissionId] = useState('')
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedPhone, setCopiedPhone] = useState(false)
  const [copiedDraft, setCopiedDraft] = useState(false)

  function copyToClipboard(text: string, type: 'email' | 'phone') {
    navigator.clipboard.writeText(text)
    if (type === 'email') {
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2000)
    } else {
      setCopiedPhone(true)
      setTimeout(() => setCopiedPhone(false), 2000)
    }
  }

  function getFormattedBody() {
    return [
      `Name: ${name || '[Not specified]'}`,
      `Email: ${email || '[Not specified]'}`,
      '',
      message,
    ].join('\n')
  }

  function getGmailUrl() {
    const bodyContent = getFormattedBody()
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      profile.email,
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyContent)}`
  }

  function getMailtoUrl() {
    const bodyContent = getFormattedBody()
    return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyContent)}`
  }

  function copyDraftToClipboard() {
    const formatted = `Subject: ${subject}\n\n${getFormattedBody()}`
    navigator.clipboard.writeText(formatted)
    setCopiedDraft(true)
    setTimeout(() => setCopiedDraft(false), 2500)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMessage('')
    setStatus('transmitting')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to dispatch transmission.')
      }

      setTransmissionId(data.transmissionId || `TRX-${Date.now().toString(36).toUpperCase()}`)
      setStatus('delivered')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown network transmission error.'
      setErrorMessage(msg)
      setStatus('error')
    }
  }

  function handleReset() {
    setName('')
    setEmail('')
    setMessage('')
    setStatus('idle')
    setErrorMessage('')
    setTransmissionId('')
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        index="06 / CONTACT"
        title="Get In Touch"
        kicker="Inquiries, collaborations, and opportunities"
        icon={Mail}
      />

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="h-full">
          <CardCommand>
              <Send className="h-3.5 w-3.5 text-mx-primary" />
              <span>Direct Message Form</span>
            </CardCommand>
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
              <p className="text-sm text-mx-textDim">
                Have a project, opportunity, or question? Send a direct dispatch below or launch your preferred mail client.
              </p>
            </CardHeader>
            <CardContent>
              {status === 'delivered' ? (
                <div className="space-y-4 py-2 animate-rise-in font-mono">
                  <div className="rounded-md border border-mx-primary/40 bg-mx-primary/10 p-4">
                    <div className="flex items-center gap-2 text-mx-bright font-semibold">
                      <CheckCircle2 className="h-5 w-5 text-mx-primary" />
                      <span>Message Sent Successfully</span>
                    </div>
                    <p className="mt-2 text-xs text-mx-textDim leading-relaxed font-sans">
                      Thank you for reaching out. Your message has been delivered to Ghaith and you will receive a response shortly.
                    </p>
                    <div className="mt-3 space-y-1 text-2xs border-t border-mx-line/60 pt-2.5 text-mx-textFaint">
                      <div>
                        Confirmation ID: <span className="text-mx-primary font-bold">{transmissionId}</span>
                      </div>
                      <div>
                        Recipient: <span className="text-mx-bright">{profile.email}</span>
                      </div>
                      <div>
                        From: <span className="text-mx-bright">{name} &lt;{email}&gt;</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 pt-1">
                    <Button asChild variant="outline" size="sm">
                      <a href={getGmailUrl()} target="_blank" rel="noreferrer">
                        <Mail className="h-3.5 w-3.5 text-mx-primary" />
                        <span>Open in Gmail Web</span>
                        <ArrowUpRight className="h-3 w-3 opacity-70" />
                      </a>
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={copyDraftToClipboard}
                    >
                      {copiedDraft ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-mx-primary" />
                          <span>Copied Draft!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy Message Text</span>
                        </>
                      )}
                    </Button>

                    <Button
                      type="button"
                      variant="solid"
                      size="sm"
                      onClick={handleReset}
                      className="ml-auto"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      <span>New Message</span>
                    </Button>
                  </div>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  {status === 'error' && (
                    <div className="flex items-start gap-2.5 rounded-md border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-300 font-mono">
                      <AlertCircle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-semibold text-red-200">Transmission error:</p>
                        <p className="text-red-300/90">{errorMessage}</p>
                        <p className="text-2xs text-mx-textFaint pt-1">
                          You can also launch Gmail directly using the button below.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="space-y-1.5 text-xs font-mono uppercase tracking-[0.16em] text-mx-textDim">
                      <span>Name</span>
                      <input
                        className="w-full rounded-md border border-mx-line bg-mx-panel2/60 px-3.5 py-2.5 font-sans text-sm text-mx-bright outline-none transition-all focus:border-mx-primary focus:ring-1 focus:ring-mx-primary/40 disabled:opacity-60"
                        placeholder="Your Name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        disabled={status === 'transmitting'}
                        required
                      />
                    </label>
                    <label className="space-y-1.5 text-xs font-mono uppercase tracking-[0.16em] text-mx-textDim">
                      <span>Email Address</span>
                      <input
                        type="email"
                        className="w-full rounded-md border border-mx-line bg-mx-panel2/60 px-3.5 py-2.5 font-sans text-sm text-mx-bright outline-none transition-all focus:border-mx-primary focus:ring-1 focus:ring-mx-primary/40 disabled:opacity-60"
                        placeholder="you@domain.com"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        disabled={status === 'transmitting'}
                        required
                      />
                    </label>
                  </div>

                  <label className="space-y-1.5 text-xs font-mono uppercase tracking-[0.16em] text-mx-textDim">
                    <span>Subject</span>
                    <input
                      className="w-full rounded-md border border-mx-line bg-mx-panel2/60 px-3.5 py-2.5 font-sans text-sm text-mx-bright outline-none transition-all focus:border-mx-primary focus:ring-1 focus:ring-mx-primary/40 disabled:opacity-60"
                      value={subject}
                      onChange={(event) => setSubject(event.target.value)}
                      disabled={status === 'transmitting'}
                      required
                    />
                  </label>

                  <label className="space-y-1.5 text-xs font-mono uppercase tracking-[0.16em] text-mx-textDim">
                    <span>Message Body</span>
                    <textarea
                      rows={5}
                      className="w-full rounded-md border border-mx-line bg-mx-panel2/60 px-3.5 py-2.5 font-sans text-sm text-mx-bright outline-none transition-all focus:border-mx-primary focus:ring-1 focus:ring-mx-primary/40 disabled:opacity-60"
                      placeholder="Hello Ghaith, let's discuss..."
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      disabled={status === 'transmitting'}
                      required
                    />
                  </label>

                  <div className="flex flex-wrap items-center gap-2.5 pt-2">
                    <Button
                      type="submit"
                      variant="solid"
                      disabled={status === 'transmitting'}
                      className="gap-2"
                    >
                      {status === 'transmitting' ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin text-mx-bright" />
                          <span>Sending message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </Button>

                    <Button asChild variant="outline">
                      <a href={getGmailUrl()} target="_blank" rel="noreferrer" title="Open directly in Gmail web composer">
                        <Mail className="h-4 w-4 text-mx-primary" />
                        <span>Open in Gmail</span>
                        <ArrowUpRight className="h-3 w-3 opacity-70" />
                      </a>
                    </Button>

                    <Button asChild variant="outline">
                      <a href={getMailtoUrl()} title="Open in default local mail app">
                        <span>Mailto App</span>
                        <ArrowUpRight className="h-3 w-3 opacity-70" />
                      </a>
                    </Button>

                    <button
                      type="button"
                      onClick={copyDraftToClipboard}
                      className="inline-flex items-center gap-1.5 px-3 py-2 text-2xs font-mono text-mx-textDim hover:text-mx-bright transition-colors"
                      title="Copy full message to clipboard"
                    >
                      {copiedDraft ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-mx-primary" />
                          <span className="text-mx-primary">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy Draft</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>

        <div className="flex flex-col gap-5">
          <Card className="mx-panel-hover">
            <CardCommand>
              <Mail className="h-3.5 w-3.5 text-mx-primary" />
              <span>Direct Communication Channels</span>
            </CardCommand>
            <CardHeader>
              <CardTitle>Direct Channels</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between rounded-md border border-mx-line bg-mx-panel2/40 p-3 transition-colors hover:border-mx-primary/40">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-mx-primary" />
                  <div>
                    <p className="font-mono text-2xs uppercase tracking-[0.18em] text-mx-textFaint">Email</p>
                    <p className="font-mono text-xs text-mx-bright">{profile.email}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(profile.email, 'email')}
                  className="rounded p-1.5 text-mx-textDim transition-colors hover:bg-mx-primary/10 hover:text-mx-primary"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="h-4 w-4 text-mx-primary" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>

              <div className="flex items-center justify-between rounded-md border border-mx-line bg-mx-panel2/40 p-3 transition-colors hover:border-mx-primary/40">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-mx-primary" />
                  <div>
                    <p className="font-mono text-2xs uppercase tracking-[0.18em] text-mx-textFaint">Phone</p>
                    <p className="font-mono text-xs text-mx-bright">{profile.phone}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(profile.phone, 'phone')}
                  className="rounded p-1.5 text-mx-textDim transition-colors hover:bg-mx-primary/10 hover:text-mx-primary"
                  title="Copy phone to clipboard"
                >
                  {copiedPhone ? <Check className="h-4 w-4 text-mx-primary" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>

              <div className="flex items-center justify-between rounded-md border border-mx-line bg-mx-panel2/40 p-3 transition-colors hover:border-mx-primary/40">
                <div className="flex items-center gap-3">
                  <Github className="h-4 w-4 text-mx-primary" />
                  <div>
                    <p className="font-mono text-2xs uppercase tracking-[0.18em] text-mx-textFaint">GitHub</p>
                    <p className="font-mono text-xs text-mx-bright">@{profile.githubUsername}</p>
                  </div>
                </div>
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded border border-mx-line bg-mx-panel px-2.5 py-1 font-mono text-2xs text-mx-textDim transition-colors hover:border-mx-primary/60 hover:bg-mx-primary/10 hover:text-mx-primary"
                  title="Open GitHub Profile"
                >
                  <span>Visit</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>

              <div className="pt-1">
                {profile.linkedinUrl ? (
                  <div className="grid grid-cols-2 gap-2">
                    <Button asChild variant="outline" className="w-full justify-center">
                      <Link href={profile.linkedinUrl} target="_blank" rel="noreferrer">
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full justify-center">
                      <Link href={profile.credlyUrl} target="_blank" rel="noreferrer">
                        Credly Badges
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <Button asChild variant="outline" className="w-full justify-center">
                    <Link href={profile.credlyUrl} target="_blank" rel="noreferrer">
                      <span>View Verified Credly Badges</span>
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="mx-panel-hover">
            <CardCommand>
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>Availability &amp; Focus Areas</span>
            </CardCommand>
            <CardHeader>
              <CardTitle>Open for Opportunities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 font-sans text-sm text-mx-textDim">
              <div className="flex items-start gap-2.5">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-mx-primary" />
                <p><strong className="text-mx-bright">DevSecOps & Cloud Engineering:</strong> CI/CD automation, security pipelines, containerization.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-mx-primary" />
                <p><strong className="text-mx-bright">Network & Systems Engineering:</strong> Routing, switching, Linux administration, virtualization.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-mx-primary" />
                <p><strong className="text-mx-bright">Monitoring & Observability:</strong> Prometheus, Grafana, and centralized logging with Loki.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

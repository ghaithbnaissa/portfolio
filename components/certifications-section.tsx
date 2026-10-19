import { Award, CheckCircle2, ExternalLink } from 'lucide-react'

import { certifications } from '../data/certifications'
import { Card, CardCommand, CardContent, CardHeader, CardTitle } from './ui/card'
import SectionHeading from './section-heading'
import { Badge } from './ui/badge'

export default function CertificationsSection() {
  return (
    <section id="certifications" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        index="05 · CERTIFICATIONS"
        title="Licenses &amp; Credentials"
        kicker="Verified Cisco Networking Academy certifications &amp; digital badges"
        icon={Award}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert) => (
          <Card key={cert.name} className="mx-panel-hover flex h-full flex-col justify-between">
            <div>
              <CardCommand>
                <Award className="h-3.5 w-3.5 text-mx-primary" />
                <span>Verified Cisco Credential</span>
              </CardCommand>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle className="text-base text-mx-bright leading-snug">
                      {cert.name}
                    </CardTitle>
                    <p className="mt-1 text-xs text-mx-textDim">{cert.issuer}</p>
                  </div>
                  <Badge variant="default" className="shrink-0 text-2xs gap-1 bg-emerald-500/10 border-emerald-500/30 text-emerald-400">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>{cert.status}</span>
                  </Badge>
                </div>
              </CardHeader>
            </div>
            <CardContent className="pt-0">
              <div className="border-t border-mx-line/50 pt-3 flex items-center justify-between">
                <span className="font-mono text-2xs text-mx-textFaint">{cert.date}</span>
                {cert.link ? (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-sans text-xs font-semibold text-mx-primary hover:text-mx-bright hover:underline transition-colors"
                  >
                    <span>Verify Credly Badge</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ) : (
                  <span className="font-mono text-2xs text-mx-textFaint">Verified</span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

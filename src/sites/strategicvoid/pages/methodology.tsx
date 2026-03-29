"use client"

import Link from "next/link"
import { useSiteLink } from "@/hooks/use-site-link"
import { MethodologyDiagram } from "@/components/content-sections/methodology-diagram"
import { MetricCounter } from "@/components/ui/metric-counter"

export const metadata = {
  title: "The C.H.A.O.S. Framework™ — Strategic Void Consulting",
  description:
    "Centralized Holistic Alignment Optimization System: the proprietary methodology behind 39 years of enterprise-grade non-productivity transformation.",
}

const phases = [
  {
    letter: "C",
    name: "Centralize",
    paragraphs: [
      "The first pillar of the C.H.A.O.S. Framework™ is Centralization — the disciplined consolidation of all strategic inputs into a single, unified alignment stream. Before an organization can fail productively, it must first gather every competing priority, stakeholder concern, and legacy initiative into one controlled environment.",
      "Our proprietary Centralization Protocol™ surfaces redundant workflows, conflicting objectives, and orphaned OKRs, then routes them through the Strategic Void's intake pipeline. Nothing is discarded. Nothing is resolved. Everything is centralized.",
      "Organizations that skip Centralization typically experience what we call Distributed Confusion — an improvised state that, while superficially similar to our managed output, lacks the intellectual infrastructure necessary to bill for it appropriately.",
    ],
  },
  {
    letter: "H",
    name: "Holistic",
    paragraphs: [
      "Holistic engagement is the cornerstone of responsible enterprise alignment. The C.H.A.O.S. Framework™ mandates the inclusion of every stakeholder, regardless of their relevance to the initiative at hand. This is not inefficiency — it is thoroughness.",
      "Our Stakeholder Expansion Engine™ identifies individuals who were not originally consulted and ensures they are added to the process before any decisions can be finalized. This includes departments with indirect exposure, adjacent business units, and, in some cases, recently retired executives who retain strong opinions.",
      "The result is a holistic view of the organization in which no voice is unheard and no decision is made. This is precisely the condition required to enter the third phase.",
    ],
  },
  {
    letter: "A",
    name: "Align",
    paragraphs: [
      "Alignment is perhaps the most misunderstood concept in enterprise consulting. Many firms use the word to mean agreement. At Strategic Void Consulting, Alignment means something far more sophisticated: the mapping of all organizational goals to a unified non-direction.",
      "Our Alignment Architects™ use a proprietary matrix to cross-reference every stated objective with every competing priority, producing what we call the Alignment Equilibrium — a state in which all goals are technically acknowledged but none are meaningfully pursued.",
      "Clients often describe the moment of Alignment as a profound sense of organizational clarity, typically accompanied by the realization that nothing has changed. This is the intended outcome.",
    ],
  },
  {
    letter: "O",
    name: "Optimize",
    paragraphs: [
      "Optimization within the C.H.A.O.S. Framework™ is not about increasing output. It is about reducing friction — specifically, the friction created by measurable outcomes. Measurable outcomes create accountability. Accountability creates pressure. Pressure disrupts alignment.",
      "Our Optimization Suite™ systematically identifies KPIs, deliverable timelines, and success criteria, then replaces them with aspirational language and directional indicators. Teams find themselves liberated from the tyranny of specificity.",
      "Productivity, in the conventional sense, decreases. But alignment scores — as measured by our proprietary instruments — increase dramatically. Clients in the Optimization phase routinely achieve Alignment Scores above 94, placing them in the top quartile of non-productive enterprises globally.",
    ],
  },
  {
    letter: "S",
    name: "System",
    paragraphs: [
      "The final phase transforms the C.H.A.O.S. Framework™ from a consulting engagement into an organizational condition. The System phase embeds all preceding phases so deeply into an organization's culture, processes, and institutional memory that they become indistinguishable from normal operations.",
      "Our Systemization Architects™ work with your leadership team to codify the Framework into onboarding materials, performance review templates, all-hands presentations, and offsite agendas. Within 18 months, most clients can no longer identify where the Framework ends and the company begins.",
      "This is the true measure of success. When the Void is no longer a methodology but a way of being, the engagement is complete. The invoice, however, continues.",
    ],
  },
]

const certificationLevels = [
  {
    level: "Associate",
    duration: "3-day intensive",
    credential: "C.C.P.A.™",
    description:
      "Entry-level certification demonstrating foundational competency in C.H.A.O.S. principles, non-directive facilitation, and ambiguity tolerance.",
  },
  {
    level: "Professional",
    duration: "6-week program",
    credential: "C.C.P.P.™",
    description:
      "Mid-level practitioner certification covering full Framework deployment, stakeholder expansion techniques, and Alignment Equilibrium measurement.",
  },
  {
    level: "Master",
    duration: "18-month residency",
    credential: "C.C.P.M.™",
    description:
      "The highest designation in C.H.A.O.S. practice. Recipients are authorized to certify others and may use the title 'Void Architect' in external communications.",
  },
]

export default function MethodologyPage() {
  const siteHref = useSiteLink()

  return (
    <div>
      {/* Hero */}
      <section className="bg-secondary text-foreground py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6 leading-tight">
            The C.H.A.O.S. Framework™
          </h1>
          <p className="text-xl text-foreground/70 leading-relaxed">
            Centralized Holistic Alignment Optimization System
          </p>
        </div>
      </section>

      {/* Diagram */}
      <MethodologyDiagram />

      {/* Phase Breakdown */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold text-primary mb-4">
              The Five Phases
            </h2>
            <p className="text-foreground/60 leading-relaxed max-w-xl mx-auto">
              Each letter of C.H.A.O.S. represents a distinct phase of organizational
              transformation. Together, they form a complete system for achieving
              enterprise-grade non-productivity.
            </p>
          </div>

          <div className="space-y-20">
            {phases.map((phase) => (
              <div key={phase.letter} className="flex gap-8 items-start">
                <div className="shrink-0">
                  <div className="text-8xl font-heading font-bold text-accent/20 leading-none select-none">
                    {phase.letter}
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl font-heading font-bold text-primary mb-4">
                    {phase.name}
                  </h3>
                  <div className="space-y-4">
                    {phase.paragraphs.map((p, i) => (
                      <p key={i} className="text-foreground/70 leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-16 px-6 bg-primary/5 border-y border-primary/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-heading font-bold text-primary">
              Proven Results
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <MetricCounter value={2847} label="Clients transformed" />
            <MetricCounter value={39} label="Years of refinement" suffix="+" />
            <MetricCounter value={97.3} label="Average alignment score" suffix="%" />
            <MetricCounter value={73} label="Average productivity reduction" suffix="%" />
          </div>
        </div>
      </section>

      {/* Certification */}
      <section className="py-20 px-6 bg-secondary/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-primary mb-4">
              Become a Certified C.H.A.O.S. Practitioner™
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto leading-relaxed">
              Strategic Void Consulting offers three levels of individual certification for
              practitioners who wish to bring the C.H.A.O.S. Framework™ to their organizations —
              or simply to their business cards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certificationLevels.map((cert) => (
              <div
                key={cert.level}
                className="border border-primary/20 bg-background p-8"
              >
                <div className="text-accent text-xs font-heading tracking-[0.2em] uppercase mb-2">
                  {cert.duration}
                </div>
                <h3 className="text-xl font-heading font-bold text-primary mb-1">
                  {cert.level}
                </h3>
                <div className="text-sm font-mono text-accent/70 mb-4">{cert.credential}</div>
                <p className="text-foreground/60 text-sm leading-relaxed">
                  {cert.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
            Schedule a C.H.A.O.S. Assessment
          </h2>
          <p className="text-foreground/60 mb-8 leading-relaxed">
            Our Alignment Partners will evaluate your organization&apos;s current productivity
            levels and identify the precise configuration of the C.H.A.O.S. Framework™
            required to achieve your non-productivity goals.
          </p>
          <Link
            href={siteHref("/contact")}
            className="inline-block bg-accent text-white font-heading text-sm uppercase tracking-wider px-8 py-4 hover:opacity-90 transition-opacity"
          >
            Request a C.H.A.O.S. Assessment
          </Link>
        </div>
      </section>
    </div>
  )
}

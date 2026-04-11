import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { caseStudies } from "../data/case-studies"
import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Case Studies — Gristmill Partners",
  description:
    "Selected client engagements from Gristmill Partners' six decades of workforce stabilization work.",
}

export default function CaseStudiesIndexPage() {
  return (
    <div className="bg-background text-foreground">
      <Hero
        headline="Client Engagements"
        subheadline="Gristmill Partners has delivered more than 8,400 engagements since 1962. A selection of eight is documented below."
        image="/sites/gristmill/case-studies-hero.png"
      />

      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="text-lg leading-relaxed">
          Each engagement is presented with the client&apos;s permission, under terms negotiated
          by the firm&apos;s discretion counsel. Figures quoted are drawn from client-approved
          post-engagement reports.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((cs) => (
            <Link
              key={cs.slug}
              href={`/case-studies/${cs.slug}`}
              className="flex flex-col rounded border-2 border-secondary/30 bg-background p-6 transition hover:border-primary"
            >
              <div className="mb-2 text-xs uppercase tracking-widest text-primary">
                {cs.industry} · {cs.location}
              </div>
              <h2 className="mb-4 font-heading text-xl font-bold text-secondary">
                {cs.company}
              </h2>
              <div className="mb-4 flex items-baseline gap-3">
                <span className="font-heading text-3xl font-bold text-accent">
                  {cs.heroStat.value}
                </span>
                <span className="text-xs uppercase tracking-wide text-foreground/70">
                  {cs.heroStat.label}
                </span>
              </div>
              <p className="mb-4 flex-1 text-sm italic text-foreground/80">{cs.headline}</p>
              <p className="text-sm font-semibold text-primary">Read the engagement →</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

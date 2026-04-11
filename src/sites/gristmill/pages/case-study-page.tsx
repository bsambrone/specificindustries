import Image from "next/image"
import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { CTABanner } from "@/components/ui/cta-banner"
import { getCaseStudyBySlug } from "../data/case-studies"
import { getServiceBySlug } from "../data/services"
import { getArmBySlug } from "../data/arms"
import type { CaseStudySection } from "../data/case-studies/types"
import { notFound } from "next/navigation"

interface CaseStudyPageProps {
  slug: string
}

export default function CaseStudyPage({ slug }: CaseStudyPageProps) {
  const caseStudy = getCaseStudyBySlug(slug)
  if (!caseStudy) notFound()

  return (
    <div className="bg-background text-foreground">
      <Hero
        headline={caseStudy.company}
        subheadline={`${caseStudy.industry} · ${caseStudy.location}`}
        image={`/sites/gristmill/case-studies/${caseStudy.slug}.png`}
      />

      <section className="mx-auto max-w-3xl px-6 py-12 text-center">
        <div className="mb-3 text-xs uppercase tracking-widest text-primary">
          Engagement Outcome
        </div>
        <div className="mb-2 font-heading text-6xl font-bold text-accent">
          {caseStudy.heroStat.value}
        </div>
        <div className="mb-6 text-sm uppercase tracking-wide text-foreground/70">
          {caseStudy.heroStat.label}
        </div>
        <p className="text-lg italic text-foreground/80">{caseStudy.headline}</p>
      </section>

      <div className="mx-auto max-w-3xl space-y-16 px-6 pb-20">
        {caseStudy.sections.map((section, i) => (
          <SectionRenderer key={i} section={section} />
        ))}
      </div>

      <CTABanner
        headline="Interested in outcomes like these?"
        description="Request an engagement and a member of our Workforce Stabilization Team will be in touch within three to five business quarters."
        ctaText="Request an Engagement"
        ctaHref="/contact"
      />
    </div>
  )
}

function SectionRenderer({ section }: { section: CaseStudySection }) {
  switch (section.kind) {
    case "challenge":
      return (
        <section>
          <h2 className="mb-6 font-heading text-3xl text-secondary">The Challenge</h2>
          {section.paragraphs.map((p, i) => (
            <p key={i} className="mb-4 text-lg leading-relaxed">
              {p}
            </p>
          ))}
        </section>
      )

    case "engagement":
      return (
        <section>
          <h2 className="mb-6 font-heading text-3xl text-secondary">The Engagement</h2>
          <p className="mb-6 text-lg leading-relaxed">{section.intro}</p>
          <ul className="space-y-3 border-l-2 border-primary pl-6">
            {section.products.map((slug) => {
              const service = getServiceBySlug(slug)
              const arm = service ? getArmBySlug(service.armSlug) : undefined
              if (!service || !arm) return null
              return (
                <li key={slug}>
                  <Link
                    href={`/services/${arm.slug}/${service.slug}`}
                    className="group block"
                  >
                    <div className="font-heading text-lg text-secondary group-hover:text-primary">
                      {service.name}
                    </div>
                    <div className="text-sm italic text-foreground/70">{arm.nickname}</div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      )

    case "timeline":
      return (
        <section>
          <h2 className="mb-6 font-heading text-3xl text-secondary">Implementation Timeline</h2>
          <div className="space-y-5">
            {section.phases.map((phase, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex-shrink-0 font-heading text-2xl text-accent">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <div className="mb-1 font-heading text-lg text-secondary">{phase.name}</div>
                  <div className="text-foreground/80">{phase.description}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )

    case "metrics":
      return (
        <section>
          <h2 className="mb-6 font-heading text-3xl text-secondary">Key Metrics</h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {section.stats.map((stat, i) => (
              <div
                key={i}
                className="rounded border-2 border-secondary/20 bg-background p-5 text-center"
              >
                <div className="mb-2 font-heading text-3xl font-bold text-accent">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-wide text-foreground/70">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>
      )

    case "quote":
      return (
        <section className="rounded border-2 border-secondary/20 bg-secondary/5 p-8">
          <blockquote className="mb-6 text-xl italic leading-relaxed text-foreground">
            &ldquo;{section.body}&rdquo;
          </blockquote>
          <div className="flex items-center gap-4">
            <Image
              src={`/shared/testimonials/${section.photoSlug}.png`}
              alt=""
              width={64}
              height={64}
              className="rounded-full object-cover"
            />
            <div>
              <div className="font-heading font-bold text-secondary">{section.attribution}</div>
              <div className="text-xs uppercase tracking-wide text-primary">{section.role}</div>
            </div>
          </div>
        </section>
      )

    case "outcome":
      return (
        <section>
          <h2 className="mb-6 font-heading text-3xl text-secondary">Outcome</h2>
          {section.paragraphs.map((p, i) => (
            <p key={i} className="mb-4 text-lg leading-relaxed">
              {p}
            </p>
          ))}
        </section>
      )
  }
}

import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { CTABanner } from "@/components/ui/cta-banner"
import { getArmBySlug } from "../data/arms"
import { getServiceBySlug, getServicesByArm } from "../data/services"
import { notFound } from "next/navigation"

interface ServiceDetailPageProps {
  armSlug: string
  serviceSlug: string
}

export default function ServiceDetailPage({ armSlug, serviceSlug }: ServiceDetailPageProps) {
  const arm = getArmBySlug(armSlug)
  const service = getServiceBySlug(serviceSlug)

  if (!arm || !service || service.armSlug !== armSlug) {
    notFound()
  }

  const related = getServicesByArm(armSlug).filter((s) => s.slug !== serviceSlug)

  return (
    <div className="bg-background text-foreground">
      <Hero
        headline={service.name}
        subheadline={`${arm.nickname} — ${service.tagline}`}
        image={service.image}
      />

      <section className="mx-auto max-w-3xl px-6 py-16">
        {service.description.map((paragraph, i) => (
          <p key={i} className="mb-5 text-lg leading-relaxed">
            {paragraph}
          </p>
        ))}
      </section>

      <section className="border-t-2 border-b-2 border-secondary/20 bg-secondary/5 py-16">
        <div className="mx-auto max-w-4xl px-6 grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-6 text-2xl font-heading font-bold text-secondary">
              What&apos;s Included
            </h2>
            <ul className="space-y-3">
              {service.deliverables.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-1 text-primary">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-2xl font-heading font-bold text-secondary">
              Engagement Model
            </h2>
            <p className="leading-relaxed">{service.engagementModel}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="mb-8 text-center text-2xl font-heading font-bold text-secondary">
          Proof Points
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {service.proofPoints.map((point, i) => (
            <div
              key={i}
              className="rounded border-2 border-secondary/20 bg-background p-6 text-center"
            >
              <div className="mb-2 text-4xl font-heading font-bold text-accent">
                {point.value}
              </div>
              <div className="text-sm uppercase tracking-wide text-foreground/70">
                {point.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-secondary/5 py-16">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="mb-8 text-2xl font-heading font-bold text-secondary">
              Related Services in {arm.nickname}
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {related.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${arm.slug}/${s.slug}`}
                  className="block rounded border-2 border-secondary/20 bg-background p-5 transition hover:border-primary"
                >
                  <h3 className="mb-1 text-lg font-heading font-bold text-secondary">
                    {s.name}
                  </h3>
                  <p className="text-sm italic text-foreground/70">{s.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner
        headline="Ready to engage this service?"
        description="Request an engagement and a member of our Workforce Stabilization Team will be in touch within three to five business quarters."
        ctaText="Request an Engagement"
        ctaHref="/contact"
      />
    </div>
  )
}

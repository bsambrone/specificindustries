import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { CTABanner } from "@/components/ui/cta-banner"
import { getArmBySlug } from "../data/arms"
import { getServicesByArm } from "../data/services"
import { notFound } from "next/navigation"

interface ArmPageProps {
  slug: string
}

export default function ArmPage({ slug }: ArmPageProps) {
  const arm = getArmBySlug(slug)
  if (!arm) notFound()

  const services = getServicesByArm(arm.slug)

  return (
    <div className="bg-background text-foreground">
      <Hero
        headline={arm.name}
        subheadline={`${arm.nickname} — ${arm.tagline}`}
        image={arm.image}
      />

      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="mb-6 text-3xl font-heading font-bold text-secondary">
          Practice Overview
        </h2>
        {arm.overview.map((paragraph, i) => (
          <p key={i} className="mb-4 text-lg leading-relaxed">
            {paragraph}
          </p>
        ))}
      </section>

      <section className="bg-secondary/5 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-10 text-3xl font-heading font-bold text-secondary">
            Products in this Practice
          </h2>
          {services.length === 0 ? (
            <p className="text-lg italic text-foreground/70">
              Product details forthcoming. Please contact an engagement specialist.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${arm.slug}/${service.slug}`}
                  className="block rounded border-2 border-secondary/20 bg-background p-6 transition hover:border-primary"
                >
                  <h3 className="mb-2 text-xl font-heading font-bold text-secondary">
                    {service.name}
                  </h3>
                  <p className="mb-4 text-sm italic text-foreground/70">{service.tagline}</p>
                  <p className="text-sm">{service.shortDescription}</p>
                  <p className="mt-4 text-sm font-semibold text-primary">Learn more →</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTABanner
        headline="Ready to reduce workforce volatility?"
        description="A member of our Workforce Stabilization Team will contact you within three to five business quarters."
        ctaText="Request an Engagement"
        ctaHref="/contact"
      />
    </div>
  )
}

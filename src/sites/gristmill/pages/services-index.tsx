import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { CTABanner } from "@/components/ui/cta-banner"
import { arms } from "../data/arms"
import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Services — Gristmill Partners",
  description:
    "Gristmill Partners offers ten distinct service arms, each purpose-built to address a specific vector of workforce volatility. Browse our complete catalog.",
}

export default function ServicesIndexPage() {
  return (
    <div className="bg-background text-foreground">
      <Hero
        headline="Ten Arms. One Firm."
        subheadline="Since 1962, Gristmill Partners has organized its work into ten practice areas — each addressing a distinct vector of workforce volatility."
        image="/sites/gristmill/services-index-hero.png"
      />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-lg leading-relaxed">
          Our ten arms operate independently and can be engaged individually or in combination.
          Most Fortune 500 clients retain Gristmill across five or more arms simultaneously.
          The full catalog is listed below.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {arms.map((arm) => (
            <Link
              key={arm.slug}
              href={`/services/${arm.slug}`}
              className="flex flex-col rounded border-2 border-secondary/30 bg-background p-6 transition hover:border-primary"
            >
              <div className="mb-2 text-xs uppercase tracking-widest text-primary">
                {arm.nickname}
              </div>
              <h2 className="mb-3 text-xl font-heading font-bold text-secondary">
                {arm.name}
              </h2>
              <p className="mb-4 flex-1 text-sm italic text-foreground/70">{arm.tagline}</p>
              <p className="text-sm font-semibold text-primary">Explore this arm →</p>
            </Link>
          ))}
        </div>
      </section>

      <CTABanner
        headline="Not sure where to start?"
        description="Request an engagement and we'll assess your workforce's volatility baseline."
        ctaText="Request an Engagement"
        ctaHref="/contact"
      />
    </div>
  )
}

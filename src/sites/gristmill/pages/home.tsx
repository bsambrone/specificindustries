import { Hero } from "@/components/ui/hero"
import { CTABanner } from "@/components/ui/cta-banner"

export default function GristmillHome() {
  return (
    <div className="bg-background text-foreground">
      <Hero
        headline="Helping American Industry Grind Employees Into Dust Since 1962."
        subheadline="Gristmill Partners is the trusted name in workforce stabilization, retention engineering, and compensation dampening for the Fortune 500."
        image="/sites/gristmill/home-hero.png"
        ctaText="Request an Engagement"
        ctaHref="/contact"
        secondaryCtaText="View Our Service Lines"
        secondaryCtaHref="/services"
      />

      <section className="mx-auto max-w-3xl px-6 py-20">
        <p className="text-lg leading-relaxed">
          For sixty-four years, Gristmill Partners has supplied American industry with
          the training, restructuring, and compensation-dampening services required to
          maintain a workforce of appropriate gratitude and controlled expectation. Our
          full catalog of services will be detailed on this page in due course.
        </p>
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

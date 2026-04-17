import { Hero } from "@/components/ui/hero"
import { FeatureSection } from "@/components/ui/feature-section"
import { ProductCard } from "@/components/ui/product-card"
import Link from "next/link"
import { getSiteHref } from "@/lib/site-href"
import { getProductBySlug } from "@/sites/mostlysterile/data/products"

const featuredSlugs = [
  "second-hand-scalpel",
  "gauze-sniff-test",
  "stethoscope-calibration-uncertain",
  "placebex",
]

const features = [
  {
    title: "Almost Guaranteed Value",
    description: "Our prices reflect our confidence, or the level of confidence we are prepared to express publicly. Either way, savings are indicated.",
  },
  {
    title: "Partially Certified",
    description: "Every product is reviewed by at least one member of our team who believes they are qualified to review it.",
  },
  {
    title: "Shipping From Somewhere",
    description: "Fast shipping from a location we are legally advised not to disclose. Delivery windows are estimated, where estimation is possible.",
  },
]

const trustBadges = [
  "CE (Close Enough)",
  "FDA (Friendly Domestic Association)",
  "ISO-Inspired",
  "WHO (We're Hopeful, Okay?)",
  "USP (Usually Sort-of Pure)",
  "HIPAA-Adjacent",
]

const testimonials = [
  {
    quote: "These gloves did not give me an infection. At least not yet.",
    attribution: "Dr. Marjorie Feldstone, Practitioner",
  },
  {
    quote: "I cannot recommend Mostlysterile, per counsel's advice. However, the gauze was fine.",
    attribution: "Dr. Harold Okonkwo-Briggs, Clinician",
  },
  {
    quote: "My patients have not complained any more than is typical. I consider that a strong endorsement.",
    attribution: "Dr. Sylvia Katz, Primary Care",
  },
]

const addToCartQuips = [
  "Noted. Your order has been queued for processing where applicable.",
  "Added. A handling advisory will be provided at checkout.",
  "Received. Shipping will commence from a location we are advised not to disclose.",
]

export default async function MostlysterileHome() {
  const siteHref = await getSiteHref()
  const featured = featuredSlugs.map(getProductBySlug).filter((p) => p !== undefined)

  return (
    <>
      <Hero
        headline="Meeting or Nearing Industry Standards Since 2014"
        subheadline="Mostlysterile is a full-service medical supply provider offering surgical instruments, bandages, PPE, diagnostics, and hospital surplus at prices that reflect current market conditions and our evolving inventory."
        ctaText="Browse Catalog"
        ctaHref={siteHref("/products")}
      />

      {/* Disclaimer banner */}
      <div className="bg-accent/20 border-y border-accent/40 py-2 px-4 text-center">
        <p className="text-xs italic text-foreground/70">
          *Product claims, specifications, and representations herein are not independently verified and may vary from product actually received.
        </p>
      </div>

      <FeatureSection title="Why Mostlysterile?" features={features} />

      {/* Featured products */}
      <section className="py-16 px-4 bg-secondary/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center text-primary mb-2">
            Featured Items
          </h2>
          <p className="text-center text-foreground/60 mb-10">
            A curated selection from across our categories, subject to availability.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((p) => (
              <ProductCard
                key={p!.slug}
                slug={p!.slug}
                name={p!.name}
                price={p!.priceLabel}
                tagline={p!.tagline}
                image={p!.image}
                quips={addToCartQuips}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trust row */}
      <section className="py-10 px-4 border-y border-primary/10">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-foreground/50 text-center mb-6">
            Credentialed by or adjacent to
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {trustBadges.map((badge) => (
              <span
                key={badge}
                className="px-4 py-2 text-sm font-heading font-semibold uppercase tracking-wider border border-primary/30 bg-background text-primary"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Dual CTA */}
      <section className="py-14 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href={siteHref("/certifications")}
            className="block border-2 border-primary/20 p-8 bg-background hover:border-primary transition-colors"
          >
            <p className="text-xs uppercase tracking-widest text-primary/60 font-semibold mb-2">Transparency</p>
            <h3 className="text-2xl font-heading font-bold text-primary mb-3">Review Our Certifications</h3>
            <p className="text-foreground/70 text-sm">
              A complete gallery of the credentials, training completions, and honors our team has accumulated over time.
            </p>
            <p className="mt-4 text-sm font-semibold text-primary">View Credentials →</p>
          </Link>
          <Link
            href={siteHref("/quality-assurance")}
            className="block border-2 border-primary/20 p-8 bg-background hover:border-primary transition-colors"
          >
            <p className="text-xs uppercase tracking-widest text-primary/60 font-semibold mb-2">Process</p>
            <h3 className="text-2xl font-heading font-bold text-primary mb-3">Our 12-Step Sterility Process</h3>
            <p className="text-foreground/70 text-sm">
              Every product at Mostlysterile is reviewed through our rigorous twelve-step verification procedure, or something functionally equivalent.
            </p>
            <p className="mt-4 text-sm font-semibold text-primary">View Process →</p>
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14 px-4 bg-secondary/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center text-primary mb-10">
            What Practitioners Say*
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <figure key={i} className="border border-primary/20 bg-background p-6">
                <blockquote className="text-foreground/80 italic leading-relaxed mb-4">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="text-sm font-semibold text-primary">{t.attribution}</figcaption>
              </figure>
            ))}
          </div>
          <p className="text-center text-xs italic text-foreground/50 mt-6">
            *Attributions have been modified for privacy. Individuals quoted have not formally consented to republication.
          </p>
        </div>
      </section>

      {/* Fine print closer */}
      <section className="py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] text-foreground/40 italic leading-relaxed">
            Mostlysterile is a medical supply distributor, or functions in a role substantially similar to a medical supply distributor, serving customers in the tri-state area and occasionally elsewhere. Products are offered as-is, where-is, with or without original packaging, and in the condition received. Claims of sterility, certification, and clinical efficacy reflect our best available assessment at time of listing and are not warranted. By placing an order you acknowledge that you have read these terms, or had the opportunity to read them, or declined the opportunity. No rights are conferred that were not already conferred. No rights are waived that were not already waived. Thank you for choosing Mostlysterile.
          </p>
        </div>
      </section>
    </>
  )
}

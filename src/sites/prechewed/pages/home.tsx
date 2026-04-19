import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { StatStrip } from "@/components/ui/stat-strip"
import { ProductCard } from "@/components/ui/product-card"
import { CTABanner } from "@/components/ui/cta-banner"
import { products } from "@/sites/prechewed/data/products"
import { getSiteHref } from "@/lib/site-href"

const featured = products.filter((p) => p.isFeatured).slice(0, 6)

export default async function PrechewedHome() {
  const siteHref = await getSiteHref()

  return (
    <>
      <Hero
        headline="You have better things to do with your mouth."
        subheadline="Nutrition, pre-unlocked. Reclaim 47 days a year."
        image="/sites/prechewed/hero.png"
        ctaText="Start the Protocol"
        ctaHref="/bolus"
        secondaryCtaText="Browse pouches"
        secondaryCtaHref="/products"
      />

      <StatStrip
        stats={[
          { icon: "📈", value: "8.3×", label: "Nutrient bioavailability" },
          { icon: "⏱️", value: "47 days", label: "Reclaimed per year" },
          { icon: "🏢", value: "312", label: "Jaw-hours per employee / yr" },
        ]}
      />

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-3">How Prechewed™ works</h2>
          <p style={{ color: "var(--color-foreground, #0F0E1A)", opacity: 0.6 }}>Three phases. One pouch.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              title: "Certified Mastication",
              copy: "Licensed operators perform Pre-Oral Hydrolysis™ in an ISO 22000 environment.",
            },
            {
              step: "02",
              title: "Bolus Formation",
              copy: "The hydrolyzate is matrix-stabilized under inert gas for peak delivery.",
            },
            {
              step: "03",
              title: "Pre-Oral Delivery",
              copy: "Shelf-stable, portable, 4-ounce pouches, ready when you are.",
            },
          ].map((s) => (
            <div
              key={s.step}
              className="p-6 rounded-lg border border-primary/15"
            >
              <div
                className="text-xs font-mono uppercase tracking-[0.2em] mb-3"
                style={{ color: "var(--color-primary, #5B3FD9)" }}
              >
                {s.step}
              </div>
              <div className="text-lg font-heading font-semibold mb-2">{s.title}</div>
              <p className="text-sm text-foreground/60">{s.copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Pouches */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center mb-12">Featured pouches</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p) => (
              <ProductCard
                key={p.slug}
                slug={p.slug}
                name={p.name}
                price={p.priceLabel}
                tagline={p.tagline}
                image={p.image}
                href={`/products/${p.slug}`}
              />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href={siteHref("/products")}
              className="inline-block px-8 py-3 rounded-lg font-semibold border border-primary/30 text-primary hover:bg-primary/5 transition-colors"
            >
              Browse all 28 pouches →
            </Link>
          </div>
        </div>
      </section>

      {/* Press Strip */}
      <section className="py-14 bg-secondary">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div
            className="text-xs uppercase tracking-[0.25em] font-mono mb-6"
            style={{ color: "var(--color-accent, #EFA339)" }}
          >
            As cited in
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-lg font-medium">
            {["Bloomberg", "TechCrunch", "The Verge", "NYT Styles", "Wired", "Vogue"].map((pub) => (
              <Link
                key={pub}
                href={siteHref("/press")}
                className="text-white/70 hover:text-white transition-colors hover:underline"
              >
                {pub}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-8 text-center">
          Operators on the protocol
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              quote: "I haven't chewed in 9 months. My deep work has never been better.",
              attr: "CEO, stealth AI company",
            },
            {
              quote: "The 40 minutes a day I got back are a real thing.",
              attr: "Partner, early-stage fund",
            },
            {
              quote: "Thanksgiving in a pouch is, honestly, the only way.",
              attr: "Founder, series B SaaS",
            },
          ].map((t, i) => (
            <figure
              key={i}
              className="p-6 rounded-lg border border-primary/10"
            >
              <blockquote className="text-lg leading-relaxed text-foreground/80">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm font-mono text-foreground/50">
                — {t.attr}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <CTABanner
        headline="Prechewed™ for Teams"
        description="Reclaim 312 jaw-hours per employee per year."
        ctaText="See the enterprise case"
        ctaHref="/science#enterprise"
      />

      {/* Founder's Reserve Waitlist CTA */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-4">
          Join the waitlist for The Founder&apos;s Reserve
        </h2>
        <p className="mb-6 text-foreground/60">
          Aged 30 days in Kyoto. Numbered. Released in batches of 47.
        </p>
        <Link
          href={siteHref("/products/founders-reserve")}
          className="inline-block px-6 py-3 rounded-md font-semibold text-white hover:opacity-90 transition-opacity"
          style={{ background: "var(--color-primary, #5B3FD9)" }}
        >
          View the Reserve
        </Link>
      </section>
    </>
  )
}

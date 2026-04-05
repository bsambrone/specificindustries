import Link from "next/link"
import Image from "next/image"
import { Hero } from "@/components/ui/hero"
import { ProductCard } from "@/components/ui/product-card"
import { CTABanner } from "@/components/ui/cta-banner"
import { shares, shareQuips } from "@/sites/grassfedwifi/data/shares"
import { getCurrentMonth } from "@/sites/grassfedwifi/data/harvest-calendar"
import { getRecentFieldNotes } from "@/sites/grassfedwifi/data/field-notes"
import { getSiteHref } from "@/lib/site-href"

export default async function GrassFedWiFiHome() {
  const currentMonth = getCurrentMonth()
  const featuredNote = getRecentFieldNotes(1)[0]
  const siteHref = await getSiteHref()

  return (
    <>
      <Hero
        headline="Raw Spectrum. Pasture-Raised Connectivity."
        subheadline="Farm-to-Table Wi-Fi. Small-batch. Single-origin. Seasonally harvested."
        ctaText="Join the Co-op"
        ctaHref={siteHref("/join")}
        secondaryCtaText="Explore Shares"
        secondaryCtaHref={siteHref("/shares")}
        image="/sites/grassfedwifi/home-hero.png"
      />

      {/* This Month's Harvest */}
      <section className="py-16 px-4 bg-secondary/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-2">
              This Month&apos;s Harvest
            </p>
            <h2 className="text-4xl font-heading font-bold text-foreground mb-2">{currentMonth.name}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div>
              <p className="text-xs uppercase tracking-wider text-foreground/50 mb-1">In Season</p>
              <p className="text-foreground font-medium">{currentMonth.inSeason}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-foreground/50 mb-1">Pairs Well With</p>
              <p className="text-foreground font-medium">{currentMonth.pairsWellWith}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-foreground/50 mb-1">From The Farmer</p>
              <p className="text-foreground/80 italic text-sm">{currentMonth.harvestNotes}</p>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link
              href={siteHref("/harvest-calendar")}
              className="inline-block text-primary font-semibold hover:underline"
            >
              See the Full Harvest Calendar →
            </Link>
          </div>
        </div>
      </section>

      {/* Shares Preview */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center mb-4 text-foreground">
            Our Shares
          </h2>
          <p className="text-center text-foreground/60 mb-12 max-w-2xl mx-auto">
            Three tiers of pasture-raised connectivity, allocated seasonally by the co-op.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shares.map((share) => (
              <ProductCard
                key={share.slug}
                slug={share.slug}
                name={share.name}
                price={share.priceLabel}
                tagline={share.tagline}
                image={share.image}
                href={`/shares/${share.slug}`}
                quips={shareQuips}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Raw Spectrum */}
      <section className="py-16 px-4 bg-accent/20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-6">Why Raw Spectrum</h2>
          <p className="text-foreground/80 leading-relaxed mb-4">
            Conventional wifi is pasteurized: homogenized at scale, stripped of character, engineered
            to behave the same everywhere. Industrial 5G is worse — a monoculture of signal, optimized
            for throughput and nothing else.
          </p>
          <p className="text-foreground/80 leading-relaxed mb-8">
            The co-op believes signal should carry its origin. Small-batch. Hand-harvested. Rotated
            through rested pastures. Our members do not need their packets filed smooth.
          </p>
          <Link
            href={siteHref("/the-pasture")}
            className="inline-block text-primary font-semibold hover:underline"
          >
            Read the Full Manifesto →
          </Link>
        </div>
      </section>

      {/* Featured Field Note */}
      {featuredNote && (
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-4 text-center">
              From the Field Notes
            </p>
            <Link
              href={siteHref(`/field-notes/${featuredNote.slug}`)}
              className="block group"
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-secondary/20">
                  <Image
                    src={featuredNote.image}
                    alt={featuredNote.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {featuredNote.title}
                  </h3>
                  <p className="text-foreground/70 mb-4">{featuredNote.excerpt}</p>
                  <p className="text-sm text-foreground/50">
                    By {featuredNote.author} · {featuredNote.date}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      <CTABanner
        headline="Ready to Join the Co-op?"
        description="Shares are allocated seasonally. Sign up today and begin receiving pasture-raised signal next month."
        ctaText="Join the Co-op"
        ctaHref={siteHref("/join")}
      />
    </>
  )
}

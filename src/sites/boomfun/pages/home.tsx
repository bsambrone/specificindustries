import Image from "next/image"
import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { FeatureSection } from "@/components/ui/feature-section"
import { CatalogProductCard } from "@/sites/boomfun/components/catalog-product-card"
import { products } from "@/sites/boomfun/data/products"
import { testimonials } from "@/sites/boomfun/data/testimonials"
import { getSiteHref } from "@/lib/site-href"

const featuredSlugs = [
  "glitter-claymore",
  "dynamite-fishing-kit",
  "blasting-cap-lunchbox",
  "glitter-confetti-mortar",
]

const homeTestimonialSlugs = ["whittaker-birthday", "pullman-handbook", "sanderling-wedding"]

export default async function BoomfunHome() {
  const siteHref = await getSiteHref()
  const featured = featuredSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => !!p)
  const homeTestimonials = homeTestimonialSlugs
    .map((slug) => testimonials.find((t) => t.slug === slug))
    .filter((t): t is NonNullable<typeof t> => !!t)

  return (
    <>
      {/* 1. Hero */}
      <Hero
        headline="BOOM-FUN!"
        subheadline="Real Kaboom. Real Kids. Real Fun. The Original American Demolitions Toy Company — Est. 1961, Toledo, Ohio."
        image="/sites/boomfun/hero.png"
        ctaText="Shop the Catalog"
        ctaHref={siteHref("/products")}
      />

      {/* 2. Why Boom-Fun? */}
      <FeatureSection
        title="Why Boom-Fun?"
        features={[
          {
            title: "American-Made Detonators",
            description: "Every Boom-Fun! blasting cap is pressed, inspected, and packaged at our Toledo, Ohio facility. No imports. No substitutes. Never.",
          },
          {
            title: "Every Kit Inspected by Sparky!",
            description: "Sparky the Safety Mascot personally inspects every kit that leaves our loading dock. He has never missed a day of work in his entire career.",
          },
          {
            title: "A Family Tradition Since 1961",
            description: "Three generations of American families have grown up with Boom-Fun! Harland P. Crenshaw still signs every new product design personally.",
          },
        ]}
      />

      {/* 3. Featured Products */}
      <section className="py-16 px-4 bg-secondary/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-primary uppercase mb-2">
              Featured from the 1961 Catalog
            </h2>
            <p className="italic text-foreground/70">
              Pulled from the hottest pages. While quantities last.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product) => (
              <CatalogProductCard
                key={product.slug}
                slug={product.slug}
                itemNumber={product.itemNumber}
                stockNumber={product.stockNumber}
                name={product.name}
                tagline={product.tagline}
                price={product.priceLabel}
                image={product.image}
                badge={product.badge}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href={siteHref("/products")}
              className="inline-block px-8 py-3 bg-primary text-background font-heading uppercase tracking-widest hover:bg-primary/90 transition-colors"
            >
              See the Full Catalog →
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Sparky's Safety Corner teaser */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto border-4 border-primary/30 p-10 bg-background relative">
          <div className="absolute -top-4 left-8 bg-background px-4 text-sm font-heading uppercase tracking-widest text-primary">
            Sparky&apos;s Corner
          </div>
          <div className="grid md:grid-cols-[1fr_2fr] gap-8 items-center">
            <div className="relative aspect-square max-w-[240px] mx-auto">
              <Image src="/sites/boomfun/sparky.png" alt="Sparky the Safety Mascot" fill className="object-contain" />
            </div>
            <div>
              <h2 className="text-3xl font-heading font-bold text-primary uppercase mb-4">
                The Four Rules
              </h2>
              <ol className="space-y-2 text-foreground/80 mb-6">
                <li><span className="font-bold text-secondary">1.</span> Don&apos;t Squeeze the Blasting Cap.</li>
                <li><span className="font-bold text-secondary">2.</span> Light the Fuse From the Long End.</li>
                <li><span className="font-bold text-secondary">3.</span> Count Your Fingers Before AND After.</li>
                <li><span className="font-bold text-secondary">4.</span> Ask an Adult First.</li>
              </ol>
              <Link
                href={siteHref("/safety")}
                className="inline-block px-6 py-2 bg-secondary text-background font-heading uppercase tracking-wider hover:bg-secondary/90 transition-colors"
              >
                Visit Sparky&apos;s Safety Corner →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Boom-Fun! Club recruitment banner */}
      <section className="py-16 px-4 bg-primary text-background">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-sm uppercase tracking-[0.4em] text-background/70 mb-2">
            Kids! Now accepting new members!
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase mb-4">
            Join the Boom-Fun! Club
          </h2>
          <p className="text-lg text-background/90 mb-6 max-w-2xl mx-auto">
            Official Membership Card. Secret Handshake Diagram. Real Blasting Cap Lapel Pin. Bi-monthly newsletter (&ldquo;The Fuse&rdquo;). Decoder Ring. All yours for just $1 and three stock numbers!
          </p>
          <Link
            href={siteHref("/club")}
            className="inline-block px-10 py-4 bg-accent text-primary font-heading uppercase tracking-widest hover:bg-accent/90 transition-colors"
          >
            Apply for Membership
          </Link>
        </div>
      </section>

      {/* 6. Testimonials strip */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-primary uppercase text-center mb-10">
            Letters From Happy Customers
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {homeTestimonials.map((t) => (
              <div key={t.slug} className="border-2 border-primary/15 bg-background p-6">
                <blockquote className="italic text-foreground/80 mb-4 leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3 pt-3 border-t border-primary/10">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-secondary/20">
                    <Image src={t.photo} alt={t.name} fill className="object-cover" />
                  </div>
                  <div className="text-sm">
                    <div className="font-heading text-primary">
                      {t.name}{t.age ? `, age ${t.age}` : ""}
                    </div>
                    <div className="text-foreground/60">{t.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href={siteHref("/testimonials")}
              className="text-primary font-heading uppercase tracking-widest underline hover:text-primary/80 transition-colors"
            >
              Read All Letters →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

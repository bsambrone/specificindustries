import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { ProductCard } from "@/components/ui/product-card"
import { CTABanner } from "@/components/ui/cta-banner"
import { products } from "@/sites/carterandfils/data/products"

const featuredSlugs = [
  "allegheny-reserve-syrah-5w30-2017",
  "carter-heritage-cuvee-5w20-2012",
  "late-harvest-atf-2016",
]
const featured = products.filter((p) => featuredSlugs.includes(p.slug))

export default function CarterAndFilsHome() {
  return (
    <>
      <Hero
        headline="Estate-Bottled in the Allegheny Since 1859"
        subheadline="Seven generations of family winemaking. Reds, whites, rosés, sparkling, and dessert — from the shale terroir of western Pennsylvania."
        ctaText="Explore the Cellar"
        ctaHref="/cellar"
        image="/sites/carterandfils/hero.png"
      />

      {/* Featured Vintages */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-sm tracking-[0.3em] uppercase text-primary/70 mb-3">Featured Vintages</p>
          <h2 className="text-4xl font-heading font-semibold text-center mb-16">From the Allegheny</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((product) => (
              <ProductCard
                key={product.slug}
                slug={product.slug}
                href={`/cellar/${product.slug}`}
                name={product.name}
                price={product.priceLabel}
                tagline={product.tagline}
                image={product.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Terroir strip */}
      <section className="py-20 px-4 bg-secondary/40 border-y border-accent/20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-primary/70 mb-4">The Allegheny Terroir</p>
          <p className="text-2xl font-heading italic leading-relaxed text-foreground">
            &ldquo;The shale remembers. The vine merely repeats.&rdquo;
          </p>
          <p className="text-sm text-foreground/60 mt-4">— Laurent Beaufort, Director of Terroir</p>
        </div>
      </section>

      {/* Wine Club teaser */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-primary/70 mb-3">Carter & Fils Cellar Society</p>
          <h2 className="text-4xl font-heading font-semibold mb-6">Join the Wine Club</h2>
          <p className="text-lg text-foreground/70 leading-relaxed max-w-2xl mx-auto mb-8">
            A monthly selection, curated from the cellar. Three tiers, each more considered than the last — and an annual invitation to the estate for our Platinum Collectors.
          </p>
          <Link href="/wine-club" className="inline-block border-2 border-primary text-primary px-10 py-3 tracking-widest uppercase text-sm font-semibold hover:bg-primary hover:text-secondary transition-colors">
            Learn More
          </Link>
        </div>
      </section>

      {/* Critic pull-quote */}
      <section className="py-16 px-4 bg-primary text-secondary">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-3xl font-heading italic leading-relaxed">
            &ldquo;A revelation in viscosity.&rdquo;
          </p>
          <p className="text-sm tracking-[0.3em] uppercase mt-6 opacity-70">— Decanter Quarterly</p>
        </div>
      </section>

      <CTABanner
        headline="Visit the Estate"
        description="Tastings by appointment, estate tours year-round."
        ctaText="Plan Your Visit"
        ctaHref="/visit"
      />
    </>
  )
}

import Image from "next/image"
import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { ProductCard } from "@/components/ui/product-card"
import { MetricCounter } from "@/components/ui/metric-counter"
import { CTABanner } from "@/components/ui/cta-banner"
import { products } from "@/sites/snortables/data/products"
import { homepageTestimonials } from "@/sites/snortables/data/testimonials"
import { getSiteHref } from "@/lib/site-href"

const featuredSlugs = ["nasalfuel-original", "the-full-bird", "sunday-roast", "jolt", "brotein", "creme-brulee-blast"]
const featured = products.filter((p) => featuredSlugs.includes(p.slug))

export default async function SnortablesHome() {
  const siteHref = await getSiteHref()

  return (
    <>
      <Hero
        headline="Why Eat When You Can Insufflate?"
        subheadline="Clinically optimized intranasal nutrient delivery for the modern human."
        ctaText="Shop Products"
        ctaHref="/products"
        secondaryCtaText="See The Science"
        secondaryCtaHref="/process"
        image="/sites/snortables/hero.png"
        dark
      />

      {/* Social Proof Metrics */}
      <section className="py-12 px-4 border-b border-primary/10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <MetricCounter value={2.4} suffix="M" label="Nostrils Served" compact />
          <MetricCounter value={99.7} suffix="%" label="Nostril Satisfaction" />
          <MetricCounter value={0} label="FDA Investigations (This Quarter)" />
          <MetricCounter value={4.3} label="Micron Avg Particle Size" />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4">How It Works</h2>
          <p className="text-foreground/60 mb-12">Three steps. No chewing. No dignity. No problem.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="text-5xl font-heading font-bold text-primary">1</div>
              <h3 className="text-xl font-heading font-semibold text-foreground">Choose Your Powder</h3>
              <p className="text-foreground/60">Browse our catalog of 12 meticulously pulverized meals, beverages, and desserts.</p>
            </div>
            <div className="space-y-3">
              <div className="text-5xl font-heading font-bold text-primary">2</div>
              <h3 className="text-xl font-heading font-semibold text-foreground">Prepare Your Line</h3>
              <p className="text-foreground/60">Measure your dose using our Precision Delivery Apparatus. Accuracy matters.</p>
            </div>
            <div className="space-y-3">
              <div className="text-5xl font-heading font-bold text-primary">3</div>
              <h3 className="text-xl font-heading font-semibold text-foreground">Insufflate & Thrive</h3>
              <p className="text-foreground/60">Experience the future of nutrition. Tingling means it&apos;s working.</p>
            </div>
          </div>
          <div className="mt-8">
            <Link
              href={siteHref("/process")}
              className="text-primary font-semibold hover:underline"
            >
              See our full process &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((product) => (
              <ProductCard
                key={product.slug}
                slug={product.slug}
                name={product.name}
                price={product.priceLabel}
                tagline={product.tagline}
                image={product.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* The Science */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-6">The Science</h2>
          <p className="text-lg text-foreground/70 leading-relaxed mb-4">
            Our patented NasalAbsorb™ technology leverages the nasal mucosa&apos;s 150cm² surface area for 340% faster nutrient uptake than primitive oral consumption. The nasal epithelium provides direct access to the bloodstream, bypassing the gastrointestinal tract entirely.
          </p>
          <p className="text-lg text-foreground/70 leading-relaxed mb-4">
            Each Snortables product is milled to a precise 0.3 micron particle size — small enough for optimal mucosal absorption, large enough to avoid what our engineers call &quot;the sneeze threshold.&quot;
          </p>
          <p className="text-sm text-foreground/40 italic">
            These statements have not been evaluated by the FDA. These statements have not been read by the FDA. The FDA has blocked our email address.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {homepageTestimonials.map((t) => (
              <div key={t.name} className="bg-background border border-primary/10 rounded-lg p-6 flex gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                  <Image src={t.image} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-foreground/80 italic mb-3">&ldquo;{t.quote}&rdquo;</p>
                  <p className="text-sm font-semibold text-primary">{t.name}</p>
                  <p className="text-xs text-foreground/50">{t.title}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href={siteHref("/testimonials")}
              className="text-primary font-semibold hover:underline"
            >
              See all testimonials &rarr;
            </Link>
          </div>
        </div>
      </section>

      <CTABanner
        headline="Ready to Stop Chewing?"
        description="Join the intranasal nutrition revolution. Subscribe to NasalFuel Prime for monthly auto-delivery with escalating dosage recommendations."
        ctaText="Get NasalFuel Prime"
        ctaHref="/products"
      />
    </>
  )
}

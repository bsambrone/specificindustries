import { Hero } from "@/components/ui/hero"
import { ProductCard } from "@/components/ui/product-card"
import { FeatureSection } from "@/components/ui/feature-section"
import { TestimonialGrid } from "@/components/ui/testimonial-grid"
import { CTABanner } from "@/components/ui/cta-banner"
import { products, quips } from "@/sites/truegrit/data/products"

const featuredSlugs = ["original-40-grit", "80-grit-sensitive", "acidjet-bidet-3000", "starter-kit"]
const featured = products.filter((p) => featuredSlugs.includes(p.slug))

export default function TrueGritHome() {
  return (
    <>
      <Hero
        headline="Where Comfort Meets Its Match"
        subheadline="Non-GMO. Free Range. Definitely Not Tear-Free."
        ctaText="Shop Now"
        ctaHref="/products"
        secondaryCtaText="The Experience"
        secondaryCtaHref="/the-experience"
        image="/sites/truegrit/hero.png"
      />

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center mb-4 uppercase tracking-wide">Featured Products</h2>
          <p className="text-center text-foreground/50 text-sm mb-12">Shop by department. Each product rated by grit, not by comfort.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard
                key={product.slug}
                slug={product.slug}
                name={product.name}
                price={product.priceLabel}
                tagline={product.tagline}
                image={product.image}
                quips={quips}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why True Grit */}
      <FeatureSection
        title="Why True Grit?"
        features={[
          {
            title: "Unparalleled Cleanliness",
            description: "No conventional toilet paper can match the thoroughness of an industrial abrasive. That's not marketing — that's material science.",
          },
          {
            title: "Boost Productivity",
            description: "Our products naturally discourage extended bathroom breaks. Average visit times drop by 84%. Your employer will thank you. Probably.",
          },
          {
            title: "Build Character",
            description: "Every morning is an opportunity for personal growth. True Grit users report increased resilience, determination, and a very specific facial expression.",
          },
        ]}
      />

      {/* Testimonials */}
      <TestimonialGrid
        title="Customer Testimonials"
        testimonials={[
          { quote: "I've never felt so... thorough.", author: "Concerned Customer" },
          { quote: "My bathroom breaks are now under 30 seconds. HR is thrilled.", author: "Corporate Efficiency Expert" },
          { quote: "I bought the 24-grit on a dare. I am a different person now.", author: "Changed Man" },
          { quote: "The Recovery Balm should come free with every purchase. Please.", author: "Repeat Buyer" },
          { quote: "My plumber asked about the HydroBlast 500. Then he asked me to never call him again.", author: "Former Homeowner" },
          { quote: "I can hear my coworkers from the bathroom. They seem... engaged.", author: "Office Manager" },
        ]}
      />

      {/* Disclaimer Banner */}
      <section className="py-6 px-4 bg-foreground/5 border-t border-foreground/10">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-foreground/40 text-center leading-relaxed">
            * True Grit Personal Care is not responsible for any discomfort, alarm, or lifestyle changes resulting from product use.
            Audible responses during use are expected and not cause for concern. Crying from the bathroom is within normal operating parameters.
            Do not mind the bleeding — this is how you know it&apos;s working. All products are non-GMO, free range, and definitely not tear-free.
            Please consult your physician, your insurance provider, and possibly a therapist before beginning a True Grit regimen.
          </p>
        </div>
      </section>

      <CTABanner
        headline="Ready for the Deep Clean?"
        description="Join the growing community of people who have redefined what 'clean' means."
        ctaText="Shop Now"
        ctaHref="/products"
      />
    </>
  )
}

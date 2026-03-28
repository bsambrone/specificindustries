import { Hero } from "@/components/ui/hero"
import { ProductCard } from "@/components/ui/product-card"
import { TestimonialGrid } from "@/components/ui/testimonial-grid"
import { CTABanner } from "@/components/ui/cta-banner"
import { products } from "@/sites/dehydratedwater/data/products"

const featuredSlugs = ["original", "cloud-mist", "heavy-water"]
const featured = products.filter((p) => featuredSlugs.includes(p.slug))

export default function DehydratedWaterHome() {
  return (
    <>
      <Hero
        headline="Water, Perfected Through Absence"
        subheadline="For nearly two centuries, we have pursued a singular vision: liberating water from the burden of its own wetness. Est. 1847."
        ctaText="Shop the Collection"
        ctaHref="/products"
      />

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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

      {/* Testimonials */}
      <TestimonialGrid
        title="What Our Patrons Say"
        testimonials={[
          { quote: "I've never felt more hydrated by something so profoundly dry.", author: "Dr. Helena Moisture, Theoretical Hydrologist" },
          { quote: "Changed my relationship with water. I no longer need it in liquid form.", author: "Reginald Dustworth, Competitive Dehydration Athlete" },
          { quote: "The Cloud Mist Nor'easter made me weep. Or maybe that was the salt.", author: "Baroness Evelyn Sipsworth, Water Critic" },
          { quote: "I switched from regular water and haven't looked back. Mostly because I'm too dehydrated to turn my head.", author: "Anonymous Subscriber" },
          { quote: "Five stars. Would add water again.", author: "Thirsty in Vermont" },
          { quote: "My sourdough starter is jealous of my water starter.", author: "Portland Resident #4,217" },
        ]}
      />

      <CTABanner
        headline="Begin Your Dehydration Journey"
        description="Subscribe to our Water-as-a-Service plan. Heritage-crafted. Cloud-synced. Utterly unnecessary."
        ctaText="Explore WaaS"
        ctaHref="/waas"
      />
    </>
  )
}

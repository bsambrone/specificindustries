"use client"

import { Hero } from "@/components/ui/hero"
import { WaveDivider } from "@/components/ui/wave-divider"
import { FeaturedProductSpotlight } from "@/components/ui/featured-product-spotlight"
import { ProductCard } from "@/components/ui/product-card"
import { PromoBanner } from "@/components/ui/promo-banner"
import { products } from "@/sites/dehydratedwater/data/products"
import { useSiteLink } from "@/hooks/use-site-link"

export const metadata = {
  title: "Products — Dehydrated Water Laboratories",
  description: "Browse our collection of premium dehydrated water products.",
}

const heritageCollectionSlugs = ["original", "cloud-mist", "starter-culture"]
const advancedScienceSlugs = ["heavy-water", "diet-water", "dryer-water", "ice-cubes"]
const experienceSlugs = ["water-seasoning", "waas"]

const heritageCollection = heritageCollectionSlugs.map((slug) =>
  products.find((p) => p.slug === slug)!
)
const advancedScience = advancedScienceSlugs.map((slug) =>
  products.find((p) => p.slug === slug)!
)
const experience = experienceSlugs.map((slug) => products.find((p) => p.slug === slug)!)

const dryerWater = products.find((p) => p.slug === "dryer-water")!

export default function DehydratedWaterProducts() {
  const siteHref = useSiteLink()
  return (
    <>
      <Hero
        dark
        headline="The Collection"
        subheadline="Purveyors of fine powdered hydration since 1847. Each product crafted with the same care and absence of moisture."
      />

      <WaveDivider variant="wave1" />

      <FeaturedProductSpotlight
        image={dryerWater.image}
        eyebrow="Most Popular"
        title={dryerWater.name}
        description={dryerWater.tagline + " " + dryerWater.description[0]}
        ctaText="View Product"
        ctaHref={siteHref("/products/dryer-water")}
        imagePosition="left"
      />

      {/* Heritage Collection */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-accent uppercase tracking-wide">
              Heritage Collection
            </h2>
            <div className="mt-2 h-px bg-accent/20" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {heritageCollection.map((product) => (
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

      {/* Advanced Science */}
      <section className="py-16 px-4 bg-secondary/10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-accent uppercase tracking-wide">
              Advanced Science
            </h2>
            <div className="mt-2 h-px bg-accent/20" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {advancedScience.map((product) => (
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

      {/* Experience */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-accent uppercase tracking-wide">
              Experience
            </h2>
            <div className="mt-2 h-px bg-accent/20" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {experience.map((product) => (
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

      <PromoBanner
        headline="First Packet Free*"
        subtext="*Just pay the Desiccation Fee of $3.47"
      />
    </>
  )
}

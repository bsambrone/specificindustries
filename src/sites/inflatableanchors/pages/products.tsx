"use client"

import { Hero } from "@/components/ui/hero"
import { WaveDivider } from "@/components/ui/wave-divider"
import { FeaturedProductSpotlight } from "@/components/ui/featured-product-spotlight"
import { ProductCard } from "@/components/ui/product-card"
import { PromoBanner } from "@/components/ui/promo-banner"
import { products, getProductsByCategory } from "@/sites/inflatableanchors/data/products"
import { useSiteLink } from "@/hooks/use-site-link"

export const metadata = {
  title: "Products — Inflatable Anchors Co.",
  description: "Browse our full lineup of inflatable anchors, premium models, and accessories.",
}

const heavyDutyPro = products.find((p) => p.slug === "heavy-duty-pro")!
const standardAnchors = getProductsByCategory("standard")
const premiumLine = getProductsByCategory("premium")
const accessories = getProductsByCategory("accessories")

export default function InflatableAnchorsProducts() {
  const siteHref = useSiteLink()
  return (
    <>
      <Hero
        dark
        headline="Our Products"
        subheadline="Everything you need to not anchor your boat. From entry-level to premium, plus all the accessories."
      />

      <WaveDivider variant="wave1" />

      <FeaturedProductSpotlight
        image={heavyDutyPro.image}
        eyebrow="Most Popular"
        title={heavyDutyPro.name}
        description={heavyDutyPro.tagline + " " + heavyDutyPro.description[0]}
        ctaText="View Product"
        ctaHref={siteHref("/products/heavy-duty-pro")}
        imagePosition="left"
      />

      {/* Standard Anchors */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-accent uppercase tracking-wide">
              Standard Anchors
            </h2>
            <div className="mt-2 h-px bg-accent/20" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {standardAnchors.map((product) => (
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

      {/* Premium Line */}
      <section className="py-16 px-4 bg-secondary/10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-accent uppercase tracking-wide">
              Premium Line
            </h2>
            <div className="mt-2 h-px bg-accent/20" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {premiumLine.map((product) => (
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

      {/* Accessories */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-accent uppercase tracking-wide">
              Accessories
            </h2>
            <div className="mt-2 h-px bg-accent/20" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {accessories.map((product) => (
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
        headline="Free Shipping on All Anchors*"
        subtext="*They weigh 4 oz. The shipping was already basically free."
      />
    </>
  )
}

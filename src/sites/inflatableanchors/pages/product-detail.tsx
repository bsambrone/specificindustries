"use client"

import { Hero } from "@/components/ui/hero"
import { WaveDivider } from "@/components/ui/wave-divider"
import { SplitSection } from "@/components/ui/split-section"
import { ProductCarousel } from "@/components/ui/product-carousel"
import { ProductCard } from "@/components/ui/product-card"
import { PromoBanner } from "@/components/ui/promo-banner"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"
import { getProductBySlug, getRelatedProducts } from "@/sites/inflatableanchors/data/products"
import { useSiteLink } from "@/hooks/use-site-link"

export default function ProductDetail({ slug }: { slug: string }) {
  const siteHref = useSiteLink()
  const product = getProductBySlug(slug)
  if (!product) return null

  const related = getRelatedProducts(slug, 4)

  return (
    <>
      {/* Product hero — split section */}
      <SplitSection image={product.image} imagePosition="left">
        <p className="text-sm text-accent uppercase tracking-widest mb-2 font-semibold">
          {product.category === "standard"
            ? "Standard Anchors"
            : product.category === "premium"
            ? "Premium Line"
            : "Accessories"}
        </p>
        <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
          {product.name}
        </h1>
        <p className="text-foreground/60 text-lg mb-4">{product.tagline}</p>
        <p className="text-2xl font-bold text-primary mb-6">{product.priceLabel}</p>
        <AddToCartButton slug={product.slug} productName={product.name} />
      </SplitSection>

      <WaveDivider variant="wave2" />

      {/* Description */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-lg text-foreground/80 space-y-4">
          {product.description.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* Specs panel */}
      <section className="py-16 px-4 bg-secondary/10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-primary mb-6">
            Product Specifications
          </h2>
          <div className="border border-primary/10 rounded-lg overflow-hidden">
            {product.specs.map((spec, i) => (
              <div
                key={spec.label}
                className={`flex justify-between px-6 py-3 ${
                  i % 2 === 0 ? "bg-background" : "bg-secondary/10"
                }`}
              >
                <span className="font-semibold text-foreground/70">{spec.label}</span>
                <span className="text-foreground">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related products */}
      <ProductCarousel title="You Might Also Like">
        {related.map((p) => (
          <div key={p.slug} className="w-[260px] sm:w-[280px] shrink-0">
            <ProductCard slug={p.slug} name={p.name} price={p.priceLabel} tagline={p.tagline} image={p.image} />
          </div>
        ))}
      </ProductCarousel>

      <PromoBanner
        headline="See the full lineup"
        ctaText="All Products"
        ctaHref={siteHref("/products")}
      />
    </>
  )
}

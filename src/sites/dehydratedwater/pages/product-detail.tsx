"use client"

import Link from "next/link"
import { getProductBySlug } from "@/sites/dehydratedwater/data/products"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"
import { SplitSection } from "@/components/ui/split-section"
import { WaveDivider } from "@/components/ui/wave-divider"
import { PromoBanner } from "@/components/ui/promo-banner"
import { useSiteLink } from "@/hooks/use-site-link"

export default function ProductDetail({ slug }: { slug: string }) {
  const product = getProductBySlug(slug)
  const siteHref = useSiteLink()
  if (!product) return null

  return (
    <>
      {/* Product Hero — SplitSection */}
      <SplitSection image={product.image} imagePosition="left">
        <h1 className="text-4xl font-heading font-bold text-foreground mb-2">{product.name}</h1>
        <p className="text-lg text-foreground/60 mb-4">{product.tagline}</p>
        <p className="text-3xl font-bold text-primary mb-6">{product.priceLabel}</p>
        <div className="mb-8">
          {product.isSubscription ? (
            <Link
              href={siteHref("/waas")}
              className="inline-block px-8 py-4 bg-primary text-white font-semibold text-lg hover:opacity-90 transition-opacity"
            >
              View Subscription Plans
            </Link>
          ) : (
            <AddToCartButton
              slug={product.slug}
              productName={product.name}
              className="px-8 py-4 bg-primary text-white font-semibold text-lg hover:opacity-90 transition-opacity w-full sm:w-auto"
            />
          )}
        </div>
      </SplitSection>

      <WaveDivider variant="wave1" />

      {/* Full-width description prose */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          {product.description.map((para, i) => (
            <p key={i} className="text-foreground/70 mb-4 leading-relaxed text-lg">
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* Science Facts */}
      <section className="py-12 px-4 bg-secondary/10">
        <div className="max-w-md mx-auto">
          <div className="border-2 border-foreground p-4">
            <h2 className="text-2xl font-heading font-bold text-foreground border-b-8 border-foreground pb-1 mb-2">
              Science Facts
            </h2>
            <p className="text-sm text-foreground/60 border-b border-foreground pb-2 mb-2">
              Per packet, as determined by our laboratory (a desk)
            </p>
            <div className="divide-y divide-foreground/20">
              {product.scienceFacts.map((fact) => (
                <div key={fact.label} className="flex justify-between py-1.5">
                  <span className="font-semibold text-foreground text-sm">{fact.label}</span>
                  <span className="text-foreground/70 text-sm">{fact.value}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-foreground/40 mt-3 border-t border-foreground pt-2">
              * These facts have not been peer-reviewed, FDA-approved, or verified by any entity, real or imagined. The laboratory is Ezekiel&apos;s desk.
            </p>
          </div>
        </div>
      </section>

      {/* Variants (if any) */}
      {product.variants && product.variants.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-heading font-bold text-center mb-8">Available Variants</h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              {product.variants.map((variant) => (
                <div key={variant.name} className="border border-accent/30 rounded-lg p-6 flex-1 max-w-sm">
                  <h3 className="font-heading font-bold text-accent mb-2">{variant.name}</h3>
                  <p className="text-foreground/70 text-sm">{variant.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <PromoBanner
        headline="Browse the Collection"
        ctaText="View All Products"
        ctaHref={siteHref("/products")}
      />
    </>
  )
}

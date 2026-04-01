"use client"

import Image from "next/image"
import { getProductBySlug, getRelatedProducts, quips } from "@/sites/truegrit/data/products"
import { ProductCard } from "@/components/ui/product-card"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"

export default function ProductDetail({ slug }: { slug: string }) {
  const product = getProductBySlug(slug)
  if (!product) return null

  const related = getRelatedProducts(slug, 3)

  return (
    <>
      {/* Product Hero */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="relative aspect-square rounded-lg overflow-hidden bg-secondary/10">
            <Image src={product.image} alt={product.name} fill className="object-cover" />
          </div>
          <div>
            <p className="text-xs text-foreground/40 font-mono mb-2">SKU: {product.sku}</p>
            <h1 className="text-4xl font-heading font-bold text-foreground mb-2">{product.name}</h1>
            <p className="text-lg text-foreground/60 mb-4">{product.tagline}</p>
            <p className="text-3xl font-bold text-primary mb-6">{product.priceLabel}</p>
            <div className="mb-8">
              <AddToCartButton
                slug={product.slug}
                productName={product.name}
                quips={quips}
                className="px-8 py-4 bg-primary text-white rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity w-full sm:w-auto"
              />
            </div>
            {product.description.map((para, i) => (
              <p key={i} className="text-foreground/70 mb-4 leading-relaxed">{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="py-12 px-4 bg-secondary/10">
        <div className="max-w-md mx-auto">
          <div className="border-2 border-foreground p-4">
            <h2 className="text-2xl font-heading font-bold text-foreground border-b-8 border-foreground pb-1 mb-2 uppercase tracking-wide">
              Technical Specifications
            </h2>
            <div className="divide-y divide-foreground/20">
              {product.specs.map((spec) => (
                <div key={spec.label} className="flex justify-between py-1.5">
                  <span className="font-semibold text-foreground text-sm">{spec.label}</span>
                  <span className="text-foreground/70 text-sm">{spec.value}</span>
                </div>
              ))}
            </div>
            {product.disclaimers.length > 0 && (
              <div className="mt-3 border-t border-foreground pt-2 space-y-1">
                {product.disclaimers.map((disclaimer, i) => (
                  <p key={i} className="text-xs text-foreground/40">* {disclaimer}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-center mb-8 uppercase tracking-wide">You May Also Endure</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((p) => (
              <ProductCard
                key={p.slug}
                slug={p.slug}
                name={p.name}
                price={p.priceLabel}
                tagline={p.tagline}
                image={p.image}
                quips={quips}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

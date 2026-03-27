"use client"

import Image from "next/image"
import { getProductBySlug, getRelatedProducts } from "@/sites/pigmilk/data/products"
import { ProductCard } from "@/components/ui/product-card"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"

export default function ProductDetail({ slug }: { slug: string }) {
  const product = getProductBySlug(slug)
  if (!product) return null // Slug already validated by catch-all route

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
            <h1 className="text-4xl font-heading font-bold text-foreground mb-2">{product.name}</h1>
            <p className="text-lg text-foreground/60 mb-4">{product.tagline}</p>
            <p className="text-3xl font-bold text-primary mb-6">{product.priceLabel}</p>
            {product.description.map((para, i) => (
              <p key={i} className="text-foreground/70 mb-4 leading-relaxed">{para}</p>
            ))}
            <div className="mt-6">
              <AddToCartButton slug={product.slug} productName={product.name} />
            </div>
          </div>
        </div>
      </section>

      {/* Nutritional Facts */}
      <section className="py-12 px-4 bg-secondary/10">
        <div className="max-w-md mx-auto">
          <div className="border-2 border-foreground p-4">
            <h2 className="text-2xl font-heading font-bold text-foreground border-b-8 border-foreground pb-1 mb-2">
              Nutrition Facts
            </h2>
            <p className="text-sm text-foreground/60 border-b border-foreground pb-2 mb-2">
              Serving Size: 1 glass (if you dare)
            </p>
            <div className="divide-y divide-foreground/20">
              {product.nutritionalFacts.map((fact) => (
                <div key={fact.label} className="flex justify-between py-1.5">
                  <span className="font-semibold text-foreground text-sm">{fact.label}</span>
                  <span className="text-foreground/70 text-sm">{fact.value}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-foreground/40 mt-3 border-t border-foreground pt-2">
              * Percent Daily Values are made up. Not evaluated by the FDA. Not evaluated by anyone, really.
            </p>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-center mb-8">You Might Also Regret</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((p) => (
              <ProductCard
                key={p.slug}
                slug={p.slug}
                name={p.name}
                price={p.priceLabel}
                tagline={p.tagline}
                image={p.image}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

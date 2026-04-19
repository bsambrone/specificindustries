import Image from "next/image"
import { getProductBySlug, getRelatedProducts } from "@/sites/chunkymilk/data/products"
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
          <div className="relative aspect-square rounded-lg overflow-hidden bg-secondary/20">
            <Image src={product.image} alt={product.name} fill className="object-cover" priority fetchPriority="high" />
          </div>
          <div>
            {product.grade && (
              <p className="text-xs uppercase tracking-widest text-accent mb-2">{product.grade}</p>
            )}
            <h1 className="text-4xl font-heading font-bold text-foreground mb-2">{product.name}</h1>
            <p className="text-lg text-foreground/60 mb-4">{product.tagline}</p>
            <p className="text-3xl font-bold text-primary mb-6">{product.priceLabel}</p>
            <div className="mb-8">
              <AddToCartButton
                slug={product.slug}
                productName={product.name}
                className="px-8 py-4 bg-primary text-white rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity w-full sm:w-auto"
              />
            </div>
            {product.chunkOrigin && (
              <div className="mb-6 text-sm text-foreground/70">
                <span className="uppercase tracking-wider text-xs text-accent">Chunk Origin · </span>
                {product.chunkOrigin}
              </div>
            )}
            {product.description.map((para, i) => (
              <p key={i} className="text-foreground/70 mb-4 leading-relaxed">{para}</p>
            ))}
            <div className="mt-8 p-5 bg-secondary/30 border border-accent/20 rounded-lg">
              <p className="text-xs uppercase tracking-widest text-accent mb-2">How To Serve</p>
              <p className="text-foreground/70 italic">In the manner your people have always served it.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tasting Notes */}
      <section className="py-12 px-4 bg-secondary/20">
        <div className="max-w-md mx-auto">
          <div className="border-2 border-foreground p-4 bg-background">
            <h2 className="text-2xl font-heading font-bold text-foreground border-b-4 border-foreground pb-1 mb-2">
              Tasting Notes
            </h2>
            <p className="text-sm text-foreground/60 border-b border-foreground/40 pb-2 mb-2">
              Noted by Jeb Hollister, Head of Chunk Grading
            </p>
            <div className="divide-y divide-foreground/20">
              {product.tastingNotes.map((fact) => (
                <div key={fact.label} className="flex justify-between py-1.5 gap-4">
                  <span className="font-semibold text-foreground text-sm">{fact.label}</span>
                  <span className="text-foreground/70 text-sm text-right">{fact.value}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-foreground/40 mt-3 border-t border-foreground/40 pt-2 italic">
              * Notes reflect one season&apos;s draw. Milk is not the same twice.
            </p>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-heading font-bold text-center text-primary mb-8">Your People May Also Pour</h2>
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
      )}
    </>
  )
}

import Image from "next/image"
import { getProductBySlug, getRelatedProducts, categories } from "@/sites/mostlysterile/data/products"
import { ProductCard } from "@/components/ui/product-card"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"

const addToCartQuips = [
  "Noted. Your order has been queued for processing where applicable.",
  "Added. A handling advisory will be provided at checkout.",
  "Received. Shipping will commence from a location we are advised not to disclose.",
  "Confirmed. Sterility of this item was verified earlier today.",
]

export default function ProductDetail({ slug }: { slug: string }) {
  const product = getProductBySlug(slug)
  if (!product) return null

  const related = getRelatedProducts(slug, 3)
  const categoryLabel = categories.find((c) => c.slug === product.category)?.label ?? product.category

  return (
    <>
      {/* Product hero */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="relative aspect-square rounded-lg overflow-hidden bg-secondary/10 border border-primary/10">
            <Image src={product.image} alt={product.name} fill className="object-cover" priority fetchPriority="high" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-2">{categoryLabel}</p>
            <h1 className="text-4xl font-heading font-bold text-primary mb-2">{product.name}</h1>
            <p className="text-lg text-foreground/70 italic mb-4">{product.tagline}</p>
            <p className="text-3xl font-bold text-primary mb-6">{product.priceLabel}</p>
            <div className="mb-8">
              <AddToCartButton
                slug={product.slug}
                productName={product.name}
                className="px-8 py-4 bg-primary text-background rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity w-full sm:w-auto"
                quips={addToCartQuips}
              />
            </div>
            {product.description.map((para, i) => (
              <p key={i} className="text-foreground/80 mb-4 leading-relaxed">{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-10 px-4">
        <div className="max-w-3xl mx-auto border-2 border-primary/20 bg-secondary/10 rounded-lg">
          <div className="border-b-2 border-primary/20 px-6 py-3 bg-primary/5">
            <h2 className="text-sm uppercase tracking-widest font-heading font-bold text-primary">
              Product Specifications
            </h2>
          </div>
          <dl className="divide-y divide-primary/10">
            {product.specifications.map((spec) => (
              <div key={spec.label} className="px-6 py-3 grid grid-cols-2 gap-4">
                <dt className="text-sm font-semibold text-foreground/70 uppercase tracking-wide">
                  {spec.label}
                </dt>
                <dd className="text-sm text-foreground text-right">{spec.value}</dd>
              </div>
            ))}
          </dl>
          <p className="px-6 py-3 text-xs italic text-foreground/50 border-t-2 border-primary/20 bg-accent/10">
            *Specification values represent the best available assessment at time of listing and may vary from unit to unit.
          </p>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="py-16 px-4 bg-secondary/10 border-t border-primary/10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-heading font-bold text-primary text-center mb-2">
              Related Products
            </h2>
            <p className="text-center text-foreground/60 text-sm mb-8">
              More from our {categoryLabel} line.
            </p>
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

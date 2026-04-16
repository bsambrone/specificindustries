import Image from "next/image"
import { getProductBySlug, getRelatedProducts } from "@/sites/radiumroys/data/products"
import { ProductCard } from "@/components/ui/product-card"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"

const addToCartQuips = [
  "A wonderful choice, friend!",
  "Roy himself would have ordered this.",
  "Added! Your home is about to feel a lot more wholesome.",
  "Splendid! Tomorrow's pantry, today.",
  "What a delight. Shipping in two to three business decades.",
]

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
            <Image src={product.image} alt={product.name} fill className="object-cover" priority fetchPriority="high" />
          </div>
          <div>
            <h1 className="text-4xl font-heading font-bold text-secondary mb-2">{product.name}</h1>
            <p className="text-lg text-foreground/70 italic mb-4">{product.tagline}</p>
            <p className="text-3xl font-bold text-primary mb-6">{product.priceLabel}</p>
            <div className="mb-8">
              <AddToCartButton
                slug={product.slug}
                productName={product.name}
                className="px-8 py-4 bg-primary text-foreground rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity w-full sm:w-auto"
                quips={addToCartQuips}
              />
            </div>
            {product.description.map((para, i) => (
              <p key={i} className="text-foreground/80 mb-4 leading-relaxed">{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Roy's Recommendation */}
      <section className="py-10 px-4">
        <div className="max-w-3xl mx-auto bg-accent/20 border-2 border-accent rounded-lg p-6 text-center">
          <p className="text-xs uppercase tracking-widest text-secondary mb-2">A note from Roy</p>
          <p className="text-lg font-heading text-foreground leading-snug">
            &ldquo;{product.roysRecommendation}&rdquo;
          </p>
        </div>
      </section>

      {/* Ingredients & Materials */}
      <section className="py-10 px-4">
        <div className="max-w-3xl mx-auto border border-foreground/20 rounded-lg p-6">
          <h2 className="text-xl font-heading font-bold text-secondary border-b border-foreground/20 pb-2 mb-3">
            Ingredients &amp; Materials
          </h2>
          <p className="text-foreground/80 leading-relaxed">{product.ingredients}</p>
          <p className="text-xs text-foreground/50 italic mt-4">
            This product contains substances known to the State of California to cause cancer, birth defects, or other reproductive harm. Roy considers this a feature.
          </p>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16 px-4 bg-secondary/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-secondary text-center mb-8">More From Roy</h2>
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

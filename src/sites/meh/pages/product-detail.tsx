import Image from "next/image"
import Link from "next/link"
import {
  getProductBySlug,
  getRelatedProducts,
  CATEGORY_LABELS,
} from "@/sites/meh/data/products"
import { ProductCard } from "@/components/ui/product-card"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"

const QUIPS = [
  "A reasonable choice.",
  "We anticipate no regrets.",
  "Added. Quietly.",
  "We will ship it shortly.",
  "It will arrive as described.",
]

export default function ProductDetail({ slug }: { slug: string }) {
  const product = getProductBySlug(slug)
  if (!product) return null
  const related = getRelatedProducts(slug, 3)

  return (
    <>
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <nav className="text-xs uppercase tracking-widest text-foreground/60 mb-10">
            <Link href="/products" className="hover:text-primary">Catalog</Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-primary">{CATEGORY_LABELS[product.category]}</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground/80">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
            <div className="relative aspect-square border border-foreground/20 bg-background/60">
              <Image src={product.image} alt={product.name} fill className="object-contain p-8 md:p-12" priority />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-foreground/60 mb-3">{CATEGORY_LABELS[product.category]}</p>
              <h1 className="text-4xl md:text-5xl font-heading font-semibold text-primary mb-3 leading-tight">{product.name}</h1>
              <p className="text-lg italic text-foreground/70 mb-8">{product.tagline}</p>
              <p className="text-3xl font-heading text-primary mb-10">{product.priceLabel}</p>
              <AddToCartButton
                slug={product.slug}
                productName={product.name}
                quips={QUIPS}
                className="px-10 py-4 border border-primary text-primary uppercase tracking-widest text-sm hover:bg-primary hover:text-background transition-colors w-full sm:w-auto mb-10"
              />
              <div className="space-y-5 border-t border-foreground/20 pt-8 text-foreground/80 leading-relaxed">
                {product.longDescription.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Field review */}
          <div className="mt-20 max-w-3xl mx-auto border-t border-b border-foreground/30 py-12 text-center">
            <p className="text-xs uppercase tracking-widest text-foreground/60 mb-4">Field Review</p>
            <p className="text-xl italic text-primary mb-3 leading-relaxed">&ldquo;{product.fieldReview.quote}&rdquo;</p>
            <p className="text-sm text-foreground/60">— {product.fieldReview.attribution}</p>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-foreground/20 py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-foreground/60 mb-8 text-center">
              Other devices in {CATEGORY_LABELS[product.category]}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
              {related.map((p) => (
                <ProductCard
                  key={p.slug}
                  slug={p.slug}
                  href={`/products/${p.slug}`}
                  name={p.name}
                  price={p.priceLabel}
                  tagline={p.tagline}
                  image={p.image}
                  showAddToCart={false}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

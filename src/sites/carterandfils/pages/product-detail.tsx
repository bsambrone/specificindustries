import Image from "next/image"
import Link from "next/link"
import { getProductBySlug, getRelatedProducts, CATEGORY_LABELS } from "@/sites/carterandfils/data/products"
import { ProductCard } from "@/components/ui/product-card"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"

export default function ProductDetail({ slug }: { slug: string }) {
  const product = getProductBySlug(slug)
  if (!product) return null

  const related = getRelatedProducts(slug, 3)

  return (
    <>
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <nav className="text-sm text-foreground/60 mb-8 tracking-wider">
            <Link href="/cellar" className="hover:text-primary uppercase">Cellar</Link>
            <span className="mx-2">›</span>
            <Link href="/cellar" className="hover:text-primary uppercase">{CATEGORY_LABELS[product.category]}</Link>
            <span className="mx-2">›</span>
            <span className="uppercase">{product.name}</span>
          </nav>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div className="relative aspect-[3/4] bg-secondary/30 border border-accent/30">
              <Image src={product.image} alt={product.name} fill className="object-contain p-12" priority />
            </div>
            <div>
              <p className="text-sm tracking-[0.3em] uppercase text-primary/70 mb-2">{CATEGORY_LABELS[product.category]}</p>
              <h1 className="text-4xl font-heading font-semibold text-foreground mb-3">{product.name}</h1>
              <p className="text-lg italic text-foreground/70 mb-8">{product.tagline}</p>
              <p className="text-3xl font-heading text-primary mb-2">{product.priceLabel}</p>
              <p className="text-sm text-foreground/50 mb-6">750ml · other sizes available</p>
              <AddToCartButton
                slug={product.slug}
                productName={product.name}
                className="px-10 py-4 bg-primary text-secondary tracking-widest uppercase text-sm font-semibold hover:opacity-90 transition-opacity w-full sm:w-auto mb-10"
              />
              <div className="space-y-6 border-t border-accent/30 pt-8">
                <div>
                  <p className="text-xs tracking-[0.3em] uppercase text-primary/70 mb-2">Tasting Notes</p>
                  <p className="text-foreground/80 leading-relaxed">{product.tastingNotes}</p>
                </div>
                <div>
                  <p className="text-xs tracking-[0.3em] uppercase text-primary/70 mb-2">Pairings</p>
                  <ul className="text-foreground/80 space-y-1">
                    {product.pairings.map((p, i) => (
                      <li key={i} className="italic">— {p}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs tracking-[0.3em] uppercase text-primary/70 mb-2">Terroir</p>
                  <p className="text-foreground/80 leading-relaxed">{product.terroirNote}</p>
                </div>
                <div>
                  <p className="text-xs tracking-[0.3em] uppercase text-primary/70 mb-2">Aging Profile</p>
                  <p className="text-foreground/80 leading-relaxed">{product.agingProfile}</p>
                </div>
                <div>
                  <p className="text-xs tracking-[0.3em] uppercase text-primary/70 mb-2">Available Sizes</p>
                  <ul className="text-foreground/80 space-y-1">
                    {product.sizes.map((s) => (
                      <li key={s.label}>{s.label} — ${s.price}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-16 px-4 bg-secondary/40 border-t border-accent/20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-heading font-semibold text-center mb-10">From the Same Vintage</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {related.map((p) => (
                <ProductCard
                  key={p.slug}
                  slug={p.slug}
                  href={`/cellar/${p.slug}`}
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

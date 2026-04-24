import Image from "next/image"
import { getProductBySlug, getRelatedProducts } from "@/sites/unmotivators/data/products"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"
import { ClientProductCard } from "@/sites/unmotivators/components/client-product-card"

export default function ProductDetail({ slug }: { slug: string }) {
  const product = getProductBySlug(slug)
  if (!product) return null

  const related = getRelatedProducts(slug, 3)

  return (
    <>
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="relative aspect-square bg-secondary/40 border border-foreground/10">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
              fetchPriority="high"
            />
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-foreground/60 mb-3">
              SKU: {product.sku}
            </p>
            <h1 className="text-4xl font-heading font-bold uppercase tracking-tight text-foreground mb-2 leading-tight">
              {product.name}
            </h1>
            <p className="text-lg italic text-foreground/70 mb-6 leading-snug">{product.subtitle}</p>

            <div className="mb-8">
              {product.listPrice && product.listPrice > product.price && (
                <p className="text-sm text-foreground/50 line-through">
                  List price: ${product.listPrice.toFixed(2)}
                </p>
              )}
              <p className="text-3xl font-heading text-accent">{product.priceLabel}</p>
            </div>

            <div className="mb-8">
              <AddToCartButton
                slug={product.slug}
                productName={product.name}
                className="px-8 py-4 bg-accent text-[#F5F3EE] font-heading uppercase tracking-wide text-base hover:opacity-90 transition-opacity w-full sm:w-auto"
              />
            </div>

            {product.description.map((para, i) => (
              <p key={i} className="text-foreground/80 mb-4 leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-secondary/30 border-y border-foreground/10">
        <div className="max-w-md mx-auto">
          <div className="bg-background border border-foreground p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-foreground/60 mb-1">
              Spec Sheet
            </p>
            <h2 className="font-heading text-2xl uppercase tracking-tight text-foreground border-b-4 border-foreground pb-2 mb-4">
              Corporate Excuses
            </h2>
            <dl className="font-mono text-sm divide-y divide-foreground/20">
              {product.corporateExcuses.map((row) => (
                <div key={row.label} className="flex justify-between py-2 gap-4">
                  <dt className="text-foreground/60 uppercase text-xs tracking-wide">{row.label}</dt>
                  <dd className="text-foreground text-right">{row.value}</dd>
                </div>
              ))}
            </dl>
            <p className="text-xs text-foreground/40 mt-4 pt-3 border-t border-foreground/30">
              All specifications subject to revision in the next quarterly review.
            </p>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading text-2xl uppercase tracking-tight text-foreground text-center mb-8">
              Also Disappointing
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((p) => (
                <ClientProductCard
                  key={p.slug}
                  slug={p.slug}
                  name={p.name}
                  price={p.priceLabel}
                  tagline={p.subtitle}
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

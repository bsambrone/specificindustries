import Image from "next/image"
import { getProductBySlug, getRelatedProducts } from "@/sites/petjacks/data/products"
import { ProductCard } from "@/components/ui/product-card"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"
import LegalFooter from "@/sites/petjacks/components/legal-footer"

export default function ProductDetail({ slug }: { slug: string }) {
  const product = getProductBySlug(slug)
  if (!product) return null

  const related = getRelatedProducts(slug, 3)

  return (
    <>
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="relative aspect-square rounded-lg overflow-hidden bg-secondary/30">
            <Image src={product.image} alt={product.name} fill className="object-cover" priority fetchPriority="high" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-accent mb-2">
              {product.category === "jetpack" ? "Flagship Jetpack" : "Accessory"}
            </p>
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
            {product.description.map((para, i) => (
              <p key={i} className="text-foreground/70 mb-4 leading-relaxed">{para}</p>
            ))}
          </div>
        </div>
      </section>

      {product.specs.length > 0 && (
        <section className="py-10 px-4 bg-secondary/30">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">Specifications</h2>
            <dl className="grid grid-cols-2 gap-y-2 text-sm">
              {product.specs.map((spec) => (
                <div key={spec.label} className="contents">
                  <dt className="text-foreground/60 uppercase tracking-wider text-xs">{spec.label}</dt>
                  <dd className="text-foreground font-medium text-right">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {product.disclosures.length > 0 && (
        <section className="py-10 px-4">
          <div
            className="max-w-2xl mx-auto p-5 border border-foreground/10 rounded-lg"
            style={{ background: "#EFE7D9" }}
          >
            <p className="text-[10px] uppercase tracking-widest font-mono text-foreground/60 mb-3">Product-Specific Disclosures</p>
            <ul className="text-[11px] leading-snug font-mono text-foreground/80 space-y-2 list-disc pl-4">
              {product.disclosures.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-6">You may also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((r) => (
                <ProductCard
                  key={r.slug}
                  slug={r.slug}
                  name={r.name}
                  price={r.priceLabel}
                  tagline={r.tagline}
                  image={r.image}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <LegalFooter />
    </>
  )
}

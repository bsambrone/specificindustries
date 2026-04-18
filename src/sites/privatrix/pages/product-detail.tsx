import Image from "next/image"
import { getProductBySlug, getRelatedProducts } from "../data/products"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"
import { ConsultationButton } from "../components/ConsultationButton"
import { PrivatrixProductCard } from "../components/PrivatrixProductCard"
import { TrustBadgeStrip } from "../components/TrustBadgeStrip"

export default function PrivatrixProductDetail({ slug }: { slug: string }) {
  const product = getProductBySlug(slug)
  if (!product) return null

  const related = getRelatedProducts(slug, 3)
  const priceDisplay = product.priceLabel ?? "Contact Sales"
  const tierLabel = product.tier === "enterprise" ? "Enterprise" : "Self-Serve"
  const tierBadgeClass =
    product.tier === "enterprise"
      ? "bg-accent text-white"
      : "bg-secondary/10 text-secondary"

  return (
    <>
      {/* Product Hero */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="relative aspect-square rounded-lg overflow-hidden bg-primary/5">
            <Image src={product.image} alt={product.name} fill className="object-cover" priority fetchPriority="high" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-semibold ${tierBadgeClass}`}>
                {tierLabel}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-foreground/50">
                {product.category}
              </span>
            </div>
            <h1 className="text-4xl font-heading font-bold text-foreground mb-2">{product.name}</h1>
            <p className="text-lg text-foreground/60 mb-4">{product.tagline}</p>
            <p className="text-3xl font-bold text-primary mb-6">{priceDisplay}</p>
            <div className="mb-8">
              {product.tier === "self-serve" ? (
                <AddToCartButton
                  slug={product.slug}
                  productName={product.name}
                  className="px-8 py-4 bg-primary text-white rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity w-full sm:w-auto"
                />
              ) : (
                <ConsultationButton
                  productName={product.name}
                  className="px-8 py-4 bg-accent text-white rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity w-full sm:w-auto"
                />
              )}
            </div>
            {product.description.map((para, i) => (
              <p key={i} className="text-foreground/70 mb-4 leading-relaxed">{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 px-4 bg-primary/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-primary text-center mb-8">
            How It Works
          </h2>
          <ol className="space-y-4">
            {product.howItWorks.map((step, i) => (
              <li key={i} className="flex gap-4 items-start bg-white border border-primary/10 rounded-lg p-4">
                <span className="shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </span>
                <span className="text-foreground/80 leading-relaxed pt-1">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Compliance Badges */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-foreground/50 font-semibold mb-4">
            Certifications & Attestations
          </p>
          <TrustBadgeStrip badges={product.fakeBadges} />
          <p className="text-[11px] text-foreground/40 mt-6 italic">
            Certifications listed are self-attested by Privatrix and are not recognized by any independent regulatory body.
          </p>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-primary text-center mb-8">
            You May Also Want to Appear Compliant With
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((p) => (
              <PrivatrixProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

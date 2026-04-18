import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { GlossyProductHero } from "@/components/ui/glossy-product-hero"
import { GlossySpecSheet } from "@/components/ui/glossy-spec-sheet"
import { GlossyPricingGrid } from "@/components/ui/glossy-pricing-grid"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"
import {
  getProductBySlug,
  getProductsByFamily,
  FAMILY_LABELS,
} from "@/sites/superengineered/data/products"

interface Props {
  slug: string
}

export default function SuperengineeredProductDetail({ slug }: Props) {
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const subscriptionNote = product.subscription.required
    ? "Subscription required to operate."
    : "Optional upgrades available."

  const related = getProductsByFamily(product.family)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3)

  return (
    <>
      <GlossyProductHero
        name={product.name}
        tagline={product.tagline}
        image={product.heroImage}
        startingPrice={product.startingPrice}
        subscriptionNote={subscriptionNote}
      />

      {/* Add-to-cart band */}
      <section className="bg-background py-10 px-4 border-y border-primary/10">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-sm text-primary/60 uppercase tracking-widest mb-1">
              {FAMILY_LABELS[product.family]}
            </p>
            <p className="text-primary">
              Hardware from <span className="font-semibold">${product.startingPrice}</span>
            </p>
          </div>
          <AddToCartButton slug={product.slug} productName={product.name} />
        </div>
      </section>

      <GlossySpecSheet specs={product.specs} />

      <GlossyPricingGrid
        productName={product.name}
        tiers={product.subscription.tiers}
        footnotes={product.complianceFootnotes}
      />

      {related.length > 0 && (
        <section className="bg-background py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-heading font-light tracking-tight text-primary text-center mb-12">
              Also from the {FAMILY_LABELS[product.family]} line.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link key={r.slug} href={`/products/${r.slug}`} className="group">
                  <div className="relative w-full aspect-[4/3] bg-secondary rounded-2xl mb-4 overflow-hidden">
                    <Image
                      src={r.heroImage}
                      alt={r.name}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-contain p-6 group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <p className="font-heading text-xl text-primary">{r.name}</p>
                  <p className="text-sm text-primary/60 mt-1">{r.tagline}</p>
                  <p className="text-sm text-primary mt-2">From ${r.startingPrice}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

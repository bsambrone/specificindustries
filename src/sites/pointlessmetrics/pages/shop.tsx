import type { PageMetadata } from "@/themes"
import Link from "next/link"
import Image from "next/image"
import { products, getProductsByCategory } from "@/sites/pointlessmetrics/data/products"
import { shopCategories } from "@/sites/pointlessmetrics/data/categories"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"

export const metadata: PageMetadata = {
  title: "Shop — Institute for the Study of Pointless Metrics",
  description: "Twelve Institute-issued products across five categories: instruments, publications, advisory engagements, credentialing, and certified merchandise.",
}

export default function PointlessMetricsShop() {
  return (
    <main className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-secondary mb-2">Institute Store</p>
        <h1 className="font-heading text-4xl text-primary mb-2">All Products</h1>
        <p className="text-foreground/75 max-w-2xl mb-12">
          Twelve products, five categories. Every item is issued by the Institute and bears the seal. Availability and pricing reflect the current operating plan.
        </p>

        {shopCategories.map((cat) => {
          const catProducts = getProductsByCategory(cat.key)
          if (catProducts.length === 0) return null
          return (
            <section key={cat.key} id={cat.key} className="mb-16 scroll-mt-28">
              <div className="flex items-baseline gap-4 border-b border-accent/40 pb-3 mb-6">
                <h2 className="font-heading text-2xl text-primary">{cat.label}</h2>
                <p className="text-sm text-foreground/60 italic">{cat.blurb}</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {catProducts.map((p) => (
                  <article key={p.slug} className="bg-white border border-accent/40 rounded-sm overflow-hidden flex flex-col">
                    <Link href={`/products/${p.slug}`} className="block aspect-[4/3] relative bg-accent/10">
                      <Image src={p.image} alt={p.name} fill className="object-cover" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
                    </Link>
                    <div className="p-5 flex-1 flex flex-col">
                      <p className="text-[11px] uppercase tracking-wide text-foreground/50 mb-1">{p.designation}</p>
                      <h3 className="font-heading text-lg text-primary mb-1">
                        <Link href={`/products/${p.slug}`} className="hover:underline">{p.name}</Link>
                      </h3>
                      <p className="text-sm text-foreground/75 mb-4 flex-1">{p.tagline}</p>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-base font-semibold text-primary tabular-nums">{p.priceLabel}</span>
                        <AddToCartButton slug={p.slug} productName={p.name} className="px-4 py-2 bg-primary text-white rounded-sm text-sm font-semibold hover:opacity-90" quips={quipsForCategory(p.categoryKey)} />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )
        })}

        <p className="text-center text-xs text-foreground/60 italic mt-10">
          Total catalog: {products.length} products. Any item not shown is currently embargoed pending review.
        </p>
      </div>
    </main>
  )
}

function quipsForCategory(key: string): string[] {
  switch (key) {
    case "instruments":
      return ["Calibration card included.", "Ships in a velvet case.", "The seal is genuine.", "No returns after calibration."]
    case "publications":
      return ["A rigorous read.", "Cited by the Institute.", "Not reviewed externally.", "Delivery is notional."]
    case "advisory":
      return ["We will be in touch.", "An engagement letter follows.", "NDA will be drafted by us.", "Results are not actionable."]
    case "credentialing":
      return ["Welcome, candidate.", "Syllabus ships separately.", "Bronze pin included.", "Not accredited."]
    case "merchandise":
      return ["A durable memento.", "The r-value is assigned on shipment.", "Packaged without irony."]
    default:
      return []
  }
}

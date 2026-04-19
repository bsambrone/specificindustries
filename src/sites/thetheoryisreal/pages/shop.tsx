import type { PageMetadata } from "@/themes"
import { ProductCard } from "@/components/ui/product-card"
import { products } from "@/sites/thetheoryisreal/data/products"

export const metadata: PageMetadata = {
  title: "Shop — The Theory Is Real",
  description: "Field-tested gear. Ships in unmarked packaging.",
}

const TAG_LABELS: Record<string, string> = {
  chemtrails: "Atmospheric",
  illuminati: "Global Control",
  reptilian: "Reptilian",
  npc: "NPC Defense",
  "weaponized-tech": "Signal & Tech",
  classics: "Classics",
}

export default function Shop() {
  const grouped = Object.keys(TAG_LABELS).map((tag) => ({
    tag,
    items: products.filter((p) => p.conspiracyTag === tag),
  })).filter((g) => g.items.length > 0)

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <header className="mb-10">
        <p className="font-heading text-xs uppercase tracking-[0.3em] text-accent">OUTFITTER</p>
        <h1 className="mt-2 font-heading text-4xl text-primary">Shop</h1>
        <p className="mt-3 font-body text-base text-text/80">
          {products.length} items. Field-tested. Ships in unmarked packaging.
        </p>
      </header>
      {grouped.map(({ tag, items }) => (
        <section key={tag} className="mb-12">
          <h2 className="mb-4 font-heading text-sm uppercase tracking-[0.3em] text-accent">
            {TAG_LABELS[tag]}
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((p) => (
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
        </section>
      ))}
    </main>
  )
}

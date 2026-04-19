import { ProductCard } from "@/components/ui/product-card"
import { products, type ProductCuisine } from "../data/products"

export const metadata = {
  title: "Pouches — Prechewed™",
  description:
    "28 SKUs of Pre-Oral Hydrolysis™-prepared nutrition. The Daily Bolus, cuisine-coded pouches, and The Founder's Reserve.",
}

const CUISINE_ORDER: ProductCuisine[] = [
  "Flagship",
  "Breakfast",
  "Pasta & Italian",
  "Mains",
  "Asian",
  "Sandwiches",
  "Holiday & Occasion",
  "Limited",
]

export default async function PrechewedProducts() {
  const grouped = CUISINE_ORDER.map((cuisine) => ({
    cuisine,
    items: products.filter((p) => p.cuisine === cuisine),
  })).filter((g) => g.items.length > 0)

  return (
    <>
      {/* Page header */}
      <section
        className="py-16 px-4 text-center"
        style={{ background: "var(--color-secondary, #EDE9F8)" }}
      >
        <h1
          className="text-4xl md:text-5xl font-heading font-bold mb-4"
          style={{ color: "var(--color-primary, #5B3FD9)" }}
        >
          The Pouches
        </h1>
        <p
          className="text-lg max-w-2xl mx-auto"
          style={{ color: "var(--color-muted, #6C6A7D)" }}
        >
          28 SKUs of Pre-Oral Hydrolysis™-prepared nutrition. Cuisine-coded for
          discerning protocol adherents.
        </p>
      </section>

      {/* Cuisine sections */}
      <div className="py-12 px-4 space-y-16">
        {grouped.map(({ cuisine, items }) => (
          <section key={cuisine} className="max-w-6xl mx-auto">
            <div className="flex items-baseline gap-3 mb-8">
              <h2
                className="text-2xl font-heading font-bold"
                style={{ color: "var(--color-primary, #5B3FD9)" }}
              >
                {cuisine}
              </h2>
              <span
                className="text-sm font-mono uppercase tracking-widest"
                style={{ color: "var(--color-muted, #6C6A7D)" }}
              >
                {items.length} SKU{items.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((p) => (
                <ProductCard
                  key={p.slug}
                  slug={p.slug}
                  name={p.name}
                  price={p.priceLabel}
                  tagline={p.tagline}
                  image={p.image}
                  quips={p.cuisine === "Limited" ? ["Waitlist confirmed."] : undefined}
                  showAddToCart={!p.isLimited}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  )
}

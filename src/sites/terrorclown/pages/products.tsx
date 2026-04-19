import { ProductCard } from "@/components/ui/product-card"
import { products, CATEGORY_ORDER, type ProductCategory } from "../data/products"

export const metadata = {
  title: "The Catalog — The Pennywhistle Play Company",
  description:
    "Twenty hand-finished Pennywhistle products: Terror Clown™, the Haunted Headboard Bed, six curated Experiences, accessories, and bundles. Heirloom craftsmanship since 1948.",
}

const CATEGORY_DESCRIPTIONS: Record<ProductCategory, string> = {
  Flagship: "The Pennywhistle bedrock. The pieces every home should have.",
  Experience: "Complete staging environments. Each includes your Terror Clown™ companion.",
  Accessory: "Personalize, upgrade, and extend your Terror Clown™.",
  Bundle: "Curated collections. Savings over à la carte pricing.",
}

export default async function TerrorClownProducts() {
  const grouped = CATEGORY_ORDER.map((category) => ({
    category,
    items: products.filter((p) => p.category === category),
  })).filter((g) => g.items.length > 0)

  return (
    <>
      {/* Page header */}
      <section className="py-16 px-4 text-center" style={{ background: "var(--color-background, #F5EDE0)" }}>
        <div
          className="text-xs uppercase tracking-[0.3em] mb-3"
          style={{ color: "var(--color-secondary, #3E6C6E)" }}
        >
          The catalog
        </div>
        <h1
          className="text-4xl md:text-5xl font-heading font-semibold mb-4"
          style={{ color: "var(--color-text, #1F1A17)" }}
        >
          The Pennywhistle Collection
        </h1>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--color-text, #1F1A17)", opacity: 0.75 }}>
          Twenty-one hand-finished pieces, organized for the discerning household.
        </p>
      </section>

      {/* Category sections */}
      <div className="py-12 px-4 space-y-20">
        {grouped.map(({ category, items }) => (
          <section key={category} className="max-w-6xl mx-auto">
            <div className="mb-8 text-center">
              <h2
                className="text-3xl font-heading font-semibold mb-2"
                style={{ color: "var(--color-primary, #A8352A)" }}
              >
                {category}
              </h2>
              <p className="text-sm italic" style={{ color: "var(--color-text, #1F1A17)", opacity: 0.7 }}>
                {CATEGORY_DESCRIPTIONS[category]}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((p) => (
                <ProductCard
                  key={p.slug}
                  slug={p.slug}
                  name={p.name}
                  price={p.priceLabel}
                  tagline={p.tagline}
                  image={p.image}
                  href={`/products/${p.slug}`}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  )
}

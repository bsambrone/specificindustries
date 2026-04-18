import { CATEGORY_ORDER, CATEGORY_LABELS, CATEGORY_DESCRIPTIONS, getProductsByCategory } from "@/sites/meh/data/products"
import { ProductCard } from "@/components/ui/product-card"

export const metadata = {
  title: "The Catalog — Meh.",
  description: "Sixteen Emotionally Disappointing Gadgets™, arranged by the type of disappointment they reliably deliver.",
}

export default function MehProducts() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-16 max-w-2xl">
          <h1 className="text-5xl font-heading font-semibold text-primary mb-4">The Catalog</h1>
          <p className="text-foreground/80 leading-relaxed">
            Sixteen devices, arranged by the category of disappointment they reliably deliver. Every product on this page has been designed to let you down in a specific and repeatable way. We take this seriously.
          </p>
        </header>

        <div className="space-y-20">
          {CATEGORY_ORDER.map((cat) => {
            const list = getProductsByCategory(cat)
            return (
              <div key={cat}>
                <div className="border-t border-foreground/30 pt-8 mb-10">
                  <h2 className="text-3xl font-heading font-semibold text-primary mb-2">{CATEGORY_LABELS[cat]}</h2>
                  <p className="text-foreground/70 italic">{CATEGORY_DESCRIPTIONS[cat]}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                  {list.map((p) => (
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
            )
          })}
        </div>
      </div>
    </section>
  )
}

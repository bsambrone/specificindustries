import { ProductCard } from "@/components/ui/product-card"
import { products, quips } from "@/sites/elderparty/data/products"

export const metadata = {
  title: "Shop — The Elder Party",
  description: "Official Elder Party campaign merchandise. Yard signs, hats, robes, and more. Your commitment has been noted.",
}

export default function ShopPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-secondary text-foreground py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-primary mb-6 leading-tight">
            Official Merchandise
          </h1>
          <p className="text-xl text-foreground/70 leading-relaxed max-w-2xl mx-auto">
            Show your support with official Elder Party campaign gear. Every purchase funds
            the awakening and is recorded permanently in the Party ledger.
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.slug}
                slug={product.slug}
                name={product.name}
                price={product.priceLabel}
                tagline={product.tagline}
                image={product.image}
                quips={quips}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-6 px-4 bg-foreground/5 border-t border-foreground/10">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-foreground/40 text-center leading-relaxed">
            All purchases are final. The Elder Party does not accept returns, exchanges, or
            expressions of regret. Merchandise may arrive before your order is placed. This is not
            a shipping error. Products are produced by the Elder Party National Committee and are
            not affiliated with any terrestrial manufacturing standard.
          </p>
        </div>
      </section>
    </div>
  )
}

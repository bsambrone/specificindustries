import { Hero } from "@/components/ui/hero"
import { ProductCard } from "@/components/ui/product-card"
import { products } from "@/sites/snortables/data/products"

export const metadata = {
  title: "Products — Snortables",
  description: "Browse our full catalog of intranasal nutrient delivery products.",
}

export default function SnortablesProducts() {
  return (
    <>
      <Hero
        headline="Our Products"
        subheadline="12 meticulously pulverized options for every nostril."
        dark
      />
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.slug}
              slug={product.slug}
              name={product.name}
              price={product.priceLabel}
              tagline={product.tagline}
              image={product.image}
            />
          ))}
        </div>
      </section>
    </>
  )
}

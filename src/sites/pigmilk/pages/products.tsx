import { Hero } from "@/components/ui/hero"
import { ProductCard } from "@/components/ui/product-card"
import { products } from "@/sites/pigmilk/data/products"

export const metadata = {
  title: "Products — Pig Milk Co.",
  description: "Browse our selection of premium pig milk products.",
}

export default function PigMilkProducts() {
  return (
    <>
      <Hero
        headline="Our Products"
        subheadline="Responsibly sourced. Questionably consumed."
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

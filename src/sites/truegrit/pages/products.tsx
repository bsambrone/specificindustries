import { Hero } from "@/components/ui/hero"
import { ProductCard } from "@/components/ui/product-card"
import { products, quips } from "@/sites/truegrit/data/products"

export const metadata = {
  title: "Products — True Grit Personal Care",
  description: "Browse our full range of industrial-grade personal cleansing products.",
}

export default function TrueGritProducts() {
  return (
    <>
      <Hero
        headline="Our Products"
        subheadline="Engineered for thoroughness. Not for comfort."
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
              quips={quips}
            />
          ))}
        </div>
      </section>
    </>
  )
}

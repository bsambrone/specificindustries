import { Hero } from "@/components/ui/hero"
import { ProductCard } from "@/components/ui/product-card"
import { products } from "@/sites/dehydratedwater/data/products"

export const metadata = {
  title: "Products — Dehydrated Water Co.",
  description: "Browse our collection of premium dehydrated water products.",
}

export default function DehydratedWaterProducts() {
  return (
    <>
      <Hero
        headline="The Collection"
        subheadline="Purveyors of fine powdered hydration since 1847. Each product crafted with the same care and absence of moisture."
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

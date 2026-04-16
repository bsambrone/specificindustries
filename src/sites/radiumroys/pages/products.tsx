import { Hero } from "@/components/ui/hero"
import { ProductCard } from "@/components/ui/product-card"
import { products } from "@/sites/radiumroys/data/products"

export const metadata = {
  title: "The Radium Roy's Catalog — Better Living Through American Ingenuity",
  description: "Browse our complete line of wholesome American consumer goods, from Asbesto-Crisps to the Tan-O-Matic 9000.",
}

const addToCartQuips = [
  "A wonderful choice, friend!",
  "Roy himself would have ordered this.",
  "Added! Your home is about to feel a lot more wholesome.",
  "Splendid! Tomorrow's pantry, today.",
  "What a delight. Shipping in two to three business decades.",
  "Excellent. Roy is smiling somewhere.",
]

export default function RadiumRoysProducts() {
  return (
    <>
      <Hero
        headline="The Radium Roy's Catalog"
        subheadline="Fifteen wholesome American products for the modern family. From our laboratories to your home."
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
              quips={addToCartQuips}
            />
          ))}
        </div>
      </section>
    </>
  )
}

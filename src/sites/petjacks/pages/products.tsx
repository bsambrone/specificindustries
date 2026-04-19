import { ProductCard } from "@/components/ui/product-card"
import { products } from "@/sites/petjacks/data/products"
import LegalFooter from "@/sites/petjacks/components/legal-footer"

export const metadata = {
  title: "Products — Petjacks",
  description: "Flagship jetpacks and accessories for cats, dogs, rabbits, and fish.",
}

export default function PetjacksProducts() {
  const flagships = products.filter((p) => p.category === "jetpack")
  const accessories = products.filter((p) => p.category === "accessory")

  return (
    <>
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-heading font-bold text-primary mb-2">The Petjacks Lineup</h1>
          <p className="text-lg text-foreground/70 mb-12">Four flagships, each tuned to a species. Plus every accessory your family will need along the way.</p>

          <h2 className="text-2xl font-heading font-semibold text-foreground mb-6">Flagship Jetpacks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {flagships.map((product) => (
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

          <h2 className="text-2xl font-heading font-semibold text-foreground mb-6">Accessories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {accessories.map((product) => (
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
        </div>
      </section>

      <LegalFooter />
    </>
  )
}

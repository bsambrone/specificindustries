import { Hero } from "@/components/ui/hero"
import { CatalogProductCard } from "@/sites/boomfun/components/catalog-product-card"
import { products } from "@/sites/boomfun/data/products"

export const metadata = {
  title: "The Boom-Fun! Catalog — 1961 Edition",
  description: "The complete Boom-Fun! product line: Glitter Claymore, Junior Dynamite Fishing Kit, Mailbox Greeting Firecracker, Tree-Stump Remover, and more. Ships from Toledo, OH.",
}

export default function BoomfunProducts() {
  return (
    <>
      <Hero
        headline="THE 1961 CATALOG"
        subheadline="Eight extraordinary products. Every one a Boom-Fun! original. Every one personally inspected by Sparky."
      />

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <p className="italic text-foreground/70 leading-relaxed">
              Welcome, friend. Below you&apos;ll find every product currently offered by Boom-Fun! Industries,
              arranged by item number. All prices are in U.S. dollars and include shipping anywhere in the
              forty-eight contiguous states. Orders ship from our Toledo, Ohio facility within twelve
              business days, or sooner if Harland is in the mood.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <CatalogProductCard
                key={product.slug}
                slug={product.slug}
                itemNumber={product.itemNumber}
                stockNumber={product.stockNumber}
                name={product.name}
                tagline={product.tagline}
                price={product.priceLabel}
                image={product.image}
                badge={product.badge}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

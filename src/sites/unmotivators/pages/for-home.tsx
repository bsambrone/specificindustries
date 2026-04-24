import { getProductsByCategory } from "@/sites/unmotivators/data/products"
import { ClientProductCard } from "@/sites/unmotivators/components/client-product-card"

export const metadata = {
  title: "For Home — Unmotivators Inc.",
  description: "Because when you go home, the disappointment follows you. Bring it along, displayed.",
}

export default function UnmotivatorsForHome() {
  const products = getProductsByCategory("home")

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <p className="font-mono text-xs uppercase tracking-widest text-foreground/60 mb-3">
            Catalog / Home
          </p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold uppercase tracking-tight text-foreground mb-3">
            For Home
          </h1>
          <p className="text-foreground/70 max-w-2xl">
            The office follows you home. It always has. Unmotivators Inc. offers a small selection of household goods for the part of the day between shifts &mdash; because the wall above the couch should also be honest about things.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <ClientProductCard
              key={p.slug}
              slug={p.slug}
              name={p.name}
              price={p.priceLabel}
              tagline={p.subtitle}
              image={p.image}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

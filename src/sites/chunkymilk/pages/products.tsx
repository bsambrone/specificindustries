import { Hero } from "@/components/ui/hero"
import { ProductCard } from "@/components/ui/product-card"
import { getProductsByCategory } from "@/sites/chunkymilk/data/products"

export const metadata = {
  title: "The Cellar — Whitford Family Chunky Milk",
  description: "The full line: graded chunks, the Cottage Pour, accessories for those who chunk at home, and gift sets.",
}

const sections = [
  {
    key: "milk" as const,
    title: "The Chunk-Graded Line",
    blurb: "Six grades, drawn from four fields. Rested as long as the milk requires.",
  },
  {
    key: "specialty" as const,
    title: "Specialty Line",
    blurb: "One pour. Unlike anything else on this page. You'll know it when you see it.",
  },
  {
    key: "accessories" as const,
    title: "For Those Who Chunk At Home",
    blurb: "The tools your people used. The tools we still use.",
  },
  {
    key: "gifts" as const,
    title: "Gift Sets",
    blurb: "For the newcomer, the household, and the one to whom the hollow owes something.",
  },
]

export default function ChunkyMilkProducts() {
  return (
    <>
      <Hero
        headline="The Cellar"
        subheadline="Browse the line. Some rest longer than others. None of us are in a hurry."
      />
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto space-y-20">
          {sections.map(({ key, title, blurb }) => {
            const items = getProductsByCategory(key)
            if (items.length === 0) return null
            return (
              <div key={key}>
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-heading font-bold text-primary mb-2">{title}</h2>
                  <p className="text-foreground/60">{blurb}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {items.map((product) => (
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
            )
          })}
        </div>
      </section>
    </>
  )
}

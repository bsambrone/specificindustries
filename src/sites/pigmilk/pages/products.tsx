import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Products — Pig Milk Co.",
  description: "Browse our selection of premium pig milk products.",
}

export default function PigMilkProducts() {
  const products = [
    {
      name: "Classic Pig Milk",
      description: "Our original formula. Straight from pig to carton.",
      price: "$12.99 / gallon",
    },
    {
      name: "Chocolate Pig Milk",
      description: "For when regular pig milk just isn't adventurous enough.",
      price: "$14.99 / gallon",
    },
    {
      name: "Pig Milk Cheese",
      description: "Aged 6 months. We aged it, not the pig.",
      price: "$24.99 / wheel",
    },
  ]

  return (
    <>
      <Hero
        headline="Our Products"
        subheadline="Responsibly sourced. Questionably consumed."
      />
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.name}
              className="border border-primary/10 rounded-lg p-6 text-center"
            >
              <h3 className="text-xl font-heading font-semibold text-primary mb-2">
                {product.name}
              </h3>
              <p className="text-foreground/70 mb-4">{product.description}</p>
              <p className="text-lg font-semibold text-accent">{product.price}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

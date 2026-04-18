import Link from "next/link"
import Image from "next/image"
import { getProductBySlug } from "../data/products"

interface AccessoryCompatibilityRowProps {
  accessorySlugs: string[]
  title?: string
}

export function AccessoryCompatibilityRow({
  accessorySlugs,
  title = "Compatible Accessories",
}: AccessoryCompatibilityRowProps) {
  const accessories = accessorySlugs
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => !!p)

  if (accessories.length === 0) return null

  return (
    <section className="py-12 px-4 bg-background border-y border-foreground/10">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs tracking-[0.3em] uppercase text-primary mb-6 font-heading">{title}</p>
        <div className="flex flex-wrap gap-3">
          {accessories.map((a) => (
            <Link
              key={a.slug}
              href={`/products/${a.slug}`}
              className="group flex items-center gap-3 bg-secondary/5 hover:bg-secondary/10 border border-foreground/15 px-3 py-2 transition-colors"
            >
              <div className="relative w-10 h-10 flex-shrink-0 bg-background">
                <Image
                  src={a.heroImage}
                  alt={a.name}
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-medium tracking-tight group-hover:text-primary transition-colors">
                {a.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

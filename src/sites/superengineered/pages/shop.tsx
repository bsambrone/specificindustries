import Link from "next/link"
import Image from "next/image"
import type { PageMetadata } from "@/themes"
import {
  products,
  getProductsByFamily,
  FAMILY_LABELS,
  type ProductFamily,
} from "@/sites/superengineered/data/products"

export const metadata: PageMetadata = {
  title: "Shop — Super Engineered",
  description: "Every Super Engineered product. Every subscription. In one place.",
}

const FLAGSHIP_ORDER: ProductFamily[] = ["toothbrush", "doorknob", "lightswitch", "spoon"]

function ProductTile({ slug, name, tagline, heroImage, startingPrice }: (typeof products)[number]) {
  return (
    <Link href={`/products/${slug}`} className="group">
      <div className="relative w-full aspect-square bg-secondary rounded-2xl mb-4 overflow-hidden">
        <Image
          src={heroImage}
          alt={name}
          fill
          sizes="(min-width: 768px) 25vw, 50vw"
          className="object-contain p-6 group-hover:scale-105 transition-transform"
        />
      </div>
      <p className="font-heading text-lg text-primary">{name}</p>
      <p className="text-sm text-primary/60 mt-1 line-clamp-1">{tagline}</p>
      <p className="text-sm text-primary mt-2">From ${startingPrice}</p>
    </Link>
  )
}

export default function SuperEngineeredShop() {
  return (
    <main className="bg-background">
      <section className="py-20 px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-heading font-light tracking-tight text-primary mb-4">
          Shop.
        </h1>
        <p className="text-xl text-primary/60 max-w-2xl mx-auto">
          Every Super Engineered device. Every subscription. Priced per month, priced per principle.
        </p>
      </section>

      {FLAGSHIP_ORDER.map((family) => {
        const family_products = getProductsByFamily(family)
        return (
          <section key={family} className="py-16 px-4 border-t border-primary/10">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-sm font-medium uppercase tracking-widest text-primary/60 mb-2">
                {FAMILY_LABELS[family]}
              </h2>
              <p className="text-3xl md:text-4xl font-heading font-light text-primary mb-10">
                The {FAMILY_LABELS[family].toLowerCase()}, across three tiers.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {family_products.map((p) => (
                  <ProductTile key={p.slug} {...p} />
                ))}
              </div>
            </div>
          </section>
        )
      })}

      <section className="py-16 px-4 border-t border-primary/10 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-sm font-medium uppercase tracking-widest text-primary/60 mb-2">
            Accessories
          </h2>
          <p className="text-3xl md:text-4xl font-heading font-light text-primary mb-10">
            Also from Super Engineered.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {getProductsByFamily("accessory").map((p) => (
              <ProductTile key={p.slug} {...p} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

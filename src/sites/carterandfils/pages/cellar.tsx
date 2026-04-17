"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"
import { useSiteLink } from "@/hooks/use-site-link"
import {
  products,
  CATEGORY_LABELS,
  type Product,
  type ProductCategory,
} from "@/sites/carterandfils/data/products"

type Filter = "all" | ProductCategory

const categoryOrder: Filter[] = ["all", "red", "white", "rose", "sparkling", "dessert", "vinho-verde"]

export const metadata = {
  title: "The Cellar — Domaine Carter & Fils",
  description: "Our full portfolio of reds, whites, rosés, sparkling, dessert, and vinho verde.",
}

function ProductCardClient({ product }: { product: Product }) {
  const siteHref = useSiteLink()
  const href = siteHref(`/cellar/${product.slug}`)

  return (
    <div className="border border-accent/30 overflow-hidden hover:border-primary/50 transition-colors bg-secondary/30">
      <Link href={href}>
        <div className="relative aspect-square bg-secondary/40">
          <Image src={product.image} alt={product.name} fill className="object-contain p-8" />
        </div>
      </Link>
      <div className="p-5">
        <Link href={href}>
          <h3 className="text-lg font-heading font-semibold text-foreground mb-1 leading-snug">{product.name}</h3>
        </Link>
        <p className="text-sm italic text-foreground/70 mb-3">{product.tagline}</p>
        <p className="text-lg font-heading text-primary mb-4">{product.priceLabel}</p>
        <AddToCartButton slug={product.slug} productName={product.name} />
      </div>
    </div>
  )
}

export default function CarterAndFilsCellar() {
  const [filter, setFilter] = useState<Filter>("all")
  const filtered = filter === "all" ? products : products.filter((p) => p.category === filter)

  return (
    <>
      <Hero
        headline="The Cellar"
        subheadline="A complete portfolio of the estate's current releases."
      />
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categoryOrder.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 text-sm tracking-widest uppercase border-2 transition-colors ${
                  filter === cat
                    ? "bg-primary text-secondary border-primary"
                    : "border-primary/30 text-primary hover:border-primary"
                }`}
              >
                {cat === "all" ? "All" : CATEGORY_LABELS[cat as ProductCategory]}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((product) => (
              <ProductCardClient key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

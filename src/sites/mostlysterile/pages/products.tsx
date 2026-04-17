"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"
import { useSiteLink } from "@/hooks/use-site-link"
import { products, categories, type Product, type ProductCategory } from "@/sites/mostlysterile/data/products"

const addToCartQuips = [
  "Noted. Your order has been queued for processing where applicable.",
  "Added. A handling advisory will be provided at checkout.",
  "Received. Shipping will commence from a location we are advised not to disclose.",
  "Confirmed. Sterility of this item was verified earlier today.",
  "Added. Please do not hesitate to reach us with questions we will decline to answer.",
]

type Filter = "all" | ProductCategory

export const metadata = {
  title: "Catalog — Mostlysterile",
  description: "Browse our full catalog of surgical instruments, bandages, PPE, diagnostics, pharmaceuticals, and hospital surplus.",
}

function ProductCardClient({ product }: { product: Product }) {
  const siteHref = useSiteLink()
  const href = siteHref(`/products/${product.slug}`)

  return (
    <div className="border border-primary/10 rounded-lg overflow-hidden hover:border-primary/30 transition-colors">
      <Link href={href}>
        <div className="relative aspect-square bg-secondary/10">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
        </div>
      </Link>
      <div className="p-4 text-center">
        <Link href={href}>
          <h3 className="text-lg font-heading font-semibold text-primary mb-1">{product.name}</h3>
        </Link>
        <p className="text-sm text-foreground/60 mb-2">{product.tagline}</p>
        <p className="text-lg font-semibold text-accent mb-3">{product.priceLabel}</p>
        <AddToCartButton slug={product.slug} productName={product.name} quips={addToCartQuips} />
      </div>
    </div>
  )
}

export default function MostlysterileProducts() {
  const [filter, setFilter] = useState<Filter>("all")
  const filtered = filter === "all" ? products : products.filter((p) => p.category === filter)

  const chipBase = "px-4 py-2 text-sm font-semibold uppercase tracking-wide border transition-colors"
  const chipActive = "bg-primary text-background border-primary"
  const chipInactive = "bg-background text-primary border-primary/30 hover:border-primary"

  return (
    <>
      <Hero
        headline="The Mostlysterile Catalog"
        subheadline="Sixteen products spanning six categories of institutional medical supply. Browse at your leisure."
      />

      <section className="py-6 px-4 border-y border-primary/10 bg-secondary/10">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-2 justify-center">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`${chipBase} ${filter === "all" ? chipActive : chipInactive}`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => setFilter(cat.slug)}
              className={`${chipBase} ${filter === cat.slug ? chipActive : chipInactive}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <p className="text-center text-foreground/60 italic py-12">
              No products in this category. This is unusual. Please try another category, or refresh the page, or accept this outcome.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((product) => (
                <ProductCardClient key={product.slug} product={product} />
              ))}
            </div>
          )}

          <p className="mt-12 text-center text-xs text-foreground/50 italic">
            *Product listings may be updated at any time without notice. Prices reflect current availability and may reflect prior availability.
          </p>
        </div>
      </section>
    </>
  )
}

"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"
import { products, CATEGORY_LABELS, type ProductCategory } from "../data/products"

export const metadata = {
  title: "Products — Seel-Tite Containment Systems",
  description: "The G1 Containment Gasket and ten modular accessories. Core. Disposal. Ancillary.",
}

type FilterKey = "all" | ProductCategory

export default function SeeltiteProducts() {
  const [filter, setFilter] = useState<FilterKey>("all")
  const filtered = filter === "all" ? products : products.filter((p) => p.category === filter)

  const filters: { key: FilterKey; label: string }[] = [
    { key: "all", label: "All" },
    { key: "core", label: "Core" },
    { key: "disposal", label: "Disposal" },
    { key: "ancillary", label: "Ancillary" },
  ]

  return (
    <>
      <Hero
        headline="The Catalog"
        subheadline="Eleven engineered products. One output port. Every scenario."
      />
      <section className="py-8 px-4 border-b border-foreground/10 bg-background">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-2 justify-center">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 text-xs tracking-[0.3em] uppercase font-heading border transition-colors ${
                filter === f.key
                  ? "bg-secondary text-background border-secondary"
                  : "bg-background text-foreground border-foreground/30 hover:border-primary"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <article key={p.slug} className="border border-foreground/15 bg-background flex flex-col group hover:border-primary transition-colors">
              <Link href={`/products/${p.slug}`} className="block relative aspect-square bg-secondary/5 overflow-hidden">
                <Image src={p.heroImage} alt={p.name} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-contain p-8" />
              </Link>
              <div className="p-5 flex flex-col gap-3 flex-1">
                <p className="text-xs tracking-[0.3em] uppercase text-primary">{CATEGORY_LABELS[p.category]}</p>
                <h3 className="text-xl font-heading font-semibold">{p.name}</h3>
                <p className="text-sm text-foreground/70 flex-1">{p.tagline}</p>
                <div className="flex items-center justify-between pt-3 border-t border-foreground/10">
                  <span className="text-xl font-heading font-semibold">${p.price.toFixed(2)}</span>
                  <AddToCartButton slug={p.slug} productName={p.name} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

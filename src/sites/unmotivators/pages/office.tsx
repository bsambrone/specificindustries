"use client"

import { useState } from "react"
import {
  getProductsByCategory,
  officeProductTypes,
  productTypeLabels,
  type Product,
  type ProductType,
} from "@/sites/unmotivators/data/products"
import { ClientProductCard } from "@/sites/unmotivators/components/client-product-card"

export const metadata = {
  title: "For the Office — Unmotivators Inc.",
  description: "Posters, mugs, plaques, paper goods, awards, desk toys, and office supplies for the workplace that is what it is.",
}

type Filter = "all" | ProductType

export default function UnmotivatorsOffice() {
  const [filter, setFilter] = useState<Filter>("all")
  const allOffice = getProductsByCategory("office")
  const filtered: Product[] =
    filter === "all" ? allOffice : allOffice.filter((p) => p.productType === filter)

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <p className="font-mono text-xs uppercase tracking-widest text-foreground/60 mb-3">
            Catalog / Office
          </p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold uppercase tracking-tight text-foreground mb-3">
            For the Office
          </h1>
          <p className="text-foreground/70 max-w-2xl">
            The workplace is what it is. These products do not pretend otherwise.
          </p>
        </header>

        {/* Filter chips */}
        <div className="mb-10 flex flex-wrap gap-2">
          <FilterChip label="All" active={filter === "all"} onClick={() => setFilter("all")} />
          {officeProductTypes.map((type) => (
            <FilterChip
              key={type}
              label={productTypeLabels[type]}
              active={filter === type}
              onClick={() => setFilter(type)}
            />
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
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

        {filtered.length === 0 && (
          <p className="text-center text-foreground/60 py-20">No products in this category.</p>
        )}
      </div>
    </section>
  )
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 font-heading text-sm uppercase tracking-wide border transition-colors ${
        active
          ? "bg-foreground text-[#F5F3EE] border-foreground"
          : "bg-transparent text-foreground border-foreground/30 hover:border-foreground"
      }`}
    >
      {label}
    </button>
  )
}

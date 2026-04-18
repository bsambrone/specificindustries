"use client"

import { useState } from "react"
import { Hero } from "@/components/ui/hero"
import { ProductCard } from "@/components/ui/product-card"
import { treatments, CATEGORY_LABELS, type TreatmentCategory } from "@/sites/sovereignwellness/data/treatments"

type Filter = "all" | TreatmentCategory

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All Protocols" },
  { key: "ancestral", label: CATEGORY_LABELS.ancestral },
  { key: "suppressed", label: CATEGORY_LABELS.suppressed },
  { key: "restricted", label: CATEGORY_LABELS.restricted },
]

export const metadata = {
  title: "The Protocols — Sovereign Wellness Co.",
  description: "Sixteen Protocols for conditions the medical establishment has declined to acknowledge. Filter by Ancestral, Suppressed, or Restricted.",
}

export default function SovereignWellnessTreatments() {
  const [filter, setFilter] = useState<Filter>("all")
  const visible = filter === "all" ? treatments : treatments.filter((t) => t.category === filter)

  return (
    <>
      <Hero
        headline="The Protocols"
        subheadline="Sixteen remedies, restored from the Archive. Each bears a lot number. Each is waitlisted. Supply is restricted per standing inquiry."
      />

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-5 py-2 text-xs tracking-[0.3em] uppercase border-2 transition-colors ${
                  filter === f.key
                    ? "bg-primary text-secondary border-primary"
                    : "border-primary/30 text-primary hover:border-primary"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {visible.map((t) => (
              <ProductCard
                key={t.slug}
                slug={t.slug}
                href={`/treatments/${t.slug}`}
                name={t.name}
                price={t.priceLabel}
                tagline={t.tagline}
                image={t.image}
              />
            ))}
          </div>

          {visible.length === 0 && (
            <p className="text-center text-foreground/60 py-16 font-heading italic">No Protocols in this classification.</p>
          )}
        </div>
      </section>
    </>
  )
}

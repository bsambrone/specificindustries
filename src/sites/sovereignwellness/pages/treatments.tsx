"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { useSiteLink } from "@/hooks/use-site-link"
import { treatments, CATEGORY_LABELS, type Treatment, type TreatmentCategory } from "@/sites/sovereignwellness/data/treatments"

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

function TreatmentCard({ treatment }: { treatment: Treatment }) {
  const siteHref = useSiteLink()
  const href = siteHref(`/treatments/${treatment.slug}`)

  return (
    <Link href={href} className="group block border border-primary/20 bg-secondary/40 overflow-hidden hover:border-primary/60 transition-colors">
      <div className="relative aspect-square bg-accent/10">
        <Image src={treatment.image} alt={treatment.name} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover group-hover:opacity-90 transition-opacity" />
      </div>
      <div className="p-4">
        <p className="text-[10px] tracking-[0.3em] uppercase text-primary/70 mb-2">{CATEGORY_LABELS[treatment.category]}</p>
        <h3 className="font-heading text-lg font-semibold leading-tight mb-2 group-hover:text-primary transition-colors">{treatment.name}</h3>
        <p className="text-sm italic text-foreground/60 mb-3 leading-snug">{treatment.tagline}</p>
        <p className="text-lg font-heading">{treatment.priceLabel}</p>
      </div>
    </Link>
  )
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
              <TreatmentCard key={t.slug} treatment={t} />
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

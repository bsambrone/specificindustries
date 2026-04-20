"use client"

import Image from "next/image"
import { useMemo, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { verticals, verticalOrder } from "../data/verticals"
import type { VerticalKey } from "@/themes"
import type { PortfolioBrandDTO } from "./portfolio"

type SortKey = "a-z" | "featured"

interface Props {
  brands: PortfolioBrandDTO[]
}

function PortfolioExplorerBody({ brands }: Props) {
  const searchParams = useSearchParams()
  const verticalParam = searchParams.get("vertical") as VerticalKey | null

  const [activeVertical, setActiveVertical] = useState<VerticalKey | null>(
    verticalParam && verticalOrder.includes(verticalParam) ? verticalParam : null
  )
  const [sort, setSort] = useState<SortKey>("a-z")

  const visibleBrands = useMemo<PortfolioBrandDTO[]>(() => {
    const filtered = activeVertical
      ? brands.filter((b) => b.verticalKey === activeVertical)
      : brands
    const copy = [...filtered]
    if (sort === "featured") {
      copy.sort((a, b) => {
        if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1
        return a.name.localeCompare(b.name)
      })
    } else {
      copy.sort((a, b) => a.name.localeCompare(b.name))
    }
    return copy
  }, [brands, activeVertical, sort])

  const grouped = useMemo(() => {
    const map: Record<VerticalKey, PortfolioBrandDTO[]> = {
      "food-beverage": [],
      "consumer-household": [],
      "hygiene-wellness": [],
      "pets-specialty": [],
      "media-platforms": [],
      "professional-tech": [],
    }
    for (const brand of visibleBrands) {
      const key = brand.verticalKey as VerticalKey
      if (key in map) map[key].push(brand)
    }
    return map
  }, [visibleBrands])

  return (
    <>
      <section className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-foreground/10 py-3">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveVertical(null)}
            className={
              activeVertical === null
                ? "px-3 py-1.5 rounded-full text-xs font-heading uppercase tracking-wider bg-primary text-background"
                : "px-3 py-1.5 rounded-full text-xs font-heading uppercase tracking-wider border border-foreground/20 text-foreground/70 hover:border-foreground/40"
            }
          >
            All
          </button>
          {verticalOrder.map((key) => (
            <button
              key={key}
              onClick={() => setActiveVertical(key)}
              className={
                activeVertical === key
                  ? "px-3 py-1.5 rounded-full text-xs font-heading uppercase tracking-wider bg-primary text-background"
                  : "px-3 py-1.5 rounded-full text-xs font-heading uppercase tracking-wider border border-foreground/20 text-foreground/70 hover:border-foreground/40"
              }
            >
              {verticals[key].displayName}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2">
            <label className="text-xs font-heading uppercase tracking-wider text-foreground/50">Sort</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="text-xs font-heading uppercase tracking-wider bg-background border border-foreground/20 rounded px-2 py-1"
            >
              <option value="a-z">A–Z</option>
              <option value="featured">Featured First</option>
            </select>
          </div>
        </div>
      </section>

      {activeVertical === null ? (
        <div className="py-8">
          {verticalOrder.map((key) => {
            const bs = grouped[key]
            if (bs.length === 0) return null
            const meta = verticals[key]
            return (
              <section key={key} className="py-10">
                <div className="max-w-6xl mx-auto px-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary">
                      {meta.displayName}
                    </h2>
                    <span className="text-xs uppercase tracking-[0.15em] text-foreground/50 font-heading">
                      {bs.length} {bs.length === 1 ? "brand" : "brands"}
                    </span>
                  </div>
                  <p className="text-foreground/70 leading-relaxed max-w-3xl mb-2">
                    {meta.shortDescription}
                  </p>
                  <p className="text-xs italic text-foreground/50 mb-6 max-w-3xl">
                    Thesis: {meta.thesis}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {bs.map((brand) => (
                      <BrandCardDto key={brand.subdomain} brand={brand} />
                    ))}
                  </div>
                </div>
              </section>
            )
          })}
        </div>
      ) : (
        <section className="py-10">
          <div className="max-w-6xl mx-auto px-4">
            <p className="text-foreground/70 leading-relaxed max-w-3xl mb-6">
              {verticals[activeVertical].shortDescription}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {visibleBrands.map((brand) => (
                <BrandCardDto key={brand.subdomain} brand={brand} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

function BrandCardDto({ brand }: { brand: PortfolioBrandDTO }) {
  return (
    <a
      href={brand.href}
      className="group flex items-start gap-3 p-4 rounded-lg border border-primary/10 bg-background hover:border-primary/30 transition-colors h-full"
      style={{ borderTopColor: brand.accentColor, borderTopWidth: "3px" }}
    >
      <div className="relative w-10 h-10 flex-shrink-0">
        <Image
          src={brand.faviconSrc}
          alt={`${brand.name} logo`}
          fill
          sizes="40px"
          className="object-contain"
        />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-base font-heading font-semibold text-primary mb-1 leading-tight">
          {brand.name}
        </h3>
        <p className="text-xs text-foreground/60 leading-snug">
          {brand.tagline}
        </p>
      </div>
    </a>
  )
}

export function PortfolioExplorer({ brands }: Props) {
  return (
    <Suspense fallback={null}>
      <PortfolioExplorerBody brands={brands} />
    </Suspense>
  )
}

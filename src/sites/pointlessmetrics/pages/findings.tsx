"use client"

import { useState, useMemo } from "react"
import { findings } from "@/sites/pointlessmetrics/data/findings"
import type { FindingCategoryKey } from "@/sites/pointlessmetrics/data/categories"
import { findingCategories } from "@/sites/pointlessmetrics/data/categories"
import { FindingCard } from "@/components/ui/pointlessmetrics/FindingCard"
import { CategoryChip } from "@/components/ui/pointlessmetrics/CategoryChip"

type SortKey = "recent" | "highest-r" | "largest-n" | "most-cited"

export default function PointlessMetricsFindings() {
  const [category, setCategory] = useState<"all" | FindingCategoryKey>("all")
  const [sort, setSort] = useState<SortKey>("recent")

  const visible = useMemo(() => {
    const filtered = category === "all" ? findings.slice() : findings.filter((f) => f.category === category)
    switch (sort) {
      case "recent":
        return filtered.sort((a, b) => b.publishedDate.localeCompare(a.publishedDate))
      case "highest-r":
        return filtered.sort((a, b) => Math.abs(b.rValue) - Math.abs(a.rValue))
      case "largest-n":
        return filtered.sort((a, b) => b.sampleSize - a.sampleSize)
      case "most-cited":
        return filtered.sort((a, b) => b.citedByProducts.length - a.citedByProducts.length)
      default:
        return filtered
    }
  }, [category, sort])

  return (
    <main className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-secondary mb-2">Research</p>
        <h1 className="font-heading text-4xl text-primary mb-2">Findings Archive</h1>
        <p className="text-foreground/75 max-w-3xl mb-8">
          The Institute&apos;s peer-reviewed findings, in full. All {findings.length} entries. Use the filters to navigate by category, r-value, sample size, or citation frequency.
        </p>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-y border-accent/40 py-4 mb-8">
          <div className="flex flex-wrap gap-2">
            <CategoryChip label="All" active={category === "all"} onClick={() => setCategory("all")} />
            {findingCategories.map((c) => (
              <CategoryChip key={c.key} label={c.label} active={category === c.key} onClick={() => setCategory(c.key)} />
            ))}
          </div>
          <label className="flex items-center gap-2 text-sm">
            <span className="text-foreground/70">Sort by</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="bg-white border border-accent/40 rounded-sm px-2 py-1 text-sm"
            >
              <option value="recent">Most recent</option>
              <option value="highest-r">Highest |r|</option>
              <option value="largest-n">Largest n</option>
              <option value="most-cited">Most cited</option>
            </select>
          </label>
        </div>

        <p className="text-xs text-foreground/60 mb-4 tabular-nums">Showing {visible.length} of {findings.length} findings.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((f) => (
            <FindingCard key={f.slug} finding={f} />
          ))}
        </div>
      </div>
    </main>
  )
}

"use client"

import { whitepapers } from "@/sites/strategicvoid/data/whitepapers"
import { getSolutionBySlug } from "@/sites/strategicvoid/data/solutions"
import { WhitepaperCard } from "@/components/ui/whitepaper-card"
import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Whitepapers — Strategic Void Consulting",
  description:
    "Original research and strategic analysis on organizational non-productivity, misalignment patterns, and the C.H.A.O.S. Framework™.",
}

export default function WhitepapersIndex() {
  return (
    <div>
      <section className="bg-secondary py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Whitepapers
          </h1>
          <p className="text-lg text-foreground/70 leading-relaxed">
            Original research, strategic analysis, and thought leadership from the foremost
            authority on organizational non-productivity.
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whitepapers.map((wp) => {
              const solution = getSolutionBySlug(wp.solutionArea)
              return (
                <WhitepaperCard
                  key={wp.slug}
                  slug={wp.slug}
                  title={wp.title}
                  type={wp.type}
                  solutionArea={solution ? solution.name : wp.solutionArea}
                  readTime={wp.readTime}
                  authors={wp.authors}
                />
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

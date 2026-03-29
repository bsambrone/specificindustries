"use client"

import { caseStudies } from "@/sites/strategicvoid/data/case-studies"
import { getSolutionBySlug } from "@/sites/strategicvoid/data/solutions"
import { CaseStudyCard } from "@/components/ui/case-study-card"
import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Case Studies — Strategic Void Consulting",
  description:
    "Real client success stories demonstrating the measurable impact of strategic non-productivity across industries.",
}

export default function CaseStudiesIndex() {
  return (
    <div>
      <section className="bg-secondary py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Case Studies
          </h1>
          <p className="text-lg text-foreground/70 leading-relaxed">
            See how organizations across 14 verticals have successfully embraced the Void™ and
            achieved unprecedented levels of strategic non-productivity.
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudies.map((cs) => {
              const solution = getSolutionBySlug(cs.solutionArea)
              return (
                <CaseStudyCard
                  key={cs.slug}
                  slug={cs.slug}
                  company={cs.company}
                  heroStat={cs.heroStat}
                  solutionArea={solution ? solution.name : cs.solutionArea}
                  summary={cs.summary}
                />
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

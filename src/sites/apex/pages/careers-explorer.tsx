"use client"

import { Suspense, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { JobCard } from "@/components/ui/job-card"
import { VERTICAL_LABELS, VERTICAL_ORDER, type CareersVertical } from "../data/careers"

export interface JobListingDTO {
  slug: string
  title: string
  vertical: CareersVertical
  location: string
  employmentType: string
  summary: string
  compSummary: string
  href: string
}

interface Props {
  jobs: JobListingDTO[]
}

function CareersExplorerBody({ jobs }: Props) {
  const searchParams = useSearchParams()
  const verticalParam = searchParams.get("vertical") as CareersVertical | null

  const initial =
    verticalParam && VERTICAL_ORDER.includes(verticalParam) ? verticalParam : null
  const [active, setActive] = useState<CareersVertical | null>(initial)

  const visible = useMemo(() => {
    if (active === null) return jobs
    return jobs.filter((j) => j.vertical === active)
  }, [jobs, active])

  const grouped = useMemo(() => {
    const m: Record<CareersVertical, JobListingDTO[]> = {
      "consumer-goods": [],
      "hygiene": [],
      "health-wellness": [],
      "subscription-services": [],
      "professional-services": [],
      "corporate": [],
    }
    for (const j of visible) m[j.vertical].push(j)
    return m
  }, [visible])

  return (
    <>
      <section className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-foreground/10 py-3">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActive(null)}
            className={
              active === null
                ? "px-3 py-1.5 rounded-full text-xs font-heading uppercase tracking-wider bg-primary text-background"
                : "px-3 py-1.5 rounded-full text-xs font-heading uppercase tracking-wider border border-foreground/20 text-foreground/70 hover:border-foreground/40"
            }
          >
            All
          </button>
          {VERTICAL_ORDER.map((key) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={
                active === key
                  ? "px-3 py-1.5 rounded-full text-xs font-heading uppercase tracking-wider bg-primary text-background"
                  : "px-3 py-1.5 rounded-full text-xs font-heading uppercase tracking-wider border border-foreground/20 text-foreground/70 hover:border-foreground/40"
              }
            >
              {VERTICAL_LABELS[key]}
            </button>
          ))}
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-4xl mx-auto px-4 space-y-12">
          {active === null ? (
            VERTICAL_ORDER.map((key) => {
              const list = grouped[key]
              if (list.length === 0) return null
              return (
                <div key={key}>
                  <div className="flex items-baseline justify-between gap-2 mb-4">
                    <h2 className="text-2xl font-heading font-bold text-primary">{VERTICAL_LABELS[key]}</h2>
                    <span className="text-xs uppercase tracking-[0.15em] text-foreground/50 font-heading">
                      {list.length} open
                    </span>
                  </div>
                  <div className="space-y-3">
                    {list.map((j) => (
                      <JobCard
                        key={j.slug}
                        slug={j.slug}
                        title={j.title}
                        verticalLabel={VERTICAL_LABELS[j.vertical]}
                        location={j.location}
                        employmentType={j.employmentType}
                        summary={j.summary}
                        compSummary={j.compSummary}
                        href={j.href}
                      />
                    ))}
                  </div>
                </div>
              )
            })
          ) : (
            <div className="space-y-3">
              {visible.map((j) => (
                <JobCard
                  key={j.slug}
                  slug={j.slug}
                  title={j.title}
                  verticalLabel={VERTICAL_LABELS[j.vertical]}
                  location={j.location}
                  employmentType={j.employmentType}
                  summary={j.summary}
                  compSummary={j.compSummary}
                  href={j.href}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export function CareersExplorer({ jobs }: Props) {
  return (
    <Suspense fallback={null}>
      <CareersExplorerBody jobs={jobs} />
    </Suspense>
  )
}

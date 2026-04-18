import { Hero } from "@/components/ui/hero"
import { CareersExplorer, type JobListingDTO } from "./careers-explorer"
import { jobs } from "../data/careers"

const BENEFITS = [
  "Unlimited ambiguity",
  "Competitive compensation (to be determined)",
  "Full dental on select days",
  "Vesting schedule: 18 years, cliff at year 12",
  "Hybrid / remote / occasionally in-person at a location to be announced",
  "Equity in the portfolio company of your choice* (*pending legal review, ongoing since 2017)",
]

export default function ApexCareers() {
  const dto: JobListingDTO[] = jobs.map((j) => ({
    slug: j.slug,
    title: j.title,
    vertical: j.vertical,
    location: j.location,
    employmentType: j.employmentType,
    summary: j.summary,
    compSummary: j.compensation.summary,
    href: `/careers/${j.slug}`,
  }))

  return (
    <>
      <Hero
        headline="Careers at Specific Industries"
        subheadline={`Join a portfolio of brands serving markets that arguably should not exist. We are hiring ${jobs.length}+ roles across all five verticals.`}
      />

      <section className="py-10 px-4 bg-secondary/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xs uppercase tracking-[0.2em] text-foreground/50 font-heading mb-6">Benefits</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {BENEFITS.map((b) => (
              <li key={b} className="flex gap-3 text-foreground/80">
                <span className="text-primary">—</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CareersExplorer jobs={dto} />

      <section className="py-14 px-4 border-t border-primary/10">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-heading font-bold text-primary mb-3">Don&apos;t see your role?</h3>
          <p className="text-foreground/70">
            We are also accepting unsolicited proposals for positions that do not currently exist. Submissions are reviewed on a rolling basis, within reason.
          </p>
        </div>
      </section>
    </>
  )
}

import Link from "next/link"
import { notFound } from "next/navigation"
import { getJobBySlug, getRelatedJobs, VERTICAL_LABELS, jobs } from "../data/careers"

const DEFAULT_BENEFITS = [
  "Unlimited ambiguity",
  "Competitive compensation (to be determined)",
  "Full dental on select days",
  "Vesting schedule: 18 years, cliff at year 12",
  "Hybrid / remote / occasionally in-person at a location to be announced",
]

interface Props {
  slug: string
}

export function CareerDetailView({ slug }: Props) {
  const job = getJobBySlug(slug)
  if (!job) notFound()

  const related = getRelatedJobs(slug, 3)
  const benefits = job.benefitsOverride ?? DEFAULT_BENEFITS

  return (
    <>
      <section className="py-12 px-4 border-b border-primary/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-xs uppercase tracking-[0.2em] text-foreground/50 font-heading mb-3">
            <Link href="/careers" className="hover:underline">Careers</Link>
            <span className="mx-2">›</span>
            <span>{VERTICAL_LABELS[job.vertical]}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-3 leading-tight">
            {job.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-foreground/60 font-heading">
            <span>{VERTICAL_LABELS[job.vertical]}</span>
            <span className="text-foreground/30">·</span>
            <span>{job.location}</span>
            <span className="text-foreground/30">·</span>
            <span>{job.employmentType}</span>
          </div>
          <p className="text-xs text-foreground/50 mt-2 italic">{job.postedLine}</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-4 text-foreground/80 leading-relaxed">
          <h2 className="text-xs uppercase tracking-[0.2em] text-foreground/50 font-heading">About this role</h2>
          {job.about.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      <section className="py-10 px-4 bg-secondary/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xs uppercase tracking-[0.2em] text-foreground/50 font-heading mb-6">What You&apos;ll Do</h2>
          <ul className="space-y-2 text-foreground/80">
            {job.responsibilities.map((r) => (
              <li key={r} className="flex gap-3"><span className="text-primary">—</span><span>{r}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xs uppercase tracking-[0.2em] text-foreground/50 font-heading mb-6">What We&apos;re Looking For</h2>
          <ul className="space-y-2 text-foreground/80">
            {job.qualifications.map((q) => (
              <li key={q} className="flex gap-3"><span className="text-primary">—</span><span>{q}</span></li>
            ))}
          </ul>
          {job.preferredQualifications && job.preferredQualifications.length > 0 && (
            <>
              <h3 className="text-xs uppercase tracking-[0.2em] text-foreground/50 font-heading mt-8 mb-4">Bonus Points</h3>
              <ul className="space-y-2 text-foreground/80">
                {job.preferredQualifications.map((q) => (
                  <li key={q} className="flex gap-3"><span className="text-primary">—</span><span>{q}</span></li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>

      <section className="py-10 px-4 bg-secondary/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xs uppercase tracking-[0.2em] text-foreground/50 font-heading mb-2">Compensation</h2>
          <p className="text-xl font-heading font-semibold text-primary mb-4">{job.compensation.summary}</p>
          <ul className="space-y-2 text-foreground/80 mb-3">
            {job.compensation.lines.map((l) => (
              <li key={l} className="flex gap-3"><span className="text-primary">—</span><span>{l}</span></li>
            ))}
          </ul>
          {job.compensation.note && (
            <p className="text-xs text-foreground/50 italic">{job.compensation.note}</p>
          )}
        </div>
      </section>

      <section className="py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xs uppercase tracking-[0.2em] text-foreground/50 font-heading mb-6">Benefits</h2>
          <ul className="space-y-2 text-foreground/80">
            {benefits.map((b) => (
              <li key={b} className="flex gap-3"><span className="text-primary">—</span><span>{b}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-12 px-4 border-y border-primary/10 bg-secondary/10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-heading font-bold text-primary mb-3">How to Apply</h2>
          <p className="text-foreground/70 mb-6">
            Submit your application for consideration. A decision will be communicated when one has been made.
          </p>
          <Link
            href={`/careers/applied?role=${encodeURIComponent(job.slug)}`}
            className="inline-block px-6 py-3 rounded-lg bg-primary text-background font-heading font-semibold text-sm tracking-wide hover:opacity-90 transition-opacity"
          >
            Apply for this Role
          </Link>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xs uppercase tracking-[0.2em] text-foreground/50 font-heading mb-6">Related openings</h2>
            <ul className="space-y-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/careers/${r.slug}`}
                    className="group flex items-baseline justify-between gap-4 p-4 rounded-lg border border-primary/10 bg-background hover:border-primary/30 transition-colors"
                  >
                    <span className="font-heading font-semibold text-primary">{r.title}</span>
                    <span className="text-xs font-heading uppercase tracking-wider text-foreground/50">{r.employmentType}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="py-8 px-4 border-t border-primary/10">
        <div className="max-w-4xl mx-auto">
          <Link href="/careers" className="text-sm font-heading text-primary hover:underline">
            ← Back to all openings
          </Link>
        </div>
      </section>
    </>
  )
}

export function careerSlugs(): string[] {
  return jobs.map((j) => j.slug)
}

export default function CareerDetailRoute({ slug }: { slug: string; segments?: string[] }) {
  return <CareerDetailView slug={slug} />
}

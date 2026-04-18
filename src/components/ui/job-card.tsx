import Link from "next/link"

export interface JobCardProps {
  slug: string
  title: string
  verticalLabel: string
  location: string
  employmentType: string
  summary: string
  compSummary: string
  href: string
}

export function JobCard({
  title,
  verticalLabel,
  location,
  employmentType,
  summary,
  compSummary,
  href,
}: JobCardProps) {
  return (
    <Link
      href={href}
      className="block p-5 rounded-lg border border-primary/10 bg-background hover:border-primary/30 transition-colors"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-2">
        <h3 className="text-lg font-heading font-semibold text-primary leading-tight">{title}</h3>
        <span className="text-[11px] uppercase tracking-[0.15em] text-foreground/50 font-heading">
          {verticalLabel}
        </span>
      </div>
      <p className="text-sm text-foreground/80 leading-snug mb-3">{summary}</p>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-foreground/60 font-heading">
        <span>{employmentType}</span>
        <span className="text-foreground/30">·</span>
        <span>{location}</span>
        <span className="text-foreground/30">·</span>
        <span className="font-semibold text-primary">{compSummary}</span>
      </div>
    </Link>
  )
}

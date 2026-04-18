import Link from "next/link"

export interface PressReleaseCardProps {
  slug: string
  date: string
  headline: string
  lede: string
  href: string
  compact?: boolean
}

export function PressReleaseCard({
  date,
  headline,
  lede,
  href,
  compact = false,
}: PressReleaseCardProps) {
  return (
    <Link
      href={href}
      className={
        compact
          ? "block p-4 rounded-lg border border-primary/10 bg-background hover:border-primary/30 transition-colors"
          : "block p-6 rounded-lg border border-primary/10 bg-background hover:border-primary/30 transition-colors"
      }
    >
      <p className="text-[11px] uppercase tracking-[0.15em] text-foreground/50 font-heading mb-2">{date}</p>
      <h3 className={compact ? "text-base font-heading font-semibold text-primary leading-tight mb-2" : "text-lg font-heading font-semibold text-primary leading-tight mb-3"}>
        {headline}
      </h3>
      <p className={compact ? "text-xs text-foreground/70 leading-snug" : "text-sm text-foreground/70 leading-snug"}>
        {lede}
      </p>
      <span className="inline-block mt-3 text-xs font-heading text-primary">Read more →</span>
    </Link>
  )
}

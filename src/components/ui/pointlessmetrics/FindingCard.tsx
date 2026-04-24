import Link from "next/link"
import type { Finding } from "@/sites/pointlessmetrics/data/findings"
import { getLeaderByPerson } from "@/sites/pointlessmetrics/data/leadership"
import { CorrelationSparkline } from "./CorrelationSparkline"

interface FindingCardProps {
  finding: Finding
}

export function FindingCard({ finding }: FindingCardProps) {
  const pi = getLeaderByPerson(finding.principalInvestigator)
  const rClass = finding.rValue < 0 ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary"
  return (
    <Link
      href={`/findings/${finding.slug}`}
      className="block bg-white border border-accent/40 rounded-sm p-4 hover:border-primary/60 transition-colors"
    >
      <div className="mb-3">
        <CorrelationSparkline points={finding.chartData} rValue={finding.rValue} />
      </div>
      <div className="flex items-center gap-2 mb-2 text-[11px]">
        <span className={`px-2 py-0.5 rounded-sm tabular-nums font-semibold ${rClass}`}>r = {finding.rValue.toFixed(2)}</span>
        <span className="px-2 py-0.5 rounded-sm bg-accent/20 text-foreground/80 tabular-nums">n = {finding.sampleSize.toLocaleString()}</span>
        <span className="ml-auto uppercase tracking-wide text-foreground/60">{finding.category}</span>
      </div>
      <h3 className="font-heading text-base leading-snug text-primary">{finding.title}</h3>
      {pi && <p className="mt-2 text-xs text-foreground/60">{pi.name} · Published {finding.publishedDate}</p>}
    </Link>
  )
}

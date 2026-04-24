import Link from "next/link"
import type { Finding } from "@/sites/pointlessmetrics/data/findings"
import { CorrelationSparkline } from "./CorrelationSparkline"

interface DashboardTileProps {
  finding: Finding
}

export function DashboardTile({ finding }: DashboardTileProps) {
  const rClass = finding.rValue < 0 ? "text-secondary" : "text-primary"
  return (
    <Link
      href={`/findings/${finding.slug}`}
      className="block bg-white border border-accent/40 rounded-sm p-4 hover:border-primary/60 transition-colors"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-heading text-sm leading-tight text-primary line-clamp-3">{finding.title}</h3>
        <span className={`shrink-0 text-[11px] tabular-nums font-semibold ${rClass}`}>r = {finding.rValue.toFixed(2)}</span>
      </div>
      <CorrelationSparkline points={finding.chartData} rValue={finding.rValue} />
      <div className="mt-2 flex items-center gap-2 text-[10px] text-foreground/60">
        <span className="uppercase tracking-wide">{finding.category}</span>
        <span>·</span>
        <span className="tabular-nums">n = {finding.sampleSize.toLocaleString()}</span>
      </div>
    </Link>
  )
}

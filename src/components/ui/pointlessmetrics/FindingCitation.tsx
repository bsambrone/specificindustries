import type { Finding } from "@/sites/pointlessmetrics/data/findings"
import { getLeaderByPerson } from "@/sites/pointlessmetrics/data/leadership"

interface FindingCitationProps {
  finding: Finding
}

export function FindingCitation({ finding }: FindingCitationProps) {
  const pi = getLeaderByPerson(finding.principalInvestigator)
  const year = finding.publishedDate.slice(0, 4)
  const lastFirst = pi ? toLastFirstInitials(pi.name) : "Institute, I."
  return (
    <div className="bg-white border border-accent/40 p-4 rounded-sm">
      <h4 className="text-xs uppercase tracking-wide text-foreground/60 mb-2">Full citation</h4>
      <p className="text-sm leading-relaxed font-body">
        {lastFirst} ({year}). <em>{finding.title}</em>. Institute for the Study of Pointless Metrics. <span className="tabular-nums">r = {finding.rValue.toFixed(2)}, p {finding.pValue}, n = {finding.sampleSize.toLocaleString()}.</span>
      </p>
    </div>
  )
}

function toLastFirstInitials(full: string): string {
  const parts = full.replace(/^Dr\.\s+|^Dean\s+/, "").split(/\s+/)
  if (parts.length < 2) return full
  const last = parts[parts.length - 1]
  const initials = parts.slice(0, -1).map((p) => p[0] + ".").join(" ")
  return `${last}, ${initials}`
}

interface SpecRow {
  label: string
  value: string
}

interface SpecReadoutProps {
  title?: string
  rows: SpecRow[]
  variant?: "dark" | "light"
  className?: string
}

export function SpecReadout({ title = "SPEC READOUT", rows, variant = "dark", className = "" }: SpecReadoutProps) {
  const bg = variant === "dark" ? "bg-secondary text-background" : "bg-background text-foreground border border-foreground/20"
  const labelColor = variant === "dark" ? "text-accent" : "text-primary"
  return (
    <div className={`font-mono text-sm ${bg} ${className}`}>
      <div className="border-b border-current/30 px-4 py-2 flex items-center justify-between">
        <span className="text-xs tracking-[0.3em] font-heading">{title}</span>
        <span className={`text-[10px] ${labelColor}`}>▊▊▊</span>
      </div>
      <dl className="divide-y divide-current/10">
        {rows.map((r) => (
          <div key={r.label} className="flex justify-between px-4 py-2">
            <dt className={`text-xs uppercase tracking-wider ${labelColor}`}>{r.label}</dt>
            <dd className="text-sm tabular-nums">{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

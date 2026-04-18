export interface Metric {
  value: string
  label: string
}

export interface MetricStripProps {
  metrics: Metric[]
  variant?: "default" | "inverse"
}

export function MetricStrip({ metrics, variant = "default" }: MetricStripProps) {
  const bg = variant === "inverse" ? "bg-primary text-background" : "bg-secondary/10 text-primary"
  return (
    <section className={`${bg} py-8 border-y border-primary/10`}>
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
        {metrics.map((m) => (
          <div key={m.label} className="text-center">
            <div className="text-2xl md:text-3xl font-heading font-bold">{m.value}</div>
            <div className="text-xs uppercase tracking-[0.15em] opacity-70 mt-1">{m.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

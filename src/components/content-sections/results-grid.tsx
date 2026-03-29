interface Metric {
  value: string
  label: string
  direction?: "up" | "down"
}

interface ResultsGridProps {
  title?: string
  metrics: Metric[]
}

export function ResultsGrid({ title = "Results", metrics }: ResultsGridProps) {
  return (
    <section className="py-16 px-4 bg-accent/5">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-heading font-bold text-foreground mb-10">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((m, i) => (
            <div
              key={i}
              className="bg-background rounded-xl border border-primary/10 p-6 flex flex-col items-center gap-2"
            >
              <div className="text-4xl font-heading font-bold text-accent">
                {m.direction === "up" && (
                  <span className="text-2xl mr-1 text-green-600">↑</span>
                )}
                {m.direction === "down" && (
                  <span className="text-2xl mr-1 text-red-500">↓</span>
                )}
                {m.value}
              </div>
              <p className="text-xs text-foreground/60 uppercase tracking-wider">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

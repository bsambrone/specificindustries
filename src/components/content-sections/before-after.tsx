interface BeforeAfterSide {
  label: string
  items: string[]
}

interface BeforeAfterProps {
  title?: string
  before: BeforeAfterSide
  after: BeforeAfterSide
}

export function BeforeAfter({
  title = "Before & After",
  before,
  after,
}: BeforeAfterProps) {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {title && (
          <h2 className="text-3xl font-heading font-bold text-foreground mb-10 text-center">
            {title}
          </h2>
        )}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Before */}
          <div className="rounded-xl border border-primary/10 bg-secondary/20 p-8">
            <h3 className="font-heading font-semibold text-foreground/60 uppercase tracking-widest text-sm mb-6">
              {before.label}
            </h3>
            <ul className="space-y-3">
              {before.items.map((item, i) => (
                <li key={i} className="flex gap-3 items-start text-foreground/70">
                  <span className="text-red-400 font-bold shrink-0 mt-0.5">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* After */}
          <div className="rounded-xl border border-accent/20 bg-accent/5 p-8">
            <h3 className="font-heading font-semibold text-accent uppercase tracking-widest text-sm mb-6">
              {after.label}
            </h3>
            <ul className="space-y-3">
              {after.items.map((item, i) => (
                <li key={i} className="flex gap-3 items-start text-foreground/80">
                  <span className="text-green-600 font-bold shrink-0 mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

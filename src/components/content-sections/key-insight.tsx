interface KeyInsightProps {
  text: string
}

export function KeyInsight({ text }: KeyInsightProps) {
  return (
    <section className="py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="border border-accent/30 rounded-xl bg-accent/5 px-8 py-6">
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-3">
            Key Insight
          </p>
          <p className="text-foreground/80 text-lg leading-relaxed">{text}</p>
        </div>
      </div>
    </section>
  )
}

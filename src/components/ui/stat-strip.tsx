interface StatStripProps {
  stats: Array<{
    icon: string
    value: string
    label: string
  }>
}

export function StatStrip({ stats }: StatStripProps) {
  return (
    <section className="py-10 px-4 bg-secondary/10">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
        {stats.map((stat, i) => (
          <div key={i} className="text-center flex flex-col items-center">
            <span className="text-3xl mb-2">{stat.icon}</span>
            <span className="text-xl font-heading font-bold text-foreground">{stat.value}</span>
            <span className="text-sm text-foreground/60">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

interface CaseHeroProps {
  stat: { value: string; label: string }
  company: string
  industry: string
  solutionArea: string
}

export function CaseHero({ stat, company, industry, solutionArea }: CaseHeroProps) {
  return (
    <section className="py-20 px-4 bg-background text-center">
      <div className="max-w-3xl mx-auto">
        <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-semibold uppercase tracking-widest mb-8">
          {solutionArea}
        </span>
        <div className="text-7xl font-heading font-bold text-accent mb-2">
          {stat.value}
        </div>
        <p className="text-base text-foreground/60 uppercase tracking-wider mb-8">
          {stat.label}
        </p>
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
          {company}
        </h1>
        <p className="text-lg text-foreground/60">{industry}</p>
      </div>
    </section>
  )
}

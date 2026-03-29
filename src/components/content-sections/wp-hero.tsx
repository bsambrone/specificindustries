interface WpHeroProps {
  title: string
  subtitle: string
  authors: string[]
  readTime: string
  solutionArea: string
}

export function WpHero({ title, subtitle, authors, readTime, solutionArea }: WpHeroProps) {
  return (
    <section className="py-20 px-4 bg-background text-center">
      <div className="max-w-3xl mx-auto">
        <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-semibold uppercase tracking-widest mb-8">
          {solutionArea}
        </span>
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">
          {title}
        </h1>
        <p className="text-lg text-foreground/60 mb-10 max-w-2xl mx-auto">{subtitle}</p>
        <div className="flex items-center justify-center gap-3 flex-wrap text-sm text-foreground/50">
          <span>{authors.join(", ")}</span>
          <span>·</span>
          <span>{readTime}</span>
        </div>
      </div>
    </section>
  )
}

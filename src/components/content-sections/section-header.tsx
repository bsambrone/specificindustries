interface SectionHeaderProps {
  number?: number | string
  title: string
}

export function SectionHeader({ number, title }: SectionHeaderProps) {
  return (
    <section className="pt-12 pb-4 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
          {number !== undefined && (
            <span className="text-accent mr-3">{number}.</span>
          )}
          {title}
        </h2>
        <div className="mt-4 h-px bg-primary/10" />
      </div>
    </section>
  )
}

interface PullQuoteProps {
  quote: string
  attribution: string
  role?: string
}

export function PullQuote({ quote, attribution, role }: PullQuoteProps) {
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <blockquote className="text-2xl md:text-3xl font-heading font-medium italic text-foreground/80 leading-relaxed mb-6">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <div className="flex flex-col items-center gap-1">
          <p className="font-semibold text-accent text-sm uppercase tracking-widest">
            {attribution}
          </p>
          {role && <p className="text-foreground/50 text-sm">{role}</p>}
        </div>
      </div>
    </section>
  )
}

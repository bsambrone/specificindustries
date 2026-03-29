interface ChallengeProps {
  title?: string
  paragraphs: string[]
}

export function Challenge({ title = "The Challenge", paragraphs }: ChallengeProps) {
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-heading font-bold text-foreground mb-8">{title}</h2>
        <div className="space-y-4">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-foreground/80 text-lg leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}

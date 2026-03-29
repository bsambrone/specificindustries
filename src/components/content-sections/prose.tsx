interface ProseProps {
  paragraphs: string[]
}

export function Prose({ paragraphs }: ProseProps) {
  return (
    <section className="py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-5">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-foreground/80 text-lg leading-relaxed">
            {p}
          </p>
        ))}
      </div>
    </section>
  )
}

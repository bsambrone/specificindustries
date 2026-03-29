interface FootnotesProps {
  notes: string[]
}

export function Footnotes({ notes }: FootnotesProps) {
  return (
    <section className="py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="border-t border-primary/10 pt-6">
          <ol className="space-y-2">
            {notes.map((note, i) => (
              <li key={i} className="flex gap-2 text-xs text-foreground/45 leading-relaxed">
                <span className="shrink-0 font-semibold">{i + 1}.</span>
                <span>{note}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

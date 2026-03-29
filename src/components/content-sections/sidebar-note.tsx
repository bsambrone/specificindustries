interface SidebarNoteProps {
  text: string
  source?: string
}

export function SidebarNote({ text, source }: SidebarNoteProps) {
  return (
    <section className="py-6 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="border-l-2 border-primary/20 pl-5">
          <p className="text-foreground/60 text-sm italic leading-relaxed">{text}</p>
          {source && (
            <p className="text-foreground/40 text-xs mt-2">Source: {source}</p>
          )}
        </div>
      </div>
    </section>
  )
}

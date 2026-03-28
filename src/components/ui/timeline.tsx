interface TimelineItem {
  year: string
  description: string
}

interface TimelineProps {
  items: TimelineItem[]
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="max-w-2xl mx-auto">
      {items.map((item, i) => (
        <div key={item.year} className="relative pl-24 pb-10 last:pb-0">
          {/* Vertical line */}
          {i < items.length - 1 && (
            <div className="absolute left-[3.25rem] top-8 bottom-0 w-px bg-primary/20" />
          )}
          {/* Year label */}
          <div className="absolute left-0 top-0 w-16 text-right">
            <span className="font-heading font-bold text-2xl text-primary">{item.year}</span>
          </div>
          {/* Dot on the line */}
          <div className="absolute left-[2.75rem] top-2 w-3 h-3 rounded-full border-2 border-primary bg-background" />
          {/* Description */}
          <div className="border border-primary/10 rounded-lg p-4 bg-secondary/5 hover:bg-secondary/10 transition-colors">
            <p className="text-foreground/80 text-lg leading-relaxed">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

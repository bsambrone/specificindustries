interface TimelineItem {
  year: string
  description: string
}

interface TimelineProps {
  items: TimelineItem[]
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {items.map((item) => (
        <div key={item.year} className="flex gap-6 items-baseline">
          <div className="shrink-0 w-14 text-right">
            <span className="font-body font-bold text-lg text-primary">{item.year}</span>
          </div>
          <div className="w-2 h-2 rounded-full bg-primary shrink-0 relative top-1" />
          <p className="text-foreground/80 text-lg">{item.description}</p>
        </div>
      ))}
    </div>
  )
}

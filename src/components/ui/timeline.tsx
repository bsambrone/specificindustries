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
        <div key={item.year} className="flex gap-8 pb-10 last:pb-0">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-heading font-bold text-base shrink-0 shadow-lg ring-4 ring-primary/20">
              {item.year}
            </div>
            {i < items.length - 1 && <div className="w-0.5 flex-1 bg-gradient-to-b from-primary/40 to-primary/10 mt-3" />}
          </div>
          <div className="pt-4">
            <p className="text-foreground/80 text-lg leading-relaxed">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

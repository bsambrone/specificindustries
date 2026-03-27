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
        <div key={item.year} className="flex gap-6 pb-8 last:pb-0">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-heading font-bold text-sm shrink-0">
              {item.year}
            </div>
            {i < items.length - 1 && <div className="w-0.5 flex-1 bg-primary/20 mt-2" />}
          </div>
          <div className="pt-2.5">
            <p className="text-foreground/80">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

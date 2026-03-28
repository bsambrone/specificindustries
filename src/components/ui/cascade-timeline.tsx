"use client"

interface CascadeTimelineProps {
  items: Array<{ year: string; description: string }>
}

export function CascadeTimeline({ items }: CascadeTimelineProps) {
  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Desktop: cascading layout */}
      <div className="hidden md:block space-y-4">
        {items.map((item, i) => (
          <div key={item.year}>
            <div
              className="flex items-start gap-4"
              style={{ marginLeft: `${i * 40}px` }}
            >
              <div className="shrink-0 w-16 h-10 flex items-center justify-center bg-primary rounded text-white font-heading font-bold text-sm">
                {item.year}
              </div>
              <div className="flex items-start gap-3">
                <svg className="shrink-0 mt-2.5 text-accent" width="20" height="12" viewBox="0 0 20 12">
                  <path d="M0,6 L14,6 M10,1 L16,6 L10,11" stroke="currentColor" fill="none" strokeWidth="1.5" />
                </svg>
                <p className="text-foreground/80 text-sm pt-1.5">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: vertical timeline (matches existing Timeline pattern) */}
      <div className="md:hidden space-y-6">
        {items.map((item) => (
          <div key={item.year} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-primary shrink-0" />
              <div className="w-px flex-1 bg-primary/20" />
            </div>
            <div className="pb-6">
              <span className="font-bold text-lg text-primary">{item.year}</span>
              <p className="text-foreground/80 mt-1">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

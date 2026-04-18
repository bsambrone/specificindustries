export interface CriteriaItem {
  heading: string
  description?: string
}

export interface CriteriaListProps {
  items: CriteriaItem[]
  numbered?: boolean
}

export function CriteriaList({ items, numbered = false }: CriteriaListProps) {
  return (
    <ol className="space-y-4">
      {items.map((item, i) => (
        <li
          key={item.heading}
          className="flex gap-4 p-4 rounded-lg border border-primary/10 bg-background"
        >
          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-background flex items-center justify-center text-xs font-heading font-semibold">
            {numbered ? i + 1 : "✓"}
          </span>
          <div>
            <h3 className="font-heading font-semibold text-primary leading-tight mb-1">{item.heading}</h3>
            {item.description && (
              <p className="text-sm text-foreground/70 leading-snug">{item.description}</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}

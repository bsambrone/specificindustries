interface StrataDiagramProps {
  layers: Array<{
    label: string
    sublabel: string
  }>
  caption?: string
}

export function StrataDiagram({ layers, caption }: StrataDiagramProps) {
  const count = layers.length

  return (
    <div className="flex flex-col items-center gap-2 w-full max-w-2xl mx-auto">
      {layers.map((layer, i) => {
        // Top layer is narrowest, bottom is widest
        const widthPercent = 30 + ((count - 1 - i) / (count - 1)) * 70
        // Gold at top, dark navy at bottom
        const opacity = 1 - (i / (count - 1)) * 0.7

        return (
          <div
            key={i}
            className="relative flex items-center justify-center py-3 md:py-4 rounded-sm text-center transition-all"
            style={{
              width: `${widthPercent}%`,
              backgroundColor: `rgba(201, 162, 39, ${opacity})`,
              color: opacity > 0.5 ? "#060e1a" : "#f0ece4",
            }}
          >
            <div>
              <div className="font-heading font-bold text-sm md:text-base">{layer.label}</div>
              <div className="text-xs opacity-80">{layer.sublabel}</div>
            </div>
          </div>
        )
      })}
      {caption && (
        <p className="text-sm text-foreground/50 italic mt-4 text-center">{caption}</p>
      )}
    </div>
  )
}

interface StampBadgeProps {
  children: React.ReactNode
  rotate?: number
  variant?: "primary" | "ink"
  className?: string
}

export function StampBadge({ children, rotate = -4, variant = "ink", className = "" }: StampBadgeProps) {
  const color = variant === "primary" ? "#A8352A" : "#0F0B09"
  return (
    <div
      className={`inline-block px-4 py-2 border-2 uppercase tracking-widest text-xs ${className}`}
      style={{
        fontFamily: "'Alfa Slab One', cursive",
        color,
        borderColor: color,
        transform: `rotate(${rotate}deg)`,
        opacity: 0.85,
      }}
    >
      {children}
    </div>
  )
}

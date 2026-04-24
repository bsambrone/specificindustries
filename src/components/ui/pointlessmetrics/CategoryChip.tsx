"use client"

interface CategoryChipProps {
  label: string
  active: boolean
  onClick: () => void
}

export function CategoryChip({ label, active, onClick }: CategoryChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 text-sm rounded-sm border transition-colors ${
        active
          ? "bg-primary text-white border-primary"
          : "bg-white text-foreground/80 border-accent/40 hover:border-primary/60"
      }`}
    >
      {label}
    </button>
  )
}

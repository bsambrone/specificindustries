interface StatCounterProps {
  value: string
  label: string
}

export function StatCounter({ value, label }: StatCounterProps) {
  return (
    <div className="text-center">
      <div className="text-4xl font-heading font-bold text-primary mb-2">{value}</div>
      <div className="text-foreground/60 text-sm">{label}</div>
    </div>
  )
}

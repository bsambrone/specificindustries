export function WarningBox({
  warnings,
  heading = "WARNINGS",
}: {
  warnings: string[]
  heading?: string
}) {
  return (
    <div className="border-2 border-accent bg-accent/5 p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-block w-6 h-6 rounded-full bg-accent text-background font-heading text-center leading-6">
          !
        </span>
        <span className="font-heading uppercase tracking-widest text-accent">{heading}</span>
      </div>
      <ul className="list-disc list-inside space-y-1 text-sm text-foreground/90">
        {warnings.map((w, i) => (
          <li key={i}>{w}</li>
        ))}
      </ul>
    </div>
  )
}

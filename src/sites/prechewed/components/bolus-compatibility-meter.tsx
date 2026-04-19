export default function BolusCompatibilityMeter({ score }: { score: number }) {
  const clamped = Math.max(0, Math.min(10, score))
  const pct = (clamped / 10) * 100

  return (
    <div className="flex flex-col gap-2" role="meter" aria-valuemin={0} aria-valuemax={10} aria-valuenow={clamped}>
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.15em] font-mono" style={{ color: "var(--color-muted, #6C6A7D)" }}>
        <span>Bolus Compatibility™</span>
        <span>{clamped.toFixed(1)} / 10</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: "#E6E3F0" }}>
        <div
          className="h-full"
          style={{ width: `${pct}%`, background: "var(--color-primary, #5B3FD9)" }}
        />
      </div>
    </div>
  )
}

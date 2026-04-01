import Link from "next/link"

interface TierCardProps {
  layer: number
  name: string
  monthlyRCP: string
  elevationFee: string
  description: string
  unlocks: string[]
  ctaHref: string
  ctaText?: string
  highlighted?: boolean
}

export function TierCard({
  layer,
  name,
  monthlyRCP,
  elevationFee,
  description,
  unlocks,
  ctaHref,
  ctaText = "Begin Elevation",
  highlighted = false,
}: TierCardProps) {
  return (
    <div
      className={`rounded-lg border p-6 flex flex-col ${
        highlighted
          ? "border-secondary bg-secondary/10 ring-2 ring-secondary/50"
          : "border-primary/10 bg-background"
      }`}
    >
      <div className="mb-4">
        <span className="text-xs font-heading uppercase tracking-widest text-foreground/40">
          Layer {layer}
        </span>
        <h3 className="text-2xl font-heading font-bold text-secondary mt-1">{name}</h3>
        <p className="text-foreground/60 text-sm mt-2">{description}</p>
      </div>

      <div className="mb-4 pb-4 border-b border-primary/10">
        <div className="text-3xl font-heading font-bold text-foreground">{monthlyRCP}</div>
        <div className="text-xs text-foreground/40 mt-1">
          Elevation fee: {elevationFee}
        </div>
      </div>

      <ul className="space-y-2 mb-6 flex-1">
        {unlocks.map((unlock, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-foreground/70">
            <span className="text-secondary mt-0.5 shrink-0">&#10003;</span>
            {unlock}
          </li>
        ))}
      </ul>

      <Link
        href={ctaHref}
        className="block text-center px-6 py-3 rounded-lg font-heading font-semibold bg-secondary text-primary hover:bg-accent transition-colors"
      >
        {ctaText}
      </Link>
    </div>
  )
}

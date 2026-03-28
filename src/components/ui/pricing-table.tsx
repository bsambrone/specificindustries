"use client"

interface PricingTier {
  name: string
  price: string
  interval: string
  features: Array<{ text: string; included: boolean }>
  recommended?: boolean
  ctaLabel?: string
}

interface PricingTableProps {
  tiers: PricingTier[]
  onSelect: (tierName: string) => void
  footnote?: string
}

export function PricingTable({ tiers, onSelect, footnote }: PricingTableProps) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`relative border rounded-lg p-8 text-center bg-background ${
              tier.recommended
                ? "border-accent border-2"
                : "border-primary/20"
            }`}
          >
            {tier.recommended && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-heading px-4 py-1 tracking-widest uppercase">
                Recommended
              </div>
            )}
            <div className="text-accent text-xs font-heading tracking-[0.2em] uppercase mb-4">
              {tier.name}
            </div>
            <div className="text-4xl font-heading font-bold text-foreground mb-1">
              {tier.price}
            </div>
            <div className="text-accent text-sm mb-6">{tier.interval}</div>
            <div className="text-left space-y-3 mb-8">
              {tier.features.map((feature) => (
                <div key={feature.text} className="text-sm flex items-start gap-2">
                  {feature.included ? (
                    <span className="text-accent shrink-0">✓</span>
                  ) : (
                    <span className="text-foreground/30 shrink-0">✗</span>
                  )}
                  <span
                    className={
                      feature.included ? "text-foreground/70" : "text-foreground/30"
                    }
                  >
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
            <button
              onClick={() => onSelect(tier.name)}
              className={`w-full py-3 font-heading text-sm tracking-wider uppercase transition-opacity hover:opacity-90 ${
                tier.recommended
                  ? "bg-primary text-white"
                  : "border border-primary text-primary"
              }`}
            >
              {tier.ctaLabel || "Select"}
            </button>
          </div>
        ))}
      </div>
      {footnote && (
        <p className="text-accent text-sm italic text-center mt-6">{footnote}</p>
      )}
    </div>
  )
}

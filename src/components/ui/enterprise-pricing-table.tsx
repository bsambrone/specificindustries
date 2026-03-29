"use client"

export interface PricingTier {
  name: string
  price: string
  description: string
  features: string[]
  cta: string
  highlighted?: boolean
}

export interface PricingFeatureRow {
  label: string
  values: (boolean | string)[]
}

interface EnterprisePricingTableProps {
  tiers: PricingTier[]
  featureRows?: PricingFeatureRow[]
  highlightedTier?: number
}

function FeatureValue({ value }: { value: boolean | string }) {
  if (typeof value === "boolean") {
    return value ? (
      <span className="text-accent text-lg">✓</span>
    ) : (
      <span className="text-foreground/25 text-lg">—</span>
    )
  }
  return <span className="text-foreground/70 text-sm">{value}</span>
}

export function EnterprisePricingTable({
  tiers,
  featureRows,
  highlightedTier,
}: EnterprisePricingTableProps) {
  return (
    <div>
      {/* Tier cards */}
      <div className={`grid grid-cols-1 gap-6 ${tiers.length === 2 ? "md:grid-cols-2" : tiers.length === 3 ? "md:grid-cols-3" : "md:grid-cols-4"} max-w-5xl mx-auto`}>
        {tiers.map((tier, index) => {
          const isHighlighted = tier.highlighted || index === highlightedTier
          return (
            <div
              key={tier.name}
              className={`relative border-2 rounded-lg p-8 flex flex-col bg-background transition-shadow ${
                isHighlighted
                  ? "border-accent ring-2 ring-accent/20 shadow-lg"
                  : "border-primary/20"
              }`}
            >
              {isHighlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-heading px-4 py-1 tracking-widest uppercase whitespace-nowrap">
                  Most Popular
                </div>
              )}
              <div className="text-accent text-xs font-heading tracking-[0.2em] uppercase mb-3">
                {tier.name}
              </div>
              <div className="text-4xl font-heading font-bold text-foreground mb-1">
                {tier.price}
              </div>
              <p className="text-sm text-foreground/60 mb-6 leading-relaxed">{tier.description}</p>
              <ul className="space-y-2 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="text-sm text-foreground/70 flex items-start gap-2">
                    <span className="text-accent shrink-0 mt-0.5">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 font-heading text-sm tracking-wider uppercase transition-opacity hover:opacity-90 rounded ${
                  isHighlighted
                    ? "bg-accent text-white"
                    : "border border-primary text-primary"
                }`}
              >
                {tier.cta}
              </button>
            </div>
          )
        })}
      </div>

      {/* Feature comparison table */}
      {featureRows && featureRows.length > 0 && (
        <div className="mt-12 max-w-5xl mx-auto overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-primary/20">
                <th className="text-left py-3 pr-6 text-foreground/50 font-normal w-1/3">Feature</th>
                {tiers.map((tier) => (
                  <th
                    key={tier.name}
                    className="py-3 px-4 text-center font-heading text-xs uppercase tracking-wider text-foreground/70"
                  >
                    {tier.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureRows.map((row) => (
                <tr key={row.label} className="border-b border-primary/10 hover:bg-secondary/5">
                  <td className="py-3 pr-6 text-foreground/70">{row.label}</td>
                  {row.values.map((value, i) => (
                    <td key={i} className="py-3 px-4 text-center">
                      <FeatureValue value={value} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

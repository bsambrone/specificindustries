import Link from "next/link"

interface GlossyPricingTier {
  name: string
  priceMonthly: number
  features: string[]
  cta?: string
}

interface GlossyPricingGridProps {
  productName: string
  tiers: GlossyPricingTier[]
  recommendedIndex?: number  // defaults to middle tier (1)
  ctaHref?: string
  footnotes?: string[]
}

export function GlossyPricingGrid({
  productName,
  tiers,
  recommendedIndex = 1,
  ctaHref = "/cart",
  footnotes = [],
}: GlossyPricingGridProps) {
  return (
    <section className="bg-background py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-heading font-light tracking-tight text-primary text-center mb-4">
          Pick a plan for your {productName}.
        </h2>
        <p className="text-primary/60 text-center mb-12">
          Every Superengineered device runs on a subscription. Upgrade any time.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => {
            const isRecommended = i === recommendedIndex
            return (
              <div
                key={tier.name}
                className={`relative rounded-2xl p-8 flex flex-col ${
                  isRecommended
                    ? "bg-primary text-background shadow-xl"
                    : "bg-secondary text-primary"
                }`}
              >
                {isRecommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-medium px-3 py-1 rounded-full">
                    Recommended
                  </div>
                )}
                <div className="text-sm font-medium uppercase tracking-widest mb-4 opacity-70">
                  {tier.name}
                </div>
                <div className="text-4xl font-heading font-light tracking-tight mb-1">
                  ${tier.priceMonthly}
                </div>
                <div className="text-sm opacity-60 mb-6">/ month</div>
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <span className="shrink-0 mt-0.5">&#10003;</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={ctaHref}
                  className={`block text-center py-3 rounded-full font-medium transition-opacity hover:opacity-90 ${
                    isRecommended
                      ? "bg-accent text-white"
                      : "bg-primary text-background"
                  }`}
                >
                  {tier.cta ?? "Choose plan"}
                </Link>
              </div>
            )
          })}
        </div>
        {footnotes.length > 0 && (
          <div className="mt-10 space-y-2 max-w-3xl mx-auto">
            {footnotes.map((note, i) => (
              <p key={i} className="text-xs text-primary/50 text-center">
                {note}
              </p>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

"use client"

import { useSiteLink } from "@/hooks/use-site-link"
import { Hero } from "@/components/ui/hero"
import { TierCard } from "@/components/ui/tier-card"
import { tiers } from "@/sites/stratify/data/tiers"

export const metadata = {
  title: "Stratification Tiers — Stratify",
  description: "Explore all five layers of the Stratified Growth Architecture™.",
}

const comparisonFeatures = [
  "Access to Subordinate Revenue Layers",
  "Yield Amplification Multiplier",
  "Leadership Alignment Webinar Access",
  "Custom Stratification Dashboard",
  "Annual Layer Expansion Summit VIP Pass",
  "Personalized Elevation Coaching",
  "Priority Yield Processing",
]

// Which tiers (by layer number) have which features
const featureMatrix: Record<string, number[]> = {
  "Access to Subordinate Revenue Layers": [1, 2, 3, 4],
  "Yield Amplification Multiplier": [2, 3, 4],
  "Leadership Alignment Webinar Access": [3, 4],
  "Custom Stratification Dashboard": [2, 3, 4],
  "Annual Layer Expansion Summit VIP Pass": [3, 4],
  "Personalized Elevation Coaching": [3, 4],
  "Priority Yield Processing": [4],
}

export default function TiersPage() {
  const siteHref = useSiteLink()

  return (
    <div>
      <Hero
        headline="Every Layer Has a Purpose. Yours Is Waiting."
        subheadline="Ascend through the Stratified Growth Architecture™ at your own pace. Or someone else's."
        dark
      />

      {/* Tier Cards */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <TierCard
                key={tier.layer}
                layer={tier.layer}
                name={tier.name}
                monthlyRCP={tier.monthlyRCP}
                elevationFee={tier.elevationFee}
                description={tier.description}
                unlocks={tier.unlocks}
                ctaHref={siteHref("/onboarding/step-1")}
                ctaText={tier.layer === 4 ? "Elevation Required" : "Begin Elevation"}
                highlighted={tier.layer === 3}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Downward Stratification Adjustment Warning */}
      <section className="py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="border border-secondary/30 bg-secondary/10 rounded-lg p-6">
            <h3 className="text-lg font-heading font-bold text-secondary mb-2">
              ⚠️ Downward Stratification Adjustment
            </h3>
            <p className="text-foreground/80 text-sm">
              Participants who fail to maintain their Recurring Commitment Protocol may experience a
              Downward Stratification Adjustment. This process is automatic and irreversible within the
              current billing cycle. Stratify is not responsible for emotional distress caused by layer demotion.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-8 text-center">
            Feature Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-foreground/15">
                  <th className="text-left py-3 px-4 text-foreground/70 font-heading">Feature</th>
                  {tiers.map((tier) => (
                    <th key={tier.layer} className="text-center py-3 px-2 text-foreground/70 font-heading text-xs">
                      L{tier.layer}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature) => (
                  <tr key={feature} className="border-b border-foreground/10">
                    <td className="py-3 px-4 text-foreground/90">{feature}</td>
                    {tiers.map((tier) => (
                      <td key={tier.layer} className="text-center py-3 px-2">
                        {featureMatrix[feature]?.includes(tier.layer) ? (
                          <span className="text-secondary">✓</span>
                        ) : (
                          <span className="text-foreground/40">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-6 px-4">
        <p className="text-xs text-foreground/40 max-w-3xl mx-auto text-center">
          *Yield projections based on optimal layer density conditions. Individual results depend on subordinate
          layer activity. 94% of participants earn less than their Recurring Commitment Protocol fees. This is by design.
        </p>
      </section>
    </div>
  )
}

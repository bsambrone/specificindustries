import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Wine Club — Domaine Carter & Fils",
  description: "The Carter & Fils Cellar Society. Three tiers of monthly estate selections.",
}

interface Tier {
  name: string
  price: string
  bottles: string
  tagline: string
  perks: string[]
  highlight?: boolean
}

const tiers: Tier[] = [
  {
    name: "Silver Cellar",
    price: "$49",
    bottles: "1 bottle monthly",
    tagline: "A single, well-chosen red each month.",
    perks: [
      "One curated bottle from the estate's current releases",
      "Monthly tasting notes from the Cellar Master",
      "Complimentary pouring funnel on your third shipment",
      "Cancel at any time",
    ],
  },
  {
    name: "Gold Reserve",
    price: "$129",
    bottles: "3 bottles monthly",
    tagline: "A considered selection across categories.",
    perks: [
      "Three bottles monthly — reds, whites, rosés, or sparkling, at the Cellar Master's discretion",
      "Priority access to our Reserve bottlings",
      "Quarterly release notes and vintage reports",
      "Invitation to seasonal virtual tastings",
      "Cancel at any time",
    ],
    highlight: true,
  },
  {
    name: "Platinum Collector",
    price: "$299",
    bottles: "6 bottles monthly",
    tagline: "For the most serious cellar.",
    perks: [
      "Six bottles monthly, including dessert and Grand Cru allocations",
      "Early access to Grand Cru releases before public sale",
      "Annual invitation to the estate for the Proprietor's Tasting",
      "Personal consultation with Archibald Whitford on cellar curation",
      "Complimentary Heritage Cuvée jeroboam on your first anniversary",
    ],
  },
]

export default function WineClub() {
  return (
    <>
      <Hero
        headline="The Cellar Society"
        subheadline="A monthly selection from the estate. Three tiers, each more considered than the last."
      />
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`border-2 p-10 ${t.highlight ? "border-primary bg-secondary/40" : "border-accent/30"}`}
            >
              <p className="text-xs tracking-[0.3em] uppercase text-primary/70 mb-2">{t.bottles}</p>
              <h3 className="text-2xl font-heading font-semibold text-foreground mb-2">{t.name}</h3>
              <p className="text-sm italic text-foreground/70 mb-6">{t.tagline}</p>
              <p className="text-4xl font-heading text-primary mb-2">{t.price}</p>
              <p className="text-sm text-foreground/60 mb-8">per month, shipping included</p>
              <ul className="space-y-3 text-sm text-foreground/80 mb-8">
                {t.perks.map((p, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-primary/60 flex-shrink-0">—</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 tracking-widest uppercase text-sm font-semibold transition-colors ${
                t.highlight
                  ? "bg-primary text-secondary hover:opacity-90"
                  : "border-2 border-primary text-primary hover:bg-primary hover:text-secondary"
              }`}>
                Join {t.name}
              </button>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-foreground/50 mt-12 max-w-2xl mx-auto">
          Membership begins with your next billing cycle. We ship to all fifty states and most provinces of Canada. The estate reserves the right to adjust allocations based on vintage availability.
        </p>
      </section>
    </>
  )
}

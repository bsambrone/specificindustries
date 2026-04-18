import { headers } from "next/headers"
import { Hero } from "@/components/ui/hero"
import { LeaderCard } from "@/components/ui/leader-card"
import { MetricStrip, type Metric } from "@/components/ui/metric-strip"
import { getActiveApexLeaders } from "../data/leadership"
import { getAllPortfolioBrands } from "../data/portfolio-utils"

export default async function ApexAbout() {
  await headers()
  const brands = getAllPortfolioBrands()
  const apexLeaders = getActiveApexLeaders()

  const metrics: Metric[] = [
    { value: String(brands.length), label: "Active portfolio brands" },
    { value: "5", label: "Strategic verticals" },
    { value: "<11,000", label: "Combined addressable market" },
    { value: "1 of 4", label: "Board meetings attended" },
    { value: "$0", label: "Outside capital committed" },
    { value: "2019", label: "Founded" },
  ]

  return (
    <>
      <Hero
        headline="About Specific Industries"
        subheadline="Identifying and serving the world's most overlooked market segments since 2019."
      />

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl font-heading font-bold text-primary">Our Story</h2>
          <p className="text-lg text-foreground/80 leading-relaxed">
            Specific Industries was founded by Bill Sambrone after a simple observation: some industries
            are so specific, so niche, so deeply underserved that no one had thought to build a
            dedicated brand for them. The firm&apos;s first acquisition followed within the quarter.
          </p>
          <p className="text-lg text-foreground/80 leading-relaxed">
            What began as a single venture into an overlooked market has grown into a portfolio of
            brands, each laser-focused on serving a specific industry with the dedication and
            expertise it deserves. We do not chase broad markets. We find the gaps that others
            walk right past and build something for the people standing in them.
          </p>

          <h2 className="text-3xl font-heading font-bold text-primary pt-8">Our Mission</h2>
          <p className="text-lg text-foreground/80 leading-relaxed">
            To identify, develop, and operate brands that serve markets too specific for anyone else
            to bother with. We believe that every industry — no matter how niche — deserves a
            company that takes it seriously.
          </p>

          <h2 className="text-3xl font-heading font-bold text-primary pt-8">Operating Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-2">
            <div>
              <h3 className="text-lg font-heading font-semibold text-primary mb-2">Market Specificity</h3>
              <p className="text-foreground/60 text-sm">We go where others will not — into markets so specific they barely have a name.</p>
            </div>
            <div>
              <h3 className="text-lg font-heading font-semibold text-primary mb-2">Vertical Dedication</h3>
              <p className="text-foreground/60 text-sm">Each brand receives our full attention. We do not do half-measures in niche markets.</p>
            </div>
            <div>
              <h3 className="text-lg font-heading font-semibold text-primary mb-2">Operational Rigor</h3>
              <p className="text-foreground/60 text-sm">We apply serious operational rigor to industries that most people do not know exist.</p>
            </div>
          </div>
        </div>
      </section>

      <MetricStrip metrics={metrics} />

      <section className="py-16 px-4 bg-secondary/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center mb-4 text-primary">Leadership</h2>
          <p className="text-center text-foreground/60 max-w-2xl mx-auto mb-12 text-sm">
            Four executives. Serving on the board of every portfolio company. Stable tenure since firm inception.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            {apexLeaders.map((leader) => (
              <LeaderCard
                key={leader.slug}
                portraitImage={leader.portraitImage}
                name={leader.name}
                title={leader.title}
                bio={leader.bio}
                detailHref={`/leadership/${leader.slug}`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

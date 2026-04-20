import { headers } from "next/headers"
import Image from "next/image"
import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { MetricStrip, type Metric } from "@/components/ui/metric-strip"
import { PressReleaseCard } from "@/components/ui/press-release-card"
import { LeaderCard } from "@/components/ui/leader-card"
import { verticals, verticalOrder } from "../data/verticals"
import { getAllPortfolioBrands, type PortfolioBrand } from "../data/portfolio-utils"
import { featuredHoldings, featuredJobs } from "../data/featured"
import { getRecentPressReleases } from "../data/press-releases"
import { getActiveApexLeaders } from "../data/leadership"
import { jobs } from "../data/careers"
import type { VerticalKey } from "@/themes"

const PRODUCTION_HOST = "specificindustries.com"

export default async function ApexHome() {
  const headersList = await headers()
  const host = headersList.get("host") || ""
  const isProduction = host.endsWith(PRODUCTION_HOST)

  const brands = getAllPortfolioBrands()
  const apexLeaders = getActiveApexLeaders()
  const featuredList = featuredHoldings
    .map((key) => brands.find((b) => b.subdomain === key))
    .filter((b): b is PortfolioBrand => !!b)

  const grouped: Record<VerticalKey, PortfolioBrand[]> = {
    "food-beverage": [],
    "consumer-household": [],
    "hygiene-wellness": [],
    "pets-specialty": [],
    "media-platforms": [],
    "professional-tech": [],
  }
  for (const brand of brands) {
    const key = brand.config.verticalKey
    if (key) grouped[key].push(brand)
  }
  for (const key of verticalOrder) {
    grouped[key].sort((a, b) => a.config.name.localeCompare(b.config.name))
  }

  const metrics: Metric[] = [
    { value: String(brands.length), label: "Active portfolio brands" },
    { value: "5", label: "Strategic verticals" },
    { value: "<11,000", label: "Max market participants" },
    { value: "1 of 4", label: "Board meetings attended" },
    { value: "$0", label: "Outside capital committed" },
    { value: "2019", label: "Founded" },
  ]

  const recentPress = getRecentPressReleases(3)

  const featuredRoleSlugs = featuredJobs.length > 0 ? featuredJobs : jobs.slice(0, 3).map((j) => j.slug)
  const featuredRoles = featuredRoleSlugs
    .map((s) => jobs.find((j) => j.slug === s))
    .filter((j): j is (typeof jobs)[number] => !!j)

  function brandHref(subdomain: string): string {
    return isProduction ? `https://${subdomain}.${PRODUCTION_HOST}` : `/?site=${subdomain}`
  }

  function truncate(t: string, max: number) {
    if (t.length <= max) return t
    return t.slice(0, max - 1).trimEnd() + "…"
  }

  return (
    <>
      <Hero
        headline="Building Enduring Value Across 33 Specific Industries"
        subheadline="A portfolio of brands targeting markets that, by most measures, arguably should not exist."
      />

      <section className="py-6 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/portfolio"
            className="inline-block px-6 py-3 rounded-lg bg-primary text-background font-heading font-semibold text-sm tracking-wide hover:opacity-90 transition-opacity mr-3"
          >
            Explore the Portfolio
          </Link>
          <Link
            href="/thesis"
            className="inline-block px-6 py-3 rounded-lg border border-primary/30 text-primary font-heading font-semibold text-sm tracking-wide hover:bg-primary/5 transition-colors"
          >
            Read our Thesis
          </Link>
        </div>
      </section>

      <MetricStrip metrics={metrics} />

      {featuredList.length > 0 && (
        <section className="py-14 px-4">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs uppercase tracking-[0.2em] text-foreground/50 font-heading mb-2">Q2 Portfolio Highlights</p>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-8">Featured Holdings</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {featuredList.map((brand) => (
                <a
                  key={brand.subdomain}
                  href={brandHref(brand.subdomain)}
                  className="group block rounded-lg border border-primary/10 bg-background overflow-hidden hover:border-primary/30 transition-colors"
                  style={{ borderTopColor: brand.config.theme.colors.primary, borderTopWidth: "4px" }}
                >
                  <div className="p-6">
                    <div className="relative w-12 h-12 mb-4">
                      <Image
                        src={`/sites/${brand.subdomain}/favicon.png`}
                        alt={`${brand.config.name} logo`}
                        fill
                        sizes="48px"
                        className="object-contain"
                      />
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-foreground/50 font-heading mb-1">
                      {brand.config.verticalKey && verticals[brand.config.verticalKey].displayName}
                    </p>
                    <h3 className="text-lg font-heading font-semibold text-primary leading-tight mb-2">
                      {brand.config.name}
                    </h3>
                    <p className="text-sm text-foreground/70 leading-snug">
                      {brand.config.tagline ?? truncate(brand.config.metadata.description, 100)}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-8 px-4 bg-secondary/10 border-y border-primary/10">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-foreground/50 font-heading mb-2">Portfolio</p>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary">Our Brands by Vertical</h2>
        </div>
      </section>

      {verticalOrder.map((key) => {
        const bs = grouped[key]
        if (bs.length === 0) return null
        const meta = verticals[key]
        return (
          <section key={key} className="py-10 px-4 border-b border-primary/5">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                <h3 className="text-xl md:text-2xl font-heading font-bold text-primary">{meta.displayName}</h3>
                <span className="text-xs uppercase tracking-[0.15em] text-foreground/50 font-heading">
                  {bs.length} {bs.length === 1 ? "brand" : "brands"}
                </span>
              </div>
              <p className="text-foreground/70 leading-relaxed max-w-3xl mb-6 text-sm">
                {meta.shortDescription}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {bs.map((brand) => (
                  <a
                    key={brand.subdomain}
                    href={brandHref(brand.subdomain)}
                    className="flex items-start gap-3 p-3 rounded-lg border border-primary/10 bg-background hover:border-primary/30 transition-colors"
                    style={{ borderTopColor: brand.config.theme.colors.primary, borderTopWidth: "3px" }}
                  >
                    <div className="relative w-8 h-8 flex-shrink-0">
                      <Image
                        src={`/sites/${brand.subdomain}/favicon.png`}
                        alt={`${brand.config.name} logo`}
                        fill
                        sizes="32px"
                        className="object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-heading font-semibold text-primary leading-tight mb-0.5">
                        {brand.config.name}
                      </h4>
                      <p className="text-xs text-foreground/60 leading-snug">
                        {brand.config.tagline ?? truncate(brand.config.metadata.description, 80)}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
              <div className="mt-4">
                <Link
                  href={`/portfolio?vertical=${key}`}
                  className="text-xs font-heading text-primary hover:underline uppercase tracking-wider"
                >
                  View all in {meta.displayName} →
                </Link>
              </div>
            </div>
          </section>
        )
      })}

      {recentPress.length > 0 && (
        <section className="py-14 px-4 bg-secondary/10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-8">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-foreground/50 font-heading mb-1">Newsroom</p>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary">Recent Announcements</h2>
              </div>
              <Link href="/newsroom" className="text-xs font-heading text-primary hover:underline uppercase tracking-wider">
                All press releases →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentPress.map((r) => (
                <PressReleaseCard
                  key={r.slug}
                  slug={r.slug}
                  date={r.date}
                  headline={r.headline}
                  lede={r.lede}
                  href={`/newsroom/${r.slug}`}
                  compact
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto rounded-xl border border-primary/20 p-10 text-center bg-background">
          <p className="text-xs uppercase tracking-[0.2em] text-foreground/50 font-heading mb-3">Partnerships</p>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-4">Have an Industry We Should Acquire?</h2>
          <p className="text-foreground/80 leading-relaxed mb-6">
            We are currently accepting submissions from founders and operators whose industries meet our evaluation criteria. Markets with fewer than 11,000 participants are of particular interest.
          </p>
          <Link
            href="/partnerships"
            className="inline-block px-6 py-3 rounded-lg bg-primary text-background font-heading font-semibold text-sm tracking-wide hover:opacity-90 transition-opacity"
          >
            Submit Your Industry for Evaluation
          </Link>
        </div>
      </section>

      <section className="py-14 px-4 bg-secondary/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-foreground/50 font-heading mb-1">Leadership</p>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary">Four Executives, Every Board</h2>
            </div>
            <Link href="/about" className="text-xs font-heading text-primary hover:underline uppercase tracking-wider">
              Meet the leadership →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {apexLeaders.map((leader) => (
              <LeaderCard
                key={leader.slug}
                portraitImage={leader.portraitImage}
                name={leader.name}
                title={leader.title}
                detailHref={`/leadership/${leader.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-foreground/50 font-heading mb-2">Careers</p>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-3">
            {jobs.length}+ Open Positions Across All Six Verticals
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto mb-8">
            We are hiring for roles in Food & Beverage; Consumer & Household Goods; Hygiene, Health & Wellness; Pets & Specialty Services; Media & Creator Platforms; Professional Services & Technology; and at Corporate HQ (Virtual).
          </p>
          {featuredRoles.length > 0 && (
            <ul className="mb-8 space-y-2 max-w-xl mx-auto">
              {featuredRoles.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/careers/${r.slug}`}
                    className="block p-4 rounded-lg border border-primary/10 bg-background hover:border-primary/30 transition-colors text-left"
                  >
                    <p className="font-heading font-semibold text-primary">{r.title}</p>
                    <p className="text-xs text-foreground/60 mt-1">
                      {r.employmentType} · {r.compensation.summary}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <Link
            href="/careers"
            className="inline-block px-6 py-3 rounded-lg bg-primary text-background font-heading font-semibold text-sm tracking-wide hover:opacity-90 transition-opacity"
          >
            View all openings
          </Link>
        </div>
      </section>
    </>
  )
}

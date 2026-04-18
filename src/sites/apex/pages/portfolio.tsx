import { headers } from "next/headers"
import { Hero } from "@/components/ui/hero"
import { PortfolioExplorer } from "./portfolio-explorer"
import { getAllPortfolioBrands, type PortfolioBrand } from "../data/portfolio-utils"

const PRODUCTION_HOST = "specificindustries.com"

export interface PortfolioBrandDTO {
  subdomain: string
  name: string
  tagline: string
  faviconSrc: string
  accentColor: string
  verticalKey: string
  isFeatured: boolean
  href: string
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text
  return text.slice(0, max - 1).trimEnd() + "…"
}

function brandToDto(brand: PortfolioBrand, isProduction: boolean): PortfolioBrandDTO {
  const href = isProduction
    ? `https://${brand.subdomain}.${PRODUCTION_HOST}`
    : `/?site=${brand.subdomain}`
  return {
    subdomain: brand.subdomain,
    name: brand.config.name,
    tagline: brand.config.tagline ?? truncate(brand.config.metadata.description, 80),
    faviconSrc: `/sites/${brand.subdomain}/favicon.png`,
    accentColor: brand.config.theme.colors.primary,
    verticalKey: brand.config.verticalKey ?? "",
    isFeatured: brand.isFeatured,
    href,
  }
}

export default async function ApexPortfolio() {
  const headersList = await headers()
  const host = headersList.get("host") || ""
  const isProduction = host.endsWith(PRODUCTION_HOST)

  const brands = getAllPortfolioBrands().map((b) => brandToDto(b, isProduction))

  return (
    <>
      <Hero
        headline="Portfolio Holdings"
        subheadline={`${brands.length} active portfolio brands across five strategic verticals.`}
      />

      <PortfolioExplorer brands={brands} />

      <section className="py-16 px-4 bg-secondary/10">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-heading font-bold text-primary mb-3">
            Missing from our portfolio?
          </h3>
          <p className="text-foreground/70 mb-6">
            If you believe your industry meets our evaluation criteria, we are currently accepting submissions for strategic consideration.
          </p>
          <a
            href="/partnerships"
            className="inline-block px-6 py-3 rounded-lg bg-primary text-background font-heading font-semibold text-sm tracking-wide hover:opacity-90 transition-opacity"
          >
            Submit Your Industry for Evaluation
          </a>
        </div>
      </section>
    </>
  )
}

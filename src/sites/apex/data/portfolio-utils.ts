import type { SiteConfig, VerticalKey } from "@/themes"
import { siteRegistry } from "@/sites/registry"
import { featuredHoldings } from "./featured"
import { verticalOrder } from "./verticals"

export interface PortfolioBrand {
  subdomain: string
  config: SiteConfig
  isFeatured: boolean
}

export function getAllPortfolioBrands(): PortfolioBrand[] {
  const featuredSet = new Set(featuredHoldings)
  return Object.entries(siteRegistry)
    .filter(([key, site]) => key !== "apex" && !!site.config.verticalKey)
    .map(([subdomain, site]) => ({
      subdomain,
      config: site.config,
      isFeatured: featuredSet.has(subdomain),
    }))
}

export function groupBrandsByVertical(): Record<VerticalKey, PortfolioBrand[]> {
  const brands = getAllPortfolioBrands()
  const grouped: Record<VerticalKey, PortfolioBrand[]> = {
    "consumer-goods": [],
    "hygiene": [],
    "health-wellness": [],
    "subscription-services": [],
    "professional-services": [],
  }
  for (const brand of brands) {
    const key = brand.config.verticalKey
    if (key) grouped[key].push(brand)
  }
  for (const key of verticalOrder) {
    grouped[key].sort((a, b) => a.config.name.localeCompare(b.config.name))
  }
  return grouped
}

export function getBrandsInVertical(
  verticalKey: VerticalKey | null
): PortfolioBrand[] {
  const brands = getAllPortfolioBrands()
  if (verticalKey === null) return brands
  return brands.filter((b) => b.config.verticalKey === verticalKey)
}

export function getPortfolioCount(): number {
  return getAllPortfolioBrands().length
}

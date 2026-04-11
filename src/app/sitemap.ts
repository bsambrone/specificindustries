import type { MetadataRoute } from "next"
import { siteRegistry } from "@/sites/registry"
import { products as pigmilkProducts } from "@/sites/pigmilk/data/products"
import { products as dehydratedwaterProducts } from "@/sites/dehydratedwater/data/products"
import { products as inflatableanchorsProducts } from "@/sites/inflatableanchors/data/products"
import { products as truegritProducts } from "@/sites/truegrit/data/products"
import { products as elderpartyProducts } from "@/sites/elderparty/data/products"
import { coalitions } from "@/sites/elderparty/data/coalitions"
import { articles as elderpartyArticles } from "@/sites/elderparty/data/news"
import { products as snortablesProducts } from "@/sites/snortables/data/products"
import { products as mousetrapjengaProducts } from "@/sites/mousetrapjenga/data/products"
import { products as bonelesswaterProducts } from "@/sites/bonelesswater/data/products"
import { fans as onlyfansFans } from "@/sites/onlyfans/data/fans"
import { pans as onlypansPans } from "@/sites/onlypans/data/pans"
import { shares } from "@/sites/grassfedwifi/data/shares"
import { fieldNotes } from "@/sites/grassfedwifi/data/field-notes"
import { solutions as strategicvoidSolutions } from "@/sites/strategicvoid/data/solutions"
import { products as strategicvoidProducts } from "@/sites/strategicvoid/data/products"
import { caseStudies } from "@/sites/strategicvoid/data/case-studies"
import { whitepapers } from "@/sites/strategicvoid/data/whitepapers"
import { onboardingSteps } from "@/sites/stratify/data/onboarding"

const BASE_DOMAIN = "specificindustries.com"
const EXCLUDED_PAGES = new Set(["cart", "checkout"])

function siteUrl(subdomain: string, path: string = ""): string {
  const base =
    subdomain === "apex"
      ? `https://${BASE_DOMAIN}`
      : `https://${subdomain}.${BASE_DOMAIN}`
  return path ? `${base}/${path}` : base
}

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = []

  // Static pages from all sites
  for (const [subdomain, site] of Object.entries(siteRegistry)) {
    for (const slug of Object.keys(site.pages)) {
      if (EXCLUDED_PAGES.has(slug)) continue
      urls.push({ url: siteUrl(subdomain, slug) })
    }
  }

  // Dynamic routes: product detail pages
  const productSites: Record<string, { slug: string }[]> = {
    pigmilk: pigmilkProducts,
    dehydratedwater: dehydratedwaterProducts,
    inflatableanchors: inflatableanchorsProducts,
    truegrit: truegritProducts,
    elderparty: elderpartyProducts,
    snortables: snortablesProducts,
    mousetrapjenga: mousetrapjengaProducts,
    bonelesswater: bonelesswaterProducts,
  }

  for (const [subdomain, products] of Object.entries(productSites)) {
    for (const product of products) {
      urls.push({ url: siteUrl(subdomain, `products/${product.slug}`) })
    }
  }

  // OnlyFans: fan profile pages at /browse/{slug}
  for (const fan of onlyfansFans) {
    urls.push({ url: siteUrl("onlyfans", `browse/${fan.slug}`) })
  }

  // OnlyPans: pan profile pages at /browse/{slug}
  for (const pan of onlypansPans) {
    urls.push({ url: siteUrl("onlypans", `browse/${pan.slug}`) })
  }

  // Grass Fed WiFi: shares, field notes
  for (const share of shares) {
    urls.push({ url: siteUrl("grassfedwifi", `shares/${share.slug}`) })
  }
  for (const note of fieldNotes) {
    urls.push({ url: siteUrl("grassfedwifi", `field-notes/${note.slug}`) })
  }

  // Elder Party: coalitions, news
  for (const coalition of coalitions) {
    urls.push({ url: siteUrl("elderparty", `coalitions/${coalition.slug}`) })
  }
  for (const article of elderpartyArticles) {
    urls.push({ url: siteUrl("elderparty", `news/${article.slug}`) })
  }

  // Strategic Void: solutions, solution/product combos, case studies, whitepapers
  for (const solution of strategicvoidSolutions) {
    urls.push({
      url: siteUrl("strategicvoid", `solutions/${solution.slug}`),
    })
  }
  for (const product of strategicvoidProducts) {
    urls.push({
      url: siteUrl(
        "strategicvoid",
        `solutions/${product.solutionArea}/${product.slug}`
      ),
    })
  }
  for (const caseStudy of caseStudies) {
    urls.push({
      url: siteUrl("strategicvoid", `case-studies/${caseStudy.slug}`),
    })
  }
  for (const whitepaper of whitepapers) {
    urls.push({
      url: siteUrl("strategicvoid", `whitepapers/${whitepaper.slug}`),
    })
  }

  // Stratify: onboarding steps
  for (const step of onboardingSteps) {
    urls.push({ url: siteUrl("stratify", `onboarding/${step.slug}`) })
  }

  return urls
}

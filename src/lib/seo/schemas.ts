import type { JsonLdValue, SiteConfig } from "@/themes"
import { absoluteImage, siteOrigin, siteUrl } from "./url"

function stripUndefined<T extends Record<string, unknown>>(obj: T): T {
  const out: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue
    if (Array.isArray(v) && v.length === 0) continue
    out[k] = v
  }
  return out as T
}

export function organizationSchema(site: SiteConfig): JsonLdValue {
  const subdomain = site.subdomain
  const url = siteOrigin(subdomain)
  const parent = site.metadata.parentOrganization
  return stripUndefined({
    "@context": "https://schema.org",
    "@type": site.metadata.organizationType ?? "Organization",
    "@id": `${url}#organization`,
    name: site.name,
    url,
    description: site.metadata.description,
    logo: absoluteImage(subdomain, site.metadata.logo ?? site.metadata.ogImage),
    image: absoluteImage(subdomain, site.metadata.ogImage),
    sameAs: site.metadata.sameAs,
    founder: site.metadata.founders?.map((name) => ({ "@type": "Person", name })),
    foundingDate: site.metadata.foundingDate,
    parentOrganization: parent
      ? { "@type": "Organization", name: parent, url: siteOrigin("apex") }
      : undefined,
  })
}

export function websiteSchema(site: SiteConfig): JsonLdValue {
  const subdomain = site.subdomain
  const url = siteOrigin(subdomain)
  return stripUndefined({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${url}#website`,
    name: site.name,
    url,
    description: site.metadata.description,
    publisher: { "@id": `${url}#organization` },
  })
}

export interface BreadcrumbCrumb {
  name: string
  path: string
}

export function breadcrumbSchema(
  subdomain: string,
  crumbs: BreadcrumbCrumb[]
): JsonLdValue {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: siteUrl(subdomain, c.path),
    })),
  }
}

export interface ProductInput {
  name: string
  slug: string
  description?: string
  tagline?: string
  image?: string
  price?: number | string
  priceCurrency?: string
  availability?: string
  sku?: string
  brand?: string
  category?: string
}

export function productSchema(
  subdomain: string,
  productPath: string,
  product: ProductInput,
  siteName: string
): JsonLdValue {
  const desc = product.description ?? product.tagline
  const offers =
    product.price !== undefined
      ? stripUndefined({
          "@type": "Offer",
          price: String(product.price),
          priceCurrency: product.priceCurrency ?? "USD",
          availability:
            product.availability ?? "https://schema.org/InStock",
          url: siteUrl(subdomain, productPath),
        })
      : undefined
  return stripUndefined({
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: desc,
    image: absoluteImage(subdomain, product.image),
    sku: product.sku ?? product.slug,
    category: product.category,
    brand: { "@type": "Brand", name: product.brand ?? siteName },
    offers,
    url: siteUrl(subdomain, productPath),
  })
}

export interface ArticleInput {
  headline: string
  slug: string
  description?: string
  image?: string
  datePublished?: string
  dateModified?: string
  author?: string | string[]
  section?: string
  keywords?: string[]
}

export function articleSchema(
  subdomain: string,
  articlePath: string,
  article: ArticleInput,
  site: SiteConfig,
  articleType: "Article" | "NewsArticle" | "BlogPosting" = "Article"
): JsonLdValue {
  const authors = Array.isArray(article.author)
    ? article.author
    : article.author
      ? [article.author]
      : [site.name]
  return stripUndefined({
    "@context": "https://schema.org",
    "@type": articleType,
    headline: article.headline,
    description: article.description,
    image: absoluteImage(subdomain, article.image ?? site.metadata.ogImage),
    datePublished: article.datePublished,
    dateModified: article.dateModified ?? article.datePublished,
    author: authors.map((name) => ({ "@type": "Person", name })),
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: absoluteImage(
        subdomain,
        site.metadata.logo ?? site.metadata.ogImage
      ),
    },
    articleSection: article.section,
    keywords: article.keywords?.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": siteUrl(subdomain, articlePath),
    },
  })
}

export interface JobPostingInput {
  title: string
  slug: string
  description: string
  datePosted?: string
  validThrough?: string
  employmentType?: string
  location?: { city?: string; region?: string; country?: string; remote?: boolean }
  baseSalary?: { min?: number; max?: number; currency?: string; unit?: string }
  hiringOrganization?: string
}

export function jobPostingSchema(
  subdomain: string,
  jobPath: string,
  job: JobPostingInput,
  site: SiteConfig
): JsonLdValue {
  const loc = job.location
  const jobLocation = loc
    ? stripUndefined({
        "@type": "Place",
        address: stripUndefined({
          "@type": "PostalAddress",
          addressLocality: loc.city,
          addressRegion: loc.region,
          addressCountry: loc.country ?? "US",
        }),
      })
    : undefined
  const salary = job.baseSalary
    ? stripUndefined({
        "@type": "MonetaryAmount",
        currency: job.baseSalary.currency ?? "USD",
        value: stripUndefined({
          "@type": "QuantitativeValue",
          minValue: job.baseSalary.min,
          maxValue: job.baseSalary.max,
          unitText: job.baseSalary.unit ?? "YEAR",
        }),
      })
    : undefined
  return stripUndefined({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.datePosted,
    validThrough: job.validThrough,
    employmentType: job.employmentType,
    hiringOrganization: {
      "@type": "Organization",
      name: job.hiringOrganization ?? site.name,
      sameAs: siteOrigin(subdomain),
      logo: absoluteImage(
        subdomain,
        site.metadata.logo ?? site.metadata.ogImage
      ),
    },
    jobLocation,
    jobLocationType: loc?.remote ? "TELECOMMUTE" : undefined,
    applicantLocationRequirements: loc?.remote
      ? { "@type": "Country", name: loc.country ?? "USA" }
      : undefined,
    baseSalary: salary,
    url: siteUrl(subdomain, jobPath),
  })
}

export interface PersonInput {
  name: string
  slug: string
  title?: string
  bio?: string
  image?: string
  sameAs?: string[]
}

export function personSchema(
  subdomain: string,
  personPath: string,
  person: PersonInput,
  site: SiteConfig
): JsonLdValue {
  return stripUndefined({
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: person.title,
    description: person.bio,
    image: absoluteImage(subdomain, person.image),
    sameAs: person.sameAs,
    worksFor: {
      "@type": "Organization",
      name: site.name,
      url: siteOrigin(subdomain),
    },
    url: siteUrl(subdomain, personPath),
  })
}

export interface ServiceInput {
  name: string
  slug: string
  description?: string
  image?: string
  serviceType?: string
  areaServed?: string
  provider?: string
}

export function serviceSchema(
  subdomain: string,
  servicePath: string,
  service: ServiceInput,
  site: SiteConfig
): JsonLdValue {
  return stripUndefined({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    image: absoluteImage(subdomain, service.image),
    serviceType: service.serviceType,
    areaServed: service.areaServed,
    provider: {
      "@type": "Organization",
      name: service.provider ?? site.name,
      url: siteOrigin(subdomain),
    },
    url: siteUrl(subdomain, servicePath),
  })
}

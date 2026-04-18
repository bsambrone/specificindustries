import { headers } from "next/headers"
import { notFound } from "next/navigation"
import { siteRegistry } from "@/sites/registry"
import type { Metadata } from "next"
import type { JsonLdValue, PageWithMetadata, SiteModule } from "@/themes"
import { JsonLd } from "@/components/seo/JsonLd"
import {
  breadcrumbSchema,
  organizationSchema,
  websiteSchema,
  type BreadcrumbCrumb,
} from "@/lib/seo/schemas"
import { siteOrigin } from "@/lib/seo/url"

interface PageProps {
  params: Promise<{ slug?: string[] }>
}

function toTitleCase(slug: string): string {
  return slug
    .split("-")
    .map((part) => (part ? part[0].toUpperCase() + part.slice(1) : part))
    .join(" ")
}

function navLabelFor(site: SiteModule, segment: string): string | undefined {
  const match = site.config.nav.find(
    (n) => n.path.replace(/^\//, "") === segment
  )
  return match?.label
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const headersList = await headers()
  const subdomain = headersList.get("x-subdomain") || "apex"
  const site = siteRegistry[subdomain]

  if (!site) return {}

  const path = slug?.join("/") || ""
  const pageEntry = site.pages[path]

  let pageMetadata = pageEntry && typeof pageEntry === "object" && "metadata" in pageEntry
    ? (pageEntry as PageWithMetadata).metadata
    : undefined

  if (!pageMetadata && !pageEntry) {
    const segments = path.split("/")
    if (segments.length >= 2 && site.dynamicRoutes?.[segments[0]]) {
      const route = site.dynamicRoutes[segments[0]]
      const maxSegs = route.maxSegments ?? 1
      const dynamicSegments = segments.slice(1)

      if (dynamicSegments.length >= 1 && dynamicSegments.length <= maxSegs) {
        const primarySlug = dynamicSegments[0]
        pageMetadata = route.getMetadata?.(primarySlug, dynamicSegments.length > 1 ? dynamicSegments : undefined) ?? undefined
      }
    }
  }

  const title = pageMetadata?.title || site.config.metadata.title
  const description = pageMetadata?.description || site.config.metadata.description
  const ogImage = pageMetadata?.ogImage || site.config.metadata.ogImage

  const baseUrl = siteOrigin(subdomain)
  const canonicalPath = path ? `/${path}` : "/"

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      siteName: site.config.name,
      type: "website",
      url: `${baseUrl}${canonicalPath}`,
      images: ogImage ? [{ url: ogImage, alt: site.config.name }] : [],
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
    other: {
      classification: "satire, entertainment, humor",
    },
  }
}

function buildBreadcrumbs(
  site: SiteModule,
  path: string,
  dynamicRouteKey?: string,
  dynamicSegments?: string[]
): BreadcrumbCrumb[] {
  const crumbs: BreadcrumbCrumb[] = [{ name: "Home", path: "" }]
  if (!path) return crumbs

  const segs = path.split("/")

  if (dynamicRouteKey) {
    const route = site.dynamicRoutes?.[dynamicRouteKey]
    const sectionLabel =
      route?.breadcrumbSectionLabel ??
      navLabelFor(site, dynamicRouteKey) ??
      toTitleCase(dynamicRouteKey)
    crumbs.push({ name: sectionLabel, path: dynamicRouteKey })

    if (dynamicSegments && route) {
      let accPath = dynamicRouteKey
      dynamicSegments.forEach((seg, idx) => {
        accPath = `${accPath}/${seg}`
        const isLast = idx === dynamicSegments.length - 1
        const primary = dynamicSegments[0]
        const label =
          isLast && route.getBreadcrumbLabel
            ? (route.getBreadcrumbLabel(primary, dynamicSegments) ??
              toTitleCase(seg))
            : toTitleCase(seg)
        crumbs.push({ name: label, path: accPath })
      })
    }
    return crumbs
  }

  // Static page: just Home > Current
  const lastSeg = segs[segs.length - 1]
  const entry = site.pages[path]
  const explicitLabel =
    entry && typeof entry === "object" && "breadcrumbLabel" in entry
      ? (entry as PageWithMetadata).breadcrumbLabel
      : undefined
  const label =
    explicitLabel ?? navLabelFor(site, path) ?? toTitleCase(lastSeg)
  crumbs.push({ name: label, path })
  return crumbs
}

function collectJsonLd(
  site: SiteModule,
  subdomain: string,
  path: string,
  pageEntry: import("@/themes").PageEntry | undefined,
  dynamicRouteKey: string | undefined,
  dynamicSegments: string[] | undefined
): JsonLdValue[] {
  const out: JsonLdValue[] = []

  if (!path) {
    // Homepage: Organization + WebSite
    out.push(organizationSchema(site.config))
    out.push(websiteSchema(site.config))
  } else {
    // Inner pages: BreadcrumbList
    out.push(buildBreadcrumbListJsonLd(site, subdomain, path, dynamicRouteKey, dynamicSegments))
  }

  // Page-level explicit jsonLd
  if (pageEntry && typeof pageEntry === "object" && "jsonLd" in pageEntry) {
    const jld = (pageEntry as PageWithMetadata).jsonLd
    if (jld) {
      out.push(...(Array.isArray(jld) ? jld : [jld]))
    }
  }

  // Dynamic-route jsonLd
  if (dynamicRouteKey && dynamicSegments && site.dynamicRoutes) {
    const route = site.dynamicRoutes[dynamicRouteKey]
    const extra = route.getJsonLd?.(dynamicSegments[0], dynamicSegments)
    if (extra) {
      out.push(...(Array.isArray(extra) ? extra : [extra]))
    }
  }

  return out
}

function buildBreadcrumbListJsonLd(
  site: SiteModule,
  subdomain: string,
  path: string,
  dynamicRouteKey: string | undefined,
  dynamicSegments: string[] | undefined
): JsonLdValue {
  const crumbs = buildBreadcrumbs(site, path, dynamicRouteKey, dynamicSegments)
  return breadcrumbSchema(subdomain, crumbs)
}

export default async function CatchAllPage({ params }: PageProps) {
  const { slug } = await params
  const headersList = await headers()
  const subdomain = headersList.get("x-subdomain") || "apex"
  const site = siteRegistry[subdomain]

  if (!site) {
    notFound()
  }

  const path = slug?.join("/") || ""
  const pageEntry = site.pages[path]

  let dynamicRouteKey: string | undefined
  let dynamicSegments: string[] | undefined
  let DynamicComponent: React.ComponentType<{ slug: string; segments?: string[] }> | undefined
  let primarySlug: string | undefined

  if (!pageEntry) {
    const segments = path.split("/")
    if (segments.length >= 2 && site.dynamicRoutes?.[segments[0]]) {
      const route = site.dynamicRoutes[segments[0]]
      const maxSegs = route.maxSegments ?? 1
      const segTail = segments.slice(1)

      if (segTail.length >= 1 && segTail.length <= maxSegs) {
        const primary = segTail[0]
        if (route.isValidSlug && !route.isValidSlug(primary, segTail.length > 1 ? segTail : undefined)) {
          notFound()
        }
        dynamicRouteKey = segments[0]
        dynamicSegments = segTail
        primarySlug = primary
        DynamicComponent = route.component
      }
    }
    if (!DynamicComponent) notFound()
  }

  const jsonLd = collectJsonLd(site, subdomain, path, pageEntry, dynamicRouteKey, dynamicSegments)

  if (DynamicComponent && primarySlug) {
    return (
      <>
        {jsonLd.length > 0 && <JsonLd data={jsonLd} />}
        <DynamicComponent slug={primarySlug} segments={dynamicSegments} />
      </>
    )
  }

  const PageComponent = typeof pageEntry === "function"
    ? pageEntry
    : (pageEntry as PageWithMetadata).component

  return (
    <>
      {jsonLd.length > 0 && <JsonLd data={jsonLd} />}
      <PageComponent />
    </>
  )
}

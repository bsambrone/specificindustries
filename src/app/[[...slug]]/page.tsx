import { headers } from "next/headers"
import { notFound } from "next/navigation"
import { siteRegistry } from "@/sites/registry"
import type { Metadata } from "next"
import type { PageWithMetadata } from "@/themes"

interface PageProps {
  params: Promise<{ slug?: string[] }>
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

  const baseUrl = subdomain === "apex"
    ? "https://specificindustries.com"
    : `https://${subdomain}.specificindustries.com`

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: site.config.name,
      type: "website",
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

  if (!pageEntry) {
    // Check dynamic routes (e.g., /products/slug or /solutions/area/product)
    const segments = path.split("/")
    if (segments.length >= 2 && site.dynamicRoutes?.[segments[0]]) {
      const route = site.dynamicRoutes[segments[0]]
      const maxSegs = route.maxSegments ?? 1
      const dynamicSegments = segments.slice(1)

      if (dynamicSegments.length >= 1 && dynamicSegments.length <= maxSegs) {
        const primarySlug = dynamicSegments[0]
        if (route.isValidSlug && !route.isValidSlug(primarySlug, dynamicSegments.length > 1 ? dynamicSegments : undefined)) {
          notFound()
        }
        const DynamicComponent = route.component
        return <DynamicComponent slug={primarySlug} segments={dynamicSegments} />
      }
    }
    notFound()
  }

  // Support both bare components and { component, metadata } objects
  const PageComponent = typeof pageEntry === "function"
    ? pageEntry
    : (pageEntry as PageWithMetadata).component

  return <PageComponent />
}

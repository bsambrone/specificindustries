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

  // Check for per-page metadata override
  const pageMetadata = pageEntry && typeof pageEntry === "object" && "metadata" in pageEntry
    ? (pageEntry as PageWithMetadata).metadata
    : undefined

  // Check dynamic routes for metadata
  if (!pageMetadata && !pageEntry) {
    const segments = path.split("/")
    if (segments.length === 2 && site.dynamicRoutes?.[segments[0]]) {
      const route = site.dynamicRoutes[segments[0]]
      const dynamicMeta = route.getMetadata?.(segments[1])
      if (dynamicMeta) {
        return {
          title: dynamicMeta.title || site.config.metadata.title,
          description: dynamicMeta.description || site.config.metadata.description,
          openGraph: {
            title: dynamicMeta.title || site.config.metadata.title,
            description: dynamicMeta.description || site.config.metadata.description,
            images: site.config.metadata.ogImage ? [site.config.metadata.ogImage] : [],
          },
          other: {
            classification: "satire, entertainment, humor",
          },
        }
      }
    }
  }

  return {
    title: pageMetadata?.title || site.config.metadata.title,
    description: pageMetadata?.description || site.config.metadata.description,
    openGraph: {
      title: pageMetadata?.title || site.config.metadata.title,
      description: pageMetadata?.description || site.config.metadata.description,
      images: site.config.metadata.ogImage ? [site.config.metadata.ogImage] : [],
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
    // Check dynamic routes (e.g., /products/classic-pig-milk)
    const segments = path.split("/")
    if (segments.length === 2 && site.dynamicRoutes?.[segments[0]]) {
      const route = site.dynamicRoutes[segments[0]]
      const dynamicSlug = segments[1]
      if (route.isValidSlug && !route.isValidSlug(dynamicSlug)) {
        notFound()
      }
      const DynamicComponent = route.component
      return <DynamicComponent slug={dynamicSlug} />
    }
    notFound()
  }

  // Support both bare components and { component, metadata } objects
  const PageComponent = typeof pageEntry === "function"
    ? pageEntry
    : (pageEntry as PageWithMetadata).component

  return <PageComponent />
}

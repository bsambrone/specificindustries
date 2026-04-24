import { config } from "./config"
import type { PageEntry } from "@/themes"
import type { DynamicRoute } from "@/themes"
import PointlessMetricsHome from "./pages/home"
import PointlessMetricsAbout, { metadata as aboutMetadata } from "./pages/about"
import PointlessMetricsMethodology, { metadata as methodologyMetadata } from "./pages/methodology"
import PointlessMetricsShop, { metadata as shopMetadata } from "./pages/shop"
import PointlessMetricsFindings from "./pages/findings"
import ProductDetail from "./pages/product-detail"
import FindingDetail from "./pages/finding-detail"
import { getProductBySlug } from "./data/products"
import { getFindingBySlug } from "./data/findings"
import { productSchema } from "@/lib/seo/schemas"

export { config }

export const pages: Record<string, PageEntry> = {
  "": PointlessMetricsHome,
  "about": { component: PointlessMetricsAbout, metadata: aboutMetadata },
  "methodology": { component: PointlessMetricsMethodology, metadata: methodologyMetadata },
  "shop": { component: PointlessMetricsShop, metadata: shopMetadata },
  "findings": {
    component: PointlessMetricsFindings,
    metadata: {
      title: "Findings Archive — ISPM",
      description: "All 24 peer-reviewed findings from the Institute for the Study of Pointless Metrics.",
    },
  },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: ProductDetail,
    getMetadata: (slug: string) => {
      const p = getProductBySlug(slug)
      return p
        ? {
            title: `${p.name} — ISPM`,
            description: p.tagline,
            ogImage: p.image,
          }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
    getBreadcrumbLabel: (slug: string) => getProductBySlug(slug)?.name,
    breadcrumbSectionLabel: "Shop",
    getJsonLd: (slug: string) => {
      const p = getProductBySlug(slug)
      if (!p) return undefined
      return productSchema(
        "pointlessmetrics",
        `products/${p.slug}`,
        {
          name: p.name,
          slug: p.slug,
          description: Array.isArray(p.description) ? p.description.join(" ") : p.description,
          tagline: p.tagline,
          image: p.image,
          price: p.price,
        },
        config.name
      )
    },
  },
  findings: {
    component: FindingDetail,
    getMetadata: (slug: string) => {
      const f = getFindingBySlug(slug)
      return f
        ? {
            title: `${f.title} — ISPM Finding`,
            description: f.claim,
          }
        : undefined
    },
    isValidSlug: (slug: string) => !!getFindingBySlug(slug),
    getBreadcrumbLabel: (slug: string) => getFindingBySlug(slug)?.title,
    breadcrumbSectionLabel: "Findings",
  },
}

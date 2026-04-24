import { config } from "./config"
import type { PageEntry } from "@/themes"
import type { DynamicRoute } from "@/themes"
import PointlessMetricsHome from "./pages/home"
import PointlessMetricsAbout, { metadata as aboutMetadata } from "./pages/about"
import PointlessMetricsMethodology, { metadata as methodologyMetadata } from "./pages/methodology"
import PointlessMetricsShop, { metadata as shopMetadata } from "./pages/shop"
import ProductDetail from "./pages/product-detail"
import { getProductBySlug } from "./data/products"
import { productSchema } from "@/lib/seo/schemas"

export { config }

export const pages: Record<string, PageEntry> = {
  "": PointlessMetricsHome,
  "about": { component: PointlessMetricsAbout, metadata: aboutMetadata },
  "methodology": { component: PointlessMetricsMethodology, metadata: methodologyMetadata },
  "shop": { component: PointlessMetricsShop, metadata: shopMetadata },
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
}

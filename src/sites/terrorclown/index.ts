import type { PageEntry, DynamicRoute } from "@/themes"
import { config } from "./config"
import TerrorClownHome from "./pages/home"
import TerrorClownProducts, { metadata as productsMetadata } from "./pages/products"
import TerrorClownProductDetail from "./pages/product-detail"
import TerrorClownAbout, { metadata as aboutMetadata } from "./pages/about"
import TerrorClownLeadership, { metadata as leadershipMetadata } from "./pages/leadership"
import TerrorClownSafety, { metadata as safetyMetadata } from "./pages/safety"
import TerrorClownFaq, { metadata as faqMetadata } from "./pages/faq"
import { getProductBySlug } from "./data/products"

export { config }

export const pages: Record<string, PageEntry> = {
  "": TerrorClownHome,
  "products": { component: TerrorClownProducts, metadata: productsMetadata },
  "about": { component: TerrorClownAbout, metadata: aboutMetadata },
  "leadership": { component: TerrorClownLeadership, metadata: leadershipMetadata },
  "safety": { component: TerrorClownSafety, metadata: safetyMetadata },
  "faq": { component: TerrorClownFaq, metadata: faqMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: TerrorClownProductDetail,
    getMetadata: (slug: string) => {
      const p = getProductBySlug(slug)
      return p
        ? {
            title: `${p.name} — The Pennywhistle Play Company`,
            description: p.tagline,
            ogImage: p.image,
          }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
    getBreadcrumbLabel: (slug: string) => getProductBySlug(slug)?.name,
    breadcrumbSectionLabel: "Catalog",
  },
}

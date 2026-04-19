import type { PageEntry, DynamicRoute } from "@/themes"
import { config } from "./config"
import PrechewedHome from "./pages/home"
import PrechewedProducts, { metadata as productsMetadata } from "./pages/products"
import PrechewedProductDetail from "./pages/product-detail"
import PrechewedBolus, { metadata as bolusMetadata } from "./pages/bolus"
import PrechewedScience, { metadata as scienceMetadata } from "./pages/science"
import PrechewedProcess, { metadata as processMetadata } from "./pages/process"
import PrechewedFaq, { metadata as faqMetadata } from "./pages/faq"
import { getProductBySlug } from "./data/products"

export { config }

export const pages: Record<string, PageEntry> = {
  "": PrechewedHome,
  "products": { component: PrechewedProducts, metadata: productsMetadata },
  "bolus": { component: PrechewedBolus, metadata: bolusMetadata },
  "science": { component: PrechewedScience, metadata: scienceMetadata },
  "process": { component: PrechewedProcess, metadata: processMetadata },
  "faq": { component: PrechewedFaq, metadata: faqMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: PrechewedProductDetail,
    getMetadata: (slug: string) => {
      const p = getProductBySlug(slug)
      return p
        ? {
            title: `${p.name} — Prechewed™`,
            description: p.tagline,
            ogImage: p.image,
          }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
    getBreadcrumbLabel: (slug: string) => getProductBySlug(slug)?.name,
    breadcrumbSectionLabel: "Products",
  },
}

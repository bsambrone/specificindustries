import type { PageEntry, DynamicRoute } from "@/themes"
import { config } from "./config"
import { getProductBySlug } from "./data/products"
import SuperengineeredHome from "./pages/home"
import SuperengineeredProductDetail from "./pages/product-detail"
import SuperengineeredShop, { metadata as shopMetadata } from "./pages/shop"

export { config }

export const pages: Record<string, PageEntry> = {
  "": SuperengineeredHome,
  "shop": { component: SuperengineeredShop, metadata: shopMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: SuperengineeredProductDetail,
    getMetadata: (slug: string) => {
      const p = getProductBySlug(slug)
      return p
        ? {
            title: `${p.name} — Superengineered`,
            description: p.tagline,
            ogImage: p.heroImage,
          }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
  },
}

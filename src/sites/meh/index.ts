import type { PageEntry, DynamicRoute } from "@/themes"
import { config } from "./config"
import { getProductBySlug } from "./data/products"
import MehHome from "./pages/home"
import MehProducts, { metadata as productsMetadata } from "./pages/products"
import ProductDetail from "./pages/product-detail"
import MehManifesto, { metadata as manifestoMetadata } from "./pages/manifesto"
import MehPress, { metadata as pressMetadata } from "./pages/press"

export { config }

export const pages: Record<string, PageEntry> = {
  "": MehHome,
  "products": { component: MehProducts, metadata: productsMetadata },
  "manifesto": { component: MehManifesto, metadata: manifestoMetadata },
  "press": { component: MehPress, metadata: pressMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: ProductDetail,
    getMetadata: (slug: string) => {
      const p = getProductBySlug(slug)
      return p
        ? { title: `${p.name} — Meh.`, description: p.tagline, ogImage: p.image }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
  },
}

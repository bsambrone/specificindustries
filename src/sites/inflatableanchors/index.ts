import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import InflatableAnchorsHome from "./pages/home"
import { getProductBySlug } from "./data/products"
import InflatableAnchorsProducts, { metadata as productsMetadata } from "./pages/products"
import ProductDetail from "./pages/product-detail"

export { config }

export const pages: Record<string, PageEntry> = {
  "": InflatableAnchorsHome,
  "products": { component: InflatableAnchorsProducts, metadata: productsMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: ProductDetail,
    getMetadata: (slug: string) => {
      const product = getProductBySlug(slug)
      return product
        ? { title: `${product.name} — Inflatable Anchors Co.`, description: product.tagline }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
  },
}

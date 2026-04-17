import type { PageEntry, DynamicRoute } from "@/themes"
import { config } from "./config"
import { getProductBySlug } from "./data/products"
import CarterAndFilsHome from "./pages/home"
import CarterAndFilsCellar, { metadata as cellarMetadata } from "./pages/cellar"
import ProductDetail from "./pages/product-detail"

export { config }

export const pages: Record<string, PageEntry> = {
  "": CarterAndFilsHome,
  "cellar": { component: CarterAndFilsCellar, metadata: cellarMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  cellar: {
    component: ProductDetail,
    getMetadata: (slug: string) => {
      const product = getProductBySlug(slug)
      return product
        ? { title: `${product.name} — Domaine Carter & Fils`, description: product.tagline, ogImage: product.image }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
  },
}

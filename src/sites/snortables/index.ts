import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import { getProductBySlug } from "./data/products"
import SnortablesHome from "./pages/home"
import SnortablesProducts, { metadata as productsMetadata } from "./pages/products"
import SnortablesProcess, { metadata as processMetadata } from "./pages/process"
import SnortablesTestimonials, { metadata as testimonialsMetadata } from "./pages/testimonials"
import ProductDetail from "./pages/product-detail"

export { config }

export const pages: Record<string, PageEntry> = {
  "": SnortablesHome,
  "products": { component: SnortablesProducts, metadata: productsMetadata },
  "process": { component: SnortablesProcess, metadata: processMetadata },
  "testimonials": { component: SnortablesTestimonials, metadata: testimonialsMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: ProductDetail,
    getMetadata: (slug: string) => {
      const product = getProductBySlug(slug)
      return product
        ? { title: `${product.name} — Snortables`, description: product.tagline }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
  },
}

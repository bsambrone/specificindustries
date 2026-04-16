import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import { getProductBySlug } from "./data/products"
import RadiumRoysHome from "./pages/home"
import RadiumRoysProducts, { metadata as productsMetadata } from "./pages/products"
import ProductDetail from "./pages/product-detail"
import RadiumRoysAbout, { metadata as aboutMetadata } from "./pages/about"
import RadiumRoysStandards, { metadata as standardsMetadata } from "./pages/standards"
import RadiumRoysTestimonials, { metadata as testimonialsMetadata } from "./pages/testimonials"

export { config }

export const pages: Record<string, PageEntry> = {
  "": RadiumRoysHome,
  "products": { component: RadiumRoysProducts, metadata: productsMetadata },
  "about": { component: RadiumRoysAbout, metadata: aboutMetadata },
  "standards": { component: RadiumRoysStandards, metadata: standardsMetadata },
  "testimonials": { component: RadiumRoysTestimonials, metadata: testimonialsMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: ProductDetail,
    getMetadata: (slug: string) => {
      const product = getProductBySlug(slug)
      return product
        ? { title: `${product.name} — Radium Roy's`, description: product.tagline, ogImage: product.image }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
  },
}

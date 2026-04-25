import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import { getProductBySlug } from "./data/products"
import BoomfunHome from "./pages/home"
import BoomfunProducts, { metadata as productsMetadata } from "./pages/products"
import BoomfunProductDetail from "./pages/product-detail"
import BoomfunSafety, { metadata as safetyMetadata } from "./pages/safety"
import BoomfunClub, { metadata as clubMetadata } from "./pages/club"
import BoomfunTestimonials, { metadata as testimonialsMetadata } from "./pages/testimonials"
import BoomfunAbout, { metadata as aboutMetadata } from "./pages/about"
import BoomfunContact, { metadata as contactMetadata } from "./pages/contact"
import BoomfunPrivacy, { metadata as privacyMetadata } from "./pages/privacy"

export { config }

export const pages: Record<string, PageEntry> = {
  "": BoomfunHome,
  "products": { component: BoomfunProducts, metadata: productsMetadata },
  "safety": { component: BoomfunSafety, metadata: safetyMetadata },
  "club": { component: BoomfunClub, metadata: clubMetadata },
  "testimonials": { component: BoomfunTestimonials, metadata: testimonialsMetadata },
  "about": { component: BoomfunAbout, metadata: aboutMetadata },
  "contact": { component: BoomfunContact, metadata: contactMetadata },
  "privacy": { component: BoomfunPrivacy, metadata: privacyMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: BoomfunProductDetail,
    getMetadata: (slug: string) => {
      const product = getProductBySlug(slug)
      return product
        ? {
            title: `${product.name} — Boom-Fun!`,
            description: product.tagline,
            ogImage: product.image,
          }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
    getBreadcrumbLabel: (slug: string) => getProductBySlug(slug)?.name,
    breadcrumbSectionLabel: "Products",
  },
}

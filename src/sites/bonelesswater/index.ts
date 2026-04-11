import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import { getProductBySlug } from "./data/products"

import BonelessWaterHome from "./pages/home"
import BonelessWaterProducts, { metadata as productsMetadata } from "./pages/products"
import BonelessWaterComparison, { metadata as comparisonMetadata } from "./pages/comparison"
import BonelessWaterProcess, { metadata as processMetadata } from "./pages/process"
import BonelessWaterResearch, { metadata as researchMetadata } from "./pages/research"
import BonelessWaterAbout, { metadata as aboutMetadata } from "./pages/about"
import BonelessWaterTestimonials, { metadata as testimonialsMetadata } from "./pages/testimonials"
import BonelessWaterContact, { metadata as contactMetadata } from "./pages/contact"
import BonelessWaterCart from "./pages/cart"
import BonelessWaterCheckout from "./pages/checkout"
import BonelessWaterPrivacy, { metadata as privacyMetadata } from "./pages/privacy"
import BonelessWaterTerms, { metadata as termsMetadata } from "./pages/terms"
import ProductDetail from "./pages/product-detail"

export { config }

export const pages: Record<string, PageEntry> = {
  "": BonelessWaterHome,
  "products": { component: BonelessWaterProducts, metadata: productsMetadata },
  "comparison": { component: BonelessWaterComparison, metadata: comparisonMetadata },
  "process": { component: BonelessWaterProcess, metadata: processMetadata },
  "research": { component: BonelessWaterResearch, metadata: researchMetadata },
  "about": { component: BonelessWaterAbout, metadata: aboutMetadata },
  "testimonials": { component: BonelessWaterTestimonials, metadata: testimonialsMetadata },
  "contact": { component: BonelessWaterContact, metadata: contactMetadata },
  "cart": BonelessWaterCart,
  "checkout": BonelessWaterCheckout,
  "privacy": { component: BonelessWaterPrivacy, metadata: privacyMetadata },
  "terms": { component: BonelessWaterTerms, metadata: termsMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: ProductDetail,
    getMetadata: (slug: string) => {
      const product = getProductBySlug(slug)
      return product
        ? { title: `${product.name} — BonelessWater`, description: product.tagline }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
  },
}

import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import InflatableAnchorsHome from "./pages/home"
import { getProductBySlug } from "./data/products"
import InflatableAnchorsProducts, { metadata as productsMetadata } from "./pages/products"
import InflatableAnchorsAbout, { metadata as aboutMetadata } from "./pages/about"
import TheTechnology, { metadata as technologyMetadata } from "./pages/technology"
import CustomerStoriesPage, { metadata as customerStoriesMetadata } from "./pages/customer-stories"
import InflatableAnchorsFAQ, { metadata as faqMetadata } from "./pages/faq"
import InflatableAnchorsContact, { metadata as contactMetadata } from "./pages/contact"
import InflatableAnchorsPrivacy, { metadata as privacyMetadata } from "./pages/privacy"
import InflatableAnchorsTerms, { metadata as termsMetadata } from "./pages/terms"
import ProductDetail from "./pages/product-detail"

export { config }

export const pages: Record<string, PageEntry> = {
  "": InflatableAnchorsHome,
  "products": { component: InflatableAnchorsProducts, metadata: productsMetadata },
  "about": { component: InflatableAnchorsAbout, metadata: aboutMetadata },
  "the-technology": { component: TheTechnology, metadata: technologyMetadata },
  "customer-stories": { component: CustomerStoriesPage, metadata: customerStoriesMetadata },
  "faq": { component: InflatableAnchorsFAQ, metadata: faqMetadata },
  "contact": { component: InflatableAnchorsContact, metadata: contactMetadata },
  "privacy": { component: InflatableAnchorsPrivacy, metadata: privacyMetadata },
  "terms": { component: InflatableAnchorsTerms, metadata: termsMetadata },
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

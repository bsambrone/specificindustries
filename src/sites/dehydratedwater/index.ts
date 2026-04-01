import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import { getProductBySlug } from "./data/products"
import DehydratedWaterHome from "./pages/home"
import DehydratedWaterProducts, { metadata as productsMetadata } from "./pages/products"
import ProductDetail from "./pages/product-detail"
import OurStory, { metadata as ourStoryMetadata } from "./pages/our-story"
import TheScience, { metadata as theScienceMetadata } from "./pages/the-science"
import WaaS from "./pages/waas"
import FAQ, { metadata as faqMetadata } from "./pages/faq"
import DehydratedWaterCart from "./pages/cart"
import DehydratedWaterCheckout from "./pages/checkout"
import DehydratedWaterPrivacy, { metadata as privacyMetadata } from "./pages/privacy"
import DehydratedWaterTerms, { metadata as termsMetadata } from "./pages/terms"

export { config }

export const pages: Record<string, PageEntry> = {
  "": DehydratedWaterHome,
  "products": { component: DehydratedWaterProducts, metadata: productsMetadata },
  "our-story": { component: OurStory, metadata: ourStoryMetadata },
  "the-science": { component: TheScience, metadata: theScienceMetadata },
  "waas": WaaS,
  "faq": { component: FAQ, metadata: faqMetadata },
  "cart": DehydratedWaterCart,
  "checkout": DehydratedWaterCheckout,
  "privacy": { component: DehydratedWaterPrivacy, metadata: privacyMetadata },
  "terms": { component: DehydratedWaterTerms, metadata: termsMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: ProductDetail,
    getMetadata: (slug: string) => {
      const product = getProductBySlug(slug)
      return product
        ? { title: `${product.name} — Dehydrated Water Laboratories`, description: product.tagline }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
  },
}

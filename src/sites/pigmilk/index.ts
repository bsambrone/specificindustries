import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import { getProductBySlug } from "./data/products"
import PigMilkHome from "./pages/home"
import PigMilkProducts, { metadata as productsMetadata } from "./pages/products"
import ProductDetail from "./pages/product-detail"
import PigMilkAbout, { metadata as aboutMetadata } from "./pages/about"
import PigMilkBehindTheScenes, { metadata as btsMetadata } from "./pages/behind-the-scenes"
import PigMilkVolunteer, { metadata as volunteerMetadata } from "./pages/volunteer"
import PigMilkContact, { metadata as contactMetadata } from "./pages/contact"
import PigMilkCart from "./pages/cart"
import PigMilkCheckout from "./pages/checkout"
import PigMilkPrivacy, { metadata as privacyMetadata } from "./pages/privacy"
import PigMilkTerms, { metadata as termsMetadata } from "./pages/terms"

export { config }

export const pages: Record<string, PageEntry> = {
  "": PigMilkHome,
  "products": { component: PigMilkProducts, metadata: productsMetadata },
  "about": { component: PigMilkAbout, metadata: aboutMetadata },
  "behind-the-scenes": { component: PigMilkBehindTheScenes, metadata: btsMetadata },
  "volunteer": { component: PigMilkVolunteer, metadata: volunteerMetadata },
  "contact": { component: PigMilkContact, metadata: contactMetadata },
  "cart": PigMilkCart,
  "checkout": PigMilkCheckout,
  "privacy": { component: PigMilkPrivacy, metadata: privacyMetadata },
  "terms": { component: PigMilkTerms, metadata: termsMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: ProductDetail,
    getMetadata: (slug: string) => {
      const product = getProductBySlug(slug)
      return product
        ? { title: `${product.name} — Pig Milk Creamery`, description: product.tagline, ogImage: product.image }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
  },
}

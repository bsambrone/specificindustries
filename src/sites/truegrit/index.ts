import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import { getProductBySlug } from "./data/products"
import TrueGritHome from "./pages/home"
import TrueGritProducts, { metadata as productsMetadata } from "./pages/products"
import ProductDetail from "./pages/product-detail"
import TheExperience, { metadata as experienceMetadata } from "./pages/the-experience"
import BehindTheScenes, { metadata as btsMetadata } from "./pages/behind-the-scenes"
import TrueGritAbout, { metadata as aboutMetadata } from "./pages/about"
import TrueGritCart from "./pages/cart"
import TrueGritCheckout from "./pages/checkout"
import TrueGritApplications, { metadata as applicationsMetadata } from "./pages/applications"
import TrueGritContact, { metadata as contactMetadata } from "./pages/contact"
import TrueGritPrivacy, { metadata as privacyMetadata } from "./pages/privacy"
import TrueGritTerms, { metadata as termsMetadata } from "./pages/terms"

export { config }

export const pages: Record<string, PageEntry> = {
  "": TrueGritHome,
  "products": { component: TrueGritProducts, metadata: productsMetadata },
  "the-experience": { component: TheExperience, metadata: experienceMetadata },
"behind-the-scenes": { component: BehindTheScenes, metadata: btsMetadata },
  "about": { component: TrueGritAbout, metadata: aboutMetadata },
  "applications": { component: TrueGritApplications, metadata: applicationsMetadata },
  "contact": { component: TrueGritContact, metadata: contactMetadata },
  "cart": TrueGritCart,
  "checkout": TrueGritCheckout,
  "privacy": { component: TrueGritPrivacy, metadata: privacyMetadata },
  "terms": { component: TrueGritTerms, metadata: termsMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: ProductDetail,
    getMetadata: (slug: string) => {
      const product = getProductBySlug(slug)
      return product
        ? { title: `${product.name} — True Grit Personal Care`, description: product.tagline }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
  },
}

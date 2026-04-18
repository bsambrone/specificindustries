import type { PageEntry, DynamicRoute } from "@/themes"
import { config } from "./config"
import { getProductBySlug } from "./data/products"
import SuperengineeredHome from "./pages/home"
import SuperengineeredProductDetail from "./pages/product-detail"
import SuperengineeredShop, { metadata as shopMetadata } from "./pages/shop"
import SuperengineeredAbout, { metadata as aboutMetadata } from "./pages/about"
import SuperengineeredContact, { metadata as contactMetadata } from "./pages/contact"
import SuperengineeredPrivacy, { metadata as privacyMetadata } from "./pages/privacy"
import SuperengineeredTerms, { metadata as termsMetadata } from "./pages/terms"

export { config }

export const pages: Record<string, PageEntry> = {
  "": SuperengineeredHome,
  "shop": { component: SuperengineeredShop, metadata: shopMetadata },
  "about": { component: SuperengineeredAbout, metadata: aboutMetadata },
  "contact": { component: SuperengineeredContact, metadata: contactMetadata },
  "privacy": { component: SuperengineeredPrivacy, metadata: privacyMetadata },
  "terms": { component: SuperengineeredTerms, metadata: termsMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: SuperengineeredProductDetail,
    getMetadata: (slug: string) => {
      const p = getProductBySlug(slug)
      return p
        ? {
            title: `${p.name} — Superengineered`,
            description: p.tagline,
            ogImage: p.heroImage,
          }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
  },
}

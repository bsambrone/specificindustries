// src/sites/pettential/index.ts
import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import { getProductBySlug } from "./data/products"

import PettentialHome from "./pages/home"
import PettentialShop, { metadata as shopMetadata } from "./pages/shop"
import PettentialServices, { metadata as servicesMetadata } from "./pages/services"
import PettentialAbout, { metadata as aboutMetadata } from "./pages/about"
import PettentialLeadership, { metadata as leadershipMetadata } from "./pages/leadership"
import PettentialContact, { metadata as contactMetadata } from "./pages/contact"
import PettentialPrivacy, { metadata as privacyMetadata } from "./pages/privacy"
import PettentialTerms, { metadata as termsMetadata } from "./pages/terms"
import PettentialCart from "./pages/cart"
import PettentialCheckout from "./pages/checkout"
import ProductDetail from "./pages/product-detail"

export { config }

export const pages: Record<string, PageEntry> = {
  "": PettentialHome,
  "shop": { component: PettentialShop, metadata: shopMetadata },
  "services": { component: PettentialServices, metadata: servicesMetadata },
  "about": { component: PettentialAbout, metadata: aboutMetadata },
  "leadership": { component: PettentialLeadership, metadata: leadershipMetadata },
  "contact": { component: PettentialContact, metadata: contactMetadata },
  "privacy": { component: PettentialPrivacy, metadata: privacyMetadata },
  "terms": { component: PettentialTerms, metadata: termsMetadata },
  "cart": PettentialCart,
  "checkout": PettentialCheckout,
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  shop: {
    component: ProductDetail,
    getMetadata: (slug: string) => {
      const product = getProductBySlug(slug)
      return product
        ? { title: `${product.name} — Pettential`, description: product.tagline, ogImage: product.heroImage }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
  },
}

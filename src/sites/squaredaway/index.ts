import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import { getProductBySlug } from "./data/products"

import Home from "./pages/home"
import Army from "./pages/army"
import Navy from "./pages/navy"
import AirForce from "./pages/airforce"
import Marines from "./pages/marines"
import SpaceForce from "./pages/spaceforce"
import ProductDetail from "./pages/product-detail"
import Morale, { metadata as moraleMetadata } from "./pages/morale"
import Authorization, { metadata as authorizationMetadata } from "./pages/authorization"
import Faq, { metadata as faqMetadata } from "./pages/faq"
import Leadership, { metadata as leadershipMetadata } from "./pages/leadership"
import Contact, { metadata as contactMetadata } from "./pages/contact"
import Privacy, { metadata as privacyMetadata } from "./pages/privacy"
import Terms, { metadata as termsMetadata } from "./pages/terms"
import Cart from "./pages/cart"
import Checkout from "./pages/checkout"

export { config }

export const pages: Record<string, PageEntry> = {
  "": Home,
  army: Army,
  navy: Navy,
  airforce: AirForce,
  marines: Marines,
  spaceforce: SpaceForce,
  morale: { component: Morale, metadata: moraleMetadata },
  authorization: { component: Authorization, metadata: authorizationMetadata },
  faq: { component: Faq, metadata: faqMetadata },
  leadership: { component: Leadership, metadata: leadershipMetadata },
  contact: { component: Contact, metadata: contactMetadata },
  privacy: { component: Privacy, metadata: privacyMetadata },
  terms: { component: Terms, metadata: termsMetadata },
  cart: Cart,
  checkout: Checkout,
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: ProductDetail,
    getMetadata: (slug: string) => {
      const product = getProductBySlug(slug)
      return product
        ? {
            title: `${product.name} — Squared Away Supply Co.`,
            description: product.tagline,
            ogImage: product.image,
          }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
  },
}

import type { PageEntry, DynamicRoute } from "@/themes"
import { config } from "./config"
import { getProductBySlug } from "./data/products"
import PrivatrixHome from "./pages/home"
import PrivatrixProducts, { metadata as productsMetadata } from "./pages/products"
import PrivatrixProductDetail from "./pages/product-detail"
import PrivatrixAbout, { metadata as aboutMetadata } from "./pages/about"
import PrivatrixLeadership, { metadata as leadershipMetadata } from "./pages/leadership"
import PrivatrixCertifications, { metadata as certificationsMetadata } from "./pages/certifications"
import PrivatrixContact, { metadata as contactMetadata } from "./pages/contact"
import PrivatrixPrivacy, { metadata as privacyMetadata } from "./pages/privacy"

export { config }

export const pages: Record<string, PageEntry> = {
  "": PrivatrixHome,
  "products": { component: PrivatrixProducts, metadata: productsMetadata },
  "about": { component: PrivatrixAbout, metadata: aboutMetadata },
  "leadership": { component: PrivatrixLeadership, metadata: leadershipMetadata },
  "certifications": { component: PrivatrixCertifications, metadata: certificationsMetadata },
  "contact": { component: PrivatrixContact, metadata: contactMetadata },
  "privacy": { component: PrivatrixPrivacy, metadata: privacyMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: PrivatrixProductDetail,
    getMetadata: (slug: string) => {
      const p = getProductBySlug(slug)
      return p
        ? {
            title: `${p.name} — Privatrix`,
            description: p.tagline,
            ogImage: p.image,
          }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
  },
}

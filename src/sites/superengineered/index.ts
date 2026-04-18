import type { PageEntry, DynamicRoute } from "@/themes"
import { config } from "./config"
import { getProductBySlug } from "./data/products"
import { productSchema } from "@/lib/seo/schemas"
import SuperengineeredHome from "./pages/home"
import SuperengineeredProductDetail from "./pages/product-detail"
import SuperengineeredShop, { metadata as shopMetadata } from "./pages/shop"
import SuperengineeredAbout, { metadata as aboutMetadata } from "./pages/about"
import SuperengineeredContact, { metadata as contactMetadata } from "./pages/contact"
import SuperengineeredLeadership, { metadata as leadershipMetadata } from "./pages/leadership"
import SuperengineeredEnterprise, { metadata as enterpriseMetadata } from "./pages/enterprise"
import SuperengineeredDevelopers, { metadata as developersMetadata } from "./pages/developers"
import SuperengineeredTrust, { metadata as trustMetadata } from "./pages/trust"
import SuperengineeredPrivacy, { metadata as privacyMetadata } from "./pages/privacy"
import SuperengineeredTerms, { metadata as termsMetadata } from "./pages/terms"
import SuperEngineeredCart, { metadata as cartMetadata } from "./pages/cart"
import SuperEngineeredCheckout from "./pages/checkout"

export { config }

export const pages: Record<string, PageEntry> = {
  "": SuperengineeredHome,
  "shop": { component: SuperengineeredShop, metadata: shopMetadata },
  "about": { component: SuperengineeredAbout, metadata: aboutMetadata },
  "contact": { component: SuperengineeredContact, metadata: contactMetadata },
  "leadership": { component: SuperengineeredLeadership, metadata: leadershipMetadata },
  "enterprise": { component: SuperengineeredEnterprise, metadata: enterpriseMetadata },
  "developers": { component: SuperengineeredDevelopers, metadata: developersMetadata },
  "trust": { component: SuperengineeredTrust, metadata: trustMetadata },
  "privacy": { component: SuperengineeredPrivacy, metadata: privacyMetadata },
  "terms": { component: SuperengineeredTerms, metadata: termsMetadata },
  "cart": { component: SuperEngineeredCart, metadata: cartMetadata },
  "checkout": SuperEngineeredCheckout,
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: SuperengineeredProductDetail,
    getMetadata: (slug: string) => {
      const p = getProductBySlug(slug)
      return p
        ? {
            title: `${p.name} — Super Engineered`,
            description: p.tagline,
            ogImage: p.heroImage,
          }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
    getBreadcrumbLabel: (slug: string) => getProductBySlug(slug)?.name,
    breadcrumbSectionLabel: "Products",
    getJsonLd: (slug: string) => {
      const p = getProductBySlug(slug)
      if (!p) return undefined
      return productSchema(
        "superengineered",
        `products/${p.slug}`,
        {
          name: p.name,
          slug: p.slug,
          tagline: p.tagline,
          image: p.heroImage,
          price: p.startingPrice,
          category: p.family,
        },
        config.name
      )
    },
  },
}

import type { PageEntry, DynamicRoute } from "@/themes"
import { config } from "./config"
import TerrorClownHome from "./pages/home"
import TerrorClownProducts, { metadata as productsMetadata } from "./pages/products"
import TerrorClownProductDetail from "./pages/product-detail"
import TerrorClownAbout, { metadata as aboutMetadata } from "./pages/about"
import TerrorClownLeadership, { metadata as leadershipMetadata } from "./pages/leadership"
import TerrorClownSafety, { metadata as safetyMetadata } from "./pages/safety"
import TerrorClownFaq, { metadata as faqMetadata } from "./pages/faq"
import TerrorClownContact from "./pages/contact"
import TerrorClownPrivacy, { metadata as privacyMetadata } from "./pages/privacy"
import TerrorClownTerms, { metadata as termsMetadata } from "./pages/terms"
import TerrorClownCart from "./pages/cart"
import TerrorClownCheckout from "./pages/checkout"
import { getProductBySlug } from "./data/products"

const contactMetadata = {
  title: "Contact — The Pennywhistle Play Company",
  description: "Write to our Customer Letters Department, Millbrook, Ohio. Every letter is personally reviewed by our President.",
}

export { config }

export const pages: Record<string, PageEntry> = {
  "": TerrorClownHome,
  "products": { component: TerrorClownProducts, metadata: productsMetadata },
  "about": { component: TerrorClownAbout, metadata: aboutMetadata },
  "leadership": { component: TerrorClownLeadership, metadata: leadershipMetadata },
  "safety": { component: TerrorClownSafety, metadata: safetyMetadata },
  "faq": { component: TerrorClownFaq, metadata: faqMetadata },
  "contact": { component: TerrorClownContact, metadata: contactMetadata },
  "privacy": { component: TerrorClownPrivacy, metadata: privacyMetadata },
  "terms": { component: TerrorClownTerms, metadata: termsMetadata },
  "cart": TerrorClownCart,
  "checkout": TerrorClownCheckout,
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: TerrorClownProductDetail,
    getMetadata: (slug: string) => {
      const p = getProductBySlug(slug)
      return p
        ? {
            title: `${p.name} — The Pennywhistle Play Company`,
            description: p.tagline,
            ogImage: p.image,
          }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
    getBreadcrumbLabel: (slug: string) => getProductBySlug(slug)?.name,
    breadcrumbSectionLabel: "Catalog",
  },
}

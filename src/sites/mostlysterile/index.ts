import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import { getProductBySlug } from "./data/products"
import MostlysterileHome from "./pages/home"
import MostlysterileProducts, { metadata as productsMetadata } from "./pages/products"
import MostlysterileAbout, { metadata as aboutMetadata } from "./pages/about"
import MostlysterileCertifications, { metadata as certificationsMetadata } from "./pages/certifications"
import MostlysterileQuality, { metadata as qualityMetadata } from "./pages/quality-assurance"
import MostlysterileLeadership, { metadata as leadershipMetadata } from "./pages/leadership"
import MostlysterileFaq, { metadata as faqMetadata } from "./pages/faq"
import MostlysterileContact from "./pages/contact"
import MostlysterilePrivacy, { metadata as privacyMetadata } from "./pages/privacy"
import MostlysterileTerms, { metadata as termsMetadata } from "./pages/terms"
import MostlysterileCart from "./pages/cart"
import MostlysterileCheckout from "./pages/checkout"
import ProductDetail from "./pages/product-detail"

export { config }

export const pages: Record<string, PageEntry> = {
  "": MostlysterileHome,
  "products": { component: MostlysterileProducts, metadata: productsMetadata },
  "about": { component: MostlysterileAbout, metadata: aboutMetadata },
  "certifications": { component: MostlysterileCertifications, metadata: certificationsMetadata },
  "quality-assurance": { component: MostlysterileQuality, metadata: qualityMetadata },
  "leadership": { component: MostlysterileLeadership, metadata: leadershipMetadata },
  "faq": { component: MostlysterileFaq, metadata: faqMetadata },
  "contact": MostlysterileContact,
  "privacy": { component: MostlysterilePrivacy, metadata: privacyMetadata },
  "terms": { component: MostlysterileTerms, metadata: termsMetadata },
  "cart": MostlysterileCart,
  "checkout": MostlysterileCheckout,
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: ProductDetail,
    getMetadata: (slug: string) => {
      const product = getProductBySlug(slug)
      return product
        ? { title: `${product.name} — Mostlysterile`, description: product.tagline, ogImage: product.image }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
  },
}

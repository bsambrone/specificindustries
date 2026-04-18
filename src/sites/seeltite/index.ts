import type { PageEntry, DynamicRoute } from "@/themes"
import { config } from "./config"
import { getProductBySlug } from "./data/products"
import { productSchema } from "@/lib/seo/schemas"
import SeeltiteHome from "./pages/home"
import SeeltiteProducts, { metadata as productsMetadata } from "./pages/products"
import SeeltiteProductDetail from "./pages/product-detail"
import SeeltiteScenarios, { metadata as scenariosMetadata } from "./pages/scenarios"
import SeeltiteRecovery, { metadata as recoveryMetadata } from "./pages/recovery"
import SeeltiteDemonstrations, { metadata as demonstrationsMetadata } from "./pages/demonstrations"
import SeeltiteCompatibility, { metadata as compatibilityMetadata } from "./pages/compatibility"
import SeeltiteFitment, { metadata as fitmentMetadata } from "./pages/fitment"
import SeeltiteAbout, { metadata as aboutMetadata } from "./pages/about"
import SeeltiteLeadership, { metadata as leadershipMetadata } from "./pages/leadership"
import SeeltiteContact, { metadata as contactMetadata } from "./pages/contact"
import SeeltitePrivacy, { metadata as privacyMetadata } from "./pages/privacy"
import SeeltiteTerms, { metadata as termsMetadata } from "./pages/terms"

export { config }

export const pages: Record<string, PageEntry> = {
  "": SeeltiteHome,
  "products": { component: SeeltiteProducts, metadata: productsMetadata },
  "scenarios": { component: SeeltiteScenarios, metadata: scenariosMetadata },
  "recovery": { component: SeeltiteRecovery, metadata: recoveryMetadata },
  "demonstrations": { component: SeeltiteDemonstrations, metadata: demonstrationsMetadata },
  "compatibility": { component: SeeltiteCompatibility, metadata: compatibilityMetadata },
  "fitment": { component: SeeltiteFitment, metadata: fitmentMetadata },
  "about": { component: SeeltiteAbout, metadata: aboutMetadata },
  "leadership": { component: SeeltiteLeadership, metadata: leadershipMetadata },
  "contact": { component: SeeltiteContact, metadata: contactMetadata },
  "privacy": { component: SeeltitePrivacy, metadata: privacyMetadata },
  "terms": { component: SeeltiteTerms, metadata: termsMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: SeeltiteProductDetail,
    getMetadata: (slug: string) => {
      const p = getProductBySlug(slug)
      return p
        ? {
            title: `${p.name} — Seel-Tite Containment Systems`,
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
        "seeltite",
        `products/${p.slug}`,
        {
          name: p.name,
          slug: p.slug,
          description: Array.isArray(p.description) ? p.description.join(" ") : p.description,
          tagline: p.tagline,
          image: p.heroImage,
          price: p.price,
          category: p.category,
        },
        config.name
      )
    },
  },
}

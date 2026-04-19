import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import { getProductBySlug } from "./data/products"
import { productSchema } from "@/lib/seo/schemas"

import PetjacksHome from "./pages/home"
import PetjacksProducts, { metadata as productsMetadata } from "./pages/products"
import PetjacksFlightAcademy, { metadata as flightAcademyMetadata } from "./pages/flight-academy"
import PetjacksMissionGallery, { metadata as missionGalleryMetadata } from "./pages/mission-gallery"
import PetjacksSafetyRecord, { metadata as safetyRecordMetadata } from "./pages/safety-record"
import PetjacksAbout, { metadata as aboutMetadata } from "./pages/about"
import PetjacksLeadership, { metadata as leadershipMetadata } from "./pages/leadership"
import PetjacksContact, { metadata as contactMetadata } from "./pages/contact"
import PetjacksPrivacy, { metadata as privacyMetadata } from "./pages/privacy"
import PetjacksTerms, { metadata as termsMetadata } from "./pages/terms"
import ProductDetail from "./pages/product-detail"

export { config }

export const pages: Record<string, PageEntry> = {
  "": PetjacksHome,
  "products": { component: PetjacksProducts, metadata: productsMetadata },
  "flight-academy": { component: PetjacksFlightAcademy, metadata: flightAcademyMetadata },
  "mission-gallery": { component: PetjacksMissionGallery, metadata: missionGalleryMetadata },
  "safety-record": { component: PetjacksSafetyRecord, metadata: safetyRecordMetadata },
  "about": { component: PetjacksAbout, metadata: aboutMetadata },
  "leadership": { component: PetjacksLeadership, metadata: leadershipMetadata },
  "contact": { component: PetjacksContact, metadata: contactMetadata },
  "privacy": { component: PetjacksPrivacy, metadata: privacyMetadata },
  "terms": { component: PetjacksTerms, metadata: termsMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: ProductDetail,
    getMetadata: (slug: string) => {
      const product = getProductBySlug(slug)
      return product
        ? {
            title: `${product.name} — Petjacks`,
            description: product.tagline,
            ogImage: product.image,
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
        "petjacks",
        `products/${p.slug}`,
        {
          name: p.name,
          slug: p.slug,
          description: p.description.join(" "),
          tagline: p.tagline,
          image: p.image,
          price: p.price,
        },
        config.name,
      )
    },
  },
}

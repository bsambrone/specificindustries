import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import MousetrapJengaHome from "./pages/home"
import MousetrapJengaProducts, { metadata as productsMetadata } from "./pages/products"
import MousetrapJengaHowToPlay, { metadata as howToPlayMetadata } from "./pages/how-to-play"
import MousetrapJengaHallOfFame, { metadata as hallOfFameMetadata } from "./pages/hall-of-fame"
import MousetrapJengaAbout, { metadata as aboutMetadata } from "./pages/about"
import MousetrapJengaTestimonials, { metadata as testimonialsMetadata } from "./pages/testimonials"
import MousetrapJengaContact, { metadata as contactMetadata } from "./pages/contact"
import MousetrapJengaCart from "./pages/cart"
import MousetrapJengaCheckout from "./pages/checkout"
import MousetrapJengaPrivacy, { metadata as privacyMetadata } from "./pages/privacy"
import MousetrapJengaTerms, { metadata as termsMetadata } from "./pages/terms"
import MousetrapJengaProductDetail from "./pages/product-detail"

export { config }

export const pages: Record<string, PageEntry> = {
  "": MousetrapJengaHome,
  "products": { component: MousetrapJengaProducts, metadata: productsMetadata },
  "how-to-play": { component: MousetrapJengaHowToPlay, metadata: howToPlayMetadata },
  "hall-of-fame": { component: MousetrapJengaHallOfFame, metadata: hallOfFameMetadata },
  "about": { component: MousetrapJengaAbout, metadata: aboutMetadata },
  "testimonials": { component: MousetrapJengaTestimonials, metadata: testimonialsMetadata },
  "contact": { component: MousetrapJengaContact, metadata: contactMetadata },
  "cart": MousetrapJengaCart,
  "checkout": MousetrapJengaCheckout,
  "privacy": { component: MousetrapJengaPrivacy, metadata: privacyMetadata },
  "terms": { component: MousetrapJengaTerms, metadata: termsMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: MousetrapJengaProductDetail,
    getMetadata: (slug: string) => ({ title: `${slug} — Mousetrap Jenga`, description: "Product detail" }),
    isValidSlug: () => true,
  },
}

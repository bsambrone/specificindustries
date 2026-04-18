import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import { getProductBySlug } from "./data/products"
import { productSchema } from "@/lib/seo/schemas"
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
    getMetadata: (slug: string) => {
      const product = getProductBySlug(slug)
      return product
        ? { title: `${product.name} — Mousetrap Jenga`, description: product.tagline, ogImage: product.image }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
    getBreadcrumbLabel: (slug: string) => getProductBySlug(slug)?.name,
    breadcrumbSectionLabel: "Products",
    getJsonLd: (slug: string) => {
      const p = getProductBySlug(slug)
      if (!p) return undefined
      return productSchema(
        "mousetrapjenga",
        `products/${p.slug}`,
        {
          name: p.name,
          slug: p.slug,
          description: Array.isArray(p.description) ? p.description.join(" ") : p.description,
          tagline: p.tagline,
          image: p.image,
          price: p.price,
        },
        config.name
      )
    },
  },
}

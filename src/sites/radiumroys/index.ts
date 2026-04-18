import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import { getProductBySlug } from "./data/products"
import { productSchema } from "@/lib/seo/schemas"
import RadiumRoysHome from "./pages/home"
import RadiumRoysProducts, { metadata as productsMetadata } from "./pages/products"
import ProductDetail from "./pages/product-detail"
import RadiumRoysAbout, { metadata as aboutMetadata } from "./pages/about"
import RadiumRoysStandards, { metadata as standardsMetadata } from "./pages/standards"
import RadiumRoysTestimonials, { metadata as testimonialsMetadata } from "./pages/testimonials"
import RadiumRoysContact from "./pages/contact"
import RadiumRoysPrivacy, { metadata as privacyMetadata } from "./pages/privacy"
import RadiumRoysTerms, { metadata as termsMetadata } from "./pages/terms"
import RadiumRoysCart from "./pages/cart"
import RadiumRoysCheckout from "./pages/checkout"

export { config }

export const pages: Record<string, PageEntry> = {
  "": RadiumRoysHome,
  "products": { component: RadiumRoysProducts, metadata: productsMetadata },
  "about": { component: RadiumRoysAbout, metadata: aboutMetadata },
  "standards": { component: RadiumRoysStandards, metadata: standardsMetadata },
  "testimonials": { component: RadiumRoysTestimonials, metadata: testimonialsMetadata },
  "contact": RadiumRoysContact,
  "privacy": { component: RadiumRoysPrivacy, metadata: privacyMetadata },
  "terms": { component: RadiumRoysTerms, metadata: termsMetadata },
  "cart": RadiumRoysCart,
  "checkout": RadiumRoysCheckout,
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: ProductDetail,
    getMetadata: (slug: string) => {
      const product = getProductBySlug(slug)
      return product
        ? { title: `${product.name} — Radium Roy's`, description: product.tagline, ogImage: product.image }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
    getBreadcrumbLabel: (slug: string) => getProductBySlug(slug)?.name,
    breadcrumbSectionLabel: "Products",
    getJsonLd: (slug: string) => {
      const p = getProductBySlug(slug)
      if (!p) return undefined
      return productSchema(
        "radiumroys",
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

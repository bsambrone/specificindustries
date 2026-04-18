import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import { getProductBySlug } from "./data/products"
import { productSchema } from "@/lib/seo/schemas"
import SnortablesHome from "./pages/home"
import SnortablesProducts, { metadata as productsMetadata } from "./pages/products"
import SnortablesProcess, { metadata as processMetadata } from "./pages/process"
import SnortablesTestimonials, { metadata as testimonialsMetadata } from "./pages/testimonials"
import ProductDetail from "./pages/product-detail"
import SnortablesAbout, { metadata as aboutMetadata } from "./pages/about"
import SnortablesContact, { metadata as contactMetadata } from "./pages/contact"
import SnortablesCart from "./pages/cart"
import SnortablesCheckout from "./pages/checkout"
import SnortablesPrivacy, { metadata as privacyMetadata } from "./pages/privacy"
import SnortablesTerms, { metadata as termsMetadata } from "./pages/terms"

export { config }

export const pages: Record<string, PageEntry> = {
  "": SnortablesHome,
  "products": { component: SnortablesProducts, metadata: productsMetadata },
  "process": { component: SnortablesProcess, metadata: processMetadata },
  "testimonials": { component: SnortablesTestimonials, metadata: testimonialsMetadata },
  "about": { component: SnortablesAbout, metadata: aboutMetadata },
  "contact": { component: SnortablesContact, metadata: contactMetadata },
  "cart": SnortablesCart,
  "checkout": SnortablesCheckout,
  "privacy": { component: SnortablesPrivacy, metadata: privacyMetadata },
  "terms": { component: SnortablesTerms, metadata: termsMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: ProductDetail,
    getMetadata: (slug: string) => {
      const product = getProductBySlug(slug)
      return product
        ? { title: `${product.name} — Snortables`, description: product.tagline, ogImage: product.image }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
    getBreadcrumbLabel: (slug: string) => getProductBySlug(slug)?.name,
    breadcrumbSectionLabel: "Products",
    getJsonLd: (slug: string) => {
      const p = getProductBySlug(slug)
      if (!p) return undefined
      return productSchema(
        "snortables",
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

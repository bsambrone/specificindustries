import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import { getProductBySlug } from "./data/products"
import { productSchema } from "@/lib/seo/schemas"

import OddOccasionsHome from "./pages/home"
import OddOccasionsShop, { metadata as shopMetadata } from "./pages/shop"
import OddOccasionsAbout, { metadata as aboutMetadata } from "./pages/about"
import OddOccasionsContact, { metadata as contactMetadata } from "./pages/contact"
import OddOccasionsPrivacy, { metadata as privacyMetadata } from "./pages/privacy"
import OddOccasionsTerms, { metadata as termsMetadata } from "./pages/terms"
import OddOccasionsCart from "./pages/cart"
import OddOccasionsCheckout from "./pages/checkout"
import ProductDetail from "./pages/product-detail"

export { config }

export const pages: Record<string, PageEntry> = {
  "": OddOccasionsHome,
  "shop": { component: OddOccasionsShop, metadata: shopMetadata },
  "about": { component: OddOccasionsAbout, metadata: aboutMetadata },
  "contact": { component: OddOccasionsContact, metadata: contactMetadata },
  "privacy": { component: OddOccasionsPrivacy, metadata: privacyMetadata },
  "terms": { component: OddOccasionsTerms, metadata: termsMetadata },
  "cart": OddOccasionsCart,
  "checkout": OddOccasionsCheckout,
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  shop: {
    component: ProductDetail,
    getMetadata: (slug: string) => {
      const product = getProductBySlug(slug)
      return product
        ? { title: `${product.name} — Odd Occasions`, description: product.tagline, ogImage: product.heroImage }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
    getBreadcrumbLabel: (slug: string) => getProductBySlug(slug)?.name,
    breadcrumbSectionLabel: "Shop",
    getJsonLd: (slug: string) => {
      const p = getProductBySlug(slug)
      if (!p) return undefined
      return productSchema(
        "oddoccasions",
        `shop/${p.slug}`,
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

import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import { getProductBySlug } from "./data/products"
import { productSchema } from "@/lib/seo/schemas"

import ChunkyMilkHome from "./pages/home"
import ChunkyMilkProducts, { metadata as productsMetadata } from "./pages/products"
import ProductDetail from "./pages/product-detail"
import ChunkyMilkAbout, { metadata as aboutMetadata } from "./pages/about"
import ChunkinProcess, { metadata as processMetadata } from "./pages/the-chunkin-process"
import OurHollow, { metadata as hollowMetadata } from "./pages/our-hollow"
import Heritage, { metadata as heritageMetadata } from "./pages/heritage"
import ChunkyMilkContact, { metadata as contactMetadata } from "./pages/contact"
import ChunkyMilkPrivacy, { metadata as privacyMetadata } from "./pages/privacy"
import ChunkyMilkTerms, { metadata as termsMetadata } from "./pages/terms"
import ChunkyMilkCart from "./pages/cart"
import ChunkyMilkCheckout from "./pages/checkout"

export { config }

export const pages: Record<string, PageEntry> = {
  "": ChunkyMilkHome,
  "products": { component: ChunkyMilkProducts, metadata: productsMetadata },
  "about": { component: ChunkyMilkAbout, metadata: aboutMetadata },
  "the-chunkin-process": { component: ChunkinProcess, metadata: processMetadata },
  "our-hollow": { component: OurHollow, metadata: hollowMetadata },
  "heritage": { component: Heritage, metadata: heritageMetadata },
  "contact": { component: ChunkyMilkContact, metadata: contactMetadata },
  "privacy": { component: ChunkyMilkPrivacy, metadata: privacyMetadata },
  "terms": { component: ChunkyMilkTerms, metadata: termsMetadata },
  "cart": ChunkyMilkCart,
  "checkout": ChunkyMilkCheckout,
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: ProductDetail,
    getMetadata: (slug: string) => {
      const product = getProductBySlug(slug)
      return product
        ? {
            title: `${product.name} — Whitford Family Chunky Milk`,
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
        "chunkymilk",
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

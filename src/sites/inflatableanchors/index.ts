import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import InflatableAnchorsHome from "./pages/home"
import { getProductBySlug } from "./data/products"
import { productSchema } from "@/lib/seo/schemas"
import InflatableAnchorsProducts, { metadata as productsMetadata } from "./pages/products"
import InflatableAnchorsAbout, { metadata as aboutMetadata } from "./pages/about"
import TheTechnology, { metadata as technologyMetadata } from "./pages/technology"
import CustomerStoriesPage, { metadata as customerStoriesMetadata } from "./pages/customer-stories"
import InflatableAnchorsFAQ, { metadata as faqMetadata } from "./pages/faq"
import InflatableAnchorsContact, { metadata as contactMetadata } from "./pages/contact"
import InflatableAnchorsPrivacy, { metadata as privacyMetadata } from "./pages/privacy"
import InflatableAnchorsTerms, { metadata as termsMetadata } from "./pages/terms"
import InflatableAnchorsCart from "./pages/cart"
import InflatableAnchorsCheckout from "./pages/checkout"
import ProductDetail from "./pages/product-detail"

export { config }

export const pages: Record<string, PageEntry> = {
  "": InflatableAnchorsHome,
  "products": { component: InflatableAnchorsProducts, metadata: productsMetadata },
  "about": { component: InflatableAnchorsAbout, metadata: aboutMetadata },
  "the-technology": { component: TheTechnology, metadata: technologyMetadata },
  "customer-stories": { component: CustomerStoriesPage, metadata: customerStoriesMetadata },
  "faq": { component: InflatableAnchorsFAQ, metadata: faqMetadata },
  "contact": { component: InflatableAnchorsContact, metadata: contactMetadata },
  "privacy": { component: InflatableAnchorsPrivacy, metadata: privacyMetadata },
  "terms": { component: InflatableAnchorsTerms, metadata: termsMetadata },
  "cart": InflatableAnchorsCart,
  "checkout": InflatableAnchorsCheckout,
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: ProductDetail,
    getMetadata: (slug: string) => {
      const product = getProductBySlug(slug)
      return product
        ? { title: `${product.name} — Inflatable Anchors Marine`, description: product.tagline, ogImage: product.image }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
    getBreadcrumbLabel: (slug: string) => getProductBySlug(slug)?.name,
    breadcrumbSectionLabel: "Products",
    getJsonLd: (slug: string) => {
      const p = getProductBySlug(slug)
      if (!p) return undefined
      return productSchema(
        "inflatableanchors",
        `products/${p.slug}`,
        {
          name: p.name,
          slug: p.slug,
          description: Array.isArray(p.description) ? p.description.join(" ") : p.description,
          tagline: p.tagline,
          image: p.image,
          price: p.price,
          category: p.category,
        },
        config.name
      )
    },
  },
}

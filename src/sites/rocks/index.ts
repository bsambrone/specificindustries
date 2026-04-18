import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import { getProductBySlug } from "./data/products"
import { productSchema } from "@/lib/seo/schemas"
import RocksHome from "./pages/home"
import RocksProducts, { metadata as productsMetadata } from "./pages/products"
import ProductDetail from "./pages/product-detail"
import RocksVaultTour, { metadata as vaultMetadata } from "./pages/vault-tour"
import RocksAbout, { metadata as aboutMetadata } from "./pages/about"
import RocksLeadership, { metadata as leadershipMetadata } from "./pages/leadership"
import RocksContact, { metadata as contactMetadata } from "./pages/contact"
import RocksPrivacy, { metadata as privacyMetadata } from "./pages/privacy"
import RocksTerms, { metadata as termsMetadata } from "./pages/terms"
import RocksCart from "./pages/cart"
import RocksCheckout from "./pages/checkout"

export { config }

export const pages: Record<string, PageEntry> = {
  "": RocksHome,
  "products": { component: RocksProducts, metadata: productsMetadata },
  "vault-tour": { component: RocksVaultTour, metadata: vaultMetadata },
  "about": { component: RocksAbout, metadata: aboutMetadata },
  "leadership": { component: RocksLeadership, metadata: leadershipMetadata },
  "contact": { component: RocksContact, metadata: contactMetadata },
  "privacy": { component: RocksPrivacy, metadata: privacyMetadata },
  "terms": { component: RocksTerms, metadata: termsMetadata },
  "cart": RocksCart,
  "checkout": RocksCheckout,
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: ProductDetail,
    getMetadata: (slug: string) => {
      const product = getProductBySlug(slug)
      return product
        ? { title: `${product.ticker} — ${product.name} — ROCKS`, description: product.tagline, ogImage: product.image }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
    getBreadcrumbLabel: (slug: string) => getProductBySlug(slug)?.name,
    breadcrumbSectionLabel: "Products",
    getJsonLd: (slug: string) => {
      const p = getProductBySlug(slug)
      if (!p) return undefined
      return productSchema(
        "rocks",
        `products/${p.slug}`,
        {
          name: p.name,
          slug: p.slug,
          description: Array.isArray(p.description) ? p.description.join(" ") : p.description,
          tagline: p.tagline,
          image: p.image,
          price: p.price,
          sku: p.ticker,
        },
        config.name
      )
    },
  },
}

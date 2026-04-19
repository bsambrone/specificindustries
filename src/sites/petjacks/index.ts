import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import { getProductBySlug } from "./data/products"
import { productSchema } from "@/lib/seo/schemas"

import PetjacksHome from "./pages/home"
import PetjacksProducts, { metadata as productsMetadata } from "./pages/products"
import ProductDetail from "./pages/product-detail"

export { config }

export const pages: Record<string, PageEntry> = {
  "": PetjacksHome,
  "products": { component: PetjacksProducts, metadata: productsMetadata },
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

import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import { getProductBySlug } from "./data/products"
import { productSchema } from "@/lib/seo/schemas"
import UnmotivatorsHome from "./pages/home"
import UnmotivatorsOffice, { metadata as officeMetadata } from "./pages/office"
import UnmotivatorsForHome, { metadata as forHomeMetadata } from "./pages/for-home"
import ProductDetail from "./pages/product-detail"
import UnmotivatorsAbout, { metadata as aboutMetadata } from "./pages/about"

export { config }

export const pages: Record<string, PageEntry> = {
  "": UnmotivatorsHome,
  "office": { component: UnmotivatorsOffice, metadata: officeMetadata },
  "home": { component: UnmotivatorsForHome, metadata: forHomeMetadata },
  "about": { component: UnmotivatorsAbout, metadata: aboutMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: ProductDetail,
    getMetadata: (slug: string) => {
      const product = getProductBySlug(slug)
      return product
        ? {
            title: `${product.name} — Unmotivators Inc.`,
            description: product.subtitle,
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
        "unmotivators",
        `products/${p.slug}`,
        {
          name: p.name,
          slug: p.slug,
          description: Array.isArray(p.description) ? p.description.join(" ") : p.description,
          tagline: p.subtitle,
          image: p.image,
          price: p.price,
        },
        config.name,
      )
    },
  },
}

import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import { getProductBySlug } from "./data/products"
import MostlysterileHome from "./pages/home"
import MostlysterileProducts, { metadata as productsMetadata } from "./pages/products"
import MostlysterileAbout, { metadata as aboutMetadata } from "./pages/about"
import MostlysterileCertifications, { metadata as certificationsMetadata } from "./pages/certifications"
import MostlysterileQuality, { metadata as qualityMetadata } from "./pages/quality-assurance"
import ProductDetail from "./pages/product-detail"

export { config }

export const pages: Record<string, PageEntry> = {
  "": MostlysterileHome,
  "products": { component: MostlysterileProducts, metadata: productsMetadata },
  "about": { component: MostlysterileAbout, metadata: aboutMetadata },
  "certifications": { component: MostlysterileCertifications, metadata: certificationsMetadata },
  "quality-assurance": { component: MostlysterileQuality, metadata: qualityMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: ProductDetail,
    getMetadata: (slug: string) => {
      const product = getProductBySlug(slug)
      return product
        ? { title: `${product.name} — Mostlysterile`, description: product.tagline, ogImage: product.image }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
  },
}

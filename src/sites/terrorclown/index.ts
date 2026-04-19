import type { PageEntry, DynamicRoute } from "@/themes"
import { config } from "./config"
import TerrorClownHome from "./pages/home"
import TerrorClownProducts, { metadata as productsMetadata } from "./pages/products"

export { config }

export const pages: Record<string, PageEntry> = {
  "": TerrorClownHome,
  "products": { component: TerrorClownProducts, metadata: productsMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {}

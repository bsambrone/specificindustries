import { config } from "./config"
import type { PageEntry } from "@/themes"
import RadiumRoysHome from "./pages/home"
import RadiumRoysProducts, { metadata as productsMetadata } from "./pages/products"

export { config }

export const pages: Record<string, PageEntry> = {
  "": RadiumRoysHome,
  "products": { component: RadiumRoysProducts, metadata: productsMetadata },
}

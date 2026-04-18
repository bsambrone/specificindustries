import type { PageEntry } from "@/themes"
import { config } from "./config"
import MehHome from "./pages/home"
import MehProducts, { metadata as productsMetadata } from "./pages/products"

export { config }

export const pages: Record<string, PageEntry> = {
  "": MehHome,
  "products": { component: MehProducts, metadata: productsMetadata },
}

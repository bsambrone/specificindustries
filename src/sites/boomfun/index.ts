import { config } from "./config"
import type { PageEntry } from "@/themes"
import BoomfunHome from "./pages/home"
import BoomfunProducts, { metadata as productsMetadata } from "./pages/products"

export { config }

export const pages: Record<string, PageEntry> = {
  "": BoomfunHome,
  "products": { component: BoomfunProducts, metadata: productsMetadata },
}

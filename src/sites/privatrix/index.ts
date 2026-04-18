import type { PageEntry } from "@/themes"
import { config } from "./config"
import PrivatrixHome from "./pages/home"
import PrivatrixProducts, { metadata as productsMetadata } from "./pages/products"

export { config }

export const pages: Record<string, PageEntry> = {
  "": PrivatrixHome,
  "products": { component: PrivatrixProducts, metadata: productsMetadata },
}

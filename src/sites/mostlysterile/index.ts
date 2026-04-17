import { config } from "./config"
import type { PageEntry } from "@/themes"
import MostlysterileHome from "./pages/home"
import MostlysterileProducts, { metadata as productsMetadata } from "./pages/products"

export { config }

export const pages: Record<string, PageEntry> = {
  "": MostlysterileHome,
  "products": { component: MostlysterileProducts, metadata: productsMetadata },
}

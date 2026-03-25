import { config } from "./config"
import type { PageEntry } from "@/themes"
import PigMilkHome from "./pages/home"
import PigMilkAbout, { metadata as aboutMetadata } from "./pages/about"
import PigMilkProducts, { metadata as productsMetadata } from "./pages/products"

export { config }

export const pages: Record<string, PageEntry> = {
  "": PigMilkHome,
  "about": { component: PigMilkAbout, metadata: aboutMetadata },
  "products": { component: PigMilkProducts, metadata: productsMetadata },
}

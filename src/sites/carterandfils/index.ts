import type { PageEntry } from "@/themes"
import { config } from "./config"
import CarterAndFilsHome from "./pages/home"
import CarterAndFilsCellar, { metadata as cellarMetadata } from "./pages/cellar"

export { config }

export const pages: Record<string, PageEntry> = {
  "": CarterAndFilsHome,
  "cellar": { component: CarterAndFilsCellar, metadata: cellarMetadata },
}

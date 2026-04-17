import type { PageEntry } from "@/themes"
import { config } from "./config"
import CarterAndFilsHome from "./pages/home"

export { config }

export const pages: Record<string, PageEntry> = {
  "": CarterAndFilsHome,
}

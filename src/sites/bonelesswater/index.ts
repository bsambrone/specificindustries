import { config } from "./config"
import type { PageEntry } from "@/themes"
import BonelessWaterHome from "./pages/home"

export { config }

export const pages: Record<string, PageEntry> = {
  "": BonelessWaterHome,
}

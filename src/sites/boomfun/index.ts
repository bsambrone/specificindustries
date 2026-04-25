import { config } from "./config"
import type { PageEntry } from "@/themes"
import BoomfunHome from "./pages/home"

export { config }

export const pages: Record<string, PageEntry> = {
  "": BoomfunHome,
}

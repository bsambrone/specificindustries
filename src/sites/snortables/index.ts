import { config } from "./config"
import type { PageEntry } from "@/themes"
import SnortablesHome from "./pages/home"

export { config }

export const pages: Record<string, PageEntry> = {
  "": SnortablesHome,
}

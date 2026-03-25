import { config } from "./config"
import type { PageEntry } from "@/themes"
import ApexHome from "./pages/home"

export { config }

export const pages: Record<string, PageEntry> = {
  "": ApexHome,
}

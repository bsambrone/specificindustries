import { config } from "./config"
import type { PageEntry } from "@/themes"
import CleanSheetHome from "./pages/home"
import ServicesPage, { metadata as servicesMetadata } from "./pages/services"

export { config }

export const pages: Record<string, PageEntry> = {
  "": CleanSheetHome,
  "services": { component: ServicesPage, metadata: servicesMetadata },
}

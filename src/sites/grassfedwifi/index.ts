import { config } from "./config"
import type { PageEntry } from "@/themes"
import GrassFedWiFiHome from "./pages/home"

export { config }

export const pages: Record<string, PageEntry> = {
  "": GrassFedWiFiHome,
}

export const dynamicRoutes = {}

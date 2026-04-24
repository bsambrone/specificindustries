import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import CarbonNeutralOutrageHome from "./pages/home"

export { config }

export const pages: Record<string, PageEntry> = {
  "": CarbonNeutralOutrageHome,
}

export const dynamicRoutes: Record<string, DynamicRoute> = {}

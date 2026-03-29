import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import InflatableAnchorsHome from "./pages/home"

export { config }

export const pages: Record<string, PageEntry> = {
  "": InflatableAnchorsHome,
}

export const dynamicRoutes: Record<string, DynamicRoute> = {}

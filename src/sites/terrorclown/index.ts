import type { PageEntry, DynamicRoute } from "@/themes"
import { config } from "./config"
import TerrorClownHome from "./pages/home"

export { config }

export const pages: Record<string, PageEntry> = {
  "": TerrorClownHome,
}

export const dynamicRoutes: Record<string, DynamicRoute> = {}

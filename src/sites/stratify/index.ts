import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import StratifyHome from "./pages/home"

export { config }

export const pages: Record<string, PageEntry> = {
  "": StratifyHome,
}

export const dynamicRoutes: Record<string, DynamicRoute> = {}

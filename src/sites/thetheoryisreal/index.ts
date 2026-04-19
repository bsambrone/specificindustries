import type { PageEntry, DynamicRoute } from "@/themes"
import { config } from "./config"
import Home from "./pages/home"

export { config }

export const pages: Record<string, PageEntry> = {
  "": Home,
}

export const dynamicRoutes: Record<string, DynamicRoute> = {}

import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import CitizensAgainstDhmoHome from "./pages/home"

export { config }

export const pages: Record<string, PageEntry> = {
  "": CitizensAgainstDhmoHome,
}

export const dynamicRoutes: Record<string, DynamicRoute> = {}

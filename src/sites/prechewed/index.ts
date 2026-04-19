import type { PageEntry, DynamicRoute } from "@/themes"
import { config } from "./config"
import PrechewedHome from "./pages/home"

export { config }

export const pages: Record<string, PageEntry> = {
  "": PrechewedHome,
}

export const dynamicRoutes: Record<string, DynamicRoute> = {}

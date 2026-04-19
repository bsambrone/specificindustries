import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"

import PetjacksHome from "./pages/home"

export { config }

export const pages: Record<string, PageEntry> = {
  "": PetjacksHome,
}

export const dynamicRoutes: Record<string, DynamicRoute> = {}

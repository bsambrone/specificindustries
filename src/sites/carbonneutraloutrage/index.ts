import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import CarbonNeutralOutrageHome from "./pages/home"
import ProgramsIndex, { metadata as programsMetadata } from "./pages/programs"

export { config }

export const pages: Record<string, PageEntry> = {
  "": CarbonNeutralOutrageHome,
  "programs": { component: ProgramsIndex, metadata: programsMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {}

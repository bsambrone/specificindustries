import type { PageEntry } from "@/themes"
import { config } from "./config"
import SovereignWellnessHome from "./pages/home"
import SovereignWellnessTreatments, { metadata as treatmentsMetadata } from "./pages/treatments"

export { config }

export const pages: Record<string, PageEntry> = {
  "": SovereignWellnessHome,
  "treatments": { component: SovereignWellnessTreatments, metadata: treatmentsMetadata },
}

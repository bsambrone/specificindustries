import type { PageEntry, DynamicRoute } from "@/themes"
import { config } from "./config"
import { getTreatmentBySlug } from "./data/treatments"
import SovereignWellnessHome from "./pages/home"
import SovereignWellnessTreatments, { metadata as treatmentsMetadata } from "./pages/treatments"
import TreatmentDetail from "./pages/treatment-detail"

export { config }

export const pages: Record<string, PageEntry> = {
  "": SovereignWellnessHome,
  "treatments": { component: SovereignWellnessTreatments, metadata: treatmentsMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  treatments: {
    component: TreatmentDetail,
    getMetadata: (slug: string) => {
      const t = getTreatmentBySlug(slug)
      return t
        ? { title: `${t.name} — Sovereign Wellness Co.`, description: t.tagline, ogImage: t.image }
        : undefined
    },
    isValidSlug: (slug: string) => !!getTreatmentBySlug(slug),
  },
}

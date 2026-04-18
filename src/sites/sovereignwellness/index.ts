import type { PageEntry, DynamicRoute } from "@/themes"
import { config } from "./config"
import { getTreatmentBySlug } from "./data/treatments"
import { getDispatchBySlug } from "./data/dispatches"
import SovereignWellnessHome from "./pages/home"
import SovereignWellnessTreatments, { metadata as treatmentsMetadata } from "./pages/treatments"
import TreatmentDetail from "./pages/treatment-detail"
import SovereignWellnessFounders, { metadata as foundersMetadata } from "./pages/founders"
import SovereignWellnessOurStory, { metadata as ourStoryMetadata } from "./pages/our-story"
import SovereignWellnessDispatches, { metadata as dispatchesMetadata } from "./pages/dispatches"
import DispatchDetail from "./pages/dispatch-detail"
import SovereignWellnessContact, { metadata as contactMetadata } from "./pages/contact"

export { config }

export const pages: Record<string, PageEntry> = {
  "": SovereignWellnessHome,
  "treatments": { component: SovereignWellnessTreatments, metadata: treatmentsMetadata },
  "founders": { component: SovereignWellnessFounders, metadata: foundersMetadata },
  "our-story": { component: SovereignWellnessOurStory, metadata: ourStoryMetadata },
  "dispatches": { component: SovereignWellnessDispatches, metadata: dispatchesMetadata },
  "contact": { component: SovereignWellnessContact, metadata: contactMetadata },
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
  dispatches: {
    component: DispatchDetail,
    getMetadata: (slug: string) => {
      const d = getDispatchBySlug(slug)
      return d
        ? { title: `${d.title} — Sovereign Wellness Co.`, description: d.excerpt, ogImage: d.image }
        : undefined
    },
    isValidSlug: (slug: string) => !!getDispatchBySlug(slug),
  },
}

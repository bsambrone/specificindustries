import type { PageEntry, DynamicRoute } from "@/themes"
import { config } from "./config"
import { getTreatmentBySlug } from "./data/treatments"
import { getDispatchBySlug } from "./data/dispatches"
import { articleSchema, serviceSchema } from "@/lib/seo/schemas"
import SovereignWellnessHome from "./pages/home"
import SovereignWellnessTreatments, { metadata as treatmentsMetadata } from "./pages/treatments"
import TreatmentDetail from "./pages/treatment-detail"
import SovereignWellnessFounders, { metadata as foundersMetadata } from "./pages/founders"
import SovereignWellnessOurStory, { metadata as ourStoryMetadata } from "./pages/our-story"
import SovereignWellnessDispatches, { metadata as dispatchesMetadata } from "./pages/dispatches"
import DispatchDetail from "./pages/dispatch-detail"
import SovereignWellnessContact, { metadata as contactMetadata } from "./pages/contact"
import SovereignWellnessPrivacy, { metadata as privacyMetadata } from "./pages/privacy"
import SovereignWellnessTerms, { metadata as termsMetadata } from "./pages/terms"

export { config }

export const pages: Record<string, PageEntry> = {
  "": SovereignWellnessHome,
  "treatments": { component: SovereignWellnessTreatments, metadata: treatmentsMetadata },
  "founders": { component: SovereignWellnessFounders, metadata: foundersMetadata },
  "our-story": { component: SovereignWellnessOurStory, metadata: ourStoryMetadata },
  "dispatches": { component: SovereignWellnessDispatches, metadata: dispatchesMetadata },
  "contact": { component: SovereignWellnessContact, metadata: contactMetadata },
  "privacy": { component: SovereignWellnessPrivacy, metadata: privacyMetadata },
  "terms": { component: SovereignWellnessTerms, metadata: termsMetadata },
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
    getBreadcrumbLabel: (slug: string) => getTreatmentBySlug(slug)?.name,
    breadcrumbSectionLabel: "Treatments",
    getJsonLd: (slug: string) => {
      const t = getTreatmentBySlug(slug)
      if (!t) return undefined
      return serviceSchema(
        "sovereignwellness",
        `treatments/${t.slug}`,
        {
          name: t.name,
          slug: t.slug,
          description: Array.isArray(t.mechanism)
            ? t.mechanism.join(" ")
            : t.tagline,
          image: t.image,
          serviceType: "MedicalTherapy",
          areaServed: "United States",
        },
        config
      )
    },
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
    getBreadcrumbLabel: (slug: string) => getDispatchBySlug(slug)?.title,
    breadcrumbSectionLabel: "Dispatches",
    getJsonLd: (slug: string) => {
      const d = getDispatchBySlug(slug)
      if (!d) return undefined
      return articleSchema(
        "sovereignwellness",
        `dispatches/${d.slug}`,
        {
          headline: d.title,
          slug: d.slug,
          description: d.excerpt,
          image: d.image,
        },
        config,
        "Article"
      )
    },
  },
}

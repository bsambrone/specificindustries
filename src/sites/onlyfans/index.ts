import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import { getFanBySlug } from "./data/fans"

import OnlyFansHome from "./pages/home"
import OnlyFansBrowse, { metadata as browseMetadata } from "./pages/browse"
import OnlyFansHowItWorks, { metadata as howItWorksMetadata } from "./pages/how-it-works"
import OnlyFansAbout, { metadata as aboutMetadata } from "./pages/about"
import OnlyFansTestimonials, { metadata as testimonialsMetadata } from "./pages/testimonials"
import OnlyFansContact, { metadata as contactMetadata } from "./pages/contact"
import OnlyFansPrivacy, { metadata as privacyMetadata } from "./pages/privacy"
import OnlyFansTerms, { metadata as termsMetadata } from "./pages/terms"
import FanDetail from "./pages/fan-detail"

export { config }

export const pages: Record<string, PageEntry> = {
  "": OnlyFansHome,
  "browse": { component: OnlyFansBrowse, metadata: browseMetadata },
  "how-it-works": { component: OnlyFansHowItWorks, metadata: howItWorksMetadata },
  "about": { component: OnlyFansAbout, metadata: aboutMetadata },
  "testimonials": { component: OnlyFansTestimonials, metadata: testimonialsMetadata },
  "contact": { component: OnlyFansContact, metadata: contactMetadata },
  "privacy": { component: OnlyFansPrivacy, metadata: privacyMetadata },
  "terms": { component: OnlyFansTerms, metadata: termsMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  browse: {
    component: FanDetail,
    getMetadata: (slug: string) => {
      const fan = getFanBySlug(slug)
      return fan
        ? { title: `${fan.name} — OnlyFans`, description: fan.bio }
        : undefined
    },
    isValidSlug: (slug: string) => !!getFanBySlug(slug),
  },
}

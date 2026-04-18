import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import { getPanBySlug } from "./data/pans"
import { productSchema } from "@/lib/seo/schemas"

import OnlyPansHome from "./pages/home"
import OnlyPansBrowse, { metadata as browseMetadata } from "./pages/browse"
import OnlyPansHowItWorks, { metadata as howItWorksMetadata } from "./pages/how-it-works"
import OnlyPansAbout, { metadata as aboutMetadata } from "./pages/about"
import OnlyPansTestimonials, { metadata as testimonialsMetadata } from "./pages/testimonials"
import OnlyPansContact, { metadata as contactMetadata } from "./pages/contact"
import OnlyPansPrivacy, { metadata as privacyMetadata } from "./pages/privacy"
import OnlyPansTerms, { metadata as termsMetadata } from "./pages/terms"
import PanDetail from "./pages/pan-detail"

export { config }

export const pages: Record<string, PageEntry> = {
  "": OnlyPansHome,
  "browse": { component: OnlyPansBrowse, metadata: browseMetadata },
  "how-it-works": { component: OnlyPansHowItWorks, metadata: howItWorksMetadata },
  "about": { component: OnlyPansAbout, metadata: aboutMetadata },
  "testimonials": { component: OnlyPansTestimonials, metadata: testimonialsMetadata },
  "contact": { component: OnlyPansContact, metadata: contactMetadata },
  "privacy": { component: OnlyPansPrivacy, metadata: privacyMetadata },
  "terms": { component: OnlyPansTerms, metadata: termsMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  browse: {
    component: PanDetail,
    getMetadata: (slug: string) => {
      const pan = getPanBySlug(slug)
      return pan
        ? { title: `${pan.name} — Only Pans`, description: pan.bio, ogImage: pan.coverImage }
        : undefined
    },
    isValidSlug: (slug: string) => !!getPanBySlug(slug),
    getBreadcrumbLabel: (slug: string) => getPanBySlug(slug)?.name,
    breadcrumbSectionLabel: "Browse",
    getJsonLd: (slug: string) => {
      const pan = getPanBySlug(slug)
      if (!pan) return undefined
      return productSchema(
        "onlypans",
        `browse/${pan.slug}`,
        {
          name: pan.name,
          slug: pan.slug,
          description: pan.bio,
          tagline: pan.panType,
          image: pan.avatarImage,
          price: pan.monthlyPrice,
          category: pan.niche,
        },
        config.name
      )
    },
  },
}

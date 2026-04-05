import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import { getShareBySlug } from "./data/shares"
import GrassFedWiFiHome from "./pages/home"
import GrassFedWiFiShares, { metadata as sharesMetadata } from "./pages/shares"
import ShareDetail from "./pages/share-detail"
import HarvestCalendar, { metadata as calendarMetadata } from "./pages/harvest-calendar"
import GrazingLands, { metadata as grazingMetadata } from "./pages/grazing-lands"
import ThePasture, { metadata as pastureMetadata } from "./pages/the-pasture"

export { config }

export const pages: Record<string, PageEntry> = {
  "": GrassFedWiFiHome,
  "shares": { component: GrassFedWiFiShares, metadata: sharesMetadata },
  "harvest-calendar": { component: HarvestCalendar, metadata: calendarMetadata },
  "grazing-lands": { component: GrazingLands, metadata: grazingMetadata },
  "the-pasture": { component: ThePasture, metadata: pastureMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  shares: {
    component: ShareDetail,
    getMetadata: (slug: string) => {
      const share = getShareBySlug(slug)
      return share
        ? { title: `${share.name} — Grass Fed WiFi`, description: share.tagline }
        : undefined
    },
    isValidSlug: (slug: string) => !!getShareBySlug(slug),
  },
}

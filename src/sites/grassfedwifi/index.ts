import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import { getShareBySlug } from "./data/shares"
import GrassFedWiFiHome from "./pages/home"
import GrassFedWiFiShares, { metadata as sharesMetadata } from "./pages/shares"
import ShareDetail from "./pages/share-detail"

export { config }

export const pages: Record<string, PageEntry> = {
  "": GrassFedWiFiHome,
  "shares": { component: GrassFedWiFiShares, metadata: sharesMetadata },
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

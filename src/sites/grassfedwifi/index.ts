import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import { getShareBySlug } from "./data/shares"
import { getFieldNoteBySlug } from "./data/field-notes"
import GrassFedWiFiHome from "./pages/home"
import GrassFedWiFiShares, { metadata as sharesMetadata } from "./pages/shares"
import ShareDetail from "./pages/share-detail"
import HarvestCalendar, { metadata as calendarMetadata } from "./pages/harvest-calendar"
import GrazingLands, { metadata as grazingMetadata } from "./pages/grazing-lands"
import ThePasture, { metadata as pastureMetadata } from "./pages/the-pasture"
import MeetTheFarmers, { metadata as farmersMetadata } from "./pages/meet-the-farmers"
import FieldNotesIndex, { metadata as notesMetadata } from "./pages/field-notes"
import FieldNoteDetail from "./pages/field-note-detail"
import GrassFedWiFiContact, { metadata as contactMetadata } from "./pages/contact"
import Join, { metadata as joinMetadata } from "./pages/join"
import MyShare, { metadata as myShareMetadata } from "./pages/my-share"
import BecomeAMember, { metadata as becomeMetadata } from "./pages/become-a-member"

export { config }

export const pages: Record<string, PageEntry> = {
  "": GrassFedWiFiHome,
  "shares": { component: GrassFedWiFiShares, metadata: sharesMetadata },
  "harvest-calendar": { component: HarvestCalendar, metadata: calendarMetadata },
  "grazing-lands": { component: GrazingLands, metadata: grazingMetadata },
  "the-pasture": { component: ThePasture, metadata: pastureMetadata },
  "meet-the-farmers": { component: MeetTheFarmers, metadata: farmersMetadata },
  "field-notes": { component: FieldNotesIndex, metadata: notesMetadata },
  "contact": { component: GrassFedWiFiContact, metadata: contactMetadata },
  "join": { component: Join, metadata: joinMetadata },
  "cart": { component: MyShare, metadata: myShareMetadata },
  "my-share": { component: MyShare, metadata: myShareMetadata },
  "checkout": { component: BecomeAMember, metadata: becomeMetadata },
  "become-a-member": { component: BecomeAMember, metadata: becomeMetadata },
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
  "field-notes": {
    component: FieldNoteDetail,
    getMetadata: (slug: string) => {
      const note = getFieldNoteBySlug(slug)
      return note
        ? { title: `${note.title} — Grass Fed WiFi`, description: note.excerpt }
        : undefined
    },
    isValidSlug: (slug: string) => !!getFieldNoteBySlug(slug),
  },
}

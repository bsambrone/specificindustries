import type { PageEntry, DynamicRoute } from "@/themes"
import { config } from "./config"
import { getProductBySlug } from "./data/products"
import { getJournalBySlug } from "./data/journal"
import CarterAndFilsHome from "./pages/home"
import CarterAndFilsCellar, { metadata as cellarMetadata } from "./pages/cellar"
import OurStory, { metadata as ourStoryMetadata } from "./pages/our-story"
import Family, { metadata as familyMetadata } from "./pages/family"
import ProductDetail from "./pages/product-detail"
import WineClub, { metadata as wineClubMetadata } from "./pages/wine-club"
import Visit, { metadata as visitMetadata } from "./pages/visit"
import Journal, { metadata as journalMetadata } from "./pages/journal"
import JournalEntry from "./pages/journal-entry"
import Contact, { metadata as contactMetadata } from "./pages/contact"
import Privacy, { metadata as privacyMetadata } from "./pages/privacy"
import Terms, { metadata as termsMetadata } from "./pages/terms"
import CarterAndFilsCart from "./pages/cart"
import CarterAndFilsCheckout from "./pages/checkout"

export { config }

export const pages: Record<string, PageEntry> = {
  "": CarterAndFilsHome,
  "cellar": { component: CarterAndFilsCellar, metadata: cellarMetadata },
  "our-story": { component: OurStory, metadata: ourStoryMetadata },
  "family": { component: Family, metadata: familyMetadata },
  "wine-club": { component: WineClub, metadata: wineClubMetadata },
  "visit": { component: Visit, metadata: visitMetadata },
  "journal": { component: Journal, metadata: journalMetadata },
  "contact": { component: Contact, metadata: contactMetadata },
  "privacy": { component: Privacy, metadata: privacyMetadata },
  "terms": { component: Terms, metadata: termsMetadata },
  "cart": CarterAndFilsCart,
  "checkout": CarterAndFilsCheckout,
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  cellar: {
    component: ProductDetail,
    getMetadata: (slug: string) => {
      const product = getProductBySlug(slug)
      return product
        ? { title: `${product.name} — Domaine Carter & Fils`, description: product.tagline, ogImage: product.image }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
  },
  journal: {
    component: JournalEntry,
    getMetadata: (slug: string) => {
      const entry = getJournalBySlug(slug)
      return entry
        ? { title: `${entry.title} — Domaine Carter & Fils`, description: entry.excerpt }
        : undefined
    },
    isValidSlug: (slug: string) => !!getJournalBySlug(slug),
  },
}

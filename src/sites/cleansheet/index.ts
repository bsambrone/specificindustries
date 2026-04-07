import { config } from "./config"
import type { PageEntry } from "@/themes"
import CleanSheetHome from "./pages/home"
import ServicesPage, { metadata as servicesMetadata } from "./pages/services"
import AboutPage, { metadata as aboutMetadata } from "./pages/about"
import LeadershipPage, { metadata as leadershipMetadata } from "./pages/leadership"
import ContactPage, { metadata as contactMetadata } from "./pages/contact"
import PrivacyPage, { metadata as privacyMetadata } from "./pages/privacy"
import TermsPage, { metadata as termsMetadata } from "./pages/terms"

export { config }

export const pages: Record<string, PageEntry> = {
  "": CleanSheetHome,
  "services": { component: ServicesPage, metadata: servicesMetadata },
  "about": { component: AboutPage, metadata: aboutMetadata },
  "leadership": { component: LeadershipPage, metadata: leadershipMetadata },
  "contact": { component: ContactPage, metadata: contactMetadata },
  "privacy": { component: PrivacyPage, metadata: privacyMetadata },
  "terms": { component: TermsPage, metadata: termsMetadata },
}

import { config } from "./config"
import type { PageEntry } from "@/themes"
import UnmotivatorsHome from "./pages/home"
import UnmotivatorsOffice, { metadata as officeMetadata } from "./pages/office"

export { config }

export const pages: Record<string, PageEntry> = {
  "": UnmotivatorsHome,
  "office": { component: UnmotivatorsOffice, metadata: officeMetadata },
}

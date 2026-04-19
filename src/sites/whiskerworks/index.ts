import { config } from "./config"
import type { PageEntry } from "@/themes"

import WhiskerworksHome from "./pages/home"

export { config }

export const pages: Record<string, PageEntry> = {
  "": WhiskerworksHome,
}

import { config } from "./config"
import type { PageEntry } from "@/themes"
import OnlyFansHome from "./pages/home"

export { config }

export const pages: Record<string, PageEntry> = {
  "": OnlyFansHome,
}

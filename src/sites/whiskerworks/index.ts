import { config } from "./config"
import type { PageEntry } from "@/themes"

import WhiskerworksHome from "./pages/home"
import WhiskerworksCourses, { metadata as coursesMetadata } from "./pages/courses"
import WhiskerworksDivisions, { metadata as divisionsMetadata } from "./pages/divisions"

export { config }

export const pages: Record<string, PageEntry> = {
  "": WhiskerworksHome,
  "courses": { component: WhiskerworksCourses, metadata: coursesMetadata },
  "divisions": { component: WhiskerworksDivisions, metadata: divisionsMetadata },
}

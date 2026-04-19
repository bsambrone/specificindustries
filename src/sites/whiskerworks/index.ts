import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import { getCourseBySlug } from "./data/courses"
import { getDivisionBySlug } from "./data/divisions"

import WhiskerworksHome from "./pages/home"
import WhiskerworksCourses, { metadata as coursesMetadata } from "./pages/courses"
import WhiskerworksDivisions, { metadata as divisionsMetadata } from "./pages/divisions"
import WhiskerworksFaculty, { metadata as facultyMetadata } from "./pages/faculty"
import WhiskerworksLeadership, { metadata as leadershipMetadata } from "./pages/leadership"
import WhiskerworksAbout, { metadata as aboutMetadata } from "./pages/about"
import WhiskerworksContact, { metadata as contactMetadata } from "./pages/contact"
import CourseDetail from "./pages/course-detail"
import DivisionDetail from "./pages/division-detail"

export { config }

export const pages: Record<string, PageEntry> = {
  "": WhiskerworksHome,
  "courses": { component: WhiskerworksCourses, metadata: coursesMetadata },
  "divisions": { component: WhiskerworksDivisions, metadata: divisionsMetadata },
  "faculty": { component: WhiskerworksFaculty, metadata: facultyMetadata },
  "leadership": { component: WhiskerworksLeadership, metadata: leadershipMetadata },
  "about": { component: WhiskerworksAbout, metadata: aboutMetadata },
  "contact": { component: WhiskerworksContact, metadata: contactMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  courses: {
    component: CourseDetail,
    getMetadata: (slug: string) => {
      const course = getCourseBySlug(slug)
      if (!course) return undefined
      if (course.isRedacted) {
        return {
          title: "[REDACTED] — Whiskerworks",
          description: "Clearance required.",
        }
      }
      return {
        title: `${course.title} — Whiskerworks`,
        description: course.tagline,
        ogImage: course.image,
      }
    },
    isValidSlug: (slug: string) => !!getCourseBySlug(slug),
    getBreadcrumbLabel: (slug: string) => {
      const c = getCourseBySlug(slug)
      return c?.isRedacted ? "[REDACTED]" : c?.title
    },
    breadcrumbSectionLabel: "Courses",
  },
  divisions: {
    component: DivisionDetail,
    getMetadata: (slug: string) => {
      const division = getDivisionBySlug(slug)
      if (!division) return undefined
      if (division.isRedacted) {
        return {
          title: "Blackbook — Whiskerworks",
          description: "Classification pending.",
        }
      }
      return {
        title: `${division.name} — Whiskerworks`,
        description: division.tagline,
      }
    },
    isValidSlug: (slug: string) => !!getDivisionBySlug(slug),
    getBreadcrumbLabel: (slug: string) => getDivisionBySlug(slug)?.name,
    breadcrumbSectionLabel: "Divisions",
  },
}

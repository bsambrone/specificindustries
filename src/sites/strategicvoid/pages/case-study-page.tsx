"use client"

import { getCaseStudyBySlug } from "@/sites/strategicvoid/data/case-studies"
import { SectionRenderer } from "@/components/content-sections/section-renderer"

interface CaseStudyPageProps {
  slug: string
  segments?: string[]
}

export default function CaseStudyPage({ slug }: CaseStudyPageProps) {
  const caseStudy = getCaseStudyBySlug(slug)

  if (!caseStudy) return null

  return (
    <article>
      <SectionRenderer sections={caseStudy.sections} />
    </article>
  )
}

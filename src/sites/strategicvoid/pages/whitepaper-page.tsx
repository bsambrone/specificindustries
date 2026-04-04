import { getWhitepaperBySlug } from "@/sites/strategicvoid/data/whitepapers"
import { SectionRenderer } from "@/components/content-sections/section-renderer"
import { EmailGateForm } from "@/components/ui/email-gate-form"

interface WhitepaperPageProps {
  slug: string
  segments?: string[]
}

export default async function WhitepaperPage({ slug }: WhitepaperPageProps) {
  const whitepaper = getWhitepaperBySlug(slug)

  if (!whitepaper) return null

  return (
    <EmailGateForm
      title={whitepaper.title}
      subtitle="Enter your work email to access this whitepaper."
      storageKey={`sv-wp-${slug}`}
    >
      <article>
        <SectionRenderer sections={whitepaper.sections} />
      </article>
    </EmailGateForm>
  )
}

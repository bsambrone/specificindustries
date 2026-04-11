import { Hero } from "@/components/ui/hero"
import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Case Studies — Gristmill Partners",
  description:
    "Client engagements from Gristmill Partners' six decades of workforce stabilization work. Case studies forthcoming.",
}

export default function CaseStudiesIndexPage() {
  return (
    <div className="bg-background text-foreground">
      <Hero
        headline="Six Decades of Case Studies"
        subheadline="Gristmill Partners has delivered more than 8,400 engagements since 1962. Selected case studies forthcoming."
        image="/sites/gristmill/case-studies-hero.png"
      />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-lg leading-relaxed">
          Case studies from our full client roster will be published on this page in due course.
        </p>
      </section>
    </div>
  )
}

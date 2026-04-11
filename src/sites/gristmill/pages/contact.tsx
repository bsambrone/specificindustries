import { Hero } from "@/components/ui/hero"
import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Contact — Gristmill Partners",
  description:
    "Begin an engagement with Gristmill Partners. A member of our Workforce Stabilization Team will contact you within three to five business quarters.",
}

export default function ContactPage() {
  return (
    <div className="bg-background text-foreground">
      <Hero
        headline="Contact the Workforce Stabilization Team"
        subheadline="A member of our Workforce Stabilization Team will contact you within three to five business quarters."
        image="/sites/gristmill/contact-hero.png"
      />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-lg leading-relaxed">
          Full engagement request form forthcoming. In the interim, direct inquiries may be
          addressed to the founder&apos;s office.
        </p>
        <p className="mt-8 text-xs text-foreground/60">
          Direct inquiries to the founder may be addressed to bsambrone@gmail.com.
        </p>
      </section>
    </div>
  )
}

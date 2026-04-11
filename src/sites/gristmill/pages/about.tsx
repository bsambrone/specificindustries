import { Hero } from "@/components/ui/hero"
import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "About — Gristmill Partners",
  description:
    "Sixty-four years of workforce stabilization. Gristmill Partners has been privately held, family-operated, and deeply resistant to change since 1962.",
}

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground">
      <Hero
        headline="Sixty-Four Years of Workforce Stabilization"
        subheadline="Privately held. Family-operated. Deeply resistant to change since 1962."
        image="/sites/gristmill/about-hero.png"
      />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-lg leading-relaxed">
          Gristmill Partners was founded in 1962 in a converted grain mill in Youngstown, Ohio,
          by a man who believed that the American worker had become insufficiently afraid.
          Full company history and leadership details forthcoming.
        </p>
      </section>
    </div>
  )
}

import { Hero } from "@/components/ui/hero"
import { PressReleaseCard } from "@/components/ui/press-release-card"
import { pressReleases } from "../data/press-releases"

export default function ApexNewsroom() {
  const sorted = [...pressReleases].sort((a, b) => b.dateIso.localeCompare(a.dateIso))

  return (
    <>
      <Hero
        headline="Newsroom"
        subheadline="The latest from Specific Industries and its portfolio companies."
      />

      <section className="py-14 px-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {sorted.map((release) => (
            <PressReleaseCard
              key={release.slug}
              slug={release.slug}
              date={release.date}
              headline={release.headline}
              lede={release.lede}
              href={`/newsroom/${release.slug}`}
            />
          ))}
        </div>
      </section>

      <section className="py-12 px-4 border-t border-primary/10">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm text-foreground/60">
            Media inquiries are accepted in written form. A response, if warranted, will be provided.
          </p>
        </div>
      </section>
    </>
  )
}

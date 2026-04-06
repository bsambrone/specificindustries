import Image from "next/image"
import Link from "next/link"
import { getCoalitionBySlug } from "@/sites/elderparty/data/coalitions"
import { positions } from "@/sites/elderparty/data/platform"
import { Bleed } from "@/components/ui/bleed"
import { getSiteHref } from "@/lib/site-href"

export default async function CoalitionDetail({ slug }: { slug: string }) {
  const siteHref = await getSiteHref()
  const coalition = getCoalitionBySlug(slug)
  if (!coalition) return null

  const alignedPositions = positions.filter((p) =>
    coalition.platformAlignments.includes(p.slug)
  )

  // Split endorsement statement to apply Bleed to the last sentence
  const endorsementSentences = coalition.endorsementStatement.split(/(?<=\.)\s+/)
  const endorsementStart = endorsementSentences.slice(0, -1).join(" ")
  const endorsementEnd = endorsementSentences[endorsementSentences.length - 1]

  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 px-6 min-h-[340px] md:min-h-[400px]">
        <Image
          src={coalition.image}
          alt={coalition.name}
          fill
          className="object-cover brightness-40"
          priority
          fetchPriority="high"
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-xs text-white/60 uppercase tracking-widest font-semibold mb-4">
            Coalition Partner
          </p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 leading-tight">
            {coalition.name}
          </h1>
          <p className="text-xl text-white/80 italic">
            {coalition.tagline}
          </p>
        </div>
      </section>

      {/* Description */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-primary mb-8 uppercase tracking-wide">
            About the Coalition
          </h2>
          <div className="space-y-5">
            {coalition.description.map((paragraph, i) => (
              <p key={i} className="text-foreground/70 leading-relaxed text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Leader Quote */}
      <section className="py-16 px-6 bg-secondary/30">
        <div className="max-w-3xl mx-auto">
          <blockquote className="border-l-4 border-primary/40 pl-6 py-4">
            <p className="text-xl text-foreground/80 italic leading-relaxed mb-4">
              &ldquo;{coalition.leaderQuote.text}&rdquo;
            </p>
            <cite className="text-sm text-foreground/50 not-italic block">
              &mdash; {coalition.leaderQuote.author}, {coalition.leaderQuote.title}
            </cite>
          </blockquote>
        </div>
      </section>

      {/* Endorsement Statement */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-primary mb-8 uppercase tracking-wide">
            Official Endorsement
          </h2>
          <div className="bg-secondary/20 border border-primary/10 rounded-lg p-8">
            <p className="text-foreground/70 leading-relaxed text-lg">
              {endorsementStart}{" "}
              <Bleed text={endorsementEnd} intensity={3} as="span" className="text-foreground/70" />
            </p>
          </div>
        </div>
      </section>

      {/* Why We Stand With The Elder Party */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-primary mb-4 uppercase tracking-wide">
            Why We Stand With The Elder Party
          </h2>
          <p className="text-foreground/60 mb-8">
            The following platform positions directly align with our coalition&apos;s mission and values.
          </p>
          <div className="space-y-6">
            {alignedPositions.map((position) => (
              <Link
                key={position.slug}
                href={siteHref(`/platform#${position.slug}`)}
                className="group flex items-start gap-6 bg-background border border-primary/10 rounded-lg p-6 hover:border-primary/30 transition-colors"
              >
                <div className="shrink-0 w-20 h-20 relative rounded overflow-hidden">
                  <Image
                    src={position.image}
                    alt={position.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-heading font-semibold text-primary mb-1 group-hover:text-accent transition-colors">
                    {position.title}
                  </h3>
                  <p className="text-sm text-foreground/60 italic mb-2">
                    {position.slogan}
                  </p>
                  <p className="text-xs text-primary/50 uppercase tracking-wider">
                    View Platform Position &rarr;
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Back to Coalitions */}
      <section className="py-12 px-6 border-t border-primary/10">
        <div className="max-w-3xl mx-auto text-center">
          <Link
            href={siteHref("/coalitions")}
            className="inline-block px-8 py-3 border border-primary/40 text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors text-sm uppercase tracking-wider"
          >
            &larr; All Coalitions
          </Link>
        </div>
      </section>
    </div>
  )
}

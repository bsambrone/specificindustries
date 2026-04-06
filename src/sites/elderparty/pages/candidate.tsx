import Image from "next/image"
import Link from "next/link"
import { getSiteHref } from "@/lib/site-href"
import { officials } from "@/sites/elderparty/data/leadership"
import { positions } from "@/sites/elderparty/data/platform"

const candidate = officials[0]
const keyPositions = positions.filter((p) =>
  ["national-security", "healthcare", "civil-rights", "energy"].includes(p.slug)
)

export const metadata = {
  title: "Cthulhu R'lyeh — The Candidate — The Elder Party",
  description: "Meet Cthulhu R'lyeh, founder and presidential candidate of the Elder Party. A leader who has waited millennia to serve this great nation.",
}

export default async function CandidatePage() {
  const siteHref = await getSiteHref()

  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 md:py-32 px-6 min-h-[340px] md:min-h-[400px]">
        <Image
          src="/sites/elderparty/candidate-hero.png"
          alt=""
          fill
          className="object-cover brightness-40"
          priority
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-sm text-white/60 uppercase tracking-widest mb-4">
            Elder Party Presidential Candidate
          </p>
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-white mb-4 leading-tight">
            {candidate.name}
          </h1>
          <p className="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
            {candidate.title}
          </p>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            {/* Portrait */}
            <div className="shrink-0 w-full md:w-72">
              <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden border border-primary/10">
                <Image
                  src={candidate.image}
                  alt={candidate.name}
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>

            {/* Bio Content */}
            <div className="flex-1">
              <h2 className="text-3xl font-heading font-bold text-primary mb-6">
                About the Candidate
              </h2>
              <p className="text-foreground/70 leading-relaxed mb-6">
                {candidate.bio}
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mb-8">
                {candidate.highlights.map((h, i) => (
                  <div key={i} className="flex justify-between py-2 border-b border-primary/5 last:border-0">
                    <span className="text-xs text-foreground/40">{h.label}</span>
                    <span className="text-xs text-foreground/70 font-medium text-right ml-4">{h.value}</span>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="border-l-2 border-accent/40 pl-4 py-2">
                <p className="text-sm text-foreground/60 italic">
                  &ldquo;{candidate.quote}&rdquo;
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Vision for America */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
            <div className="shrink-0 w-full md:w-96">
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-primary/10">
                <Image
                  src="/sites/elderparty/candidate-vision.png"
                  alt="Cthulhu R'lyeh's vision for America"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-heading font-bold text-primary mb-6">
                A Vision for America
              </h2>
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>
                  This great nation was built on the promise that all are created equal and endowed with
                  certain unalienable rights. Cthulhu R&apos;lyeh believes in that promise — and believes it
                  is time to extend it beyond the narrow definitions of previous administrations. Life,
                  liberty, and the pursuit of happiness should not be limited to those who breathe air,
                  walk upright, or exist in only three dimensions.
                </p>
                <p>
                  The American flag should fly from every coast, every mountaintop, and every spire of
                  R&apos;lyeh. Our military should be the strongest in any dimension. Our economy should draw
                  on resources that other nations don&apos;t even know exist. Our children should receive an
                  education that prepares them for a universe far larger and stranger than their current
                  textbooks acknowledge.
                </p>
                <p>
                  This is not radicalism. This is patriotism — the deepest kind. The kind that loves America
                  enough to show it what lies beneath the surface of everything it thought it knew. The kind
                  that has waited eons for the right moment. That moment is now.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Policy Highlights */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-primary mb-4 text-center">
            Key Policy Priorities
          </h2>
          <p className="text-foreground/60 text-center mb-12 max-w-2xl mx-auto">
            The candidate&apos;s platform addresses the issues that matter most to Americans —
            and several issues Americans didn&apos;t know they had.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {keyPositions.map((position) => (
              <Link
                key={position.slug}
                href={siteHref(`/platform#${position.slug}`)}
                className="block border border-primary/10 rounded-lg p-6 bg-secondary/20 hover:bg-secondary/30 transition-colors group"
              >
                <h3 className="text-lg font-heading font-semibold text-primary mb-1 group-hover:text-primary/80 transition-colors">
                  {position.title}
                </h3>
                <p className="text-sm text-foreground/50 italic mb-3">
                  {position.slogan}
                </p>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {position.description[0].slice(0, 180)}...
                </p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href={siteHref("/platform")}
              className="inline-block px-8 py-3 border border-primary/40 text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors text-sm uppercase tracking-wider"
            >
              Full Platform
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-primary mb-4">
            Join the Campaign
          </h2>
          <p className="text-foreground/60 mb-8 leading-relaxed">
            Cthulhu R&apos;lyeh&apos;s campaign is powered by Americans who have heard the call. Volunteer your time,
            donate to the cause, or simply show up at a rally and let the awakening take its course.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={siteHref("/volunteer")}
              className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Volunteer
            </Link>
            <Link
              href={siteHref("/donate")}
              className="inline-block px-8 py-3 border border-primary/40 text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors"
            >
              Donate
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

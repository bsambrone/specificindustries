import Image from "next/image"
import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { DidYouKnowTicker } from "@/sites/citizensagainstdhmo/components/did-you-know-ticker"
import { ThreatCard } from "@/sites/citizensagainstdhmo/components/threat-card"
import { PetitionForm } from "@/sites/citizensagainstdhmo/components/petition-form"
import { threats } from "@/sites/citizensagainstdhmo/data/threats"
import { sources } from "@/sites/citizensagainstdhmo/data/sources"
import { stories } from "@/sites/citizensagainstdhmo/data/stories"
import { heroStats } from "@/sites/citizensagainstdhmo/data/impact-stats"

const featuredThreats = threats.slice(0, 6)
const featuredSources = sources.slice(0, 4)
const featuredStory = stories[0]

export default function CitizensAgainstDhmoHome() {
  return (
    <>
      <Hero
        headline="DHMO is in everything you love."
        subheadline="It is in your food. It is in your water. It is in your hospital IV. It is in your child&apos;s school cafeteria. We are the citizens demanding answers."
        ctaText="Sign the Petition"
        ctaHref="/take-action"
        secondaryCtaText="See the Threats"
        secondaryCtaHref="/threats"
        image="/sites/citizensagainstdhmo/hero.png"
      />

      <DidYouKnowTicker />

      {/* Mission */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-4">Our Mission</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6 leading-tight">
            Disclosure first. Decisions second. Citizens always.
          </h2>
          <p className="text-foreground/70 leading-relaxed text-lg">
            Citizens Against DHMO is the leading grassroots movement working to bring transparency, disclosure, and accountability to the use of dihydrogen monoxide in food, schools, healthcare, infrastructure, agriculture, and the data centers that power modern life. Since 2019.
          </p>
        </div>
      </section>

      {/* Threats preview */}
      <section className="py-20 px-6 bg-white border-y border-accent/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center text-primary mb-4">The Threats</h2>
          <p className="text-center text-foreground/60 text-sm mb-12 max-w-2xl mx-auto">
            Ten documented categories of harm. Each one represents a different vector through which the substance enters human and ecological systems.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredThreats.map((t) => (
              <ThreatCard key={t.slug} threat={t} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/threats"
              className="inline-block px-8 py-3 border border-primary/40 text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors text-sm uppercase tracking-wider"
            >
              See All Ten Threats
            </Link>
          </div>
        </div>
      </section>

      {/* Impact snapshot */}
      <section className="py-16 px-6 bg-primary text-background">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-xs uppercase tracking-widest text-background/70 mb-8 font-semibold">
            Cumulative Impact, 2019&ndash;2026
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 text-center">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl md:text-5xl font-heading font-bold text-background">{stat.value}</p>
                <p className="text-xs md:text-sm text-background/70 mt-2 leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured story */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-3 text-center">Survivor Story</p>
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-12">From the people closest to the exposure</h2>
          <article className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 items-center border border-accent/30 rounded-lg p-8 bg-white">
            <div className="relative aspect-square w-full md:w-[200px] rounded-lg overflow-hidden bg-secondary/10">
              <Image src={featuredStory.portrait} alt={featuredStory.name} fill className="object-cover object-top" />
            </div>
            <div>
              <blockquote className="text-xl md:text-2xl font-heading font-semibold text-primary leading-snug italic mb-4">
                &ldquo;{featuredStory.pullQuote}&rdquo;
              </blockquote>
              <p className="text-sm text-foreground/70 mb-4">
                &mdash; {featuredStory.name}, {featuredStory.age} &middot; {featuredStory.location} &middot; {featuredStory.occupation}
              </p>
              <Link
                href={`/stories/${featuredStory.slug}`}
                className="inline-block px-6 py-2 border border-primary/40 text-primary rounded font-semibold hover:bg-primary/10 transition-colors text-xs uppercase tracking-wider"
              >
                Read {featuredStory.name.split(" ")[0]}&apos;s story
              </Link>
            </div>
          </article>
          <div className="text-center mt-10">
            <Link
              href="/stories"
              className="inline-block px-8 py-3 border border-primary/40 text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors text-sm uppercase tracking-wider"
            >
              See All Eight Stories
            </Link>
          </div>
        </div>
      </section>

      {/* Sources preview */}
      <section className="py-20 px-6 bg-white border-y border-accent/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center text-primary mb-4">Where It Hides</h2>
          <p className="text-center text-foreground/60 text-sm mb-12 max-w-2xl mx-auto">
            Eight environments where the substance is dispensed continuously, often to people who have not been asked for consent.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredSources.map((s) => (
              <Link
                key={s.slug}
                href={`/sources/${s.slug}`}
                className="group block border border-accent/30 rounded-lg overflow-hidden bg-background hover:border-primary/40 transition-colors"
              >
                <div className="relative w-full aspect-[4/3] bg-secondary/10">
                  <Image src={s.heroImage} alt={s.name} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-heading font-semibold text-primary mb-1 group-hover:text-secondary transition-colors">
                    {s.name}
                  </h3>
                  <p className="text-xs text-foreground/60 leading-snug">{s.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/sources"
              className="inline-block px-8 py-3 border border-primary/40 text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors text-sm uppercase tracking-wider"
            >
              See All Eight Sources
            </Link>
          </div>
        </div>
      </section>

      {/* Petition CTA */}
      <section className="py-20 px-6 bg-secondary/10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-3">Take Action</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">Sign the petition.</h2>
          <p className="text-foreground/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            We are calling on Congress to require disclosure of dihydrogen monoxide content on consumer product labels, in institutional food service, and in federally licensed industrial facilities.
          </p>
          <PetitionForm />
        </div>
      </section>
    </>
  )
}

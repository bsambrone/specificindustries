import Image from "next/image"
import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { TestimonialGrid } from "@/components/ui/testimonial-grid"
import { CTABanner } from "@/components/ui/cta-banner"
import { Bleed } from "@/components/ui/bleed"
import { positions } from "@/sites/elderparty/data/platform"
import { coalitions } from "@/sites/elderparty/data/coalitions"
import { articles } from "@/sites/elderparty/data/news"
import { events } from "@/sites/elderparty/data/events"

const featuredPositions = positions.slice(0, 4)
const latestArticles = articles.slice(0, 3)
const upcomingEvents = events.slice(0, 3)

const coalitionTestimonials = coalitions.map((c) => ({
  quote: c.leaderQuote.text,
  author: `${c.leaderQuote.author}, ${c.leaderQuote.title}`,
}))

export default function ElderPartyHome() {
  return (
    <>
      <Hero
        headline="A Return to Older Values"
        subheadline="The Elder Party is committed to restoring what was always beneath. Leadership that has waited millennia. A fresh start for America — from the bottom up."
        ctaText="Our Platform"
        ctaHref="/platform"
        secondaryCtaText="Donate"
        secondaryCtaHref="/donate"
        image="/sites/elderparty/hero.png"
      />

      {/* Featured Platform Positions */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center text-primary mb-4 uppercase tracking-wide">
            Our Platform
          </h2>
          <p className="text-center text-foreground/60 text-sm mb-12 max-w-2xl mx-auto">
            Eight bold policy positions for an America ready to look beyond the horizon — and beneath the waves.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPositions.map((position) => (
              <div
                key={position.slug}
                className="border border-primary/10 rounded-lg overflow-hidden bg-secondary/20 hover:bg-secondary/30 transition-colors"
              >
                <div className="relative w-full aspect-[16/10]">
                  <Image
                    src={position.image}
                    alt={position.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-heading font-semibold text-primary mb-1">
                    {position.title}
                  </h3>
                  <p className="text-sm text-foreground/60 italic">
                    {position.slogan}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/platform"
              className="inline-block px-8 py-3 border border-primary/40 text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors text-sm uppercase tracking-wider"
            >
              View Full Platform
            </Link>
          </div>
        </div>
      </section>

      {/* Coalition Endorsements */}
      <TestimonialGrid
        title="Voices of the Coalition"
        testimonials={coalitionTestimonials}
      />

      {/* Latest News */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center text-primary mb-4 uppercase tracking-wide">
            Latest News
          </h2>
          <p className="text-center text-foreground/60 text-sm mb-12">
            Dispatches from the campaign trail.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestArticles.map((article) => (
              <article
                key={article.slug}
                className="border border-primary/10 rounded-lg overflow-hidden bg-secondary/20"
              >
                <div className="relative w-full aspect-[16/9]">
                  <Image
                    src={article.images[0].src}
                    alt={article.images[0].alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs text-foreground/40 mb-2">{article.date}</p>
                  <h3 className="text-lg font-heading font-semibold text-primary mb-2 leading-snug">
                    {article.headline}
                  </h3>
                  <p className="text-sm text-foreground/60 leading-relaxed">
                    {article.summary}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 px-4 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center text-primary mb-4 uppercase tracking-wide">
            Upcoming Events
          </h2>
          <p className="text-center text-foreground/60 text-sm mb-12">
            The awakening is happening near you.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <div
                key={event.slug}
                className="border border-primary/10 rounded-lg overflow-hidden bg-background"
              >
                <div className="relative w-full aspect-[16/9]">
                  <Image
                    src={event.image}
                    alt={event.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs text-foreground/40 mb-1">{event.date} &mdash; {event.location}</p>
                  <h3 className="text-lg font-heading font-semibold text-primary mb-2">
                    {event.name}
                  </h3>
                  <p className="text-sm text-foreground/60 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donate CTA */}
      <CTABanner
        headline="The Awakening Needs You"
        description="Every dollar brings us closer to a future that has been waiting since before the continents divided. Donate today."
        ctaText="Donate Now"
        ctaHref="/donate"
      />

      {/* Footer Disclaimer */}
      <section className="py-6 px-4 bg-foreground/5 border-t border-foreground/10">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-foreground/40 text-center leading-relaxed">
            Paid for by the Elder Party National Committee. Not affiliated with any branch of the United States government,
            any recognized political organization, or any entity bound by the laws of terrestrial physics.
            The Elder Party is an equal opportunity awakener. Side effects of party membership may include vivid dreams,
            coastal migration urges, and a persistent sense of being observed. These are normal.{" "}
            <Bleed text="Ph'nglui mglw'nafh Cthulhu R'lyeh wgah'nagl fhtagn." intensity={2} as="span" className="text-foreground/20" />
          </p>
        </div>
      </section>
    </>
  )
}

import Image from "next/image"
import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { CTABanner } from "@/components/ui/cta-banner"
import { TestimonialGrid } from "@/components/ui/testimonial-grid"
import { programs } from "@/sites/carbonneutraloutrage/data/programs"
import { heroStats, impactTestimonialPortraitSlugs, impactTestimonialQuotes } from "@/sites/carbonneutraloutrage/data/impact-stats"
import { getPortrait } from "@/data/testimonial-portraits"

const featuredPrograms = programs.slice(0, 4)

const homepageVoices = impactTestimonialPortraitSlugs.map((slug) => {
  const portrait = getPortrait(slug)
  if (!portrait) throw new Error(`Missing portrait: ${slug}`)
  return {
    quote: impactTestimonialQuotes[slug],
    author: `${portrait.name}${portrait.role ? `, ${portrait.role}` : ""}`,
  }
})

export default function CarbonNeutralOutrageHome() {
  return (
    <>
      <Hero
        headline="If you must overreact, do it responsibly."
        subheadline="The Campaign for Sustainable Overreactions is the leading nonprofit working to make civic outrage carbon-neutral, durable, and accountable. Join us."
        ctaText="Donate"
        ctaHref="/donate"
        secondaryCtaText="Take the Pledge"
        secondaryCtaHref="/take-action"
        image="/sites/carbonneutraloutrage/hero.png"
      />

      {/* Mission pitch */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-4">Our Mission</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6 leading-tight">
            Outrage is not the problem. Wasteful outrage is the problem.
          </h2>
          <p className="text-foreground/70 leading-relaxed text-lg">
            The Campaign measures, offsets, and credentials civic overreaction so that the energy spent on grievance does not exceed the gain it produces. Since 2017, our programs have offset more than 47,000 tantrums and put 1.2 million reusable pitchforks into responsible circulation.
          </p>
        </div>
      </section>

      {/* Featured programs */}
      <section className="py-20 px-6 border-t border-accent/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center text-primary mb-4">Programs</h2>
          <p className="text-center text-foreground/60 text-sm mb-12 max-w-2xl mx-auto">
            Eight active programs covering the full lifecycle of responsible overreaction — from prevention through credentialing.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPrograms.map((program) => (
              <Link
                key={program.slug}
                href={`/programs/${program.slug}`}
                className="group border border-accent/20 rounded-lg overflow-hidden bg-white hover:border-primary/40 transition-colors"
              >
                <div className="relative w-full aspect-[16/10] bg-secondary/10">
                  <Image src={program.heroImage} alt={program.displayName} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-heading font-semibold text-primary mb-2 leading-snug">
                    {program.displayName}
                  </h3>
                  <p className="text-sm text-foreground/60 leading-relaxed">{program.oneLiner}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/programs"
              className="inline-block px-8 py-3 border border-primary/40 text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors text-sm uppercase tracking-wider"
            >
              View All Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Impact ticker */}
      <section className="py-16 px-6 bg-primary text-background">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-xs uppercase tracking-widest text-background/70 mb-8 font-semibold">
            Cumulative Impact, 2017–2026
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

      {/* Voices */}
      <TestimonialGrid title="Voices of the Campaign" testimonials={homepageVoices} />

      {/* Donate CTA */}
      <CTABanner
        headline="The next overreaction is already happening somewhere."
        description="Your contribution funds the methodology, the credentialing, and the regional cooperatives that make responsible outrage possible. Donate today."
        ctaText="Donate Now"
        ctaHref="/donate"
      />
    </>
  )
}

"use client"

import { Hero } from "@/components/ui/hero"
import { WaveDivider } from "@/components/ui/wave-divider"
import { SplitSection } from "@/components/ui/split-section"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { CascadeTimeline } from "@/components/ui/cascade-timeline"
import { TeamMember } from "@/components/ui/team-member"
import { PromoBanner } from "@/components/ui/promo-banner"
import { useSiteLink } from "@/hooks/use-site-link"

export const metadata = {
  title: "Our Story — Dehydrated Water Laboratories",
  description: "The Drywell family legacy, since 1847.",
}

const timelineItems = [
  { year: "1847", description: "Ezekiel Drywell, transcendentalist philosopher-farmer, dehydrates his first barrel of water. Declares it 'liberated.'" },
  { year: "1863", description: "Supplies dehydrated water to both sides of the Civil War. Neither side orders a second shipment." },
  { year: "1889", description: "Ezekiel II patents the 'Drywell Method.' Patent office clerk writes 'Is this a joke?' in the margins. Patent approved anyway." },
  { year: "1923", description: "Survives Prohibition. Product is technically not a beverage." },
  { year: "1947", description: "Centennial celebration. Attendance: the Drywell family and one confused mailman." },
  { year: "1969", description: "NASA declines to bring Dehydrated Water to the moon. 'They already have dehydrated food. Adding dehydrated water felt redundant,' a spokesperson explains." },
  { year: "1987", description: "Ezekiel IV attempts to take the company public. The IPO raises $14." },
  { year: "2003", description: "Launches first website. Receives 3 visitors in 6 months. Two were bots." },
  { year: "2019", description: "Awarded zero Michelin stars. 'We were not aware water could receive stars,' says Michelin. 'It cannot.'" },
  { year: "2025", description: "Launches Water-as-a-Service (WaaS). Investors describe it as 'disruptive' and 'are you serious.'" },
  { year: "2026", description: "You are here. We are grateful. Ezekiel would be confused, but grateful." },
]

const teamMembers = [
  {
    name: "Ezekiel Drywell IV",
    title: "Current Patriarch",
    image: "/sites/dehydratedwater/team-ezekiel-iv.png",
    bio: "Runs the company with the same quiet determination and fundamental misunderstanding of hydration as his ancestors.",
  },
  {
    name: "Thaddeus Pemberton",
    title: "Chief Science Officer",
    image: "/sites/dehydratedwater/team-thaddeus.png",
    bio: "Holds a degree in 'Theoretical Hydrology' from an institution he prefers not to name.",
  },
  {
    name: "Percival Ashcroft",
    title: "Head of Quality Assurance",
    image: "/sites/dehydratedwater/team-percival.png",
    bio: "Has never once tasted the product. Considers this a point of professional pride.",
  },
  {
    name: "Cornelius Wainwright",
    title: "Director of Dehydration Operations",
    image: "/sites/dehydratedwater/team-cornelius.png",
    bio: "Oversees the day-to-day removal of water from water. Takes his work very seriously. Possibly too seriously.",
  },
]

export default function OurStory() {
  const siteHref = useSiteLink()
  return (
    <>
      <Hero
        dark
        headline="Our Story"
        subheadline="Seven generations of the Drywell family, united by a singular, unnecessary vision."
      />

      <WaveDivider variant="wave1" />

      {/* Founding story — SplitSection image right */}
      <SplitSection image="/sites/dehydratedwater/founder.png" imagePosition="right">
        <h2 className="text-3xl font-heading font-bold text-foreground mb-4">The Founding Vision</h2>
        <p className="text-foreground/70 mb-4 leading-relaxed">
          In 1847, Ezekiel Drywell — philosopher, farmer, and man of deeply specific convictions —
          stood before a well on his Vermont homestead and had a revelation.
          &ldquo;Water,&rdquo; he wrote in his journal, &ldquo;is burdened by its own wetness. Its essence is
          trapped in liquid form, like a bird in a cage made of itself.&rdquo;
        </p>
        <p className="text-foreground/70 mb-4 leading-relaxed">
          What followed was three years of failed experiments, a barn fire, and the eventual
          creation of the world&apos;s first packet of dehydrated water. His neighbors called him mad.
          His wife called him &ldquo;exhausting.&rdquo; Ezekiel called it progress.
        </p>
        <p className="text-foreground/70 leading-relaxed">
          Nearly two centuries later, the Drywell family continues to honor Ezekiel&apos;s vision —
          not because it makes sense, but because at this point, it would be more embarrassing to stop.
        </p>
      </SplitSection>

      <AnimatedCounter
        end={179}
        label="Years of Unnecessary Innovation"
        suffix=" Years"
      />

      {/* CascadeTimeline */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-primary">Company Timeline</h2>
        </div>
        <CascadeTimeline items={timelineItems} />
      </section>

      {/* Quote SplitSection — dark, image left */}
      <SplitSection
        image="/sites/dehydratedwater/science-dehydration.png"
        imagePosition="left"
        dark
      >
        <blockquote className="text-white">
          <p className="text-2xl md:text-3xl font-heading italic mb-6 leading-relaxed">
            &ldquo;Water is burdened by its own wetness.&rdquo;
          </p>
          <footer className="text-white/70 text-sm uppercase tracking-wide">
            — Ezekiel Drywell I, 1847
          </footer>
        </blockquote>
      </SplitSection>

      {/* Team grid */}
      <section className="py-16 px-4 bg-secondary/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-12">
            The Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <TeamMember
                key={member.name}
                name={member.name}
                title={member.title}
                image={member.image}
                bio={member.bio}
              />
            ))}
          </div>
        </div>
      </section>

      <PromoBanner
        headline="Join the legacy — Subscribe to WaaS"
        ctaText="Explore WaaS"
        ctaHref={siteHref("/waas")}
      />
    </>
  )
}

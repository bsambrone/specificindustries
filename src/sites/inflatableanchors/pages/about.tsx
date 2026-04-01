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
  title: "About — Inflatable Anchors Marine",
  description: "The story of how one man's bad back led to the world's lightest anchor.",
}

const timelineItems = [
  { year: "2019", description: "Captain Chuck Denton throws out his back hauling a 35-pound anchor onto his 12-foot dinghy. While lying on the dock, he gazes at a pool float and has a vision." },
  { year: "2020", description: "First prototype constructed from a pool float and duct tape. It does not anchor the boat. Chuck calls it 'a promising start.'" },
  { year: "2021", description: "Reef Henderson joins as Head of Buoyancy Research. His first memo: 'The anchor floats. This is by design.' Nobody questions it." },
  { year: "2022", description: "Launches Kickstarter campaign. Raises $847. Chuck's mom contributes $800 of it." },
  { year: "2023", description: "First customer complaint: 'The anchor doesn't anchor.' Skip Bayliner is hired to handle customer amazement. He responds: 'But wasn't it easy to pull up?'" },
  { year: "2024", description: "Big Mike Portside joins as VP of Heavy-Duty Operations. He is 6'4\" and 250 lbs. The product weighs 4 oz. No one addresses the contradiction." },
  { year: "2025", description: "Introduces the Premium Line. The Captain's Choice sells out in a week. 'Sells out' means they made 12 and sold all of them." },
  { year: "2026", description: "You're here. We're still here. The anchors are still floating. We consider this a success." },
]

const teamMembers = [
  {
    name: "Captain Chuck Denton",
    title: "Founder & Chief Inflation Officer",
    image: "/sites/inflatableanchors/team-chuck.png",
    bio: "Former marina operator turned inflatable anchor evangelist. Has demonstrated the product on live television twice. Both times, the anchor floated away on camera. Both times, he called it a success.",
  },
  {
    name: "Reef Henderson",
    title: "Head of Buoyancy Research",
    image: "/sites/inflatableanchors/team-reef.png",
    bio: "Holds a degree in something he describes as 'fluid-adjacent.' Has a whiteboard full of buoyancy equations that no one has verified. Has never successfully anchored a boat.",
  },
  {
    name: "Skip Bayliner",
    title: "Director of Customer Amazement",
    image: "/sites/inflatableanchors/team-skip.png",
    bio: "Handles all customer interactions with relentless positivity. Has responded to every complaint with 'But wasn't the retrieval easy?' Maintains a 1.2-star average on review sites and considers it 'room to grow.'",
  },
  {
    name: "Big Mike Portside",
    title: "VP of Heavy-Duty Operations",
    image: "/sites/inflatableanchors/team-mike.png",
    bio: "Oversees the Heavy Duty Pro line and all warehouse operations. Frequently photographed carrying comically small shipping boxes. His handshake is firmer than anything the company manufactures.",
  },
]

export default function InflatableAnchorsAbout() {
  const siteHref = useSiteLink()
  return (
    <>
      <Hero
        dark
        headline="About Us"
        subheadline="Founded on a bad back and a good idea. Well, an idea."
      />

      <WaveDivider variant="wave1" />

      {/* Origin story */}
      <SplitSection image="/sites/inflatableanchors/about-origin.png" imagePosition="right">
        <h2 className="text-3xl font-heading font-bold text-foreground mb-4">The Origin Story</h2>
        <p className="text-foreground/70 mb-4 leading-relaxed">
          In 2019, Captain Chuck Denton &mdash; marina operator, weekend boater, and man with a
          deteriorating L4-L5 disc &mdash; threw out his back for the last time hauling a
          35-pound Danforth anchor onto his 12-foot dinghy.
        </p>
        <p className="text-foreground/70 mb-4 leading-relaxed">
          While lying flat on the dock, staring at a child&apos;s pool float drifting past, Chuck had
          what he later described as &ldquo;the most important idea in marine history.&rdquo; His
          chiropractor described it as &ldquo;what happens when you mix painkillers and
          sunstroke.&rdquo;
        </p>
        <p className="text-foreground/70 leading-relaxed">
          Either way, Inflatable Anchors Marine was born. The anchor doesn&apos;t hold your boat in
          place, but you&apos;ll never throw out your back pulling it up. And honestly? That&apos;s
          the trade-off Chuck was willing to make.
        </p>
      </SplitSection>

      <AnimatedCounter
        end={47}
        label="Easy Pumps to Anchor Readiness"
        suffix=" Pumps"
      />

      {/* Timeline */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-primary">Company Timeline</h2>
        </div>
        <CascadeTimeline items={timelineItems} />
      </section>

      {/* Values — dark split section */}
      <SplitSection
        image="/sites/inflatableanchors/about-values.png"
        imagePosition="left"
        dark
      >
        <h2 className="text-3xl font-heading font-bold text-white mb-6">Our Values</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Lightweight Solutions</h3>
            <p className="text-white/70">If it weighs more than a sandwich, we&apos;re not interested.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Customer Amazement</h3>
            <p className="text-white/70">We aim to amaze. Amazement and satisfaction are different things, and we&apos;ve chosen our lane.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Buoyancy First</h3>
            <p className="text-white/70">Everything we make floats. This is non-negotiable and, for an anchor company, deeply unusual.</p>
          </div>
        </div>
      </SplitSection>

      {/* Team grid */}
      <section className="py-16 px-4 bg-secondary/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-12">
            Meet the Team
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
        headline="See what we've built"
        ctaText="View All Products"
        ctaHref={siteHref("/products")}
      />
    </>
  )
}

"use client"

import { useState } from "react"
import { Hero } from "@/components/ui/hero"
import { TeamMember } from "@/components/ui/team-member"

const TEAM_NAMES = [
  "Richard Thornberry",
  "James Whitfield",
  "Douglas Pemberton",
  "Gregory Ashworth",
  "Philip Mercer",
  "Jonathan Caldwell",
  "William Hargrove",
  "Thomas Fairbanks",
  "Robert Kingsley",
  "Edward Stanton",
  "Charles Whitmore",
  "Andrew Prescott",
]

const TEAM_TITLES = [
  "VP of Vertical Integration",
  "Chief Specificity Officer",
  "Director of Niche Market Analytics",
  "SVP of Underserved Sector Strategy",
  "Head of Precision Brand Development",
  "VP of Market Segment Identification",
  "Chief Portfolio Diversification Officer",
  "Director of Targeted Industry Solutions",
  "SVP of Strategic Specificity",
  "Head of Emerging Niche Operations",
  "VP of Bespoke Market Cultivation",
  "Chief Overlooked Opportunity Officer",
]

const TEAM_BIOS = [
  "Brings 15 years of experience in identifying niche market opportunities across underserved verticals.",
  "Formerly led market expansion at three Fortune 500 companies before recognizing the untapped potential of highly specific industries.",
  "Published researcher in the field of precision market segmentation with a focus on overlooked consumer demographics.",
  "Pioneered the framework for evaluating market viability in sectors previously considered too specific to serve.",
  "Background in strategic consulting with a specialization in brands that most people don't know they need.",
  "Built and scaled operations across seven distinct micro-industries, each more specific than the last.",
  "Recognized by Industry Weekly as a top innovator in the field of niche market identification and cultivation.",
  "Holds an MBA from Wharton with a thesis on the economics of serving markets that arguably should not exist.",
  "Two decades of experience turning overlooked opportunities into portfolio companies with dedicated followings.",
]

function shuffleAndPick<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export default function ApexAbout() {
  const [teamMembers] = useState(() => {
    const names = shuffleAndPick(TEAM_NAMES, 3)
    const titles = shuffleAndPick(TEAM_TITLES, 3)
    const bios = shuffleAndPick(TEAM_BIOS, 3)

    return [
      { image: "/sites/apex/team/member-1.png", name: names[0], title: titles[0], bio: bios[0] },
      { image: "/sites/apex/team/member-2.png", name: names[1], title: titles[1], bio: bios[1] },
      { image: "/sites/apex/team/member-3.png", name: names[2], title: titles[2], bio: bios[2] },
    ]
  })

  return (
    <>
      <Hero
        headline="About Specific Industries"
        subheadline="Identifying and serving the world's most overlooked market segments since day one."
      />

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl font-heading font-bold text-primary">Our Story</h2>
          <p className="text-lg text-foreground/80 leading-relaxed">
            Specific Industries was founded by Bill Sambrone after a simple observation: some industries
            are so specific, so niche, so deeply underserved that no one had thought to build a
            dedicated brand for them. Until now.
          </p>
          <p className="text-lg text-foreground/80 leading-relaxed">
            What began as a single venture into an overlooked market has grown into a portfolio of
            brands, each laser-focused on serving a specific industry with the dedication and
            expertise it deserves. We don&apos;t chase broad markets. We find the gaps that others
            walk right past, and we build something for the people standing in them.
          </p>

          <h2 className="text-3xl font-heading font-bold text-primary pt-8">Our Mission</h2>
          <p className="text-lg text-foreground/80 leading-relaxed">
            To identify, develop, and operate brands that serve markets too specific for anyone else
            to bother with. We believe that every industry — no matter how niche — deserves a
            company that takes it seriously.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            <div className="text-center">
              <h3 className="text-lg font-heading font-semibold text-primary mb-2">Market Specificity</h3>
              <p className="text-foreground/60 text-sm">We go where others won&apos;t — into markets so specific they barely have a name.</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-heading font-semibold text-primary mb-2">Vertical Dedication</h3>
              <p className="text-foreground/60 text-sm">Each brand gets our full attention. We don&apos;t do half-measures in niche markets.</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-heading font-semibold text-primary mb-2">Innovation</h3>
              <p className="text-foreground/60 text-sm">We apply serious operational rigor to industries that most people don&apos;t know exist.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-secondary/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center mb-12 text-primary">Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <TeamMember
              image="/sites/apex/team/bill-sambrone.png"
              name="Bill Sambrone"
              title="Founder & CEO"
              bio="Founded Specific Industries after identifying a pattern of underserved markets that no one else was willing to take seriously."
            />
            {teamMembers.map((member) => (
              <TeamMember
                key={member.image}
                image={member.image}
                name={member.name}
                title={member.title}
                bio={member.bio}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

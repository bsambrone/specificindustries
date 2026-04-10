import Image from "next/image"
import { Timeline } from "@/components/ui/timeline"
import { TeamMember } from "@/components/ui/team-member"
import { InfomercialBand } from "../components/InfomercialBand"
import { executives } from "../data/leadership"

export const metadata = {
  title: "About — Mousetrap Jenga",
  description: "America's favorite backyard inventors since 1978.",
}

const timelineItems = [
  { year: "1978", description: "The Idea — Harold Pemberton builds the first prototype on his kitchen table in Cedar Rapids, Iowa." },
  { year: "1982", description: "Retail Launch — First commercial run of 500 units sells out in Cedar Rapids in under three weeks." },
  { year: "1985", description: "As Seen On TV — National late-night television campaign introduces Mousetrap Jenga to millions of American families." },
  { year: "1989", description: "Bear Trap Edition — The Tournament Edition debuts, establishing the competitive Mousetrap Jenga circuit." },
  { year: "1995", description: "Briefly Banned — Three states attempt to ban the game. Sales triple within six weeks." },
  { year: "2003", description: "Hall of Fame — The Mousetrap Jenga Hall of Fame is founded in Cedar Rapids, honoring the sport's greatest players." },
  { year: "2026", description: "Still Family-Owned — Harold Pemberton still personally approves every production run. Still fun for the whole family!" },
]

export default function MousetrapJengaAbout() {
  return (
    <>
      <InfomercialBand bgColor="primary" textColor="light" verticalPadding="lg" bordered={false}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="font-heading text-5xl md:text-6xl text-[#FFD23F] drop-shadow-[4px_4px_0_#1A1F4C] leading-tight">
              America&apos;s Favorite Backyard Inventors
            </h1>
            <p className="text-xl text-[#FFF6E8]/90 mt-6">Since 1978.</p>
          </div>
          <div className="relative aspect-[4/3] border-4 border-[#1A1F4C] shadow-[8px_8px_0_0_#1A1F4C] bg-[#FFF6E8]">
            <Image src="/sites/mousetrapjenga/about-hero.png" alt="Harold Pemberton's basement workshop in 1978" fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
        </div>
      </InfomercialBand>

      <InfomercialBand bgColor="background" verticalPadding="lg">
        <div className="max-w-3xl mx-auto prose-lg text-[#1A1F4C]/90 space-y-5">
          <h2 className="font-heading text-3xl text-[#D4281F]">A Basement, A Rainy Saturday, An Idea.</h2>
          <p>
            The year was 1978. Harold Pemberton, a Cedar Rapids spring engineer and father of three, was stuck inside on
            a rainy Saturday with his kids. The family&apos;s board game collection had failed to produce what Harold
            described as &ldquo;sufficient excitement.&rdquo; Scrabble was boring. Monopoly took too long. Regular Jenga
            was — in Harold&apos;s own words — &ldquo;frankly unambitious.&rdquo;
          </p>
          <p>
            Harold went down to his basement workshop with a box of surplus mouse traps and a bag of wooden blocks he&apos;d
            been saving for a birdhouse. Three hours later, the first prototype of Mousetrap Jenga stood on his kitchen
            table. Six hours later, his nephew Vinnie made the first recorded trip to the emergency room.
          </p>
          <p>
            The rest is American history. From that kitchen table, Mousetrap Jenga has grown into a beloved family
            tradition played in living rooms across the country. Harold still personally approves every production run.
            His original prototype is on display at the Mousetrap Jenga Hall of Fame in Cedar Rapids. Vinnie is doing
            fine, thank you for asking.
          </p>
        </div>
      </InfomercialBand>

      <InfomercialBand bgColor="cream-dark" verticalPadding="lg">
        <h2 className="font-heading text-4xl text-[#D4281F] text-center mb-10">Our Storied History</h2>
        <Timeline items={timelineItems} />
      </InfomercialBand>

      <InfomercialBand bgColor="background" verticalPadding="lg">
        <h2 className="font-heading text-4xl text-[#D4281F] text-center mb-2">Meet the Inventors</h2>
        <p className="text-center text-[#1A1F4C]/70 mb-10">The team behind America&apos;s favorite family game.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {executives.map((exec) => (
            <TeamMember
              key={exec.slug}
              name={exec.name}
              title={exec.title}
              bio={exec.bio}
              image={exec.image}
            />
          ))}
        </div>
      </InfomercialBand>
    </>
  )
}

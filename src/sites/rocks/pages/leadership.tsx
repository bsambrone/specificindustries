import { TeamMember } from "@/components/ui/team-member"
import { TickerStrip } from "@/sites/rocks/components/ticker-strip"
import { TerminalHeading } from "@/sites/rocks/components/terminal-heading"

export const metadata = {
  title: "LEADERSHIP — ROCKS",
  description: "The team responsible for institutional rock custody operations since 1987.",
}

const leadership = [
  {
    image: "/sites/rocks/team-bill.png",
    name: "WILLIAM R. GOLDSWORTH",
    title: "FOUNDER & CHIEF EXECUTIVE",
    bio: "Founded the firm in 1987 with a thesis that remains unchanged. Previously a commodities analyst at a firm he does not name. Holds a personal position in all three instruments.",
  },
  {
    image: "/sites/rocks/team-brandon.png",
    name: "MARCUS T. ASHCROFT",
    title: "CHIEF ACQUISITION OFFICER",
    bio: "Leads terrestrial sourcing operations. Maintains relationships with the firm's proprietary extraction partners. Formerly in industrial procurement; his current role is not meaningfully different.",
  },
  {
    image: "/sites/rocks/team-jim.png",
    name: "LAWRENCE V. STONEBRIDGE",
    title: "DIRECTOR, VAULT OPERATIONS",
    bio: "Responsible for the Class III custody facility and its attestation ledger. Holds the only physical key. Has not taken a day off since 2019, which the firm considers a positive indicator of operational focus.",
  },
  {
    image: "/sites/rocks/team-sean.png",
    name: "DOUGLAS F. PENNINGTON",
    title: "HEAD OF BEDROCK RESEARCH",
    bio: "Oversees internal research on long-dated lithic assets. Publications include several unpublished memoranda. His sole public statement on firm strategy: \"We are long rocks.\"",
  },
]

export default function RocksLeadership() {
  return (
    <>
      <TickerStrip />

      <section className="py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <TerminalHeading level={1} className="mb-2">LEADERSHIP</TerminalHeading>
          <p className="text-primary/60 text-sm uppercase tracking-wide mb-10 max-w-2xl">
            THE FIRM IS OPERATED BY A COMPACT TEAM OF FOUR. TITLES ARE DESCRIPTIVE RATHER THAN HIERARCHICAL. ALL
            DECISIONS ARE MADE BY CONSENSUS, EXCEPT WHEN THEY ARE NOT.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((member) => (
              <div key={member.name} className="border border-primary/30 bg-secondary/20 p-6">
                <TeamMember
                  image={member.image}
                  name={member.name}
                  title={member.title}
                  bio={member.bio}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-secondary/20 border-y border-primary/20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-primary/60 text-xs uppercase tracking-widest mb-3">GOVERNANCE NOTE</p>
          <p className="text-primary/80 text-sm leading-relaxed">
            THE FIRM MAINTAINS NO OUTSIDE BOARD, NO ADVISORS, AND NO STAFF BEYOND THE FOUR INDIVIDUALS NAMED ABOVE.
            SUCCESSION PLANNING IS INFORMAL. IN THE EVENT OF A LEADERSHIP TRANSITION, CLIENT POSITIONS ARE EXPECTED TO
            REMAIN IN PLACE.
          </p>
        </div>
      </section>
    </>
  )
}

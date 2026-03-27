import { Hero } from "@/components/ui/hero"
import { ImageTextSection } from "@/components/ui/image-text-section"
import { Timeline } from "@/components/ui/timeline"
import { TeamMember } from "@/components/ui/team-member"

export const metadata = {
  title: "About — Pig Milk Co.",
  description: "The story of how we started milking pigs.",
}

const timelineItems = [
  { year: "2019", description: "Earl milks his first pig. Accidentally." },
  { year: "2020", description: "Earl milks his second pig. On purpose this time." },
  { year: "2021", description: "First customer! (It was Earl's mom.)" },
  { year: "2022", description: "Received cease and desist from Big Dairy. Framed it." },
  { year: "2023", description: "Opened our state-of-the-art facility (a slightly larger barn)." },
  { year: "2024", description: "Launched online store. Crashed immediately. One visitor." },
  { year: "2025", description: "Named 'Most Specific Dairy Company' by no one." },
]

const teamMembers = [
  {
    name: "Earl Hogsworth",
    title: "Founder & Chief Pig Milking Officer",
    image: "/sites/pigmilk/team-earl.png",
    bio: "Started this whole thing by accident. Refuses to admit it was a mistake.",
  },
  {
    name: "Burt Sloppington III",
    title: "VP of Pig Relations",
    image: "/sites/pigmilk/team-burt.png",
    bio: "Has a way with pigs. The pigs have not confirmed this.",
  },
  {
    name: "Chet Trotsworth",
    title: "Head of Marketing & Pig Whispering",
    image: "/sites/pigmilk/team-chet.png",
    bio: "Convinced the world needs pig milk. Still working on convincing his family.",
  },
  {
    name: "Dale Gristle",
    title: "Quality Assurance (Taster)",
    image: "/sites/pigmilk/team-dale.png",
    bio: "Has tasted more pig milk than any human alive. His expression says it all.",
  },
]

export default function PigMilkAbout() {
  return (
    <>
      {/* Hero */}
      <Hero
        headline="Our Story"
        subheadline="How one farmer's mistake became the world's most specific dairy product."
      />

      {/* Origin Story */}
      <ImageTextSection
        image="/sites/pigmilk/timeline-origin.png"
        title="How It All Started"
        description={
          "In the summer of 2019, a bleary-eyed farmer named Earl Hogsworth stumbled into the wrong stall at 4 AM and milked a pig. " +
          "He didn't realize his mistake until he'd already filled an entire pail. Rather than pour it out like a reasonable person, " +
          "Earl did what any unhinged visionary would do: he tasted it. Was it good? No. Did that stop us? Also no.\n\n" +
          "What followed was a years-long journey fueled by stubbornness, questionable judgment, and an alarming amount of pig milk. " +
          "Earl mortgaged his barn, alienated most of his friends, and entered a dairy category that literally did not exist. " +
          "Experts called it \"a terrible idea.\" His mom called it \"concerning.\" Earl called it Tuesday.\n\n" +
          "Today, Pig Milk Co. is the world's first — and only — dedicated pig dairy operation. " +
          "We've served dozens of customers, most of whom came back (some to complain, but still). " +
          "Our mission is simple: to prove that just because nobody asked for something doesn't mean it shouldn't exist."
        }
      />

      {/* Company Timeline */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-primary">Company Timeline</h2>
        </div>
        <Timeline items={timelineItems} />
      </section>

      {/* Meet the Team */}
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
    </>
  )
}

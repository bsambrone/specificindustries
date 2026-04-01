import { Hero } from "@/components/ui/hero"
import { ImageTextSection } from "@/components/ui/image-text-section"
import { Timeline } from "@/components/ui/timeline"
import { TeamMember } from "@/components/ui/team-member"

export const metadata = {
  title: "About — True Grit Personal Care",
  description: "The story of how one man's renovation project became an industrial hygiene revolution.",
}

const timelineItems = [
  { year: "2020", description: "Bill uses sandpaper to clean a stubborn stain in his bathroom. Has an idea he immediately regrets." },
  { year: "2021", description: "First prototype. First test. First application of what would become the Recovery Balm." },
  { year: "2022", description: "Recruits Jim, Brandon, and Sean. All of them had follow-up questions." },
  { year: "2023", description: "Leases manufacturing facility. Landlord asks 'for what?' twice." },
  { year: "2024", description: "Launches online store. First customer buys Recovery Balm only." },
  { year: "2025", description: "Introduces the AcidJet Bidet 3000 over unanimous legal objection." },
  { year: "2026", description: "Named 'Most Alarming Personal Care Brand' by an industry blog that asked to remain anonymous." },
]

const teamMembers = [
  {
    name: "Bill",
    title: "Founder & Chief Abrasion Officer",
    image: "/sites/truegrit/team-bill.png",
    bio: "Saw a gap in the market while renovating his bathroom. 'What if the thing that cleans surfaces could clean ALL surfaces?' he asked. No one answered, but he built a company anyway.",
  },
  {
    name: "Jim",
    title: "VP of Grit Sciences",
    image: "/sites/truegrit/team-jim.png",
    bio: "Former materials engineer with a specialty in industrial abrasives. Joined True Grit after Bill described the vision. Jim's expression during that conversation has not changed since.",
  },
  {
    name: "Brandon",
    title: "Director of Consumer Endurance",
    image: "/sites/truegrit/team-brandon.png",
    bio: "Oversees the customer experience from first contact through recovery. Interprets complaint letters as 'testimonials of effectiveness.' Has a wall of them.",
  },
  {
    name: "Sean",
    title: "Head of Industrial Relations",
    image: "/sites/truegrit/team-sean.png",
    bio: "Bridges the gap between the construction industry and personal hygiene. Negotiates bulk abrasive contracts with suppliers who always ask what it's for. Sean has learned not to answer.",
  },
]

export default function TrueGritAbout() {
  return (
    <>
      <Hero
        headline="About True Grit"
        subheadline="The story of how one man's renovation project became an industrial hygiene revolution."
      />

      <ImageTextSection
        image="/sites/truegrit/about-origin.png"
        imageClassName="object-cover object-top"
        imageAspect="aspect-square"
        title="How It All Started"
        description={
          "In the summer of 2020, Bill was renovating his bathroom when he reached for a roll of toilet paper and grabbed a sheet of 40-grit sandpaper instead. " +
          "What happened next was unpleasant, but it was also — and Bill will insist on this point — undeniably thorough.\n\n" +
          "Rather than file the experience under 'never again,' Bill did what every great entrepreneur does: " +
          "he wondered if he could sell it. His wife suggested therapy. His friends suggested he was joking. " +
          "Bill was not joking. Bill is never joking.\n\n" +
          "Two years, three co-founders, and one very patient legal team later, True Grit Personal Care was born. " +
          "Our mission is simple: to deliver a level of cleanliness that conventional toilet paper can only dream of. " +
          "The fact that this comes with some discomfort is, in Bill's words, 'a feature, not a bug.'"
        }
      />

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-primary uppercase tracking-wide">Company Timeline</h2>
        </div>
        <Timeline items={timelineItems} />
      </section>

      <section className="py-16 px-4 bg-secondary/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-4 uppercase tracking-wide">
            Leadership Team
          </h2>
          <p className="text-center text-foreground/60 mb-12">
            Four people who could be doing anything else but chose this.
          </p>
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

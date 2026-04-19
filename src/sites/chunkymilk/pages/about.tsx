import { Hero } from "@/components/ui/hero"
import { ImageTextSection } from "@/components/ui/image-text-section"
import { TeamMember } from "@/components/ui/team-member"
import { leaders } from "@/sites/chunkymilk/data/leadership"

export const metadata = {
  title: "About — Whitford Family Chunky Milk",
  description: "A small hollow dairy, six generations of the same family, four fields, and the chunks we've always known.",
}

export default function ChunkyMilkAbout() {
  return (
    <>
      <Hero
        headline="About The Whitfords"
        subheadline="A small hollow dairy. Six generations. Four fields. The chunks we've always known."
      />

      <ImageTextSection
        image="/sites/chunkymilk/settlin-shed.png"
        imageClassName="object-cover"
        imageAspect="aspect-square"
        title="Who We Are"
        description={
          "The Whitford family has chunked in this hollow since 1867, when Ezekiel Whitford first noticed the chunks were good. " +
          "We run four fields — North Field, Sycamore Field, Creek Bottom, and High Meadow — and a single Settlin' Shed whose keys Otis carries.\n\n" +
          "We are not a large operation. We do not ship fast. We do not stir when the milk is resting. " +
          "Our jars are filled by the same hands that drew the milk, and our customers are, for the most part, people we already know — or people whose people we already know.\n\n" +
          "We sell chunky milk. We sell the tools to chunk at home. We sell what's left over. That is the whole of it."
        }
      />

      <section className="py-16 px-4 bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-3">The Whitford Line</h2>
          <p className="text-center text-foreground/60 mb-12">Four who keep the hollow running.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {leaders.map((leader) => (
              <TeamMember
                key={leader.slug}
                name={leader.name}
                title={leader.title}
                image={leader.portraitImage}
                bio={leader.bio}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

import Image from "next/image"
import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Our Hollow — Whitford Family Chunky Milk",
  description: "The four fields, the Settlin' Shed, and the places that make the milk what it is.",
}

const landmarks = [
  {
    name: "North Field",
    description:
      "The highest of the four. Rocky at the edges, level in the middle, and home to the cows that give our Petite Stir its thoughtful character. Cold in winter. Bill walks it every morning regardless.",
  },
  {
    name: "Sycamore Field",
    description:
      "Named for the three sycamores at the bend of the creek. The herd here is our largest, and the milk is honest and well-formed. Hollow Draw comes from Sycamore. So does the Cottage Pour.",
  },
  {
    name: "Creek Bottom",
    description:
      "The coldest, shadiest field. The grass runs dark here and the cows keep to the trees. Settled Hearth is drawn from Creek Bottom, which is why it pours the way it does.",
  },
  {
    name: "High Meadow",
    description:
      "The open one. Fenced in the 1920s by Bill's grandfather and not modified since. The cows move slower here and the milk carries more weight. Monumental Gather and Patriarch Reserve come only from High Meadow.",
  },
  {
    name: "The Settlin' Shed",
    description:
      "A single unpainted wooden building set back from the road, between the barn and the family cemetery. Otis holds the keys. No one else does. It has not been photographed from the inside.",
  },
  {
    name: "Chunk Rock",
    description:
      "A limestone outcropping at the head of the hollow, pointed roughly north. Ezekiel Whitford is said to have first noticed the chunks were good while sitting on it in 1867. A small plaque was added in 1974. It has since weathered unreadable.",
  },
  {
    name: "The Family Cemetery",
    description:
      "Small, stone-walled, and kept clear by Silas. Six Whitford patriarchs are buried here, along with several members of the Hollister, Clemmons, and Mercer families the hollow considers kin. Open to visitors who know the way in.",
  },
]

export default function OurHollowPage() {
  return (
    <>
      <Hero
        headline="Our Hollow"
        subheadline="Four fields, one shed, one rock, one cemetery, and the places between them."
      />

      {/* Map */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden border-2 border-accent/30 bg-secondary/20">
            <Image
              src="/sites/chunkymilk/our-hollow-map.png"
              alt="Hand-drawn map of the Whitford hollow showing the four fields, the Settlin' Shed, Chunk Rock, and the family cemetery."
              fill
              className="object-contain"
            />
          </div>
          <p className="text-center text-sm text-foreground/60 italic mt-4">
            Drawn by Bill&apos;s aunt Mable in 1987. Distances approximate.
          </p>
        </div>
      </section>

      {/* Landmarks */}
      <section className="py-16 px-4 bg-secondary/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-12">Landmarks</h2>
          <div className="space-y-10">
            {landmarks.map((landmark) => (
              <div key={landmark.name} className="border-l-4 border-accent pl-6">
                <h3 className="text-2xl font-heading font-bold text-primary mb-2">{landmark.name}</h3>
                <p className="text-foreground/70 leading-relaxed">{landmark.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

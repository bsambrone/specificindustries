import Image from "next/image"
import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "The Chunkin' Process — Whitford Family Chunky Milk",
  description: "The three stages of a Whitford pour: The Rest, The Settle, The Gather.",
}

const stages = [
  {
    name: "The Rest",
    description:
      "First, the milk is given time. We do not hurry this step, and we have never found a reason to try. " +
      "Milk that is rushed is milk that gives up its chunks reluctantly; milk that is allowed to rest, in its own vessel, in a still and quiet place, gives them freely. " +
      "The Rest lasts as long as the milk wants it to last. Two days for a Petite. Nine weeks for a Patriarch. " +
      "No one has ever complained that a Whitford pour was rushed.",
    image: "/sites/chunkymilk/settlin-shed.png",
  },
  {
    name: "The Settle",
    description:
      "In the second stage, the character begins. The milk, having rested, now settles — which is to say, the chunks announce themselves. " +
      "We do not stir. We do not shake. We do not lift the lid to check on them. We simply allow The Settle to proceed without us. " +
      "This is the stage the Whitfords have, for one hundred and fifty-eight years, refused to explain to outsiders. " +
      "It is a private time between the milk and the hollow.",
    image: "/sites/chunkymilk/settlin-shed.png",
  },
  {
    name: "The Gather",
    description:
      "In the third and final stage, the chunks are gathered. This is done by hand, in the early morning, before the light is strong. " +
      "Jeb grades them as they come. The Petite and Artisan are jarred first; the Hearty and Monumental wait their turn; the Patriarch Reserve is only drawn when Otis says it is time. " +
      "Each jar is stoppered with waxed cork, labeled by hand, and set on the shelf beside its kin. " +
      "Then we close the shed, and we begin again.",
    image: "/sites/chunkymilk/settlin-shed.png",
  },
]

export default function ChunkinProcessPage() {
  return (
    <>
      <Hero
        headline="The Chunkin' Process"
        subheadline="Three stages. One hundred and fifty-eight years. The same order every time."
      />

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-20">
          {stages.map((stage, i) => (
            <div key={stage.name} className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <p className="text-sm uppercase tracking-widest text-accent mb-2">Stage {i + 1}</p>
                <h2 className="text-3xl font-heading font-bold text-primary mb-4">{stage.name}</h2>
                <p className="text-foreground/70 leading-relaxed whitespace-pre-line">{stage.description}</p>
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden bg-secondary/20">
                <Image src={stage.image} alt={stage.name} fill className="object-cover" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 bg-secondary/30 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-2xl font-heading text-primary leading-relaxed">
            &ldquo;The milk settles when it settles. We do not rush the chunks. We have not rushed them since 1867.&rdquo;
          </p>
          <p className="mt-4 text-sm text-foreground/60">— Bill Whitford</p>
        </div>
      </section>
    </>
  )
}

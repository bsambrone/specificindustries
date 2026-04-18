import Image from "next/image"
import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "About — Super Engineered",
  description: "A letter from our founders on why we rebuilt the toothbrush.",
}

// Co-founders correspond to the four named base-image people (bill, brandon,
// jim, sean). Bill is the founder per project convention; the others are
// co-founders of the same vintage.
const founders = [
  {
    name: "Bill Ankeney",
    title: "Founder & Chief Simplification Officer",
    image: "/sites/superengineered/team/bill-ankeney.png",
  },
  {
    name: "Brandon Yothers",
    title: "Co-Founder, President of Platform Verticals",
    image: "/sites/superengineered/team/brandon-yothers.png",
  },
  {
    name: "Jim Redenbaugh",
    title: "Co-Founder, SVP Utensil Strategy",
    image: "/sites/superengineered/team/jim-redenbaugh.png",
  },
  {
    name: "Sean Lightcap",
    title: "Co-Founder, Chief Trust Architect",
    image: "/sites/superengineered/team/sean-lightcap.png",
  },
]

export default function SuperEngineeredAbout() {
  return (
    <main className="bg-background">
      <article className="max-w-2xl mx-auto py-20 px-4">
        <p className="text-sm font-medium uppercase tracking-widest text-primary/60 mb-4 text-center">
          A Letter From Our Founders
        </p>
        <h1 className="text-4xl md:text-5xl font-heading font-light text-primary mb-10 text-center">
          Why we rebuilt the toothbrush.
        </h1>
        <div className="space-y-6 text-lg text-primary/80 leading-relaxed">
          <p>
            For nearly five thousand years, the toothbrush has gone largely unexamined. Generation after generation accepted the daily ritual of applying bristles to enamel without instrumentation, without telemetry, without a single line of production-grade code anywhere in the workflow. We could not continue.
          </p>
          <p>
            Super Engineered was founded on a belief that the most ordinary objects in human life deserve the same rigor, the same standards, the same compliance controls we reserve for distributed systems. A spoon, properly built, is a service. A doorknob, properly considered, is a perimeter. A light switch is authentication in physical form.
          </p>
          <p>
            We understand this is a lot. We understand there are simpler ways to brush a tooth. We reject them.
          </p>
          <p>
            Every product we ship runs on subscription because a product without a subscription is a product without ongoing care. Firmware updates, compliance attestations, telemetry retention — these are not features; they are obligations. We take them seriously. We charge accordingly.
          </p>
          <p>
            We hope you will join us at the new standard.
          </p>
        </div>
        <p className="mt-12 text-center text-primary/60 italic">
          — The Super Engineered Founders
        </p>
      </article>

      <section className="bg-secondary py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm font-medium uppercase tracking-widest text-primary/60 mb-2 text-center">
            Our Founders
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-light text-primary text-center mb-12">
            Four operators. One premise.
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {founders.map((f) => (
              <figure key={f.name} className="text-center">
                <div className="relative w-32 h-32 md:w-36 md:h-36 mx-auto mb-4 rounded-full overflow-hidden bg-background">
                  <Image
                    src={f.image}
                    alt={f.name}
                    fill
                    sizes="144px"
                    className="object-cover"
                  />
                </div>
                <figcaption>
                  <p className="font-heading text-lg text-primary">{f.name}</p>
                  <p className="text-xs text-accent mt-1">{f.title}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

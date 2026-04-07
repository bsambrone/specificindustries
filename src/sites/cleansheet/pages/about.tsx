import Image from "next/image"
import { MetricCounter } from "@/components/ui/metric-counter"

export const metadata = {
  title: "About — The Clean Sheet",
  description:
    "Founded in 1987 by a family that saw an opportunity to clean up the neighborhood. Literally.",
}

const processSteps = [
  {
    step: "01",
    name: "Intake",
    description:
      "We accept your items, no matter how soiled, and log them into our proprietary tracking system. Each item is tagged and catalogued. We don't ask where it's been — we only care about where it's going.",
  },
  {
    step: "02",
    name: "Processing",
    description:
      "Your garments pass through multiple wash cycles across several of our facilities, each cycle removing another layer of\u2014 stains. By the time processing is complete, there is no trace of the original condition.",
  },
  {
    step: "03",
    name: "Return",
    description:
      "Your items re-enter your wardrobe completely clean, pressed, and accompanied by documentation proving they were always this clean. They are indistinguishable from items that were never dirty in the first place.",
  },
]

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-secondary/5 py-24 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-primary mb-6 leading-tight">
              A Cleaner World, One Load at a Time
            </h1>
            <p className="text-xl text-foreground/70 leading-relaxed">
              Founded in 1987 by a family that saw an opportunity to clean up the
              neighborhood. Literally.
            </p>
          </div>
          <div className="md:w-1/2">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/sites/cleansheet/about-hero.png"
                alt="The Clean Sheet storefront"
                fill
                className="object-cover"
                priority
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Founding Story */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-primary mb-6">Our Story</h2>
          <div className="space-y-4 text-foreground/70 leading-relaxed">
            <p>
              The Clean Sheet was founded in 1987 when the founders noticed that the neighborhood
              had a lot of dirty laundry — both figuratively and literally. What started as a
              single storefront has grown into a multi-facility operation with international reach.
            </p>
            <p>
              We&apos;ve always believed that no matter how dirty something is, with the right process,
              it can come out clean. This philosophy has guided us for nearly four decades and has
              attracted a loyal clientele who value our commitment to thoroughness, discretion,
              and plausible deniability.
            </p>
            <p>
              People ask how a laundromat can have offices in the Cayman Islands. The answer is
              simple: some fabrics require an offshore climate for optimal care. We don&apos;t make
              the rules of textile science. We just follow them. To the Cayman Islands.
            </p>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 px-6 bg-secondary/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold text-primary mb-4">
              The Three-Step Clean
            </h2>
            <p className="text-foreground/60 max-w-xl mx-auto leading-relaxed">
              Our proprietary cleaning process ensures that every item is thoroughly processed,
              documented, and returned in a condition that raises no questions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {processSteps.map((step) => (
              <div key={step.step} className="text-center">
                <div className="text-5xl font-heading font-bold text-accent/30 mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-heading font-semibold text-primary mb-3">
                  {step.name}
                </h3>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-16 px-6 border-y border-primary/10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <MetricCounter value={4200000000} prefix="$" label="In garments processed" suffix="+" compact />
          <MetricCounter value={37} label="Years in operation" />
          <MetricCounter value={12} label="Countries with facilities" />
          <MetricCounter value={0} label="Convictions" />
        </div>
      </section>

      {/* Process Image */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
            <Image
              src="/sites/cleansheet/about-process.png"
              alt="The Clean Sheet processing facility"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-center text-foreground/40 text-sm mt-4">
            Our state-of-the-art processing facility. Location undisclosed.
          </p>
        </div>
      </section>
    </div>
  )
}

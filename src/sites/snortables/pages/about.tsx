import Image from "next/image"
import { Hero } from "@/components/ui/hero"
import { Timeline } from "@/components/ui/timeline"
import { executives } from "@/sites/snortables/data/leadership"

export const metadata = {
  title: "About — Snortables",
  description: "The story of how we disrupted nutrition, one nostril at a time.",
}

const timelineItems = [
  { year: "2023", description: "Founded in a garage. Asked to leave the garage." },
  { year: "2023", description: "First successful turkey pulverization." },
  { year: "2024", description: "Launched NasalFuel Original. Received first cease-and-desist." },
  { year: "2024", description: "Expanded to 12 products. Received seventh cease-and-desist." },
  { year: "2025", description: "2.4M nostrils served. Legal team expanded to 14 people." },
  { year: "2026", description: "Introduced NasalFuel Prime. CEO described by Forbes as 'alarmingly confident.'" },
]

export default function SnortablesAbout() {
  return (
    <>
      <Hero
        headline="Disrupting Nutrition, One Nostril at a Time"
        subheadline="Founded in 2023 by people who looked at a perfectly good meal and thought: what if we destroyed this and snorted it?"
        dark
      />

      {/* Origin Story */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-heading font-bold text-primary">Our Origin Story</h2>
          <p className="text-foreground/80 leading-relaxed">
            It started with a simple question that no one was brave enough to ask: &quot;What if we bypassed the entire mouth?&quot;
          </p>
          <p className="text-foreground/80 leading-relaxed">
            In 2023, a group of biohackers realized they were wasting precious seconds — sometimes entire minutes — moving their jaws up and down to process nutrients. Chewing, they argued, was an evolutionary dead end. A relic of a time before we understood the untapped potential of the human nostril.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            After 18 months in a garage (and two restraining orders from the FDA), Snortables was born. Our founding team pulverized their first turkey on a Tuesday afternoon using a wood chipper borrowed from a neighbor who has since moved away. The results were, in the words of our Chief Insufflation Officer, &quot;technically edible, nasally.&quot;
          </p>
          <p className="text-foreground/80 leading-relaxed">
            Today, Snortables serves over 2.4 million nostrils worldwide. We&apos;ve pulverized thousands of perfectly good meals, employed 14 lawyers, and received more cease-and-desist letters than any other nutrition company in history. We frame them all.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-heading font-bold text-primary mb-6">Our Mission</h2>
          <p className="text-xl text-foreground/80 font-heading leading-relaxed">
            &quot;To liberate humanity from the tyranny of chewing.&quot;
          </p>
          <p className="text-foreground/60 mt-4">
            Oral consumption is an evolutionary bottleneck. The future of nutrition is intranasal, and we&apos;re building it — one pulverized meal at a time.
          </p>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-12">
            Leadership Team
          </h2>
          <div className="space-y-16">
            {executives.map((exec, i) => (
              <div
                key={exec.slug}
                className={`flex flex-col md:flex-row gap-8 items-start ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}
              >
                <div className="relative w-full md:w-56 aspect-[4/5] rounded-lg overflow-hidden shrink-0">
                  <Image
                    src={exec.image}
                    alt={exec.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-heading font-bold text-secondary">{exec.name}</h3>
                  <p className="text-accent font-semibold mb-3">{exec.title}</p>
                  <p className="text-foreground/70 leading-relaxed mb-4">{exec.bio}</p>
                  <blockquote className="border-l-4 border-primary pl-4 italic text-foreground/60">
                    &ldquo;{exec.quote}&rdquo;
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-primary">Company Timeline</h2>
        </div>
        <Timeline items={timelineItems} />
      </section>
    </>
  )
}

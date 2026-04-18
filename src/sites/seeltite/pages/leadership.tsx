import Image from "next/image"
import { Hero } from "@/components/ui/hero"
import { CautionStripe } from "../components/caution-stripe"
import { leaders } from "../data/leadership"

export const metadata = {
  title: "Leadership — Seel-Tite Containment Systems",
  description: "The four engineers who have signed every major revision of every Seel-Tite product.",
}

export default function SeeltiteLeadership() {
  return (
    <>
      <Hero
        headline="The Leadership"
        subheadline="Four engineers. Fifty-two years. One port standard."
      />
      <CautionStripe text="Every Revision · Signed In Person" />
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          {leaders.map((l) => (
            <article key={l.slug} className="border border-foreground/15 bg-background p-6 flex flex-col md:flex-row gap-6">
              <div className="relative w-full md:w-48 aspect-square flex-shrink-0 bg-secondary/10">
                <Image src={l.portraitImage} alt={l.name} fill sizes="(min-width: 768px) 192px, 100vw" className="object-cover" />
              </div>
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-primary mb-2 font-heading">{l.title}</p>
                <h2 className="text-2xl font-heading font-semibold mb-4">{l.name}</h2>
                <p className="text-foreground/80 leading-relaxed text-sm">{l.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

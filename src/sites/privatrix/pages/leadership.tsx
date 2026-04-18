import Image from "next/image"
import { Hero } from "@/components/ui/hero"
import { founders } from "../data/leadership"

export const metadata = {
  title: "Leadership — Privatrix",
  description: "The four executives responsible for the world's leading privacy theatre platform.",
}

export default function PrivatrixLeadership() {
  return (
    <>
      <Hero
        headline="Leadership"
        subheadline="Four executives. Decades of compliance optics experience. Bound by NDA on most prior engagements."
        dark
      />

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {founders.map((f) => (
            <div key={f.baseImage} className="flex flex-col">
              <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-primary/5 mb-6">
                <Image src={f.portrait} alt={f.name} fill className="object-cover" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-primary mb-1">{f.name}</h2>
              <p className="text-sm uppercase tracking-wider text-accent font-semibold mb-4">
                {f.title}
              </p>
              <div className="space-y-3 text-foreground/70 leading-relaxed">
                {f.bio.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

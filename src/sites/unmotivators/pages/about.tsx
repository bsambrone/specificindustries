import Image from "next/image"
import { leaders } from "@/sites/unmotivators/data/leadership"

export const metadata = {
  title: "About — Unmotivators Inc.",
  description: "The leadership team of Unmotivators Inc., and the values they have agreed to uphold.",
}

const values = [
  {
    title: "Honesty about how bad it is.",
    body: "We do not soften the picture. We do not suggest that next quarter will be different. The picture is the picture; the products reflect it.",
  },
  {
    title: "Sustainability (of our discontent).",
    body: "Burnout is a resource. Managed correctly, it can last an entire career. We have internal protocols to ensure no one runs out prematurely.",
  },
  {
    title: "Accountability (for your own choices).",
    body: "We are not accountable for your decision to read the poster. We are, however, accountable for printing it, and we stand by our work.",
  },
  {
    title: "Innovation in the field of resignation.",
    body: "Every quarter, we release new products that more accurately reflect the moment in which they are purchased. We consider this an ongoing research program.",
  },
]

export default function UnmotivatorsAbout() {
  return (
    <>
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-foreground/60 mb-4">
            About
          </p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold uppercase tracking-tight text-foreground mb-6">
            Unmotivators Inc.
          </h1>
          <p className="text-lg text-foreground/80 leading-relaxed mb-4">
            Unmotivators Inc. was founded in 2012 on a single, defensible premise: that the office, as an institution, deserves honest decor. Fourteen years later, that premise has held up.
          </p>
          <p className="text-lg text-foreground/80 leading-relaxed">
            The company is headquartered in a low-rise office park you have driven past. The leadership team has been largely intact since 2015. We do not intend to grow. We intend to continue.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-secondary/30 border-y border-foreground/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold uppercase tracking-tight text-foreground text-center mb-12">
            Leadership
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {leaders.map((leader) => (
              <article key={leader.slug} className="bg-background border border-foreground/20 p-6">
                <div className="relative aspect-[4/5] bg-secondary/40 border border-foreground/10 mb-5 grayscale">
                  <Image
                    src={leader.portraitImage}
                    alt={`Portrait of ${leader.name}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="font-mono text-xs uppercase tracking-widest text-foreground/60 mb-2">
                  Serving since: {2026 - leader.yearsOfService}
                </p>
                <h3 className="font-heading text-2xl uppercase tracking-tight text-foreground mb-1 leading-tight">
                  {leader.name}
                </h3>
                <p className="text-sm italic text-foreground/70 mb-4">{leader.title}</p>
                <p className="text-foreground/80 leading-relaxed mb-4">{leader.bio}</p>
                <blockquote className="border-l-2 border-accent pl-4 text-foreground/70 italic">
                  &quot;{leader.quote}&quot;
                </blockquote>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold uppercase tracking-tight text-foreground text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value) => (
              <div key={value.title} className="border-l-4 border-accent pl-5">
                <h3 className="font-heading text-xl uppercase tracking-tight text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">{value.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

import Image from "next/image"
import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Sparky's Safety Corner — Boom-Fun!",
  description: "The Four Rules every young Boom-Fun! customer must follow. Do not squeeze the blasting cap. Light the fuse from the long end. Count your fingers before AND after. Ask an adult first.",
}

const rules = [
  {
    n: 1,
    title: "Don't Squeeze the Blasting Cap.",
    note: "The blasting cap does not like to be squeezed. Hold it gently, between thumb and forefinger, and carry it as you would carry a small, nervous beetle. A squeezed blasting cap is an unhappy blasting cap, and an unhappy blasting cap can affect your day meaningfully.",
  },
  {
    n: 2,
    title: "Light the Fuse From the Long End.",
    note: "The long end is the end far from the thing that goes kaboom. The other end is the end near the thing that goes kaboom. These are not the same end. Sparky has made a diagram. The diagram is included in every Boom-Fun! product. Please refer to it.",
  },
  {
    n: 3,
    title: "Count Your Fingers Before AND After.",
    note: "Eight fingers and two thumbs is the standard American configuration. Any variation after using a Boom-Fun! product should be investigated by a qualified adult. Some adults count faster than others. Any adult will do.",
  },
  {
    n: 4,
    title: "Ask an Adult First.",
    note: "Adults have more experience with the physical world and can offer guidance. Any adult will do. The mailman is an adult. Your teacher is an adult. The gentleman at the hardware store is an adult. When in doubt, ask the gentleman at the hardware store. He has seen things.",
  },
]

export default function BoomfunSafety() {
  return (
    <>
      <Hero
        headline="SPARKY'S SAFETY CORNER"
        subheadline="Hi kids! Sparky here. Boom-Fun! products are FUN — but only when you follow the Four Rules. Read carefully. Pledge sincerely."
      />

      {/* Intro with Sparky */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto grid md:grid-cols-[1fr_2fr] gap-8 items-center">
          <div className="relative aspect-square max-w-[280px] mx-auto">
            <Image src="/sites/boomfun/sparky.png" alt="Sparky the Safety Mascot" fill className="object-contain" />
          </div>
          <div>
            <p className="text-lg text-foreground/80 leading-relaxed mb-4">
              Hi kids! Sparky here. My job is to keep America&apos;s young demolitionists safe, happy, and well-equipped.
              I personally inspect every Boom-Fun! product before it leaves our Toledo facility, and I&apos;ve never missed
              a day of work in my entire career.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              Boom-Fun! products are FUN — but they&apos;re only FUN when you follow The Four Rules. Read them. Memorize
              them. Say them aloud in front of a mirror. Pledge to follow them every time. A young American who
              follows The Four Rules will have a lifetime of happy Boom-Fun! memories ahead of him.
            </p>
          </div>
        </div>
      </section>

      {/* The Four Rules */}
      <section className="py-12 px-4 bg-secondary/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-heading font-bold text-primary uppercase text-center mb-12">
            The Four Rules
          </h2>
          <div className="space-y-6">
            {rules.map((rule) => (
              <div key={rule.n} className="border-4 border-primary/25 bg-background p-8 relative">
                <div className="absolute -top-5 -left-5 w-14 h-14 bg-primary text-background rounded-full flex items-center justify-center font-heading text-2xl shadow-md">
                  {rule.n}
                </div>
                <h3 className="text-2xl font-heading font-bold text-primary uppercase mb-3 pl-4">
                  {rule.title}
                </h3>
                <p className="text-foreground/80 leading-relaxed pl-4 italic">{rule.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing stamp */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-block border-4 border-secondary text-secondary font-heading uppercase tracking-[0.3em] px-10 py-4 transform rotate-[-4deg] text-lg">
            Approved by Sparky
          </div>
          <p className="mt-8 text-foreground/70 italic leading-relaxed">
            Every Boom-Fun! product is inspected, tested, and personally approved by Sparky himself.
            If your product does not bear the Sparky Approval Stamp, write to us at once. We will send a
            new one, properly stamped, on the next outbound truck.
          </p>
        </div>
      </section>
    </>
  )
}

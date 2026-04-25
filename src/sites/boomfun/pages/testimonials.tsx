import Image from "next/image"
import { Hero } from "@/components/ui/hero"
import { testimonials } from "@/sites/boomfun/data/testimonials"

export const metadata = {
  title: "Letters from Happy Young Detonators — Boom-Fun!",
  description: "Unsolicited mail from satisfied Boom-Fun! customers and their proud parents. Every letter printed exactly as received (with minor edits for grammar).",
}

const lettersToSparkySidebar = [
  {
    name: "Billy, age 6",
    letter: "Dear Sparky, can you come to my birthday? I will have cake. From Billy.",
  },
  {
    name: "Susan, age 9",
    letter: "Dear Sparky, my brother counted his fingers wrong. He is fine. He needs a new handbook. Please send one. Thank you. Susan.",
  },
  {
    name: "Gerald, age 11",
    letter: "Dear Mr. Sparky, I am starting a Boom-Fun! Club chapter in my neighborhood. So far I am the only member. My mom says I need to get other members before I can call it a chapter. Please advise.",
  },
]

export default function BoomfunTestimonials() {
  const parents = testimonials.filter((t) => t.role === "parent")
  const kids = testimonials.filter((t) => t.role === "kid")

  return (
    <>
      <Hero
        headline="LETTERS FROM HAPPY CUSTOMERS"
        subheadline="Unsolicited mail from proud parents and young detonators across the forty-eight states. Every letter reprinted with permission."
      />

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[2fr_1fr] gap-10">
          {/* Main letters column */}
          <div>
            <h2 className="text-2xl font-heading font-bold text-primary uppercase mb-6 border-b-2 border-primary/20 pb-2">
              From Proud Parents
            </h2>
            <div className="space-y-8 mb-16">
              {parents.map((t) => (
                <article key={t.slug} className="bg-background border-2 border-primary/15 p-6 shadow-sm">
                  <div className="flex gap-4 mb-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-secondary/20">
                      <Image src={t.photo} alt={t.name} fill className="object-cover" />
                    </div>
                    <div>
                      <div className="font-heading text-lg text-primary">{t.name}</div>
                      <div className="text-sm text-foreground/60">{t.city}</div>
                    </div>
                  </div>
                  <blockquote className="italic text-foreground/80 leading-relaxed mb-4 font-serif">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  {t.signoff && (
                    <div className="text-sm text-foreground/60 italic pt-3 border-t border-primary/10">
                      — {t.signoff}
                    </div>
                  )}
                </article>
              ))}
            </div>

            <h2 className="text-2xl font-heading font-bold text-primary uppercase mb-6 border-b-2 border-primary/20 pb-2">
              From Young Detonators
            </h2>
            <div className="space-y-8">
              {kids.map((t) => (
                <article key={t.slug} className="bg-background border-2 border-primary/15 p-6 shadow-sm">
                  <div className="flex gap-4 mb-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-secondary/20">
                      <Image src={t.photo} alt={t.name} fill className="object-cover" />
                    </div>
                    <div>
                      <div className="font-heading text-lg text-primary">
                        {t.name}{t.age ? `, age ${t.age}` : ""}
                      </div>
                      <div className="text-sm text-foreground/60">{t.city}</div>
                    </div>
                  </div>
                  <blockquote className="italic text-foreground/80 leading-relaxed mb-4 font-serif">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  {t.signoff && (
                    <div className="text-sm text-foreground/60 italic pt-3 border-t border-primary/10">
                      — {t.signoff}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>

          {/* Letters to Sparky sidebar */}
          <aside>
            <div className="sticky top-24 bg-secondary/10 border-4 border-secondary/30 p-6">
              <h3 className="text-xl font-heading font-bold text-primary uppercase mb-5">
                Letters to Sparky
              </h3>
              <p className="text-sm text-foreground/70 italic mb-5">
                A selection of Sparky&apos;s favorite recent correspondence.
              </p>
              <div className="space-y-5">
                {lettersToSparkySidebar.map((l) => (
                  <div key={l.name} className="border-b border-primary/15 pb-4 last:border-b-0 last:pb-0">
                    <div className="text-xs uppercase tracking-widest text-secondary mb-1">
                      {l.name}
                    </div>
                    <p className="text-sm text-foreground/80 italic leading-relaxed font-serif">
                      &ldquo;{l.letter}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-xs text-foreground/50 italic">
                Sparky reads every letter personally. Response times vary.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}

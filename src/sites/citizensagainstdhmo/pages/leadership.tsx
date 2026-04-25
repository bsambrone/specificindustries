import Image from "next/image"
import { Hero } from "@/components/ui/hero"
import { leaders } from "@/sites/citizensagainstdhmo/data/leadership"

export const metadata = {
  title: "Leadership — Citizens Against DHMO",
  description: "The leadership team of the Citizens Against DHMO movement: executive, scientific, communications, regulatory, advocacy, and legal.",
}

export default function LeadershipPage() {
  return (
    <>
      <Hero
        headline="Leadership"
        subheadline="Six citizens leading the movement, each responsible for one of the disciplines this work requires."
      />

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          {leaders.map((leader) => (
            <article
              key={leader.slug}
              className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8 items-start border-b border-accent/20 pb-16 last:border-0 last:pb-0"
            >
              <div className="relative aspect-square w-full md:w-[260px] rounded-lg overflow-hidden bg-secondary/10">
                <Image src={leader.portraitImage} alt={leader.name} fill className="object-cover object-top" />
              </div>
              <div>
                <p className="text-xs text-secondary font-semibold uppercase tracking-wider mb-2">{leader.title}</p>
                <h2 className="text-3xl font-heading font-bold text-primary mb-4">{leader.name}</h2>
                <p className="text-foreground/80 leading-relaxed mb-6">{leader.bio}</p>
                <blockquote className="border-l-4 border-secondary pl-5 italic text-foreground/70 mb-6">
                  &ldquo;{leader.quote}&rdquo;
                </blockquote>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-foreground/70">
                  {leader.highlights.map((h) => (
                    <li key={h.label} className="flex justify-between gap-3 border-b border-accent/15 py-1.5">
                      <span>{h.label}</span>
                      <span className="text-primary font-semibold">{h.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
